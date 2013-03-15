# Spm init

spm 初始化命令

---

## 安装

```
npm install spm-init -g
```

## 使用

```
spm-init [template]
```

如果已经安装 [spm2](https://github.com/spmjs/spm2) 可运行

```
spm init [template]
```

## 安装模板

模板文件默认路径为 `~/.spm/init`，可以通过配置（`~/.spm/spmrc`）修改

```
[init]
template = ~/.spm-init
```

安装模板时将模板下载到 `~/.spm/init`

```
git clone git://github.com/aralejs/template-arale.git --branch spm2 ~/.spm/init/arale
```


## 自定义模板

spm-init 完全兼容 grunt-init，所以你可以用 [grunt 的模板](http://gruntjs.com/project-scaffolding#installing-templates)。

自定义模板可参照 [grunt 文档](http://gruntjs.com/project-scaffolding#custom-templates)
