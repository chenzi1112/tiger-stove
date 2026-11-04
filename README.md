# 晋阳考古・虎形灶 — 3D 视差滚动专题页

春秋赵卿墓出土青铜虎形灶的数字展示站点：六章滚动叙事 + 可拆解三维模型 + 动手组装互动。

线上地址：<https://chenzi1112.github.io/tiger-stove/>

互动装配页：<https://chenzi1112.github.io/tiger-stove/assemble.html>

## 内容

- 六章叙事：首页 / 整体 / 结构 / 细节 / 价值 / 收尾
- Three.js 三维场景：随滚动改变构图、旋转、缩放与分件位置
- 12 个网格分件：灶体、口沿、烟道口、门框、浮雕、釜、甑、四节烟筒、提链
- 「自由观察」模式：拖动旋转、双指缩放，退出后恢复滚动叙事
- 移动端自动加载轻量模型（减面 + 更低分辨率纹理）
- **动手组装页**（`assemble.html`）：把釜、甑、四节烟筒、提链拖到金色位置自动吸附，
  支持点击安装、撤回一步、重新开始，可切换到单件观察模式
- 细节章可直接深链到组装页的单件视角：`assemble.html?detail=body|fu|zeng|pipe1|pipe2|pipe3|pipe4|chain`

## 目录

```
index.html                     专题页与文案（内容为 HTML，可被搜索引擎直接读取）
assemble.html                  动手组装 / 单件观察页
assets/                        构建后的 CSS / JS（含共享的 RoomEnvironment 分包）
models/tiger-stove-desktop.glb 桌面版模型（5.2 MB，约 30 万三角面）
models/tiger-stove-mobile.glb  移动版模型（2.4 MB，约 11 万三角面）
models/asset-report.json       模型优化报告
```

## 部署说明

本仓库为 `dist/` 构建产物的静态托管，GitHub Pages 从 `main` 分支根目录发布。

页面内所有资源均使用相对路径（`./assets/…`、`./models/…`），因此可放在任意子路径下访问。
从源码重新构建时，Vite 需设置 `base: './'`，模型加载路径以 `import.meta.env.BASE_URL`
拼接；否则会退化为绝对路径 `/assets/…`，在 `/<repo>/` 子路径下会 404。

## 说明与限制

按参考图制作，比例与未见表面存在推定，不代表实测复原；纹饰细节与设计稿存在差异。
组装页的吸附位置由现有模型接口自动推导，仅作组合关系示意，非考古装配规程。
资料线索：晋阳古城考古博物馆展陈、赵卿墓出土文物。
