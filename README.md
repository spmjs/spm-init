# Spm init 

[![Build Status](https://travis-ci.org/spmjs/spm-init.png?branch=master)](https://travis-ci.org/spmjs/spm-init) [![Coverage Status](https://coveralls.io/repos/spmjs/spm-init/badge.png?branch=master)](https://coveralls.io/r/spmjs/spm-init)

spm-init is a scaffolding tool used to automate project creation.

---

## Install

```
npm install spm-init -g
```

## Usage

```
spm-init [template]
```

If you have installed [spm2](https://github.com/spmjs/spm2):

```
spm init [template]
```

## Template

The default template path is `~/.spm/init`, you can config `~/.spm/spmrc`

```
[init]
template = ~/.spm-init
```

Install a template:

if git url is `git://github.com/aralejs/template-arale.git`, you can

```
spm-init --install aralejs/template-arale
```

### Create a template

spm-init is compatible with grunt-init, get more information at [grunt project scaffolding](http://gruntjs.com/project-scaffolding).

### Manage template

- update

  fetch [index.json](https://raw.github.com/spmjs/spm-init/master/index.json) from server which include global template.

- install

  install template 

  ```
  $ spm-init --install aralejs/template-arale.git

  // alias defined in index.json
  $ spm-init --install arale
  ```

- list

  show templates in index.json

- upgrade

  upgrade templates

  ```
  $ spm-init --upgrade arale
  ```

### Available templates

- [Arale](https://github.com/aralejs/template-arale)
- [Alice](https://github.com/aralejs/template-alice/tree/spm2)
- [spm plugin](https://github.com/spmjs/template-spmplugin)

