---
layout: post
title:  "写给iOS程序员的ionic入门教程"
image: ''
date:   2017-03-16
tags:
- 造作集
description: '写给iOS程序员的系列教程之（一）'
categories:
- 人生苦短，先学为敬 
---

![](http://upload-images.jianshu.io/upload_images/1243365-09a841926c1c8498?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

自从 iOS 开发和 Android 开发诞生以来，使用一套代码部署到两个平台，就成为很多开发者奋斗的目标。然而前几年由于各种因素，这种想法并为成为现实，起码没有一个普遍被开发者接受的解决方案。随着这几年移动平台硬件性能的快速提升，加之HTML5、CSS3、ES6的出现和流行，出现了一些比较优秀的以前端技术为基础的混合开发框架，ionic便是其中之一。

## 一

学习一门技术，最好的方式就是去官网撸官方文档。ionic [官网](http://ionicframework.com/) 对自己的介绍如下：
> The top open source framework for building amazing mobile apps.<br/>Ionic is the beautiful, free and open source mobile SDK for developing native and progressive web apps with ease.

官方给自己定位很清楚，开源免费的移动平台开发框架。不过这个自封的「顶级」，会不会给人一种钦定的感觉？话说回来，ionic 作为一个纯粹基于前端技术的框架，写写页面和逻辑还行，一旦涉及到有关 Native 的一些操作，基本就只能沉默以对了。这时候便轮到 Cordova 华丽出场了。

## 二 

[Cordova](https://cordova.apache.org/) 与 ionic 一样，也是一个开源的移动开发框架，不过属于 Apache 旗下的开源项目。它的出现，使得开发者可以仅仅使用前端技术开发跨平台的移动项目。说到这你可能要问了，既然也是基于前端技术的混合开发框架，那它跟 ionic 有毛区别？

区别就在于，Cordova 完成了混合开发最重要的一环：打通了前端与 Native 层的各种交互。通过 Cordova 的各种 [插件](https://cordova.apache.org/plugins/?platforms=cordova-ios)，你可以像原生开发一样，调用各种系统功能，比如打电话、拍照、访问扬声器、定位、甚至使用 TouchID 等本来原生代码才可以调用的功能。而 ionic 做的工作，就是把本来需要用前端代码写的原生控件和方法，做了一个还不错的风格统一和逻辑封装。也即是说，Cordova 完成了与 Native 层的交互和通信，ionic 完成了移动端页面的布局和互动。不得不说，前端的小伙伴们真是太有福了，只管拿过来写就行了。下图是 Cordova 的架构。

![Cordova 的架构](http://upload-images.jianshu.io/upload_images/1243365-06c42f47b918e1c1?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 三

通过前面铺垫的内容，我们终于可以真正进入到 ionic 的开发中来。首先，我们需要在 Mac 上安装 ionic，在终端输入如下命令：
> npm install -g cordova ionic

其中，**npm** 全拼为 Node Package Manager，是 Node.js 的包管理工具，主要功能是管理 Node 各种包的安装、更新、卸载、升级等功能。所以执行这行命令之前我们需要先在 Node.js [官网](https://nodejs.org/en/) 下载最新稳定版（推荐）的安装包，安装到电脑上之后，就可以在终端执行上面的命令了。 **-g** 这个参数的意思是 globally，全局安装。Cordova、ionic 是需要安装的包。

另外，现在最新的 ionic 版本是2.x，跟1.x区别还是挺大的，所以一定要注意自己安装的版本。做完这些之后，我们就完成了开发 ionic 所需要做的准备工作。正所谓上手一门语言最快的的方法就是写个 Hello World，下面我们就来做一个 ionic 的 Hello World！

## 四

打开终端，输入 
> ionic start --v2 HelloWorld sidemenu

上面的命令为我们自动创建了一个 SideMenu 模板的应用框架，我们在此基础上进行开发即可。创建完成之后，cd 到 HelloWorld 文件夹目录下，运行 ionic serve，如果运行成功，终端会自动为我们打开浏览器运行刚才创建的程序。运行效果如下图所示:

![ionic 的 SideMenu 应用模板](http://upload-images.jianshu.io/upload_images/1243365-84878a87aa911d6a?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

从外观上看，整体风格与一代差距还是挺大的，总的来说是变得相对来说更加美观了一些。想当初我第一次看到运行在浏览器上的 ionic 应用，心想这什么玩意，这也能叫 APP ？尽管 V2 版本还是有很多不尽如人意的地方，但已经可以看见明显在进步了。从实现方式上来说，ionic V2 版本将 AngularJS V1 替换成了 AngularJS V2 版本，差别还是挺大的。

## 五

![](http://upload-images.jianshu.io/upload_images/1243365-0610f4d43f961816?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

ionic 的构成总的来说分为三个部分：[UI Components](http://ionicframework.com/docs/v2/components/)、[API](http://ionicframework.com/docs/v2/api/)、[Ionic Native](http://ionicframework.com/docs/v2/native/).

UI Components 是 ionic 官方出的高仿原生控件的 UI 组件库，V1 版本名称叫做 CSS Components，只是名称变了。API 是 JavaScript API，使用 JS 封装了很多在 iOS 开发中常用的方法。 Ionic Native 顾名思义是访问 Native 层时所需要的一些插件。

至此，ionic 差不多就入门了，想要进一步深入学习的话就去官方网站看文档吧。国内虽然有所谓的 ionic 中文网之类的论坛，但是翻译质量十分堪忧，而且经常滞后，不如不看。说到这里就要赞一下 ionic 官网文档做得非常全面而且详细，各种开发辅助手到擒来，对开发者可以说是肥肠友好了。

这次先写这么多，以后会接着更新 ionic 其他方面的内容。


