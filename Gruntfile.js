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

  grunt.registerTask('build', function(country) {
    country = country || 'gin';
    grunt.task.run('json:' + country);
  });

  grunt.registerTask('test', function(country) {
    if (!country) {
      grunt.fail.warn('one country required: gin,sl,lr');
    } else {
      grunt.task.run('preparedTest:' + country);
    }
  });

  grunt.registerTask('preparedTest', function(country) {
    grunt.task.run(['build:' + country,
        'usebanner:dist',
        'mochaTest:' + country]);
  });

  grunt.registerTask('all', function(country) {
    if (!country) {
      grunt.fail.warn('one country required: gin,sl,lr');
    } else {
      grunt.task.run(['test:' + country, 'eslint']);
    }
  });
};
