# Spm init

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

The default template path is `~/.spm/init`, you can config `~/.spm/spmrc`:

```
[init]
template = ~/.spm-init
```

Install a template:

```
git clone git://github.com/aralejs/template-arale.git --branch spm2 ~/.spm/init/arale
```

### Create a template

spm-init is compatible with grunt-init, get more information at [grunt project scaffolding](http://gruntjs.com/project-scaffolding).
