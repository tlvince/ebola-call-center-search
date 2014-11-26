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
            processName: function() {
              return 'data';
            }
          }
        },
        sl: {
          options:  '<%= json.common.options %>',
          src: ['./node_modules/locations/json/sierra_leone.json'],
          dest: 'couch/search/vendor/locations/data.js'
        },
        lr: {
          options:  '<%= json.common.options %>',
          src: ['./node_modules/locations/json/liberia.json'],
          dest: 'couch/search/vendor/locations/data.js'
        },
        gin: {
          options:  '<%= json.common.options %>',
          src: ['./node_modules/locations/json/guinea.json'],
          dest: 'couch/search/vendor/locations/data.js'
        }
      },

      usebanner: {
        dist: {
          options: {
            position: 'bottom',
            banner: 'if( typeof(exports) === "object" ) {\n' +
                    '  exports.<%=json.common.options.namespace%> = <%=json.common.options.namespace%>;\n' +
                    '}'
          },
          files: {
            src: ['couch/search/vendor/locations/data.js']
          }
        }
      },

      mochaTest: {
        test: {
          src: ['test/**/*.js']
        }
      }


  });

  grunt.registerTask('build', function(country) {
    country = country || 'sl';
    grunt.task.run('json:' + country);
  });

  grunt.registerTask('test', function() {
    grunt.task.run('mochaTest');
  });

  grunt.registerTask('default', [
      'build',
      'usebanner:dist',
      'test',
      'eslint'
  ]);
};
