// 每章一张示意图，viewBox 240×150
(() => {
  const C = { red: '#dc2626', blue: '#2563eb', green: '#16a34a', orange: '#ea580c', purple: '#9333ea', gray: '#6b7280', ink: '#111827', teal: '#0d9488', light: '#dbeafe' };

  function arrow(x1, y1, x2, y2, color = C.ink, w = 2, head = 7) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
    const bx = x2 - ux * head, by = y2 - uy * head;
    const px = -uy * head * 0.5, py = ux * head * 0.5;
    return `<line x1="${x1}" y1="${y1}" x2="${bx}" y2="${by}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>` +
      `<polygon points="${x2},${y2} ${bx + px},${by + py} ${bx - px},${by - py}" fill="${color}"/>`;
  }
  const t = (x, y, s, color = C.ink, size = 11, anchor = 'middle', weight = 'normal') =>
    `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" text-anchor="${anchor}" font-weight="${weight}" dominant-baseline="middle">${s}</text>`;
  const line = (x1, y1, x2, y2, color = C.ink, w = 1.5, dash = '') =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  const circle = (cx, cy, r, fill = 'none', stroke = C.ink, w = 1.5, dash = '') =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  const path = (d, color = C.ink, w = 1.8, fill = 'none', dash = '') =>
    `<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''} stroke-linejoin="round"/>`;
  const axes = (x0, y0, x1, y1, xl, yl) =>
    arrow(x0, y0, x1, y0, C.gray, 1.3, 6) + arrow(x0, y0, x0, y1, C.gray, 1.3, 6) +
    t(x1 - 2, y0 + 10, xl, C.gray, 10, 'end') + t(x0 + 6, y1 + 2, yl, C.gray, 10, 'start');
  const fn = (f, a, b, n, X, Y) => {
    let d = '';
    for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; d += (i ? 'L' : 'M') + X(x).toFixed(1) + ' ' + Y(f(x)).toFixed(1); }
    return d;
  };
  const crosses = (x0, y0, x1, y1, step, color = C.gray) => {
    let s = '';
    for (let x = x0; x <= x1; x += step) for (let y = y0; y <= y1; y += step) s += t(x, y, '×', color, 10);
    return s;
  };

  const FIG = {
    displacement: () =>
      path('M30 115 Q 70 0 205 55', C.gray, 1.8, 'none', '5 4') +
      arrow(30, 115, 205, 55, C.blue, 2.5) +
      circle(30, 115, 4, C.ink, C.ink) + circle(205, 55, 4, C.ink, C.ink) +
      t(22, 128, '初位置', C.ink, 10) + t(212, 42, '末位置', C.ink, 10) +
      t(80, 26, '路程 s：轨迹的长度', C.gray, 11) +
      t(140, 108, '位移 x：初 → 末的有向线段', C.blue, 11, 'middle', 'bold') +
      t(120, 142, '|x| ≤ s，单向直线运动时相等', C.ink, 10),

    vt: () =>
      `<polygon points="35,125 35,95 195,38 195,125" fill="${C.light}"/>` +
      axes(35, 125, 225, 12, 't', 'v') +
      line(35, 95, 195, 38, C.blue, 2.5) +
      t(28, 95, 'v₀', C.ink, 10, 'end') + line(195, 38, 195, 125, C.gray, 1, '3 3') + t(203, 38, 'v', C.ink, 10, 'start') +
      t(115, 105, '面积 = 位移 x', C.blue, 11, 'middle', 'bold') +
      t(95, 50, '斜率 = 加速度 a', C.orange, 11, 'middle', 'bold') +
      t(120, 143, 'v = v₀ + at，x = v₀t + ½at²', C.ink, 10),

    incline: () =>
      `<polygon points="20,132 222,132 222,52" fill="#f3f4f6" stroke="${C.ink}" stroke-width="1.5"/>` +
      path('M52 132 A 32 32 0 0 0 49.7 120', C.ink, 1.2) + t(60, 124, 'θ', C.ink, 11) +
      `<rect x="107" y="64" width="38" height="22" fill="#fde68a" stroke="${C.ink}" stroke-width="1.3" transform="rotate(-21.6 126 75)"/>` +
      arrow(126, 75, 126, 124, C.red, 2.2) + t(134, 118, 'G', C.red, 11, 'start', 'bold') +
      arrow(126, 75, 111, 38, C.blue, 2.2) + t(104, 36, 'F_N', C.blue, 11, 'end', 'bold') +
      arrow(126, 75, 162, 61, C.green, 2.2) + t(168, 56, 'f', C.green, 11, 'start', 'bold') +
      t(60, 18, '受力分析：重力、弹力、摩擦力', C.ink, 10, 'start'),

    fma: () =>
      line(15, 112, 225, 112, C.ink, 2) +
      `<rect x="92" y="76" width="52" height="36" fill="#fde68a" stroke="${C.ink}" stroke-width="1.3"/>` +
      arrow(144, 94, 200, 94, C.orange, 2.5) + t(205, 94, 'F', C.orange, 12, 'start', 'bold') +
      arrow(92, 104, 58, 104, C.green, 2.2) + t(52, 104, 'f', C.green, 12, 'end', 'bold') +
      arrow(98, 62, 150, 62, C.purple, 2.2) + t(156, 62, 'a', C.purple, 12, 'start', 'bold') +
      t(120, 28, 'F合 = ma', C.ink, 15, 'middle', 'bold') +
      t(120, 135, 'a 的方向与合力方向相同', C.ink, 10),

    projectile: () =>
      line(20, 132, 225, 132, C.gray, 1) + line(25, 30, 25, 132, C.gray, 1) +
      path('M25 30 Q 120 30 215 130', C.ink, 2) + arrow(25, 30, 60, 30, C.blue, 2) + t(42, 20, 'v₀', C.blue, 10) +
      circle(139, 66, 4, C.ink, C.ink) +
      arrow(139, 66, 184, 66, C.blue, 2) + t(190, 66, 'vₓ = v₀', C.blue, 10, 'start') +
      arrow(139, 66, 139, 100, C.green, 2) + t(132, 104, 'v_y = gt', C.green, 10, 'end') +
      arrow(139, 66, 181, 93, C.red, 2.4) + t(186, 98, 'v', C.red, 11, 'start', 'bold') +
      t(130, 143, '水平匀速 + 竖直自由落体', C.ink, 10),

    circle: () =>
      circle(120, 80, 48, 'none', C.gray, 1.5, '4 3') + circle(120, 80, 2.5, C.ink, C.ink) +
      line(120, 80, 120, 32, C.gray, 1, '3 3') + t(126, 58, 'r', C.gray, 10, 'start') +
      circle(120, 32, 6, C.orange, C.ink) +
      arrow(120, 32, 66, 32, C.blue, 2.4) + t(60, 32, 'v', C.blue, 12, 'end', 'bold') +
      arrow(126, 38, 126, 66, C.red, 2.4) + t(150, 52, 'F_n、a_n', C.red, 10, 'start', 'bold') +
      t(150, 64, '指向圆心', C.red, 10, 'start') +
      t(120, 142, 'F_n = mv²/r = mω²r', C.ink, 11, 'middle', 'bold'),

    orbit: () =>
      circle(80, 74, 58, 'none', C.gray, 1.2, '4 3') + circle(80, 74, 38, 'none', C.gray, 1.2, '4 3') +
      circle(80, 74, 20, '#93c5fd', C.blue) + t(80, 74, '中心天体', C.ink, 9) +
      circle(118, 74, 4.5, C.orange, C.ink) + circle(121, 33, 4.5, C.orange, C.ink) +
      arrow(114, 74, 101, 74, C.red, 1.8, 6) +
      t(146, 30, 'GMm/r² = mv²/r', C.ink, 10, 'start', 'bold') +
      t(150, 52, '轨道越高：', C.ink, 10, 'start') +
      t(150, 68, 'v、ω、a 越小', C.blue, 10, 'start') +
      t(150, 84, 'T 越大', C.red, 10, 'start') +
      t(150, 110, 'v₁ = 7.9 km/s', C.ink, 10, 'start') +
      t(150, 126, '（第一宇宙速度）', C.gray, 9, 'start'),

    energy: () =>
      line(10, 135, 230, 135, C.ink, 1.5) +
      path('M15 38 C 60 38, 80 128, 125 128 S 195 75, 228 75', C.ink, 2.2) +
      circle(26, 31, 7, C.orange, C.ink) +
      line(26, 40, 26, 135, C.gray, 1, '3 3') + t(32, 92, 'h', C.gray, 11, 'start') +
      circle(125, 121, 7, C.orange, C.ink) + arrow(133, 121, 168, 121, C.blue, 2) + t(150, 111, 'v 最大', C.blue, 10) +
      t(150, 30, '只有重力做功时', C.ink, 10) +
      t(150, 46, 'E_k + E_p = 常量', C.ink, 12, 'middle', 'bold'),

    charges: () =>
      [['M88 74 L152 74'], ['M85 67 Q120 38 155 67'], ['M85 81 Q120 110 155 81'], ['M83 62 Q120 4 157 62'], ['M83 86 Q120 144 157 86']]
        .map(([d]) => path(d, C.red, 1.5)).join('') +
      arrow(116, 74, 124, 74, C.red, 1.5, 6) + arrow(116, 52.5, 124, 52.5, C.red, 1.5, 6) + arrow(116, 95.5, 124, 95.5, C.red, 1.5, 6) +
      arrow(64, 74, 22, 74, C.red, 1.5, 6) + arrow(218, 74, 176, 74, C.red, 1.5, 6) +
      circle(75, 74, 11, C.red, C.red) + t(75, 75, '+', '#fff', 15, 'middle', 'bold') +
      circle(165, 74, 11, C.blue, C.blue) + t(165, 75, '−', '#fff', 15, 'middle', 'bold') +
      t(120, 143, 'F = kq₁q₂/r²，E = F/q', C.ink, 11, 'middle', 'bold'),

    plates: () =>
      `<rect x="20" y="15" width="7" height="110" fill="${C.red}"/><rect x="213" y="15" width="7" height="110" fill="${C.blue}"/>` +
      [35, 65, 95].map(y => arrow(30, y, 210, y, 'rgba(220,38,38,.45)', 1.3, 6)).join('') +
      [70, 120, 170].map(x => line(x, 15, x, 125, C.blue, 1.2, '4 4')).join('') +
      t(70, 8, '高 φ', C.blue, 9) + t(170, 8, '低 φ', C.blue, 9) +
      path('M60 50 Q 120 120 180 80', C.purple, 2) + circle(60, 50, 4, C.ink, C.ink) + circle(180, 80, 4, C.ink, C.ink) +
      t(52, 42, 'A', C.ink, 11, 'end', 'bold') + t(188, 72, 'B', C.ink, 11, 'start', 'bold') +
      t(120, 142, 'W_AB = qU_AB，匀强电场 U = Ed', C.ink, 11, 'middle', 'bold'),

    circuit: () =>
      path('M30 40 H210 V115 H30 Z', C.ink, 1.8) +
      `<rect x="62" y="32" width="40" height="16" fill="#fff" stroke="${C.ink}" stroke-width="1.6"/>` + t(82, 58, 'R₁', C.ink, 11) +
      `<rect x="138" y="32" width="40" height="16" fill="#fff" stroke="${C.ink}" stroke-width="1.6"/>` + t(158, 58, 'R₂', C.ink, 11) +
      path('M128 40 V14 H149 M167 14 H188 V40', C.ink, 1.4) + circle(128, 40, 2.5, C.ink, C.ink) + circle(188, 40, 2.5, C.ink, C.ink) +
      circle(158, 14, 9, '#fff', C.ink) + t(158, 14, 'V', C.ink, 10, 'middle', 'bold') +
      `<rect x="22" y="64" width="16" height="26" fill="#fff" stroke="none"/>` +
      line(18, 70, 42, 70, C.ink, 2.2) + line(24, 82, 36, 82, C.ink, 3.5) + t(50, 76, 'E', C.ink, 11, 'start') +
      circle(120, 115, 11, '#fff', C.ink) + t(120, 115, 'A', C.ink, 11, 'middle', 'bold') +
      t(120, 140, '电流表串联，电压表并联；I = U/R', C.ink, 10),

    closed: () =>
      path('M18 35 H100 V115 H18 Z', C.ink, 1.6) +
      `<rect x="10" y="58" width="32" height="34" fill="none" stroke="${C.gray}" stroke-dasharray="3 3"/>` +
      `<rect x="12" y="62" width="12" height="26" fill="#fff"/>` + line(10, 68, 26, 68, C.ink, 2) + line(13, 78, 23, 78, C.ink, 3.2) +
      t(33, 66, 'E', C.ink, 10) + t(33, 84, 'r', C.ink, 10) +
      `<rect x="92" y="62" width="16" height="30" fill="#fff" stroke="${C.ink}" stroke-width="1.6"/>` + t(118, 77, 'R', C.ink, 11, 'start') +
      axes(140, 125, 232, 18, 'I', 'U') +
      line(140, 40, 220, 118, C.blue, 2.4) + t(134, 40, 'E', C.blue, 11, 'end', 'bold') +
      t(196, 62, '|斜率| = r', C.orange, 10) +
      t(120, 143, 'I = E/(R + r)，U = E − Ir', C.ink, 11, 'middle', 'bold'),

    magnet: () =>
      path('M160 68 C 200 10, 40 10, 80 68', C.blue, 1.4) + path('M160 82 C 200 140, 40 140, 80 82', C.blue, 1.4) +
      path('M162 64 C 230 -20, 10 -20, 78 64', C.blue, 1.2) + path('M162 86 C 230 170, 10 170, 78 86', C.blue, 1.2) +
      arrow(124, 25, 116, 25, C.blue, 1.4, 6) + arrow(124, 125, 116, 125, C.blue, 1.4, 6) +
      `<rect x="80" y="64" width="40" height="22" fill="${C.blue}"/><rect x="120" y="64" width="40" height="22" fill="${C.red}"/>` +
      t(100, 75, 'S', '#fff', 13, 'middle', 'bold') + t(140, 75, 'N', '#fff', 13, 'middle', 'bold') +
      t(228, 14, 'Φ = BS', C.ink, 11, 'end', 'bold') +
      t(12, 14, '外部 N → S', C.blue, 10, 'start'),

    collision: () =>
      t(14, 38, '碰前', C.gray, 10, 'start') + t(14, 102, '碰后', C.gray, 10, 'start') +
      line(10, 70, 230, 70, '#e5e7eb', 1) +
      circle(70, 38, 13, '#fdba74', C.ink) + t(70, 38, 'm₁', C.ink, 10) + arrow(85, 38, 125, 38, C.blue, 2.2) + t(105, 27, 'v₁', C.blue, 10) +
      circle(165, 38, 13, '#a5b4fc', C.ink) + t(165, 38, 'm₂', C.ink, 10) + t(165, 58, '静止', C.gray, 9) +
      circle(95, 102, 13, '#fdba74', C.ink) + t(95, 102, 'm₁', C.ink, 10) + arrow(110, 102, 128, 102, C.blue, 2.2) + t(119, 91, 'v₁′', C.blue, 10) +
      circle(178, 102, 13, '#a5b4fc', C.ink) + t(178, 102, 'm₂', C.ink, 10) + arrow(193, 102, 228, 102, C.blue, 2.2) + t(210, 91, 'v₂′', C.blue, 10) +
      t(120, 140, 'm₁v₁ = m₁v₁′ + m₂v₂′', C.ink, 11, 'middle', 'bold'),

    shm: () =>
      `<rect x="12" y="12" width="6" height="40" fill="${C.gray}"/>` +
      path('M18 32 l8 -8 l8 16 l8 -16 l8 16 l8 -16 l8 16 l8 -8 h8', C.ink, 1.4) +
      `<rect x="90" y="20" width="26" height="24" fill="#fde68a" stroke="${C.ink}" stroke-width="1.3"/>` +
      line(10, 44, 230, 44, C.gray, 1) + line(80, 8, 80, 56, C.green, 1, '3 3') + t(80, 62, '平衡位置', C.green, 9) +
      axes(20, 105, 228, 68, 't', 'x') +
      path(fn(x => Math.sin(x), 0, 4 * Math.PI, 80, x => 20 + x / (4 * Math.PI) * 196, y => 105 - y * 26), C.blue, 2) +
      t(120, 143, 'x = A sin(ωt + φ)，F = −kx', C.ink, 11, 'middle', 'bold'),

    wave: () =>
      line(15, 72, 228, 72, C.gray, 1) +
      path(fn(x => Math.sin(x), 0, 4 * Math.PI, 100, x => 18 + x / (4 * Math.PI) * 200, y => 72 - y * 30), C.teal, 2.2) +
      line(43, 34, 143, 34, C.ink, 1) + line(43, 30, 43, 38, C.ink, 1) + line(143, 30, 143, 38, C.ink, 1) +
      t(93, 26, 'λ', C.ink, 12, 'middle', 'bold') +
      arrow(170, 120, 222, 120, C.red, 2.2) + t(196, 132, '传播方向 v', C.red, 10) +
      circle(168, 72, 4, C.ink, C.ink) + arrow(168, 67, 168, 46, C.blue, 2) + t(176, 54, '此刻向上振动', C.blue, 9, 'start') +
      t(70, 132, 'v = λf', C.ink, 12, 'middle', 'bold'),

    refraction: () =>
      `<rect x="0" y="75" width="240" height="75" fill="#e0f2fe"/>` + line(0, 75, 240, 75, C.ink, 1.5) +
      line(120, 10, 120, 145, C.gray, 1, '4 3') + t(200, 66, '空气', C.gray, 10) + t(200, 88, '玻璃', C.gray, 10) +
      arrow(55, 15, 118, 73, C.orange, 2.4) + arrow(120, 75, 150, 140, C.orange, 2.4) +
      line(120, 75, 185, 15, 'rgba(234,88,12,.35)', 1.6, '4 3') +
      t(108, 46, 'θ₁', C.ink, 11) + t(128, 104, 'θ₂', C.ink, 11) +
      t(10, 108, 'n = sinθ₁ / sinθ₂', C.ink, 11, 'start', 'bold') +
      t(10, 126, '全反射：sin C = 1/n', C.ink, 10, 'start'),

    lorentz: () =>
      crosses(20, 14, 220, 134, 20, '#9ca3af') +
      circle(120, 76, 46, 'none', C.purple, 1.6, '5 4') +
      circle(120, 122, 7, C.red, C.red) + t(120, 123, '+', '#fff', 11, 'middle', 'bold') +
      arrow(128, 122, 172, 122, C.blue, 2.4) + t(178, 122, 'v', C.blue, 12, 'start', 'bold') +
      arrow(120, 114, 120, 84, C.orange, 2.4) + t(126, 96, 'F', C.orange, 12, 'start', 'bold') +
      `<rect x="146" y="8" width="90" height="46" fill="rgba(255,255,255,.9)"/>` +
      t(150, 20, 'qvB = mv²/r', C.ink, 10, 'start', 'bold') + t(150, 34, 'r = mv/(qB)', C.ink, 10, 'start') + t(150, 48, 'T = 2πm/(qB)', C.ink, 10, 'start'),

    rails: () =>
      crosses(55, 50, 215, 110, 20, '#9ca3af') +
      line(30, 38, 225, 38, C.ink, 2) + line(30, 120, 225, 120, C.ink, 2) +
      line(30, 38, 30, 62, C.ink, 2) + line(30, 96, 30, 120, C.ink, 2) +
      `<rect x="22" y="62" width="16" height="34" fill="#fff" stroke="${C.ink}" stroke-width="1.6"/>` + t(46, 79, 'R', C.ink, 11, 'start') +
      line(150, 32, 150, 126, C.orange, 4) +
      arrow(156, 79, 196, 79, C.blue, 2.4) + t(202, 79, 'v', C.blue, 12, 'start', 'bold') +
      arrow(142, 104, 142, 56, C.red, 2) + t(136, 60, 'I', C.red, 12, 'end', 'bold') +
      t(120, 143, 'E = BLv；楞次定律：阻碍变化', C.ink, 11, 'middle', 'bold'),

    ac: () =>
      axes(20, 75, 228, 10, 't', 'u') + line(20, 75, 20, 140, C.gray, 1.3) +
      path(fn(x => Math.sin(x), 0, 4 * Math.PI, 100, x => 20 + x / (4 * Math.PI) * 196, y => 75 - y * 52), C.blue, 2.2) +
      line(20, 23, 228, 23, C.gray, 1, '3 3') + t(228, 15, 'U_m', C.ink, 10, 'end') +
      line(20, 38.2, 228, 38.2, C.orange, 1.5, '6 3') + t(228, 48, 'U = U_m/√2', C.orange, 10, 'end', 'bold') +
      t(120, 143, 'e = E_m sin ωt，E_m = nBSω', C.ink, 11, 'middle', 'bold'),

    lc: () =>
      path('M20 30 H70 M20 30 V100 H70 M110 30 H70 M110 100 H70', C.ink, 1.6) +
      line(58, 56, 82, 56, C.ink, 2.2) + line(58, 66, 82, 66, C.ink, 2.2) + path('M70 30 V56 M70 66 V100', C.ink, 1.6) + t(90, 61, 'C', C.ink, 11, 'start') +
      path('M20 40 c10 0 10 8 0 8 c10 0 10 8 0 8 c10 0 10 8 0 8 c10 0 10 8 0 8', C.ink, 1.6) + t(38, 64, 'L', C.ink, 11, 'start') +
      axes(125, 70, 232, 16, 't', 'q') +
      path(fn(x => Math.cos(x), 0, 4 * Math.PI, 80, x => 125 + x / (4 * Math.PI) * 100, y => 70 - y * 40), C.purple, 2) +
      t(120, 132, 'T = 2π√(LC)', C.ink, 13, 'middle', 'bold'),

    sensor: () => {
      const box = (x, label, sub, color) =>
        `<rect x="${x}" y="45" width="62" height="44" rx="6" fill="#fff" stroke="${color}" stroke-width="2"/>` +
        t(x + 31, 61, label, color, 11, 'middle', 'bold') + t(x + 31, 77, sub, C.gray, 9);
      return box(8, '非电学量', '温度/光/力', C.orange) + arrow(72, 67, 88, 67, C.ink, 1.8, 6) +
        box(89, '传感器', '敏感元件', C.blue) + arrow(153, 67, 169, 67, C.ink, 1.8, 6) +
        box(170, '电学量', '电压/电阻', C.green) +
        t(120, 118, 'NTC 热敏电阻：温度升高，电阻减小', C.ink, 10) +
        t(120, 134, '光敏电阻：光照增强，电阻减小', C.ink, 10);
    },

    ep_r: () =>
      axes(35, 66, 228, 10, 'r', 'E_p') +
      path('M44 12 C 52 90, 64 112, 86 112 C 112 112, 140 80, 225 69', C.red, 2.2) +
      line(86, 66, 86, 112, C.gray, 1, '3 3') + t(86, 58, 'r₀', C.ink, 11) +
      circle(86, 112, 3.5, C.ink, C.ink) +
      t(140, 108, 'r = r₀ 时 E_p 最小', C.red, 10, 'start', 'bold') +
      t(140, 124, '分子力为零', C.gray, 10, 'start') +
      t(120, 143, '温度是分子平均动能的标志', C.ink, 10),

    pv: () =>
      axes(30, 125, 228, 12, 'V', 'p') +
      path(fn(V => 900 / V, 9, 95, 60, V => 30 + V * 2, p => 125 - p), C.blue, 2) +
      path(fn(V => 1600 / V, 15, 95, 60, V => 30 + V * 2, p => 125 - p), C.red, 2) +
      t(212, 110, 'T₁', C.blue, 11, 'start', 'bold') + t(212, 96, 'T₂', C.red, 11, 'start', 'bold') +
      t(150, 36, 'pV = C（等温）', C.ink, 11, 'middle', 'bold') + t(150, 52, 'T₂ > T₁', C.gray, 10) +
      t(120, 143, 'pV/T = C', C.ink, 11, 'middle', 'bold'),

    piston: () =>
      path('M70 25 V115 H150 V25', C.ink, 2.2) +
      `<rect x="72" y="50" width="76" height="10" fill="${C.gray}"/>` + line(110, 50, 110, 20, C.gray, 3) +
      [[85, 75], [100, 95], [125, 72], [138, 100], [92, 105], [118, 88]].map(([x, y]) => circle(x, y, 2.5, C.blue, C.blue)).join('') +
      arrow(110, 140, 110, 120, C.red, 2.4) + t(118, 136, 'Q 吸热', C.red, 10, 'start', 'bold') +
      arrow(160, 48, 160, 22, C.green, 2.2) + t(166, 34, '对外做功', C.green, 10, 'start') + t(166, 48, 'W < 0', C.green, 10, 'start') +
      t(198, 96, 'ΔU = Q + W', C.ink, 12, 'middle', 'bold') +
      t(198, 112, '外界做功 W 为正', C.gray, 9),

    levels: () => {
      const lv = [[1, -13.6, 130], [2, -3.4, 62], [3, -1.51, 40], [4, -0.85, 30]];
      let s = line(40, 14, 175, 14, C.gray, 1, '3 3') + t(180, 14, 'n=∞  0 eV', C.gray, 9, 'start');
      for (const [n, E, y] of lv) s += line(40, y, 175, y, C.ink, 1.6) + t(180, y, `n=${n}  ${E} eV`, C.ink, 9, 'start');
      s += arrow(70, 40, 70, 60, C.red, 1.8, 6) + arrow(100, 40, 100, 128, C.purple, 1.8, 6) + arrow(130, 62, 130, 128, C.purple, 1.8, 6);
      s += t(64, 50, '可见光', C.red, 9, 'end') + t(140, 98, '紫外', C.purple, 9, 'start');
      return s + t(108, 145, 'hν = E_m − E_n', C.ink, 11, 'middle', 'bold');
    },

    decay: () => {
      const nuc = [[70, 70, 1], [80, 62, 0], [62, 60, 0], [86, 75, 1], [58, 78, 1], [74, 84, 0], [66, 92, 1], [84, 90, 0], [92, 64, 1], [52, 68, 0], [78, 50, 1], [60, 48, 0]];
      let s = nuc.map(([x, y, p]) => circle(x, y, 7, p ? '#fca5a5' : '#d1d5db', C.ink, 0.8)).join('');
      s += arrow(110, 70, 160, 60, C.ink, 2);
      s += [[178, 52, 1], [190, 52, 0], [178, 64, 0], [190, 64, 1]].map(([x, y, p]) => circle(x, y, 6, p ? '#fca5a5' : '#d1d5db', C.ink, 0.8)).join('');
      s += t(184, 82, 'α 粒子 ⁴₂He', C.ink, 10);
      s += circle(18, 16, 5, '#fca5a5', C.ink, 0.8) + t(27, 16, '质子', C.gray, 9, 'start');
      s += circle(60, 16, 5, '#d1d5db', C.ink, 0.8) + t(69, 16, '中子', C.gray, 9, 'start');
      return s + t(120, 122, '质量数、电荷数守恒', C.ink, 11, 'middle', 'bold') + t(120, 140, 'ΔE = Δmc²', C.ink, 11, 'middle', 'bold');
    },
  };

  window.figureSVG = (key, cls = '') => {
    const body = FIG[key] ? FIG[key]() : '';
    return `<svg class="${cls}" viewBox="0 0 240 150" xmlns="http://www.w3.org/2000/svg" font-family="Microsoft YaHei, PingFang SC, sans-serif">${body}</svg>`;
  };
})();
