"""点电荷电场线与等势线（k = 1 的约化单位）。

电场线：从电荷附近均匀撒点，用 streamplot 沿 E 双向积分。
等势线：V = Σ q_i / r_i 的等差等值线（相邻两条电势差相同）。
"""

from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np

plt.rcParams["font.sans-serif"] = ["Microsoft YaHei", "SimHei", "DejaVu Sans"]
plt.rcParams["axes.unicode_minus"] = False

L = 3.0
N = 600
CORE = 0.12
SEED_R = 0.18
LINES_PER_UNIT_CHARGE = 16

x = np.linspace(-L, L, N)
y = np.linspace(-L, L, N)
X, Y = np.meshgrid(x, y)


def field_and_potential(charges):
    Ex = np.zeros_like(X)
    Ey = np.zeros_like(X)
    V = np.zeros_like(X)
    near = np.zeros_like(X, dtype=bool)
    for q, (cx, cy) in charges:
        dx, dy = X - cx, Y - cy
        r = np.hypot(dx, dy)
        near |= r < CORE
        r = np.maximum(r, 1e-9)
        Ex += q * dx / r**3
        Ey += q * dy / r**3
        V += q / r
    Ex[near] = np.nan
    Ey[near] = np.nan
    V[near] = np.nan
    return Ex, Ey, V


def seeds(charges):
    pts = []
    for q, (cx, cy) in charges:
        n = int(round(abs(q) * LINES_PER_UNIT_CHARGE))
        ang = np.linspace(0, 2 * np.pi, n, endpoint=False) + np.pi / n
        pts.append(np.column_stack([cx + SEED_R * np.cos(ang), cy + SEED_R * np.sin(ang)]))
    return np.vstack(pts)


def draw(ax, charges, title, seed_charges=None, dv=0.5, vmax=4.0):
    Ex, Ey, V = field_and_potential(charges)

    ax.streamplot(
        X, Y, Ex, Ey,
        start_points=seeds(seed_charges or charges),
        color="#d62728", linewidth=1.1, arrowsize=1.1, density=10,
        integration_direction="both", broken_streamlines=False,
    )

    levels = np.arange(dv, vmax + dv / 2, dv)
    levels = np.concatenate([-levels[::-1], levels])
    if any(q > 0 for q, _ in charges) and any(q < 0 for q, _ in charges):
        levels = np.sort(np.append(levels, 0.0))
    ax.contour(X, Y, V, levels=levels, colors="#1f77b4", linestyles="--", linewidths=0.9)

    for q, (cx, cy) in charges:
        color = "#d62728" if q > 0 else "#1f77b4"
        ax.add_patch(plt.Circle((cx, cy), CORE, color=color, zorder=5))
        ax.text(cx, cy, "+" if q > 0 else "−", color="white", ha="center", va="center",
                fontsize=12, fontweight="bold", zorder=6)

    ax.set_xlim(-L, L)
    ax.set_ylim(-L, L)
    ax.set_aspect("equal")
    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_title(title, fontsize=13)


CASES = [
    ("point_positive", "正点电荷", [(+1, (0, 0))], None),
    ("point_negative", "负点电荷", [(-1, (0, 0))], None),
    ("dipole", "等量异种电荷", [(+1, (-1, 0)), (-1, (1, 0))], None),
    ("same_sign", "等量同种（正）电荷", [(+1, (-1, 0)), (+1, (1, 0))], None),
]


def legend(fig):
    from matplotlib.lines import Line2D
    handles = [
        Line2D([], [], color="#d62728", lw=1.4, label="电场线（箭头为场强方向）"),
        Line2D([], [], color="#1f77b4", lw=1.2, ls="--", label="等势线（相邻两条电势差相等）"),
    ]
    fig.legend(handles=handles, loc="lower center", ncol=2, frameon=False, fontsize=11)


def main():
    out = Path(__file__).parent / "figures"
    out.mkdir(exist_ok=True)

    fig, axes = plt.subplots(2, 2, figsize=(11, 11.6))
    for ax, (_, title, charges, seed_q) in zip(axes.flat, CASES):
        draw(ax, charges, title, seed_q)
    legend(fig)
    fig.tight_layout(rect=(0, 0.04, 1, 1), h_pad=2.5)
    fig.savefig(out / "electric_field_overview.png", dpi=150)
    plt.close(fig)

    for name, title, charges, seed_q in CASES:
        fig, ax = plt.subplots(figsize=(6, 6.5))
        draw(ax, charges, title, seed_q)
        legend(fig)
        fig.tight_layout(rect=(0, 0.06, 1, 1))
        fig.savefig(out / f"{name}.png", dpi=150)
        plt.close(fig)

    print(f"saved to {out}")


if __name__ == "__main__":
    main()
