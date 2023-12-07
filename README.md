## 项目

心动厨房💓

## 环境需求

- Vue : 3.2.45
- Vite : 4.0.3
- Pinia : 2.0.33

## 项目开始

首先，需要安装uni-app配备的编译器

* HBuilderX 3.96

注意！每次需要打开文件根目录，若嵌套多层文件，会出现无法运行的状态

运行有两种方法，一种是npm，一种是直接点击运行，可以用内置浏览器

## 目录结构

### dist

软件发布打包，后期需要时再做研究

### node_modules

所需软件包模块

Ps：不要随便引入组件库或其他包，可能引发冲突，提前进行说明

### src

注意，所有的文件名命名均采用小驼峰法！

#### api

所有的接口都在这里写，注意书写格式。具体的业务逻辑在你的component中去设计，调用api即可

> 命名格式：name-api.js

#### components

存放页面需要用到的组件，提倡大家去提取出一些公共组件，防止一个页面过多堆积，难以管理

> 命名格式：name-component.vue

#### pages

单页面文件，大型页面都在这个文件中建立

> 命名格式：name.vue

#### static

存放静态资源，相应资源建立自己的文件夹进行存储

#### utils

> index.js

主要存放一些性能优化函数，例如防抖和节流，大家自行了解，积极使用

> request.js

封装后的RESTful API，一般不需要改动

### pages.json

路由配置文件，新的页面需要在这里进行路由配置

### 组件uview的安装
[教程链接](https://uiadmin.net/uview-plus/components/install.html)


