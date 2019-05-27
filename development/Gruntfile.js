/*globals module, require*/

module.exports = function (grunt) {
    'use strict';
    grunt.loadNpmTasks('assemble');

    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    var conf;

    conf = {};

    conf.yeoman = {
        app: 'app',
        dist: 'dist',
        assets: 'app/assets'
    };

    conf.cordova = {
        wrapper: 'build/ios/www'
    };

    conf.build = {
        dest: 'build/prep'
    };

    conf.pkg = grunt.file.readJSON('package.json');

    conf.watch = {
        assemble: {
            files: [
                '<%=yeoman.app %>/templates/layouts/*.hbs',
                '<%=yeoman.app %>/templates/pages/*.hbs',
                '<%=yeoman.app %>/templates/partials/*.hbs'
            ],
            tasks: ['assemble:server']
        },
        compass: {
            files: ['<%=yeoman.assets %>/styles/**/*.{scss,sass}'],
            tasks: ['compass:server', 'autoprefixer']
        },
        livereload: {
            options: {
                livereload: '<%=connect.options.livereload %>'
            },
            files: [
                '.tmp/*.html',
                '.tmp/assets/styles/**/*.css',
                '{.tmp,<%=yeoman.app %>}/assets/scripts/**/*.js',
                '<%=yeoman.assets %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
            ]
        }
    };

    conf.jsdoc = {
        build: {
            src: [
                '<%=yeoman.assets %>/scripts/dss_library/**.js'
            ],
            options: {
                destination: 'doc'
            }
        }
    };

    conf.assemble = {
        options: {
            flatten: true,
            layoutdir: '<%=yeoman.app %>/templates/layouts',
            layout: 'layout.hbs',
            assets: 'dist/assets/images',
            partials: ['<%=yeoman.app %>/templates/partials/*.hbs']
        },
        dist: {
            expand: true,
            cwd: '<%=yeoman.app %>/templates/pages',
            src: ['*.hbs'],
            dest: '.tmp/'
        },
        server: {
            expand: true,
            cwd: '<%=yeoman.app %>/templates/pages',
            src: ['*.hbs'],
            dest: '.tmp/'
        }
    };

    conf.connect = {
        options: {
            port: 9000,
            livereload: 35729,
            // change this to '0.0.0.0' to access the server from outside
            hostname: 'localhost'
        },
        livereload: {
            options: {
                open: {
                    target: 'http://localhost:9000/GAL_1_0_HOME.html'
                },
                base: [
                    '.tmp',
                    '<%=yeoman.app %>'
                ]
            }
        },
        test: {
            options: {
                base: [
                    '.tmp',
                    'test',
                    '<%=yeoman.app %>'
                ]
            }
        },
        dist: {
            options: {
                open: true,
                base: '<%=yeoman.app %>'
            }
        }
    };

    conf.clean = {
        doc: {
            files: [{
                dot: true,
                src: [
                    'doc/**/*.*'
                ]
            }]
        },
        dist: {
            files: [{
                dot: true,
                src: [
                    '.tmp/**/*.*',
                    '.tmp',
                    '<%=yeoman.dist %>/**/*',
                    '!<%=yeoman.dist %>/.git*'
                ]
            }]
        },
        build: {
            files: [{
                dot: true,
                src: ['<%=build.dest %>/**/*']
            }]
        },
        server: {
            files: [{
                dot: true,
                src: [
                    '.tmp/**/*.*',
                    '.tmp'
                ]
            }]
        },
        cordova: {
            files: [{
                dot: true,
                src: ['<%=cordova.wrapper %>/**/*']
            }]
        }
    };

    conf.compass = {
        options: {
            sassDir: '<%=yeoman.assets %>/styles',
            cssDir: '.tmp/assets/styles',
            generatedImagesDir: '.tmp/images/generated',
            imagesDir: '<%=yeoman.assets %>/images',
            javascriptsDir: '<%=yeoman.assets %>/scripts',
            fontsDir: '<%=yeoman.assets %>/styles/fonts',
            httpImagesPath: '/images',
            httpGeneratedImagesPath: '/images/generated',
            httpFontsPath: '/styles/fonts',
            relativeAssets: false
        },
        dist: {
            options: {
                environment: 'production',
                generatedImagesDir: '<%=yeoman.dist %>/images/generated',
                outputStyle: 'expanded',
                debugInfo: false
            }
        },
        server: {
            options: {
                debugInfo: true
            }
        }
    };

    conf.autoprefixer = {
        options: {
            browsers: ['ios 5', 'ios 5.1', 'ios 6', 'ios 6.1', 'ios 7']
        },
        dist: {
            files: [{
                expand: true,
                cwd: '.tmp/assets/styles/',
                src: '**/*.css',
                dest: '.tmp/assets/styles/'
            }]
        }
    };

    conf.useminPrepare = {
        options: {
            dest: '<%=yeoman.dist %>'
        },
        html: '.tmp/*.html'
    };

    conf.usemin = {
        options: {
            dirs: ['<%=yeoman.dist %>']
        },
        html: ['<%=yeoman.dist %>/**/*.html'],
        css: ['<%=yeoman.dist %>/styles/**/*.css']
    };

    conf.imagemin = {
        dist: {
            files: [{
                expand: true,
                cwd: '<%=yeoman.assets %>/images',
                src: '**/*.{png}',
                dest: '<%=yeoman.dist %>/assets/images'
            }]
        }
    };

    conf.svgmin = {
        dist: {
            files: [{
                expand: true,
                cwd: '<%=yeoman.assets %>/images',
                src: '**/*.svg',
                dest: '<%=yeoman.dist %>/images'
            }]
        }
    };

    conf.cssmin = {};

    conf.copy = {
        ios: {
            files: [{
                expand: true,
                dot: true,
                cwd: '<%=yeoman.app %>',
                dest: '<%=yeoman.dist %>',
                src: [
                    'assets/images/**/*.{webp,gif,png,jpg}',
                    'assets/video/**/*.*',
                    'assets/styles/fonts/**/*.*',
                    'assets/scripts/pages/*.*',
                    'assets/pdfs/*.*',
                    '<%=yeoman.app %>/bower_components/sass-bootstrap/fonts/*.*'
                ]
            }]
        },
        dist: {
            files: [{
                expand: true,
                dot: true,
                cwd: '<%=yeoman.app %>',
                dest: '<%=yeoman.dist %>',
                src: [
                    'assets/images/**/*.{webp,gif,png,jpg}',
                    'assets/video/**/*.*',
                    'assets/styles/fonts/**/*.*',
                    'assets/scripts/**/*.*',
                    'assets/bower_components/jquery/dist/jquery.js',
                    'assets/bower_components/jquery.transit/jquery.transit.js',
                    '<%=yeoman.app %>/bower_components/sass-bootstrap/fonts/*.*'
                ]
            }]
        },
        cordova: {
            files: [{
                expand: true,
                dot: true,
                cwd: '<%=yeoman.dist %>',
                dest: '<%=cordova.wrapper %>',
                src: ['**/*.*']
            }]
        },
        build: {
            files: [
                {
                    expand: true,
                    dot: true,
                    cwd: '<%=yeoman.dist %>',
                    dest: '<%=build.dest %>',
                    src: ['**/*.*']
                }
            ]
        },
        noMinStyles: {
            files: [
                {
                    expand: true,
                    dot: true,
                    cwd: '.tmp/assets/styles',
                    dest: '<%=build.dest %>/assets/styles',
                    src: ['**/*.*']
                }
            ]
        },
        iRepNoMinStyles: {
            files: [
                {
                    expand: true,
                    dot: true,
                    cwd: '.tmp/assets/styles',
                    dest: '<%=yeoman.dist %>/assets/styles',
                    src: ['**/*.*']
                }
            ]
        },
        html: {
            files: [{
                expand: true,
                dot: true,
                cwd: '.tmp',
                dest: '<%=yeoman.dist %>',
                src: [
                    '*.html'
                ]
            }]
        },
        styles: {
            expand: true,
            dot: true,
            cwd: '<%=yeoman.assets %>/styles',
            dest: '.tmp/assets/styles/',
            src: '**/*.css'
        },
        pdfs: {
            expand: true,
            dot: true,
            cwd: '<%=yeoman.assets %>/pdfs',
            dest: '.tmp/assets/pdfs/',
            src: '**/*.pdf'
        },
        pages: {
            files: [{
                expand: true,
                dot: true,
                cwd: '.tmp/assets/styles/pages',
                dest: '<%=yeoman.dist %>/assets/styles/pages',
                src: [
                    '*.css'
                ]
            }]
        }
    };

    conf.concurrent = {
        server: [
            'compass',
            'copy:styles',
            'copy:pdfs'
        ],
        test: [
            'copy:styles'
        ],
        dist: [
            'compass',
            'copy:styles',
            'imagemin',
            'svgmin'
        ]
    };

    conf.bower = {
        options: {
            exclude: ['modernizr']
        },
        all: {
            rjsConfig: '<%=yeoman.assets %>/scripts/main.js'
        }
    };

    conf.irepper = {
        default: {
            src: '<%=pkg.dest_jekyll %>',
            dest: '<%=pkg.dest_irep %>',
            assets: '<%=pkg.assets %>',
            global_assets: ['img/global', 'css', 'js', 'fonts'],
            prefix: '<%=pkg.prefix %>',
            suffix: '<%=pkg.suffix %>',
            separator: '<%=pkg.separator %>',
            login: {
                username: '<%=pkg.username %>',
                password: '<%=pkg.password %>'
            },
            product: '<%=pkg.product %>',
            CLM_ID_vod__c: '<%=pkg.CLM_ID_vod__c %>'
        }
    };

    conf['string-replace'] = {
        dist: {
            files: [{
                expand: true,
                cwd: 'dist/',
                src: ['assets/scripts/com_dss_scripts/functions.js'],
                dest: 'dist/'
            }],
            options: {
                replacements: [{
                    pattern: 'var link = page + extension',
                    replacement: 'var link = "../" + page + "/" + page + extension;'
                }]
            }
        }
    };

    grunt.initConfig(conf);

    grunt.loadTasks('tasks');

    /**
     * 'grunt build:irep --nopdfs'
     *
     * Builds each page as individually packaged with HTML
     * and all assets in one folder
     *
     * @destination: build/prep
     *
     */

    grunt.registerTask('build:irep', [
        'clean:dist',
        'clean:build',
        'compass:dist',
        'assemble:dist',
        'concurrent:dist',
        'autoprefixer',
        'copy:html',
        'copy:dist',
        'copy:iRepNoMinStyles',
        'string-replace:dist',
        'copy:pages',
        'irepper'
    ]);

    /**
     * 'grunt build'
     *
     * Builds each page as individual HTML files
     * but keeps assets global
     *
     * @destination: build/prep
     *
     */

    grunt.registerTask('build', [
        'clean:doc',
        'jsdoc:build',
        'clean:dist',
        'clean:build',
        'compass:dist',
        'assemble:dist',
        'concurrent:dist',
        'autoprefixer',
        'copy:html',
        'copy:dist',
        'copy:pages',
        'copy:build',
        'copy:noMinStyles'
    ]);

    /**
     * 'grunt build:min'
     *
     * Builds each page as individual HTML files
     * but keeps assets global and minifies CSS and JS
     *
     * @destination: build/prep
     *
     */

    grunt.registerTask('build:min', [
        'clean:dist',
        'clean:build',
        'compass:dist',
        'assemble:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'copy:html',
        'concat',
        'cssmin',
        'uglify',
        'copy:ios',
        'copy:pages',
        'usemin',
        'copy:build'
    ]);

    /**
     * 'grunt cordova'
     *
     * Builds each page as individual HTML files
     * but keeps assets global and minifies CSS and JS.
     * Then transfers the pages inside of a Cordova
     * wrapper for XCode build
     *
     * @destination: build/ios
     *
     */

    grunt.registerTask('build:cordova', [
        'clean',
        'compass:dist',
        'assemble:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'copy:html',
        'concat',
        'cssmin',
        'uglify',
        'copy:ios',
        'copy:pages',
        'usemin',
        'copy:cordova'
    ]);

    grunt.registerTask('server', function () {

        grunt.task.run([
            'clean:server',
            'assemble:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);

    });

    grunt.registerTask('default', [
        'clean:doc',
        'jsdoc:build'
    ]);

};