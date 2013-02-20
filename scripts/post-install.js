#!/usr/bin/env node

var spm = require('spm');
spm.plugin.install({
  name: 'init',
  binary: 'spm-init',
  description: 'init a template'
});
