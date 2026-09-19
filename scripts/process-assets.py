#!/usr/bin/env python3
"""Post-process generated showcase images (compress to jpg) and fix logo
transparency (un-premultiply black background -> true alpha)."""
from PIL import Image
import os

BASE = "/home/z/my-project"
TMP = f"{BASE}/scripts/tmp-img"
OUT = f"{BASE}/public/showcase"
BRAND = f"{BASE}/public/brand"
os.makedirs(OUT, exist_ok=True)

# ---------------------------------------------------------------- showcase
# (src, dest, max_width)
SHOWCASE = [
    ("01-network.png", "network.jpg", 1280),
    ("02-servers.png", "servers.jpg", 1280),
    ("03-scan.png", "scan.jpg", 1024),
    ("04-traffic.png", "traffic.jpg", 1280),
    ("05-ops.png", "ops.jpg", 1024),
    ("06-shield.png", "shield.jpg", 1024),
]
for src, dest, maxw in SHOWCASE:
    im = Image.open(f"{TMP}/{src}").convert("RGB")
    if im.width > maxw:
        im = im.resize((maxw, int(im.height * maxw / im.width)), Image.LANCZOS)
    im.save(f"{OUT}/{dest}", "JPEG", quality=82, optimize=True, progressive=True)
    kb = os.path.getsize(f"{OUT}/{dest}") // 1024
    print(f"showcase {dest}: {im.size} {kb}KB")

# ---------------------------------------------------------------- logos
def unpremultiply(src, dest, maxw=None):
    """Black-background glow art -> proper alpha sprite.
    alpha = max(r,g,b); color = rgb/alpha (un-premultiplied additive light)."""
    im = Image.open(src).convert("RGB")
    if maxw and im.width > maxw:
        im = im.resize((maxw, int(im.height * maxw / im.width)), Image.LANCZOS)
    px = im.load()
    w, h = im.size
    out = Image.new("RGBA", (w, h))
    op = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            a = max(r, g, b)
            if a == 0:
                op[x, y] = (0, 0, 0, 0)
                continue
            # scale channel up to full range, keep hue
            nr = min(255, round(r * 255 / a))
            ng = min(255, round(g * 255 / a))
            nb = min(255, round(b * 255 / a))
            op[x, y] = (nr, ng, nb, a)
    out.save(dest, "PNG", optimize=True)
    kb = os.path.getsize(dest) // 1024
    print(f"logo {os.path.basename(dest)}: {out.size} {kb}KB")

unpremultiply(f"{BRAND}/logo-mark.png", f"{BRAND}/logo-mark.png", maxw=512)
unpremultiply(f"{BRAND}/logo-full.png", f"{BRAND}/logo-full.png", maxw=720)
unpremultiply(f"{BRAND}/logo-hero.png", f"{BRAND}/logo-hero.png", maxw=720)
unpremultiply(f"{BRAND}/favicon-128.png", f"{BRAND}/favicon-128.png")
unpremultiply(f"{BRAND}/pixel-ping-logo-nav.png", f"{BRAND}/pixel-ping-logo-nav.png")

print("DONE")
