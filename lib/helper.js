var fs = require('fs');
var path = require('path');
var spmrc = require('spmrc');
var url = require('url');
var https = require('https');
var Table = require('cli-table');

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
  var table = new Table({
    chars: {
      'top': '',
      'top-mid': '',
      'top-left': '',
      'top-right': '',
      'bottom': '',
      'bottom-mid': '',
      'bottom-left': '',
      'bottom-right': '',
      'left': '',
      'left-mid': '',
      'mid': '',
      'mid-mid': '',
      'right': '',
      'right-mid': ''
    },
    style: {
      'padding-left': 4
    }
  });
  for (var template in templates) {
    table.push([template, templates[template].description, templates[template].repo || '']);
  }
  return table.toString();
};

/*
  Get available templates
  should have template.js and exports.template
  {
    arale: {
      description: '',
      directory: ''
    }
  }
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

var INDEX = 'https://raw.github.com/spmjs/spm-init/master/index.json';
var INDEX_FILE = path.join(initDir, 'index.json');
exports.getIndex = function(force, callback) {
  if (arguments.length === 1 &&
    Object.prototype.toString.call(force) !== '[object Boolean]') {
    callback = force;
    force = false;
  }

  callback || (callback = function() {});

  var local;
  if (fs.existsSync(INDEX_FILE)) {
    try {
      local = require(INDEX_FILE);
    } catch (e) {
      console.log();
      console.log('  Wrong Format: '.to.cyan.bold.color + INDEX_FILE);
    }
  }

  // more than one day
  var diff = local ? Math.floor((new Date().getTime() - local['_timestamp'])/86400000) : 0;

  if (force === true || !local || diff >= 1 ) {
    https.get(url.parse(INDEX), function(res) {
      res.on('data', function(data) {
        var j = JSON.parse(data.toString());
        j['_timestamp'] = new Date().getTime();
        fs.writeFile(INDEX_FILE, JSON.stringify(j), function (err) {
          if (err) {
            console.log()
          }
          callback(j);
        });
      });
    });
  } else {
    callback(local);
  }
};

exports.log = function(str) {
  console.log();
  console.log('  ' + str);
}

// return [dir, repo]
exports.getName = function(name) {
  var local;
  try {
    local = require(INDEX_FILE);
  } catch (e) {
    exports.log('Wrong Format: '.to.cyan.bold.color + INDEX_FILE);
    exports.log('  Refetch it use ' + 'spm-init --update'.to.magenta.bold.color);
  }

  if (local && (name in local)) {
    return [path.join(initDir, name), local[name].repo];
  } else {
    var folder, n = name.split('/').pop();
    // template-(xxx)
    if (/^template-[a-z]*$/g.test(name)) {
      folder = n.replace(/^template-([a-z]*)$/g, '$1');
    }
    // aa-bb-(xxx)
    else if (/-/g.test(name)) {
      folder = n.split('-').pop();
    }
    return [folder ? path.join(initDir, folder) : '', name];
  }
}
