#!/bin/bash
# Generate premium dark+orange brand imagery for Pixel & Ping showcase
set -e
OUT=/home/z/my-project/scripts/tmp-img
mkdir -p "$OUT"

echo "[1/6] global network globe ..."
z-ai image -p "Premium dark 3D render of a global network sphere: glowing orange network nodes connected by thin luminous arcs over a matte black planet, deep charcoal background with a subtle perspective grid, cinematic rim lighting, soft depth of field, high-end technology aesthetic, ultra detailed, no text, no words, no letters" -o "$OUT/01-network.png" -s 1344x768

echo "[2/6] data center corridor ..."
z-ai image -p "Cinematic photograph of a modern data center corridor at night, long row of dark server racks with warm orange status LEDs, volumetric haze, reflective dark floor, moody premium lighting, shallow depth of field, ultra detailed, no text, no words, no letters" -o "$OUT/02-servers.png" -s 1344x768

echo "[3/6] ip scan radar ..."
z-ai image -p "Abstract cybersecurity radar visualization: concentric glowing orange rings sweeping over a dark grid of tiny squares, scattered pixel nodes lighting up as detections, deep black background, premium 3D render, cinematic glow, ultra detailed, no text, no words, no letters" -o "$OUT/03-scan.png" -s 1024x1024

echo "[4/6] fiber traffic streams ..."
z-ai image -p "Macro long-exposure photograph of flowing orange light streams through dark fiber optic strands, elegant motion blur on pure black background, premium abstract technology art, cinematic, ultra detailed, no text, no words, no letters" -o "$OUT/04-traffic.png" -s 1344x768

echo "[5/6] isometric server cluster ..."
z-ai image -p "Isometric 3D render of a compact server cluster and network devices connected by glowing orange data lines, floating above a dark matte surface, soft studio lighting, premium minimal tech illustration, deep charcoal palette with orange accents, ultra detailed, no text, no words, no letters" -o "$OUT/05-ops.png" -s 1024x1024

echo "[6/6] particle shield ..."
z-ai image -p "Abstract 3D shield formed from thousands of tiny glowing orange particles and a hexagon mesh, floating in dark space with dramatic rim light, premium cybersecurity concept art, cinematic depth, ultra detailed, no text, no words, no letters" -o "$OUT/06-shield.png" -s 1024x1024

echo "ALL DONE"
