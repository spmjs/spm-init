/*
 * grunt-init-jquery
 * https://gruntjs.com/
 *
 * Copyright (c) 2012 'Cowboy' Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a jQuery plugin, including QUnit unit tests.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '111';

// Template-specific notes to be displayed after question prompts.
exports.after = '333';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'arale'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('version', '1.0.0'),
    init.prompt('root'),
    init.prompt('description', 'The best jQuery plugin ever.'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses', 'MIT')
  ], function(err, props) {
    // Files to copy (and process).
    //var files = init.filesToCopy(props);
//
    //// Actually copy (and process) files.
    ////init.copyAndProcess(files, props, {noProcess: 'libs/**'});
//
    //// Generate package.json file, used by npm and grunt.
    //init.writePackageJSON('package.json', {
        //'name': props.name,
        //'version': '1.0.0',
        //'root': props.root,
        //'description': props.description || '',
        //'homepage': props.description || '',
        //'author': props.description || '',
        //'repository': {
            //'type': 'git',
            //'url': ''
        //},
        //'bugs': {
            //'url': ''
        //},
        //'license': 'MIT',
        //'dependencies': {},
        //'tests': [props.name],
        //'output': {}
    //});

    // All done!
    done();
  });

};
