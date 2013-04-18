var fs = require('fs');
var path = require('path');
var spmrc = require('spmrc');

/*
  Mkdirp
*/

exports.mkInitDir = function () {
  if (fs.existsSync(initDir)) return;

  var arr = initDir.split(path.sep);
  for (var i = 2, l = arr.length; i <= l; i++) {
    var p = arr.slice(0, i).join(path.sep);
    if (fs.existsSync(p)) continue;
    fs.mkdirSync(p);
  }
};

/*
  Test is empty object
*/

exports.isEmptyObject = function (obj) {
  for (var name in obj) {
    return false;
  }
  return true;
};

/*
  Print 2 column
*/

exports.writeTable = function (templates) {
  for (var template in templates) {
    var row = ['    '];
    row.push(template);
    for (var i = 0, l = 15 - template.length; i < l; i++ ) {
      row.push(' ');
    }
    row.push(templates[template].description);
    console.log(row.join(''));
  }
};

/*
  Get available templates
  should have template.js and exports.template
*/

exports.availableTemplates = function () {
  var templates = {}, t = fs.readdirSync(initDir);
  for (var i in t) {
    var template = t[i];
    var p = path.join(initDir, template);
    var templateJs = path.join(p, 'template.js');
    if (fs.existsSync(templateJs)) {
      var o = require(templateJs);
      if (o.template) {
        var desc = o.description || '';
        templates[template] = {
          description: desc,
          directory: p
        };
      }
    }
  }
  return templates;
};

/*
  Get init directory
*/

var homeDir = process.env.HOME || process.env.USERPROFILE;
var defaultDir = path.join(homeDir, '.spm', 'init');
var initDir = (spmrc.get('init.template') || defaultDir).replace(/^~/, homeDir);
exports.initDir = initDir;
