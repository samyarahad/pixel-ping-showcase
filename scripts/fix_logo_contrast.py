#!/usr/bin/env python3
"""Boost logo contrast for dark backgrounds.

- logo-mark.png / logo-full.png: ensure clean alpha (black -> transparent),
  brighten + saturate the orange so it pops on #09090b.
- Produce logo-mark-bright.png used inside light chip containers.
"""
from PIL import Image, ImageEnhance, ImageOps
import os

BRAND = "/home/z/my-project/public/brand"


def to_clean_alpha(img: Image.Image) -> Image.Image:
    """Convert near-black pixels to transparent (luminance-keyed), keep color."""
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
            # black background -> fully transparent; soft edge -> partial
            if lum < 18:
                px[x, y] = (r, g, b, 0)
            elif lum < 46:
                px[x, y] = (r, g, b, int(a * (lum - 18) / 28))
    return img


def brighten(img: Image.Image) -> Image.Image:
    img = ImageEnhance.Color(img).enhance(1.18)      # richer orange
    img = ImageEnhance.Brightness(img).enhance(1.16)  # brighter
    img = ImageEnhance.Contrast(img).enhance(1.08)    # crisper edges
    return img


def report(name):
    p = os.path.join(BRAND, name)
    im = Image.open(p)
    print(f"{name}: mode={im.mode} size={im.size}")


for f in ["logo-mark.png", "logo-full.png", "favicon-128.png"]:
    report(f)

# --- logo-mark: clean alpha + brighten, save as main mark ---
mark = Image.open(os.path.join(BRAND, "logo-mark.png")).convert("RGBA")
mark = to_clean_alpha(mark)
mark = brighten(mark)
mark.save(os.path.join(BRAND, "logo-mark.png"))
mark.save(os.path.join(BRAND, "logo-mark-bright.png"))

# --- logo-full: brighten (keep its circular badge look, alpha already ok) ---
full = Image.open(os.path.join(BRAND, "logo-full.png")).convert("RGBA")
# black circle background inside the ring reads "empty" on dark; key it out gently
full = to_clean_alpha(full)
full = brighten(full)
full.save(os.path.join(BRAND, "logo-full.png"))

# --- favicon: brighten too ---
fav = Image.open(os.path.join(BRAND, "favicon-128.png")).convert("RGBA")
fav = brighten(fav)
fav.save(os.path.join(BRAND, "favicon-128.png"))

print("done")
