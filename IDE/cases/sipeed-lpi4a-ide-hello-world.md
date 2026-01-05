# Sipeed Lichee Pi 4A: 在 RuyiSDK IDE 中构建 Hello World 项目

## 测试环境

操作系统: Ubuntu 22.04.5 x86_64
IDE: Eclipse IDE for Embedded C/C++ Developers 2025.12

## 使用 IDE 安装 Ruyi 包管理器

启动 IDE，展开顶部菜单栏的 "RuyiSDK"，单击 "Ruyi Installation" 打开 Ruyi 安装向导，按照指引操作。完成安装后展开菜单栏的 "File"，单击 "Restart" 重启 IDE 。

![ruyi-installation](image/sipeed-lpi4a-ide-hello-world/ruyi-installation.jpg)

## 在 IDE 中创建 C/C++ 项目

启动 IDE，依次展开顶部菜单栏的 "File" - "New"，在 "C/C++ Project" 窗口中单击 "Classic C++ Project" 向导。

![new-project-0-templates](image/sipeed-lpi4a-ide-hello-world/new-project-0-templates.jpg)

在 "New Classic C++ Project" 页面的 "Project type" 中选择 "Executable" - "Hello World RISC-V C++ Project"，"Toolchains" 选择 "RISC-V Cross GCC"。

![new-project-1-type-selection](image/sipeed-lpi4a-ide-hello-world/new-project-1-type-selection.jpg)

清空 "Basic Settings" 页面中提供的链接器参数 "Linker other options"。

![new-project-2-basic-settings](image/sipeed-lpi4a-ide-hello-world/new-project-2-basic-settings.jpg)

在 "GNU RISC-V Cross Toolchain" 页面不需要做任何配置，直接单击 "Finish"。

![new-project-3-toolchain](image/sipeed-lpi4a-ide-hello-world/new-project-3-toolchain.jpg)

此时该项目可能无法构建。

## 为新项目创建虚拟环境

展开顶部菜单栏的 "RuyiSDK"，单击 "Venv (Virtual Environments)" 打开 "Ruyi Venv" 视图。

![menu-ruyi-venv-view](image/sipeed-lpi4a-ide-hello-world/menu-ruyi-venv-view.jpg)

单击视图中的 "New virtual environment..." 打开 "New virtual environment" 窗口。在 "Profiles" 中选择 "sipeed-lpi4a"；在 "Toolchains" 中选择最新的 "gnu-plct-xthead"；勾选 "Emulators" 右侧的 "Enable" 并选择最新的 "qemu-user-riscv-xthead"。完成各项选择后，单击 "Next >"。

![new-venv-0-conf](image/sipeed-lpi4a-ide-hello-world/new-venv-0-conf.jpg)

确认 "Summary" 中的信息无误后，在 "Venv Name" 中为新的虚拟环境起名，在 "Venv Path" 中选择刚才创建的项目的路径。完成各项信息填写后，单击 "Finish"。

![new-venv-1-location](image/sipeed-lpi4a-ide-hello-world/new-venv-1-location.jpg)

稍等片刻，窗口自动关闭，"Ruyi Venv" 视图的表格中出现刚才创建的虚拟环境。

## 应用虚拟环境并构建项目

在 "Ruyi Venv" 视图的表格中选择刚才的虚拟环境，单击 "Apply to Project"。

![venv-application](image/sipeed-lpi4a-ide-hello-world/venv-application.jpg)

在 "Project Explorer" 中右键单击刚才的项目，单击 "Build Project"。

![project-building](image/sipeed-lpi4a-ide-hello-world/project-building.jpg)

项目构建成功，生成扩展名为 ".elf" 的可执行程序。

## 使用 QEMU 运行构建出的程序

目前只能手动执行程序，用户可按需修改命令。

在 "Project Explorer" 中右键单击刚才的项目，展开 "Show in Local Terminal"，单击 "Terminal" 打开终端并执行下列命令：

    ```bash input="1,2,4"
    $ source ./.venv/bin/ruyi-activate
    «Ruyi .venv» $ ruyi-qemu ./Debug/hello-risc5.elf
    Hello RISC-V World!
    «Ruyi .venv» $
    ```

![terminal-execution](image/sipeed-lpi4a-ide-hello-world/terminal-execution.jpg)

程序执行成功。
