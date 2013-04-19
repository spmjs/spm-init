var fs = require('fs');
var path = require('path');
var url = require('url');
var https = require('https');
var spawn = require('win-spawn');
var helper = require('./helper');
var initDir = helper.initDir;
var getIndex = helper.getIndex;
var log = helper.log;
require('colorful').colorful();

module.exports = function(commander) {
  if (commander.install) {
    install(commander.install);
    return false;
  } else if (commander.update) {
    update();
    return false;
  } else if (commander.list) {
    list();
    return false;
  }
  return true;
};

exports.install = install;
exports.update = update;
exports.upgrade = upgrade;
exports.list = list;

// .install('aralejs/template-arale')
function install(template) {
  var git = 'https://github.com/' + template;
  var name = git.split('/').pop();
  // template-(xxx)
  if (/^template-[a-z]*$/g.test(name)) {
    name = name.replace(/^template-([a-z]*)$/g, '$1');
  }
  // aa-bb-(xxx)
  else if (/-/g.test(name)) {
    name = name.split('-').pop();
  }

  var parsed = url.parse(git);
  parsed.agent = false;
  parsed.method = 'HEAD';
  https.get(parsed, function(res) {
    if (res.statusCode === 200) {
      var dest = path.join(initDir, name);

      log('Downloading: '.to.cyan.bold.color + name + ' from ' + dest);

      fs.exists(dest, function(exists) {
        if(exists) {
          log('Found: '.to.cyan.bold.color + dest + ' exist');
          return;
        }

        spawn('git', ['clone', git, dest])
          .on('close', function (code) {
            log('Downloaded: '.to.cyan.bold.color + name + ' to ' + dest);
          });
      });
    } else {
      log('Not Found: '.to.cyan.bold.color + git);
    }
  });
}

function update() {
  getIndex(true, function() {
    log('Updated'.to.cyan.bold.color + 
      '  You can call ' + 'spm-init --list'.to.magenta.bold.color + ' see global templates');
  });
}

// .upgrade(template)
function upgrade(template) {

}

function list() {
  getIndex(function(data) {
    console.log();
    delete data._timestamp;
    helper.writeTable(data);
  });
}
