module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
					'backbone.marionette.subrouter.min.js': 'backbone.marionette.subrouter.js'
				}
			}
		},
        watch: {
            scripts: {
                files: ['backbone.marionette.subrouter.js'],
                tasks: ['uglify'],
                options: {
                    nospawn: true
                },
            },
        },
    });

    grunt.registerTask('default', ['uglify', 'watch']);
};