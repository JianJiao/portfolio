module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    targetDir: 'client/requires',
                    layout: 'byComponent'
                }
            }
        },

        clean: {
            build: ['build'],
            dev: {
                src: ['build/app.js', 'build/<%= pkg.name %>.css', 'build/<%= pkg.name %>.js']
            },
            prod: ['dist'],
            pub: ['public'],
        },

        browserify: {
            vendor: {
                src: ['client/requires/**/*.js'],
                dest: 'build/vendor.js',
                options: {
                    shim: {
                        jquery: {
                            path: 'client/requires/jquery/js/jquery.js',
                            exports: '$'
                        },
                        underscore: {
                            path: 'client/requires/underscore/js/underscore.js',
                            exports: '_'
                        },
                        backbone: {
                            path: 'client/requires/backbone/js/backbone.js',
                            exports: 'Backbone',
                            depends: {
                                underscore: 'underscore'
                            }
                        },
                        'backbone.marionette': {
                            path: 'client/requires/backbone.marionette/js/backbone.marionette.js',
                            exports: 'Marionette',
                            depends: {
                                jquery: '$',
                                backbone: 'Backbone',
                                underscore: '_'
                            }
                        },
                        bootstrap: {
                            path: 'client/requires/bootstrap/bootstrap.js',
                            exports: 'bootstrap',
                            depends: {
                                jquery: '$'
                            }
                        },
                        flatUI: {
                            path: 'client/requires/flat-ui/flat-ui.js',
                            exports: 'flatUI',
                            depends: {
                                jquery: '$'
                            }
                        },
                        'jquery.validate': {
                            path: 'client/requires/jquery-validation/jquery.validate.js',
                            exports: 'jquery.validate',
                            depends: {
                                jquery: '$'
                            }
                        },
                        'jquery.form': {
                            path: 'client/requires/jquery-form/jquery.form.js',
                            exports: 'jquery.form',
                            depends: {
                                jquery: 'jquery'
                            }
                        }
                    }
                }
            },
            app: {
                files: {
                    'build/app.js': ['client/src/main.js'],
                    'build/uitest.js': ['client/src/test.js']
                },
                options: {
                    transform: ['hbsfy'],
                    external: ['jquery', 'underscore', 'backbone', 'backbone.marionette']
                }
            },
            test: {
                files: {
                    'build/tests.js': [
                        'client/spec/**/*.test.js'
                    ]
                },
                options: {
                    transform: ['hbsfy'],
                    external: ['jquery', 'underscore', 'backbone', 'backbone.marionette']
                }
            }
        },

        less: {
            transpile: {
                files: {
                    'build/<%= pkg.name %>.css': [
                        'client/styles/normalize.css',
                        'client/requires/*/css/*',
                        'client/styles/less/main.less'
                    ]
                }
            },
            // development: {
            //     options: {
            //         compress: false,
            //         yuicompress: false,
            //         optimization: 2,
            //         sourceMap: true,
            //         // sourceMapFilename: 'build/<%= pkg.name %>.css.map',
            //         sourceMapRootpath: '/',
            //     },
            //     files: {
            //         'build/<%= pkg.name %>.css': [
            //             'client/styles/normalize.css',
            //             'client/requires/*/css/*',
            //             'client/styles/less/main.less'
            //         ]
            //     }
            // }
        },

        concat: {
            'build/<%= pkg.name %>.js': ['build/vendor.js', 'build/app.js'],
            'build/uitest.js': ['build/vendor.js', 'build/uitest.js']
        },

        copy: {
            dev: {
                files: [{
                    src: 'build/<%= pkg.name %>.js',
                    dest: 'public/js/<%= pkg.name %>.js'
                }, {
                    src: 'build/<%= pkg.name %>.css',
                    dest: 'public/css/<%= pkg.name %>.css'
                }, {
                    cwd: 'client/img/',
                    src: '**/*',
                    dest: 'public/img/',
                    expand: true,
                },{
                    src: 'build/uitest.js',
                    dest: 'public/js/uitest.js'
                }]
            },
            prod: {
                files: [{
                    cwd: 'client/img/',
                    src: '**/*',
                    dest: 'dist/img/',
                    expand: true,
                }]
            }
        },

        // CSS minification.
        cssmin: {
            minify: {
                src: ['build/<%= pkg.name %>.css'],
                dest: 'dist/css/<%= pkg.name %>.css'
            }
        },

        // Javascript minification.
        uglify: {
            compile: {
                options: {
                    compress: {},
                    verbose: true
                },
                files: [{
                    src: 'build/<%= pkg.name %>.js',
                    dest: 'dist/js/<%= pkg.name %>.js'
                }]
            }
        },

        // for changes to the front-end code
        watch: {
            scripts: {
                files: ['client/templates/*.hbs', 'client/src/**/*.js'],
                tasks: ['clean:dev', 'browserify:app', 'concat', 'copy:dev']
            },
            less: {
                files: ['client/styles/**/*.less'],
                tasks: ['less:transpile', 'copy:dev']
            },
            test: {
                files: ['build/app.js', 'client/spec/**/*.test.js'],
                tasks: ['browserify:test']
            },
            karma: {
                files: ['build/tests.js'],
                tasks: ['jshint:test', 'karma:watcher:run']
            }
        },

        // for changes to the node code
        nodemon: {
            dev: {
                options: {
                    file: 'server.js',
                    nodeArgs: ['--debug'],
                    watchedFolders: ['controllers', 'app'],
                    env: {
                        PORT: '3300'
                    }
                }
            }
        },

        // server tests
        simplemocha: {
            options: {
                globals: ['expect', 'sinon'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            },

            server: {
                src: ['spec/spechelper.js', 'spec/**/*.test.js']
            }
        },

        // mongod server launcher
        shell: {
            mongo: {
                command: 'mongod',
                options: {
                    async: true
                }
            }
        },

        concurrent: {
            dev: {
                tasks: ['nodemon:dev', 'watch:scripts', 'watch:less', 'watch:test'],
                options: {
                    logConcurrentOutput: true
                }
            },
            test: {
                tasks: ['watch:karma'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        // for front-end tdd
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            watcher: {
                background: true,
                singleRun: false
            },
            test: {
                singleRun: true
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'client/src/**/*.js', 'client/spec/**/*.js'],
            dev: ['client/src/**/*.js'],
            test: ['client/spec/**/*.js']
        },

        postcss: {
            options: {
                map: false, // inline sourcemaps
                processors: [
                require('pixrem')(), // add fallbacks for rem units
                require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                require('cssnano')() // minify the result
                ]
            },
            build: {
                src: 'build/<%= pkg.name %>.css',
            },
        },


    });

    grunt.registerTask('init:dev', ['clean', 'bower', 'browserify:vendor']);

    grunt.registerTask('build:dev', ['clean:pub', 'clean:dev', 'browserify:app', 'browserify:test', 'jshint:dev', 'less:transpile', 'concat', 'copy:dev']);
    grunt.registerTask('build:prod', ['clean:prod', 'browserify:vendor', 'browserify:app', 'jshint:all', 'less:transpile', 'concat', 'postcss', 'cssmin', 'uglify', 'copy:prod']);

    grunt.registerTask('heroku', ['init:dev', 'build:dev']);

    grunt.registerTask('server', ['build:dev', 'concurrent:dev']);
    grunt.registerTask('test:server', ['simplemocha:server']);

    grunt.registerTask('test:client', ['karma:test']);
    grunt.registerTask('tdd', ['karma:watcher:start', 'concurrent:test']);

    grunt.registerTask('test', ['test:server', 'test:client']);
};
