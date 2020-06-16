# 乐学勾选助手 / Lexue Completion Helper

本工具可自动勾选账号名下所有课程中任务的完成框。/ This tool is used to set all completion box in Lexue to 'yes'.

![image](https://share.ordosx.tech/completion-example.jpg)

## 使用须知

1. 自觉！没看过的视频、没完成的任务不要使用此工具！
2. 严禁商用！拿来恰烂钱的逢考必挂！

## 使用教程 / Tutorial

### 环境准备 / Preparing the Environment

首先到以下网址下载并安装node.js运行环境。/ First download and install node.js environment from the following link.

```
https://nodejs.org/en/download/
```

然后到以下网址下载并安装git。/ Then download and install git from the following link.

```
https://git-scm.com/
```

详细安装教程可以自行搜索。/ Plenty of tutorials are available on the Internet.

### 克隆源码并安装 / Clone the Source Code and Install

打开CMD或Powershell，输入以下命令克隆源代码。怎么输入命令请自行搜索。/ Open CMD or Powershell, clone source code with the following command. If you don't know how to input these command, search on the Internet.

```
git clone https://github.com/OrdosX/lexue-completion-helper.git
```

安装依赖。/ Install dependencies.

```
cd lexue-completion-helper
npm i
```

打开这个文件夹下的`.env`文件，在`BIT_ID=`后面填写用户名，`PASSWORD=`后面填写密码，就像你在登录乐学平台一样。/ Open `.env`, type your student ID in `BIT_ID=` and your password in `PASSWORD=`, like what you do when you are actually accessing Lexue platform. 

### 执行脚本 / Execute the Script

```
npm run start
```

然后登陆乐学检查，你的勾选框应该已经全部勾选上。/ Then check on Lexue. Your completion state should be marked.