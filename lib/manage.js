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
  } else if (commander.upgrade) {
    upgrade(commander.upgrade);
    return false;
  }
  return true;
};

exports.install = install;
exports.update = update;
exports.upgrade = upgrade;
exports.list = list;

// .install('aralejs/template-arale')
// .install('arale')
function install(template) {
  var name = helper.getName(template);
  var git = 'https://github.com/' + name[1];

  var parsed = url.parse(git);
  parsed.agent = false;
  parsed.method = 'HEAD';
  https.get(parsed, function(res) {
    if (res.statusCode === 200 && /\//.test(name[1])) {
      var dest = name[0];

      log('Downloading: '.to.cyan.bold.color + name[1]);

      fs.exists(dest, function(exists) {
        if(exists) {
          log('Found: '.to.cyan.bold.color + dest + ' exist');
          return;
        }

        spawn('git', ['clone', git, dest])
          .on('close', function (code) {
            if (code === 0) {
              log('Downloaded: '.to.cyan.bold.color + name[1] + ' to ' + dest);
            } else {
              log('Failure: '.to.red.bold.color + 'for code ' + code);
              process.exit(1);
            }
          });
      });
    } else {
      log('Not Found: '.to.cyan.bold.color + git);
      process.exit(1);
    }
  });
}

// .update()
function update() {
  getIndex(true, function() {
    log('Updated'.to.cyan.bold.color + 
      '  You can call ' + 'spm-init --list'.to.magenta.bold.color + ' see global templates');
  });
}

// .upgrade('arale')
function upgrade(template) {
  var dir = helper.getName(template)[0];
  if (dir) {
    var pull = spawn('git', ['pull', 'origin', 'master'], {cwd: dir});

    pull
      .on('close', function (code) {
        if (code === 0) {
          log('Upgraded: '.to.cyan.bold.color + dir);
        } else {
          log('Failure: '.to.red.bold.color + 'for code ' + code);
          process.exit(1);
        }
      });
  } else {
    log('Not Found: '.to.cyan.bold.color + template);
    process.exit(1);
  }
}

// .list()
function list() {
  getIndex(function(data) {
    delete data._timestamp;
    log('Global templates'.to.cyan.bold.color);
    console.log(helper.writeTable(data));
    console.log('  Example'.to.cyan.bold.color);
    log('  spm-init --install aralejs/template-arale');
  });
}
