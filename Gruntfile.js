/*eslint-env node */

'use strict';

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
      eslint: {
        search: {
          options: {
            config: '.eslintrc'
          },
          src: [
            'Gruntfile.js',
            'couch/search/fulltext/**/*.js'
            ]
        }
      },
      // merges localized json in a js file
      json: {
        common: {
          options: {
            namespace: 'locations',
            processName: function(filename) {
              if (filename.match(/keys/, 'gi')) {
                return 'keys';
              }
              return 'data';
            }
          }
        },
        sl: {
          options:  '<%= json.common.options %>',
          src: ['./node_modules/locations/json/sierra_leone.json', 'couch/search/vendor/locations/sierra_leone_keys.json'],
          dest: 'couch/search/vendor/locations/data.js'
        },
        lr: {
          options:  '<%= json.common.options %>',
          src: ['./node_modules/locations/json/liberia.json', 'couch/search/vendor/locations/normalized_keys.json'],
          dest: 'couch/search/vendor/locations/data.js'
        },
        gin: {
          options:  '<%= json.common.options %>',
          src: ['./node_modules/locations/json/guinea.json', 'couch/search/vendor/locations/normalized_keys.json'],
          dest: 'couch/search/vendor/locations/data.js'
        }
      },

      // updates version in files, and tags commit
      bump: {
        options: {
          files: ['package.json', 'couch/search/fulltext/all/index.js', 'couch/search/_id'],
          updateConfigs: [],
          commit: true,
          commitMessage: 'Release v%VERSION%',
          commitFiles: ['package.json', 'couch/search/fulltext/all/index.js', 'couch/search/_id'],
          createTag: true,
          tagName: 'v%VERSION%',
          tagMessage: 'Version %VERSION%',
          push: false,
          gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
        }
      },

      // adds code that makes the file a CommonJS module
      usebanner: {
        dist: {
          options: {
            position: 'bottom',
            banner: 'if( typeof(exports) === "object" ) {\n' +
              '  module.exports = <%=json.common.options.namespace%>;\n' +
              '}'
          },
          files: {
            src: ['couch/search/vendor/locations/data.js']
          }
        }
      },

      // localized tests
      mochaTest: {
        common: {
          src: ['test/shared/*.js']
        },
        sl: {
          src: ['test/sl/*js', 'test/sl/e2e/*.js'].concat('<%= mochaTest.common.src %>')
        },
        lr: {
          src: ['test/lr/*js', 'test/lr/e2e/*.js'].concat('<%= mochaTest.common.src %>')
        },
        gin: {
          src: ['test/gin/*js', 'test/gin/e2e/*.js'].concat('<%= mochaTest.common.src %>')
        }
      }
  });

  // builds the project with the localized location files
  grunt.registerTask('build', 'builds the location files for a certain country', function(country) {
    if (!country) {
      grunt.fail.warn('one country required: gin,sl,lr');
    } else {
      grunt.task.run(['json:' + country, 'usebanner:dist']);
    }
  });

  // runs the localized tests
  grunt.registerTask('test', 'tests the indexer for a certain country', function(country) {
    if (!country) {
      grunt.fail.warn('one country required: gin,sl,lr');
    } else {
      grunt.task.run(['build:' + country, 'mochaTest:' + country]);
    }
  });

  grunt.registerTask('all', 'tests and builds the location files for a certain country', function(country) {
    if (!country) {
      grunt.fail.warn('one country required: gin,sl,lr');
    } else {
      grunt.task.run(['test:' + country, 'build:' + country, 'eslint']);
    }
  });
};
