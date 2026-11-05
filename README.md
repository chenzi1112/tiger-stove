# 晋阳考古・数字展厅

两件春秋青铜器的三维数字专题：**虎形灶**（赵卿墓，随行炊具）与 **鸟尊**（青铜凝羽，一尊生姿）。

线上地址：<https://chenzi1112.github.io/tiger-stove/>

## 页面

| 页面 | 内容 |
| --- | --- |
| `index.html` | 数字展厅首页：三维文物转盘，拖动或点击切换虎形灶 / 鸟尊，进入对应专题 |
| `tiger.html` | 虎形灶专题：六章滚动叙事 + 可拆解三维模型 + 自由观察 |
| `bird.html` | 鸟尊专题：六章滚动叙事 + 三维模型 + 细节观察 |
| `assemble.html` | 动手组装：把釜、甑、四节烟筒、提链拖到金色位置吸附安装 |

展厅与专题之间通过 `?select=tiger|bird`、`?from=gallery` 传递当前选中的文物，返回展厅时保持选中状态。

## 交互要点

- 展厅转盘可左右拖动、点击文物或用方向键切换；每件文物对应一个「进入专题」入口
- 虎形灶专题：滚动驱动构图与分件位置，结构章可跳转组装页，细节章可深链到单件视角
  （`assemble.html?detail=body|fu|zeng|pipe1|pipe2|pipe3|pipe4|chain`）
- 组装页七件归位后触发完成态：金色余烬上浮、模型缓慢自转，并弹出完成卡片
- 完成卡片可生成 **1080×1350（4:5）分享图**（模型实时渲染 + 标题 + 二维码 + 站点地址）；
  卡片内可编辑一句分享文案（默认「两千五百年前，一灶烟火随行」），该句会画进海报并作为系统分享正文
- 移动端自动加载轻量模型（减面 + 更低分辨率纹理）

## 目录

```
index.html / tiger.html / bird.html / assemble.html   四个页面
assets/                                               构建后的 CSS / JS（按页面与共享模块分包）
bird/chain.webp, bird/handle.webp                     鸟尊细节图
models/tiger-stove-desktop.glb   5.0 MB   虎形灶桌面版
models/tiger-stove-mobile.glb    2.3 MB   虎形灶移动版
models/bird-zun-desktop.glb      5.3 MB   鸟尊桌面版
models/bird-zun-mobile.glb       3.0 MB   鸟尊移动版
models/*-asset-report.json                    模型优化报告
qr-share.png                                  分享图右下角二维码
og-gallery.jpg / og-tiger.jpg / og-bird.jpg   社交分享封面（1200×630）
```

分享封面通过 `og:image` / `twitter:image` 引用，必须写绝对地址；当前写死为
`https://chenzi1112.github.io/tiger-stove/`，若绑定自定义域名需同步修改三个页面的 meta。

## 部署说明

本仓库为构建产物的静态托管，GitHub Pages 从 `main` 分支根目录发布，页面内资源全部使用相对路径
（`./assets/…`、`./models/…`），因此放在任意子路径下都能访问。

从源码重新构建时，Vite 需设置 `base: './'`，模型加载路径用 `import.meta.env.BASE_URL` 拼接；
否则会退化为绝对路径 `/assets/…`，在 `/<repo>/` 子路径下 404。

> 展厅首页按优先级加载：先只下载当前选中文物（桌面约 5 MB），可用后立即渲染，
> 另一件在第一帧之后空闲预取；开启省流量模式（`navigator.connection.saveData`）时，
> 另一件完全按需下载，选择到它时才请求。

## 说明与限制

按参考图与项目模型制作，比例与未见表面存在推定，不代表实测复原；纹饰细节与设计稿存在差异。
组装页的吸附位置由现有模型接口自动推导，仅作组合关系示意，非考古装配规程。
资料线索：晋阳古城考古博物馆展陈、赵卿墓出土文物。
