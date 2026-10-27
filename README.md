# 高中物理图形化知识地图

按人教版 2019 高中物理教材（必修 1–3、选择性必修 1–3）整理的图形化学习网页：27 章、125 节，每章一张示意图，每节有要点和公式，可以勾选记录掌握进度。

## 使用

- 在线：开启 GitHub Pages 后访问仓库的 Pages 网址。
- 本地：双击 `index.html`，不需要联网或安装软件（PhET 链接除外）。

## 交互实验

每个实验都有"高考题型"一键预设，右侧面板给出随参数实时更新的解题过程。

力学：

- `labs/chase.html`：追及相遇，共速时距离最值、刹车陷阱、反应时间；v-t 面积与 x-t 交点。
- `labs/equilibrium.html`：动态平衡，图解法（挡板转动）、相似三角形、晾衣绳活结。
- `labs/block-board.html`：板块模型与传送带，自动分段分析受力、共速、相对位移和摩擦生热。
- `labs/projectile.html`：平抛与斜抛，频闪分解、tanα = 2tanθ、斜面平抛、擦网临界。
- `labs/circular-motion.html`：竖直圆周运动的绳模型与杆模型、汽车过拱桥、火车转弯。
- `labs/satellite.html`：卫星的 v、T 与轨道半径，同步卫星与赤道物体，变轨，双星。
- `labs/vehicle-power.html`：机车以恒定功率和恒定加速度两种方式启动。
- `labs/collision.html`：弹性与非弹性碰撞、弹簧连接体、子弹打木块。

电学：

- `labs/electric-field.html`：拖动电荷，实时看电场线、等势线、场强和电势。
- `labs/potential-work.html`：沿三条路径移动电荷，验证电场力做功与路径无关。
- `labs/capacitor.html`：电容器动态分析，对比 U 不变和 Q 不变。
- `labs/voltammetry.html`：伏安法测电阻，内接、外接误差与试触法。
- `labs/closed-circuit.html`：闭合电路欧姆定律、U–I 图线、输出功率；可换成热敏/光敏电阻（传感器）。
- `labs/charged-particle.html`：调节磁场、速度、质量和电荷，观察带电粒子的圆周运动。
- `labs/magnetic-particle.html`：带电粒子在磁场中的运动，找圆心、旋转圆、放缩圆、磁聚焦。
- `labs/induction-rails.html`：导体棒切割磁感线，收尾速度与能量转化。
- `labs/ac-generator.html`：交变电流的产生，e–t 与 Φ–t 图像，峰值、有效值、平均值。
- `labs/power-transmission.html`：远距离输电，升压比与线路损耗。
- `labs/lc-oscillation.html`：LC 电磁振荡，电场能与磁场能的转化。

适合电脑和平板（横屏或竖屏），不针对手机排版。实验共用 `assets/lab.css` 和 `assets/lab.js`。

## 其他

- `electric_field.py`：用 matplotlib 生成 `figures/` 里的静态电场线图（需要 `pip install matplotlib numpy`）。
- 章节内容依据人教版 2019 目录整理，未与实体课本逐页核对，如有出入欢迎指正。
