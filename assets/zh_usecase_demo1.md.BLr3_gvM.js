import{_ as s,c as i,o as a,a4 as e}from"./chunks/framework.DkV6eWGR.js";const u=JSON.parse('{"title":"使用示例","description":"","frontmatter":{},"headers":[],"relativePath":"zh/usecase/demo1.md","filePath":"zh/usecase/demo1.md","lastUpdated":1710171131000}'),l={name:"zh/usecase/demo1.md"},t=e(`<h1 id="使用示例" tabindex="-1">使用示例 <a class="header-anchor" href="#使用示例" aria-label="Permalink to &quot;使用示例&quot;">​</a></h1><p>以开源基准测试程序 coremark 为例，展示在x86_64 PC上实现从 ruyi 工具安装到使用 ruyi 工具搭建 RISC-V 的编译、模拟环境，完成 coremark 源码交叉编译并在 qemu 模拟器上成功执行的过程。</p><h2 id="环境说明" tabindex="-1">环境说明 <a class="header-anchor" href="#环境说明" aria-label="Permalink to &quot;环境说明&quot;">​</a></h2><p>硬件环境：x86_64</p><p>软件环境：ubuntu 22.04</p><h2 id="ruyi工具的安装" tabindex="-1">ruyi工具的安装 <a class="header-anchor" href="#ruyi工具的安装" aria-label="Permalink to &quot;ruyi工具的安装&quot;">​</a></h2><ol><li>[可选] 清除ruyi缓存</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ruyi</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> self</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> uninstall</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --purge</span></span></code></pre></div><ol start="2"><li>下载 ruyi 工具并为其赋可执行权限并配置到环境变量中：在<a href="https://github.com/ruyisdk/ruyi/releases/" target="_blank" rel="noreferrer">ruyi GitHub Releases</a> 或 <a href="https://mirror.iscas.ac.cn/ruyisdk/ruyi/releases/" target="_blank" rel="noreferrer">ISCAS 镜像源</a>下载最新的ruyi工具。</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/local/ruyi/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://mirror.iscas.ac.cn/ruyisdk/ruyi/testing/ruyi.amd64.20231211</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mv</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ruyi.amd64.20231107</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ruyi</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chmod</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +x</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ruyi</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> PATH</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/usr/local/ruyi:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$PATH</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $PATH</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span></span></code></pre></div><ol start="3"><li>验证ruyi可否使用</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ruyi</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --version</span></span></code></pre></div><ol start="4"><li>查看ruyi帮助</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ruyi</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --help</span></span></code></pre></div><h2 id="使用ruyi工具部署开发环境" tabindex="-1">使用ruyi工具部署开发环境： <a class="header-anchor" href="#使用ruyi工具部署开发环境" aria-label="Permalink to &quot;使用ruyi工具部署开发环境：&quot;">​</a></h2><ol start="5"><li>查看软件仓软件包索引信息</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ruyi</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span></code></pre></div><ol start="6"><li>查看详细信息</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ruyi</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -v</span></span></code></pre></div><ol start="7"><li>安装gnu：ruyi install <code>&lt;package-name&gt;</code></li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ruyi</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  gnu-upstream</span></span></code></pre></div><ol start="8"><li>安装qemu</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ruyi</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> qemu-user-riscv-upstream</span></span></code></pre></div><ol start="9"><li>查看预置编译环境</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ruyi</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> profiles</span></span></code></pre></div><ol start="10"><li>由指定的工具链、模拟器配置建立 RUYI 虚拟环境venv1</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ruyi</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> venv</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --help</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ruyi</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> venv</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -t</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gnu-upstream</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -e</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> qemu-user-riscv-upstream</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   generic</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  venv1</span></span></code></pre></div><ol start="11"><li>查看虚拟环境bin目录下已安装的工具链、模拟器</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  venv1/bin</span></span></code></pre></div><ol start="12"><li>激活虚拟环境</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>.  venv1/bin/ruyi-activate</span></span></code></pre></div><ol start="13"><li>检查虚拟环境中编译工具的版本信息</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">riscv64-unknown-linux-gnu-gcc</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --version</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ruyi-qemu</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --version</span></span></code></pre></div><ol start="14"><li>下载解压coremark源码作为编译对象</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> coremark</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> coremark</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ruyi</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> extract</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> coremark</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -al</span></span></code></pre></div><h2 id="交叉编译coremark" tabindex="-1">交叉编译coremark <a class="header-anchor" href="#交叉编译coremark" aria-label="Permalink to &quot;交叉编译coremark&quot;">​</a></h2><ol start="15"><li>设置coremark源码中的编译配置信息(参考coremark仓库自述文档)</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;s/\\bgcc\\b/riscv64-unknown-linux-gnu-gcc/g&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  linux64/core_portme.mak</span></span></code></pre></div><ol start="16"><li><p>执行交叉编译和构建，得到可执行程序coremark.exe</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> PORT_DIR=linux64</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> link</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -al</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    #新增可执行程序coremark.exe</span></span></code></pre></div></li><li><p>查看rv64可执行程序文件属性信息。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">file</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> coremark.exe</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 命令回显信息显示了文件的架构相关信息</span></span></code></pre></div></li></ol><h2 id="qemu-user-模式下运行-riscv64-coremark-可执行程序" tabindex="-1">qemu-user 模式下运行 riscv64 coremark 可执行程序 <a class="header-anchor" href="#qemu-user-模式下运行-riscv64-coremark-可执行程序" aria-label="Permalink to &quot;qemu-user 模式下运行 riscv64 coremark 可执行程序&quot;">​</a></h2><ol start="18"><li>qemu user模式下执行riscv64 coremark可执行程序</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ruyi-qemu</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   coremark.exe</span></span></code></pre></div><ol start="19"><li>退出虚拟环境</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ruyi-deactivate</span></span></code></pre></div>`,44),n=[t];function h(p,k,r,d,o,c){return a(),i("div",null,n)}const F=s(l,[["render",h]]);export{u as __pageData,F as default};
