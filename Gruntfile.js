// var _ = require('lodash');
var fs = require('fs');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ["screenshots", "reports"],
    eslint: {
      options: {
        configFile: '.eslintrc',
      },
      all: ['tests/**/*.js', ]
    },
    protractor: {
      options: {
        configFile: 'conf.local.js',
        // Stops Grunt process if a test fails
        keepAlive: false,
        // Do you want the output to use fun colors?
        noColor: true,
        //debug: true, // Protractor command line debugging tool
        args: {} // Additional arguments that are passed to the webdriver command
      },
      local: {
        configFile: 'conf.local.js',
        keepAlive: true,
        args: {
          seleniumPort: 4444
        }
      },
      ci: {
        configFile: 'conf.ci.js',
        keepAlive: true,
        args: {}
      },
    },
    shell: {
      wdmupdate: {
        command: 'webdriver-manager update',
        options: {
          execOptions: {
            cwd: 'node_modules/.bin/'
          }
        }
      }
    }
    // watch: {
    //   self: {
    //     files: ['Gruntfile.js'],
    //     tasks: [
    //       'protractor'
    //     ]
    //   },
    //   protractor: {
    //     files: ['tests/**/*.js'],
    //     tasks: [
    //       'protractor'
    //     ]
    //   }
    // }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-protractor-runner');

  // grunt.registerTask('default', ['watch']);
  // grunt.registerTask('local', ['protractor:local']);

  // Task to run tests with protractor
  grunt.task.registerTask('ui', function(target) {
    grunt.task.run('clean');
    grunt.task.run('eslint');
    grunt.task.run('config:' + target);
    grunt.task.run('protractor:' + target);
  });

  grunt.task.registerTask('config', function(target) {
    var done = this.async();
    target = target || "local";

    if (!fs.existsSync('conf.' + target + '.js')) {
      grunt.log.error('Specified configuration file ' + 'conf.' + target + '.js' + ' does not exist');
      done(false);
    }
    done();
  });
};
