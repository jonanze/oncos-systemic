#!/usr/bin/env python3
"""Dependency-free PWA icon generator. Draws a teal rounded square with a
white two-tone capsule (pill). Anti-aliased via 4x supersampling."""
import zlib, struct, math

TEAL = (31, 111, 139)
WHITE = (255, 255, 255)
LIGHTBLUE = (205, 230, 240)
SEAM = (31, 111, 139)
SS = 4  # supersample factor


def write_png(path, w, h, pixels):
    def chunk(typ, data):
        return (struct.pack('>I', len(data)) + typ + data +
                struct.pack('>I', zlib.crc32(typ + data) & 0xffffffff))
    sig = b'\x89PNG\r\n\x1a\n'
    ihdr = struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0)
    raw = bytearray()
    for y in range(h):
        raw.append(0)
        raw += pixels[y * w * 4:(y + 1) * w * 4]
    idat = zlib.compress(bytes(raw), 9)
    with open(path, 'wb') as f:
        f.write(sig + chunk(b'IHDR', ihdr) + chunk(b'IDAT', idat) + chunk(b'IEND', b''))


def seg_dist(px, py, ax, ay, bx, by):
    dx, dy = bx - ax, by - ay
    L2 = dx * dx + dy * dy
    t = 0.0 if L2 == 0 else ((px - ax) * dx + (py - ay) * dy) / L2
    t = max(0.0, min(1.0, t))
    cx, cy = ax + t * dx, ay + t * dy
    return math.hypot(px - cx, py - cy)


def sample(nx, ny, square, cap_scale):
    """Return (r,g,b,a) for normalized point in [0,1]."""
    # background
    if square:
        bg = TEAL + (255,)
    else:
        r = 0.20
        # rounded-square SDF; outside -> transparent
        qx = abs(nx - 0.5) - (0.5 - r)
        qy = abs(ny - 0.5) - (0.5 - r)
        outside = math.hypot(max(qx, 0), max(qy, 0)) - r
        bg = TEAL + (255,) if outside <= 0 else (0, 0, 0, 0)

    # capsule endpoints (normalized), scaled toward center for maskable safe zone
    def sc(p):
        return 0.5 + (p - 0.5) * cap_scale
    ax, ay, bx, by = sc(0.33), sc(0.67), sc(0.67), sc(0.33)
    rcap = 0.135 * cap_scale
    d = seg_dist(nx, ny, ax, ay, bx, by)
    if d <= rcap:
        dx, dy = bx - ax, by - ay
        side = (nx - 0.5) * dx + (ny - 0.5) * dy
        col = WHITE if side < 0 else LIGHTBLUE
        # seam line across the middle (perpendicular to axis)
        Lh = math.hypot(dx, dy) / 2
        t = ((nx - ax) * dx + (ny - ay) * dy) / (dx * dx + dy * dy) * (2 * Lh)
        if abs(t - Lh) <= 0.016:
            col = SEAM
        return col + (255,)
    return bg


def render(size, square, cap_scale):
    buf = bytearray(size * size * 4)
    for y in range(size):
        for x in range(size):
            r = g = b = a = 0
            for sy in range(SS):
                for sx in range(SS):
                    nx = (x + (sx + 0.5) / SS) / size
                    ny = (y + (sy + 0.5) / SS) / size
                    pr, pg, pb, pa = sample(nx, ny, square, cap_scale)
                    # premultiply for correct edge AA
                    r += pr * pa; g += pg * pa; b += pb * pa; a += pa
            n = SS * SS
            a_avg = a / n
            if a_avg == 0:
                px = (0, 0, 0, 0)
            else:
                px = (round(r / a), round(g / a), round(b / a), round(a_avg))
            i = (y * size + x) * 4
            buf[i:i + 4] = bytes(px)
    return buf


jobs = [
    ("icon-192.png", 192, False, 1.0),
    ("icon-512.png", 512, False, 1.0),
    ("icon-maskable-512.png", 512, True, 0.78),
    ("apple-touch-icon-180.png", 180, True, 1.0),
]
for name, size, square, scale in jobs:
    write_png(name, size, size, render(size, square, scale))
    print("wrote", name)
