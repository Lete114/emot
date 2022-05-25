<h1 align="center"><a href="https://github.com/Lete114/emot" target="_blank">Emot</a></h1>

<p align="center">
    <a href="https://github.com/Lete114/emot/releases/"><img src="https://img.shields.io/npm/v/emot?logo=npm" alt="Version"></a>
    <a href="https://github.com/Lete114/emot/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/emot?color=FF5531" alt="MIT License"></a>
</p>

## 简介

> 一个表情处理模块，支持 img 类型解析，输出两种格式的表情字符串

本项目借鉴源于 [OwO](https://github.com/DIYgod/OwO) ，其中 OwO 有些功能处理的不是很好，且 css 动画让表情一直抖动(感觉很兴奋的样子)，而且解析 img 类型表情直接注入 img 标签内容，我觉得不好，于是就造了这个轮子

核心逻辑处理代码提取于 [Discuss](https://github.com/discussjs/Discuss/blob/dev/src/client/view/submit.svelte) 评论系统的`submit.svelte`组件

## 安装

使用 npm:

```bash
npm install emot --save
```

使用 CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/emot"></script>
```

## 使用方法

在浏览器中使用

```html
<script src="https://cdn.jsdelivr.net/npm/emot"></script>
<script>
  const emot = new Emot({
    el: 'body', // 挂载dom (支持css选择器获取dom)
    target: 'textarea', // 目标输入容器 (支持css选择器获取dom)
    emotMaps: 'emot.json' // 自定义表情，可以是一个url，或一个对象
  })
  // 通过调用get()方法获取处理后的数据
  const result = emot.get()
  /* output:
  {
    content: '( =•ω•= )m[heo-鼓掌]',
    contentHTML: '( =•ω•= )m<img src=https://npm.elemecdn.com/discuss@0.3.1/assets/emot/鼓掌.png alt=heo-鼓掌/>'
    // 如果 emotMaps 在初始化的时候传入的是一个url，那么会多返回一个请求 emotMaps 结果
  }
  */
</script>
```

ESModule 模块

```js
import Emot from 'emot'
// 使用方法如上浏览器使用示例
```

CommonJS 模块

```js
const Emot = require('emot')
// 使用方法如上浏览器使用示例
```
