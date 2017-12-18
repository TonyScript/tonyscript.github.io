---
layout: post
title:  "用 VSCode 写 Python"
image: ''
date:   2017-12-17
tags:
- 造作集
description: '备忘录'
categories:
- 人生苦短，先学为敬 
---
安装

打开 Python 的工程或者文件

VSCode 自动识别为 Python

在左下角调整 Python 版本，右下角选择文件编码以及语言模式

`Command + ,` 打开偏好设置文件，从左侧复制到右侧即可
首选项里可打开快捷键偏好设置文件，可直接修改

VSCode 默认按 `F5` 后需要再按一次F5程序才会运行，如果要按F5立即运行代码需要将 `launch.json` (调试 - 打开配置)文件的 `"stopOnEntry": true,` 改为 `"stopOnEntry": false,`

重头戏是插件，毕竟也是冲这个来的：

`Pylint`：VSCode 默认的语法检查工具是 `Pylint`，在终端用 `pip3 install -U Pylint` 安装好即可使用。除此之外还有官方出的 `flake8` 也是语法检查工具，`pip3 install flake8`，然后在偏好设置文件右边加上 `"python.linting.flake8Enabled": true,` 即可

`Python`： V0.9.0 微软出的 Python 的语法检查、自动补全、自动缩进、代码格式化、调试、运行等等，必备

`Code Runner`：VSCode 默认执行 Python 代码的快捷键是 F5，而且要连按两下（可以在设置里修改）。。。安装了这个之后，工具栏上方出现一个执行按钮，也可以用快捷键 Ctrl + optin + N 执行，而且支持自定义，😁快捷键都在系统的快捷键设置里，直接改为 Command + R 回车就OK了！

`Python Docstring`： 自动生成注释文档，因为烦人的 Pylint 检查才装的。。。使用方法是`"""`回车,不过好像会自动在空行之间补充一些空格，然后被`Pylint`报一堆缩进错误。。。宛若zz。。。

`Python Extended`：自动补全方方法名称和参数，而且可以用 Tab 切换输入，跟 Xcode 自带的差不多

`Python for VSCode` ：语法高亮、代码块及语法检查，跟微软出的相比好像有点多余了。。。

`Python-autopep8`：终端里 `pip3 install --upgrade autopep8`，然后在 VSCode 里 `Command + shift + P` ，回车。除了这个还有 `yapf，pip3 install yapf`，然后在设置里加入`"python.formatting.provider": "yapf"`

`vscode-icons`：能根据文件格式自动补全文件 `icon`，美观

其他的插件可以在 [Visual Studio Marketplace](https://marketplace.visualstudio.com/search?term=Python&target=VSCode&category=All%20categories&sortBy=Downloads) 找到

自定义快捷键修改(在快捷键设置里搜锁)

Run：`Command + R`

Debug：`Command + D`

显示隐藏控制台：`Command + G`

显示隐藏活动栏：`Command + E`

显示隐藏侧边栏：`Command + B`

从当前行中间切换到下一行：`Command + return`

直接删除某一行：`Command + Shift + K`

自动生成 HTML 文档结构：先输入 `!` 然后 `Tab`

复制当前行：`option + shift + ↓`

光标移至行位：`Command + →`

选中光标后面的内容：`Command + shift + →`
