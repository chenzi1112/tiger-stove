# 晋阳考古・数字展厅

三件文物的三维数字专题：**虎形灶**（春秋・赵卿墓）、**鸟尊**（青铜凝羽）、**镇墓兽**（北齐・陶塑三件）。 

线上地址：<https://chenzi1112.github.io/tiger-stove/>

## 页面

| 页面 | 内容 |
| --- | --- |
| `index.html` | 数字展厅首页：三维文物转盘，拖动或点击切换虎形灶 / 鸟尊 / 镇墓兽，进入对应专题 |
| `tiger.html` | 虎形灶专题：六章滚动叙事 + 可拆解三维模型 + 自由观察 |
| `bird.html` | 鸟尊专题：六章滚动叙事 + 三维模型 + 细节观察 |
| `guardians.html` | 镇墓兽专题：三件北齐陶塑的形制、彩绘与护佑寓意 |
| `bird-game.html` | 互动工坊・鸟尊「寻纹识器」：旋转文物，找出羽纹、提梁、器盖与鸟首 |
| `guardians-game.html` | 互动工坊・镇墓兽「辨相归位」：把三件文物的形貌说明拖到对应个体 |
| `assemble.html` | 动手组装：把釜、甑、四节烟筒、提链拖到金色位置吸附安装 |

展厅与专题之间通过 `?select=tiger|bird|guardians`、`?from=gallery` 传递当前选中的文物，
返回展厅时保持选中状态。

## 交互要点

- 展厅转盘可左右拖动、点击文物或用方向键切换；每件文物对应一个「进入专题」入口
- 虎形灶专题：滚动驱动构图与分件位置，结构章可跳转组装页，细节章可深链到单件视角
  （`assemble.html?detail=body|fu|zeng|pipe1|pipe2|pipe3|pipe4|chain`）
- 组装页七件归位后触发完成态：金色余烬上浮、模型缓慢自转，并弹出完成卡片
- 完成卡片可生成 **1080×1350（4:5）分享图**（模型实时渲染 + 标题 + 二维码 + 站点地址）；
  卡片内可编辑一句分享文案（默认「两千五百年前，一灶烟火随行」），该句会画进海报并作为系统分享正文
- 展厅右上「互动工坊」弹窗汇总两局小游戏；也可从鸟尊 / 镇墓兽专题内的入口进入，两局之间可互相跳转
- 两局小游戏完成后可生成 **1080×1350 分享海报**（模型实时渲染 + 成绩 + 二维码 + 站点地址），
  移动端走系统分享，桌面端下载 PNG
- 移动端自动加载轻量模型（减面 + 更低分辨率纹理）

## 目录

```
index.html / tiger.html / bird.html / guardians.html   展厅与三个专题
bird-game.html / guardians-game.html                   互动工坊小游戏
assemble.html                                          虎形灶动手组装
assets/                                              构建后的 CSS / JS（按页面与共享模块分包）
bird/*.webp, guardians/*.webp                        鸟尊与镇墓兽的细节图
models/tiger-stove-desktop.glb   4.5 MB   虎形灶桌面版
models/tiger-stove-mobile.glb    2.1 MB   虎形灶移动版
models/bird-zun-desktop.glb      5.3 MB   鸟尊桌面版
models/bird-zun-mobile.glb       3.0 MB   鸟尊移动版
models/guardians-desktop.glb    11.0 MB   镇墓兽桌面版（三件合并）
models/guardians-mobile.glb      6.1 MB   镇墓兽移动版
models/*-asset-report.json                    模型优化报告
qr-share.png                                  分享图右下角二维码
og-gallery.jpg / og-tiger.jpg / og-bird.jpg / og-guardians.jpg              社交分享封面
og-bird-game.jpg / og-guardians-game.jpg                                   小游戏分享封面（均 1200×630）
```

分享封面通过 `og:image` / `twitter:image` 引用，必须写绝对地址；当前写死为
`https://chenzi1112.github.io/tiger-stove/`，若绑定自定义域名需同步修改四个页面的 meta。

## 部署说明

本仓库为构建产物的静态托管，GitHub Pages 从 `main` 分支根目录发布，页面内资源全部使用相对路径
（`./assets/…`、`./models/…`），因此放在任意子路径下都能访问。

从源码重新构建时，Vite 需设置 `base: './'`，模型加载路径用 `import.meta.env.BASE_URL` 拼接；
否则会退化为绝对路径 `/assets/…`，在 `/<repo>/` 子路径下 404。

> 展厅首页按优先级加载：先只下载当前选中文物，可用后立即渲染，其余文物在第一帧之后空闲预取；
> 开启省流量模式（`navigator.connection.saveData`）时完全按需下载。
> 三件桌面模型合计约 20.8 MB，弱网下首屏只等其中一件（约 5 MB）。

## 说明与限制

按参考图与项目模型制作，比例与未见表面存在推定，不代表实测复原；纹饰细节与设计稿存在差异。
组装页的吸附位置由现有模型接口自动推导，仅作组合关系示意，非考古装配规程。
资料线索：晋阳古城考古博物馆展陈、赵卿墓出土文物、北齐陶塑镇墓兽。
