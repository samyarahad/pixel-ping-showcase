#!/usr/bin/env python3
"""Process the new Pixel Ping logo:
- luminance-key the near-black background into transparency
- export logo-full.png (whole emblem), logo-mark.png (square P emblem for nav), favicon-128.png
"""
from PIL import Image
import numpy as np

SRC = "/home/z/my-project/upload/ChatGPT Image ۲۸ شهریور ۱۴۰۵، ۰۰_۵۷_۴۵.png"
OUT_DIR = "/home/z/my-project/public/brand"

img = Image.open(SRC).convert("RGB")
print("source size:", img.size)
w, h = img.size

arr = np.asarray(img).astype(np.float32)
# luminance-proxy alpha: max channel works great for glowing logos on black
lum = arr.max(axis=2)

# soft knee so the glow keeps a smooth falloff
alpha = np.clip((lum - 8) / (70 - 8), 0, 1)  # below 8 -> 0, above 70 -> 1
alpha = np.power(alpha, 0.85)

rgba = np.dstack([arr, alpha * 255]).astype(np.uint8)
out = Image.fromarray(rgba, "RGBA")

# trim to content bbox
bbox = Image.fromarray((alpha * 255).astype(np.uint8)).getbbox()
print("content bbox:", bbox)
out = out.crop(bbox)
print("trimmed size:", out.size)
out.save(f"{OUT_DIR}/logo-full.png")

# --- square emblem crop (P arrow + orbit + pixel bits, without the wordmark) ---
# find the "PIXEL" text band: rows with many near-white pixels
white_rows = ((arr[:, :, 0] > 200) & (arr[:, :, 1] > 200) & (arr[:, :, 2] > 200)).sum(axis=1)
# text rows have lots of white; find first row from top where white count is high
text_start = None
for y, c in enumerate(white_rows):
    if c > w * 0.12:
        text_start = y
        break
print("wordmark starts at y ≈", text_start)

full = Image.open(SRC).convert("RGB")
fw, fh = full.size
# emblem region: from top of ring down to just above wordmark
top = int(fh * 0.07)
bottom = (text_start - int(fh * 0.01)) if text_start else int(fh * 0.56)
cx = fw // 2
half = (bottom - top) // 2
left, right = cx - half, cx + half
print("emblem crop:", (left, top, right, bottom))

mark = full.crop((left, top, right, bottom))
marr = np.asarray(mark).astype(np.float32)
mlum = marr.max(axis=2)
malpha = np.clip((mlum - 8) / (70 - 8), 0, 1)
malpha = np.power(malpha, 0.85)
mark_rgba = Image.fromarray(np.dstack([marr, malpha * 255]).astype(np.uint8), "RGBA")

# pad to square
mw, mh = mark_rgba.size
side = max(mw, mh)
sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
sq.paste(mark_rgba, ((side - mw) // 2, (side - mh) // 2))
sq_large = sq.resize((512, 512), Image.LANCZOS)
sq_large.save(f"{OUT_DIR}/logo-mark.png")

# favicon from the square mark
sq.resize((128, 128), Image.LANCZOS).save(f"{OUT_DIR}/favicon-128.png")

# hero version: full logo at nice size
out.resize((720, int(out.size[1] * 720 / out.size[0])), Image.LANCZOS).save(f"{OUT_DIR}/logo-hero.png")

print("done ->", OUT_DIR)
