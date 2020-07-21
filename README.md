# 乐学勾选助手

**由于乐学改版，本工具可能无法正常使用**

本工具可自动勾选账号名下所有课程中任务的完成框。

![image](https://share.ordosx.tech/completion-example.jpg)

## 使用须知

1. 自觉！没看过的视频、没完成的任务不要使用此工具！
2. 严禁商用！拿来恰烂钱的逢考必挂！

## 使用教程

### 环境准备

首先到以下网址下载并安装node.js运行环境。

```
https://nodejs.org/en/download/
```

然后到以下网址下载并安装git。

```
https://git-scm.com/
```

详细安装教程可以自行搜索。

### 克隆源码并安装

打开CMD或Powershell，输入以下命令克隆源代码。怎么输入命令请自行搜索。

```
git clone https://github.com/OrdosX/lexue-completion-helper.git
```

安装依赖。

```
cd lexue-completion-helper
npm i
```

打开这个文件夹下的`.env`文件，在`BIT_ID=`后面填写用户名，`PASSWORD=`后面填写密码，就像你在登录乐学平台一样。

### 执行脚本

```
npm run start
```

然后登陆乐学检查，你的勾选框应该已经全部勾选上。