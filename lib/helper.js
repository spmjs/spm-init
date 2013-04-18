var fs = require('fs');
var path = require('path');

/*
  Mkdirp
*/

exports.mkdirp = function (directory) {
  if (fs.existsSync(directory)) return;

  var arr = directory.split(path.sep);
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

exports.availableTemplates = function (initDir) {
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
