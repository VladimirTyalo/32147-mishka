"use strict";

const gulp = require("gulp"),
  sass = require("gulp-sass"),
  plumber = require("gulp-plumber"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  server = require("browser-sync"),
  gulpGlob = require("gulp-sass-glob"), // to import whole directories of scss
  path = require("path"),
  svgmin = require('gulp-svgmin'),
  svgstore = require("gulp-svgstore"),
  mqpacker = require("css-mqpacker"),
  minify = require("gulp-csso"),
  rename = require("gulp-rename"),
  imagemin = require("gulp-imagemin"),
  del = require("del"),
  runSequence = require('run-sequence');


const SVGMIN_PLUGINS = [
  {
    removeDoctype: true
  },
  {
    removeComments: true
  },
  {
    cleanupNumericValues: {
      floatPrecision: 2
    }
  },
  {
    convertColors: {
      names2hex: false, rgb2hex: false
    }
  },
  {
    collections: true
  },
  {
    moveElemsAttrsToGroup: true
  }
];

gulp.task("style", function () {
  gulp.src("sass/style.scss")
      .pipe(plumber())
      .pipe(gulpGlob())
      .pipe(sass())
      .pipe(postcss([
        autoprefixer({
          browsers: [
            "last 1 version",
            "last 2 Chrome versions",
            "last 2 Firefox versions",
            "last 2 Opera versions",
            "last 2 Edge versions"
          ]
        }),
        mqpacker({
          sort: true
        })
      ]))
      .pipe(gulp.dest("build/css"))
      .pipe(minify())
      .pipe(rename("style.min.css"))
      .pipe(gulp.dest("build/css"))
      .pipe(server.reload({stream: true}));
});

gulp.task("serve", function () {
  server.init({
    server: "build",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html").on("change", function (file) {

    // copy html file to build folder
    gulp.src(file.path)
        .pipe(gulp.dest("build"));

    // reloading delay server after 1 sec (should be enough to copy file)
    setTimeout(function() {
      server.reload();
    }, 1000);

  });
});


// run only once to make optimize svg and make svg sprite
gulp.task('svgsprite', function () {
  return gulp
    .src('build/img/svg-icons/*.svg')
    .pipe(svgmin(function getOptions(file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      var cleanUpPlugin = {
        cleanupIDs: {
          prefix: prefix + '-', minify: true
        }
      };

      SVGMIN_PLUGINS.push(cleanUpPlugin);
      return {
        plugins: SVGMIN_PLUGINS
      }
    }))
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(svgstore({inlineSvg: true}))
    .pipe(gulp.dest('build/img/sprite/'));
});

// optimize images
gulp.task("images", function () {
  return gulp.src("build/img/**/*.{jpg,png,gif,svg}").pipe(imagemin([
               imagemin.optipng({optimizationlevel: 3}),
               imagemin.jpegtran({progressive: true})
             ]))
             .pipe(gulp.dest("build/img"));
});


gulp.task("copy", function () {
  return gulp.src([
               "fonts/**/*.{woff,woff2}",
               "img/**",
               "js/**",
               "*.html"
             ], {
               base: "."
             })
             .pipe(gulp.dest("build"));
});


gulp.task("clean", function () {
  return del("build");
});


gulp.task("build", function (fn) {
  runSequence(
    "clean",
    "copy",
    "style",
    "images",
    "svgsprite",
    fn
  );
});

