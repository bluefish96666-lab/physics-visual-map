# 高中物理图形化知识地图

按人教版 2019 高中物理教材（必修 1–3、选择性必修 1–3）整理的图形化学习网页：27 章、125 节，每章一张示意图，每节有要点和公式，可以勾选记录掌握进度。

## 使用

- 在线：开启 GitHub Pages 后访问仓库的 Pages 网址。
- 本地：双击 `index.html`，不需要联网或安装软件（PhET 链接除外）。

## 交互实验

- `labs/electric-field.html`：拖动电荷，实时看电场线、等势线、场强和电势。
- `labs/potential-work.html`：沿三条路径移动电荷，验证电场力做功与路径无关。
- `labs/capacitor.html`：电容器动态分析，对比 U 不变和 Q 不变。
- `labs/voltammetry.html`：伏安法测电阻，内接、外接误差与试触法。
- `labs/closed-circuit.html`：闭合电路欧姆定律、U–I 图线、输出功率；可换成热敏/光敏电阻（传感器）。
- `labs/magnetic-particle.html`：带电粒子在磁场中的运动，找圆心、旋转圆、放缩圆、磁聚焦。
- `labs/induction-rails.html`：导体棒切割磁感线，收尾速度与能量转化。
- `labs/ac-generator.html`：交变电流的产生，e–t 与 Φ–t 图像，峰值、有效值、平均值。
- `labs/power-transmission.html`：远距离输电，升压比与线路损耗。
- `labs/lc-oscillation.html`：LC 电磁振荡，电场能与磁场能的转化。

适合电脑和平板（横屏或竖屏），不针对手机排版。实验共用 `assets/lab.css` 和 `assets/lab.js`。

## 其他

- `electric_field.py`：用 matplotlib 生成 `figures/` 里的静态电场线图（需要 `pip install matplotlib numpy`）。
- 章节内容依据人教版 2019 目录整理，未与实体课本逐页核对，如有出入欢迎指正。
