---
sidebar_position: 1
---

# CoreMark：使用插件完成构建（以 LicheePi 4A 为例）

本示例以 CoreMark 为例，演示在插件中完成工具链安装、虚拟环境创建、源码解包、构建与运行的基本流程。详细说明参见 [使用 Ruyi 编译环境构建](/docs/Package-Manager/cases/case1)。

## 步骤

1. 打开 VS Code，点击侧边栏 **Ruyi** 图标进入插件主页。
2. 在 **Packages** 视图安装 `gnu-plct-xthead`。
3. 在 **Virtual Environments** 视图点击 `+` 创建虚拟环境：
   - Profile 选择 `sipeed-lpi4a`。
   - 工具链选择已安装的 `gnu-plct-xthead`。
   - （可选）选择模拟器。
   - 指定名称与路径，创建并点击名称激活。
4. 在资源管理器中右键目标目录，选择 **Extract RuyiSDK Package**，解包 `coremark` 源码。
5. 设置 coremark 源码中的编译配置信息(参考 coremark 仓库自述文档)

   ```bash input="2"
   # 按照coremark项目build指导修改gcc
   $ sed -i 's/\bgcc\b/riscv64-plctxthead-linux-gnu-gcc/g' linux64/core_portme.mak
   ```

6. 打开 VS Code 终端（继承激活环境的 PATH），进入 `coremark` 目录执行构建：

   ```bash input="2"
   # 交叉编译和构建，得到可执行程序 coremark.exe
   make PORT_DIR=linux64 link
   ```

7. 将生成的可执行程序传输到 LicheePi 4A 并运行（可用 `scp`、串口、NFS 等方式）。

## 备注

- 如需在本机模拟运行，请选择合适的 QEMU 模拟器并在终端运行。
- 设备刷机与镜像部署请参考包管理器案例文档（插件暂未提供刷机向导）。
