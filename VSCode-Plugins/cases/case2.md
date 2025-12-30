---
sidebar_position: 2
---

# Milkv Duo：使用插件完成构建与调试

本示例参考 IDE 文档，使用插件完成工具链安装与虚拟环境创建，并在 VS Code 内配合 SSH/gdbserver 进行运行与调试。

## 步骤

1. 打开 VS Code，点击侧边栏 **Ruyi** 图标进入插件主页。
2. 在 **Packages** 视图安装 `gnu-milkv-milkv-duo-musl-bin`。
3. 在 **Virtual Environments** 视图点击 `+` 创建虚拟环境：
   - Profile 选择 `milkv-duo`。
   - 工具链选择 `gnu-milkv-milkv-duo-musl-bin`。
   - 指定名称与路径，创建并点击名称激活。
4. 获取源码：在资源管理器右键目标目录选择 **Extract RuyiSDK Package** ，解包 `milkv-duo-examples` 示例源码。
5. 在 VS Code 终端（已激活虚拟环境）执行构建，或自行编写 VS Code 任务调用虚拟环境中的工具链；

6. 传输与运行：
   - 可用 `scp` 将目标程序传输到设备（参考 IDE 文档中 Makefile 的 `upload` 目标）。
   - 在 SSH 终端中运行目标程序，或配置 VS Code 的 "C/C++ Remote Application" 进行远程运行。

7. 调试：
   - 在设备端准备 `gdbserver` 并运行，例如：`gdbserver :2345 ./your_binary`。
   - 在主机端使用虚拟环境中的 `riscv64-unknown-linux-musl-gdb` 连接到设备：

```bash input="1,2"
riscv64-unknown-linux-musl-gdb ./your_binary
target remote <device-ip>:2345
```

## 备注

- 若需更完整的 IDE 配置与演示，请直接参考 [Milkv Duo IDE 开发流程](../../IDE/cases/milkv-duo-ide.md)。
