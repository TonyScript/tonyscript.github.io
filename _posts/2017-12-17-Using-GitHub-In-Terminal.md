---
layout: post
title:  "在 Mac 上使用终端配置 GitHub 账号"
image: ''
date:   2017-12-17
tags:
- 造作集
description: '备忘录'
categories:
- 人生苦短，先学为敬 
---

![Git-Logo-1788C.png](https://i.loli.net/2017/12/16/5a341f103d027.png)
人生不能重来，但 Git 可以。
Git 是目前最流行和最好用的版本控制系统，尤其以强大的[分支](https://blog.coding.net/blog/about-git)功能著称。在 Mac 上使用 Git 也非常方便，只须在`终端`稍做配置即可。
1. 打开终端，执行下面命令进入到 `.ssh` 文件夹目录下：

```
cd .ssh
```

![WX20171216-203150@2x.png](https://i.loli.net/2017/12/16/5a35170a6c2ca.png)
2. 在 `.ssh` 目录下执行下面代码, 生成 `SSH` 公钥，可以一直回车直到结束，也可以输入密码，一般留空：

```
ssh-keygen -t rsa -C "GitHub 邮箱地址"
```

![WX20171216-205130@2x.png](https://i.loli.net/2017/12/16/5a35170b7a752.png)
3. 进入 `.ssh` 目录查看刚才生成的`testgit`和`testgit.pub`应该已经存在：
![WX20171216-205626@2x.png](https://i.loli.net/2017/12/16/5a351804a9176.png) 
4. 既然公钥已经存在，下一步就是把公钥放到服务器上，执行下面的命令，将公钥复制到剪贴板：

```
pbcopy < ~/.ssh/testgit.pub
```

5. 打开 `GitHub` 设置里的 `SSH and GPG Keys`页面，然后新建一个 `SSH Key`， Title 一般取设备名称，然后将刚在复制的公钥粘贴到 Key 下面：
![WX20171216-210129@2x.png](https://i.loli.net/2017/12/16/5a351abd8bbd9.png)
6. 至此，我们新增的 Key 还是灰色的，接着执行下面的命令用于测试你的账号是否已经与 GitHub 连接，然后回到 GitHub 刚才添加 `SSH Key`的界面刷新，可以发现钥匙变绿了，说明我们的添加已经生效了，可以在终端里愉快地使用 Git 了：

```
ssh -T git@github.com
```

![WX20171216-211829@2x.png](https://i.loli.net/2017/12/16/5a351d2f8e1c9.png)
![WX20171216-210417@2x.png](https://i.loli.net/2017/12/16/5a351be71d372.png)![WX20171216-210402@2x.png](https://i.loli.net/2017/12/16/5a351be71e869.png)

7. 如果在本地文件夹 init 了一个 repo， 怎么连接到 GitHub 上呢：
[![本地仓库与远程仓库合并.png](https://i.loli.net/2017/12/19/5a38becbae631.png)](https://i.loli.net/2017/12/19/5a38becbae631.png)


8. 如果同一台电脑有2个 GitHub 账号怎么办？取消全局设置，给每个仓库单独设置用户名和密码：取消global;设置每个repo自己的user.email

```
git config --global --unset user.name
git config --global --unset user.email
```

```
git config  user.email "xyz@xyz.com"
git config  user.name "xyz"
```

