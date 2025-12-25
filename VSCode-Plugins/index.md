---
sidebar_position: 1
---

# 功能概览

- 软件包管理：在 VS Code 侧边栏浏览/搜索/安装/卸载 Ruyi 软件包。
- 虚拟环境：用向导创建并激活 Ruyi venv，终端与构建工具自动继承环境。
- 新闻与状态栏：状态栏入口查看新闻，指示并切换当前虚拟环境。
- 源码包提取：资源管理器右键快速下载解包官方示例/源码包。

    ![alt text](./image/image-1.png)

详细操作请跳转“使用说明”各子页面（[软件包](packages)、[虚拟环境](venv)、[新闻](news)、[源码包提取](extract)）。


## 界面要点

- 入口：侧边栏 Activity Bar 的 **Ruyi** 图标包含 Packages 与 Virtual Environments 视图；底部状态栏显示当前虚拟环境与新闻入口。
- 虚拟环境：在列表点击虚拟环境即可激活，随后内置终端、CMake/Meson 构建会继承 PATH 与交叉编译配置（对应 venv 目录中的 toolchain.cmake、meson-cross.ini 等）。

## 开发流程示例

以下示例演示借助插件在 VS Code 中完成最小的 RISC-V 交叉编译与运行流程，便于快速上手。

### Hello World：使用插件完成最小交叉编译与运行

1. Packages 视图安装 `gnu-upstream` 工具链，（可选安装 `qemu-user-riscv-upstream`，用于本机模拟运行）。
2. Virtual Environments 视图 `+` 选择 Profile `generic`，工具链选择 `gnu-upstream`，指定名称与路径创建并激活虚拟环境。
3. 在工作区新建 `hello.c`，内容如下：

```c
#include <stdio.h>
int main() {
    printf("Hello, RuyiSDK!\n");
    return 0;
}
```

4. 打开 VS Code 终端（已激活 venv），执行编译与运行：

```bash input="2,4,5"
# （可选）设置 PYTHONPATH，指向 pipx 安装的 ruyi 包路径
export PYTHONPATH=/path/to/pipx/venvs/ruyi/lib/python3.x/site-packages:$PYTHONPATH

riscv64-unknown-linux-gnu-gcc hello.c -o hello
ruyi-qemu ./hello
```

输出 `Hello, RuyiSDK!` 表示构建与运行成功。

![alt text](./image/image.png)

#### 说明

- 若不使用 QEMU，可将可执行程序部署到目标设备上运行，部署方式参考各设备官方文档或相关案例。
- 更复杂的构建（如 CoreMark）请参考 [CoreMark（以 LicheePi 4A 为例）](./cases/case1.md)。

## 更多信息

- 插件仓库与问题反馈：[https://github.com/ruyisdk/ruyisdk-vscode-extension](https://github.com/ruyisdk/ruyisdk-vscode-extension)
- RuyiSDK 官网：[https://ruyisdk.org/](https://ruyisdk.org/)
