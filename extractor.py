#!/usr/bin/env python3
"""
Bakery Website Reverse Engineering & Asset Extractor
Powered by Playwright + Chrome headless
"""

import sys
import os
import json
import urllib.parse
from pathlib import Path
from playwright.sync_api import sync_playwright

def extract_website(url: str, output_dir: str = "/home/wasim/dev/bakery-website/scraped"):
    out_path = Path(output_dir)
    out_path.mkdir(parents=True, exist_ok=True)
    (out_path / "assets").mkdir(exist_ok=True)
    (out_path / "images").mkdir(exist_ok=True)
    (out_path / "fonts").mkdir(exist_ok=True)
    (out_path / "css").mkdir(exist_ok=True)

    print(f"[*] Navigating to {url}...")
    
    with sync_playwright() as p:
        browser = p.chromium.launch(
            executable_path="/usr/bin/google-chrome-stable",
            headless=True,
            args=["--no-sandbox", "--disable-setuid-sandbox"]
        )
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            user_agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
        )
        page = context.new_page()

        network_requests = []
        page.on("request", lambda req: network_requests.append({"url": req.url, "method": req.method, "resource_type": req.resource_type}))

        try:
            page.goto(url, wait_until="networkidle", timeout=30000)
        except Exception as e:
            print(f"[!] Navigation notice: {e}, continuing...")

        # Screenshot
        screenshot_path = out_path / "screenshot_full.png"
        page.screenshot(path=str(screenshot_path), full_page=True)
        print(f"[+] Full page screenshot saved to {screenshot_path}")

        # HTML
        html_path = out_path / "index.html"
        html_content = page.content()
        html_path.write_text(html_content, encoding="utf-8")
        print(f"[+] Rendered HTML saved to {html_path}")

        # Extract Design Tokens, Colors, Fonts, Structure
        design_system = page.evaluate("""() => {
            const getComputed = (el) => window.getComputedStyle(el);
            const elements = Array.from(document.querySelectorAll('h1, h2, h3, p, a, button, section, nav, header, footer'));
            
            const colors = new Set();
            const bgColors = new Set();
            const fontFamilies = new Set();

            elements.forEach(el => {
                const style = getComputed(el);
                if (style.color) colors.add(style.color);
                if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)') bgColors.add(style.backgroundColor);
                if (style.fontFamily) fontFamilies.add(style.fontFamily);
            });

            // Extract headings
            const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => ({
                tag: h.tagName.toLowerCase(),
                text: h.innerText.trim(),
                font: getComputed(h).fontFamily,
                size: getComputed(h).fontSize,
                color: getComputed(h).color
            })).filter(h => h.text.length > 0);

            // Extract navigation items
            const navLinks = Array.from(document.querySelectorAll('nav a, header a')).map(a => ({
                text: a.innerText.trim(),
                href: a.getAttribute('href')
            })).filter(a => a.text.length > 0);

            // Extract images
            const images = Array.from(document.querySelectorAll('img')).map(img => ({
                src: img.src || img.getAttribute('data-src') || '',
                alt: img.alt || '',
                width: img.naturalWidth,
                height: img.naturalHeight
            })).filter(img => img.src.length > 0);

            return {
                title: document.title,
                colors: Array.from(colors),
                bgColors: Array.from(bgColors),
                fontFamilies: Array.from(fontFamilies),
                headings: headings.slice(0, 20),
                navLinks: navLinks.slice(0, 15),
                images: images
            };
        }""")

        with open(out_path / "design_system.json", "w", encoding="utf-8") as f:
            json.dump(design_system, f, indent=2)
        print(f"[+] Extracted design system and tokens to {out_path / 'design_system.json'}")

        # Download discovered images
        img_urls = set(img["src"] for img in design_system.get("images", []) if img["src"].startswith("http"))
        print(f"[*] Downloading {len(img_urls)} discovered images...")
        import urllib.request
        for i, img_url in enumerate(list(img_urls)[:25]):
            try:
                ext = ".jpg" if ".jpg" in img_url.lower() else (".png" if ".png" in img_url.lower() else (".webp" if ".webp" in img_url.lower() else ".jpg"))
                dest = out_path / "images" / f"image_{i:02d}{ext}"
                req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req, timeout=10) as response, open(dest, 'wb') as out_file:
                    out_file.write(response.read())
            except Exception as e:
                pass

        browser.close()
        print(f"[✔] Extraction complete! All data stored in {out_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 extractor.py <url>")
        sys.exit(1)
    extract_website(sys.argv[1])
