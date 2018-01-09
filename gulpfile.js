const gulp = require('gulp');
const $$ = require('gulp-load-plugins')();
const browserify = require('browserify');
const path = require('path');
const babelify = require('babelify');
const del = require('del');
const foreach = require('gulp-foreach');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync').create();

const reload = browserSync.reload;
const $USERHOME = process.env.HOME;
const paths = {
  src: {
    sass: ['./src/sass/**/*.sass', '!./src/sass/template-specific/*.sass'],
    templateSass: ['./src/sass/template-specific/**/*.sass'],
    templateSassDir: ['./src/sass/template-specific/'],
    js: ['./src/js/**/*.js', '!./src/js/template-specific/**/*.js'],
    templateJs: ['./src/js/template-specific/*.js'],
    appJs: ['./src/js/index.js'],
    templateJsDir: './src/js/template-specific/',
    html: ['./src/views/**/*.ejs']
  },
  dest: {
    dist: './',
    css: './build/css',
    js: './build/js',
    html: './build/html/',
    startPath: './build/html/pages/'
  },
  hubspotPublicAssetsRoot: `${$USERHOME}/github/hubspot_public_assets`,
  breakpointStylesheets: './node_modules/breakpoint-sass/stylesheets'
};

const defaultEjsOptions = {
  msg: 'Hello Gulp!',
  delimiter: '?'
};

gulp.task('clean:css', (done) =>
  del(['./build/css/**/*.css'], done));

gulp.task('clean:js', (done) =>
  del(['./build/js/**/*.js', './build/js/**/*.js.map'], done));

gulp.task('sass', ['clean:css', 'sass:template'], () =>
  gulp.src(paths.src.sass)
  .pipe($$.sass({
    includePaths: [
      // paths.hubspotPublicAssetsRoot,
      // paths.breakpointStylesheets
    ]
  })).on('error', $$.sass.logError)
  .pipe($$.autoprefixer())
  .pipe($$.cssnano({
    zindex: false
  }))
  .pipe($$.concat('hsg.css'))
  .pipe(gulp.dest(paths.dest.css))
  .pipe(browserSync.stream()));

gulp.task('sass:template', () => {
  gulp.src(`${paths.src.templateSassDir}*.sass`)
    .pipe(foreach((stream, file) => {
      const name = path.basename(file.path, '.sass');
      return gulp.src(`${paths.src.templateSassDir}${name}.sass`)
        .pipe($$.sass({
          includePaths: [
            // paths.hubspotPublicAssetsRoot,
            // paths.breakpointStylesheets
          ]
        })).on('error', $$.sass.logError)
        .pipe($$.autoprefixer())
        .pipe($$.cssnano({
          zindex: false
        }))
        .pipe($$.concat(`${name}.css`))
        .pipe(gulp.dest(paths.dest.css))
        .pipe(browserSync.stream());
    }));
});

gulp.task('js', ['clean:js', 'js:template'], () =>
  browserify({
    entries: paths.src.appJs,
    extensions: ['.js'],
    debug: true,
    transform: [babelify]
  })
  .bundle()
  .on('error', (err) => {
    $$.util.log($$.util.colors.red(err.toString()));
    this.emit('end');
  })
  .pipe(source('hsg.js'))
  .pipe(buffer())
  .pipe($$.sourcemaps.init({
    loadMaps: true
  }))
  .pipe($$.uglify())
  .pipe($$.sourcemaps.write('./'))
  .pipe(gulp.dest(paths.dest.js))
  .on('end', reload));

gulp.task('js:template', () =>
  gulp.src(`${paths.src.templateJsDir}*.js`)
  .pipe(foreach((stream, file) => {
    const name = path.basename(file.path, '.js');
    return browserify({
      entries: [`${paths.src.templateJsDir}${name}.js`],
      extensions: ['.js'],
      debug: true
    })
      .transform(babelify)
      .on('error', $$.notify.onError({
        title: 'Error while bundling entities',
        message: 'File: <%=error.fileName.replace(/.+?client\\/src\\/app\\//, "")%>',
        emitError: true,
        wait: true
      }))
      .on('error', (err) => {
        $$.util.log(err);
        this.emit('end');
      })
      .bundle()
      .pipe(source(`${name}.js`))
      .pipe(buffer())
      .pipe($$.sourcemaps.init({
        loadMaps: true
      }))
      .pipe($$.uglify())
      .pipe($$.sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dest.js))
      .on('end', reload);
  }))
);

gulp.task('ejs', () =>
  gulp.src(paths.src.html)
  .pipe($$.ejs(Object.assign({}, defaultEjsOptions, searchConfig[0].options || {}), {
    ext: '.html'
  }))
  .pipe(gulp.dest(paths.dest.html)));


// gulp.task('ejs:search-partials', () => {
//   searchConfig.forEach(cfg => {
//     gulp.src(paths.src.searchHtml)
//       .pipe($$.ejs(Object.assign({}, defaultEjsOptions, cfg.options || {}), {
//         ext: '.html'
//       }))
//       .pipe($$.rename(`${cfg.code}.html`))
//       .pipe(gulp.dest(`${paths.dest.searchOutput}`));
//   });
// });

// gulp.task('copy:hooks', () =>
//   gulp.src('hooks/*')
//     .pipe($$.chmod({
//       owner: {
//         read: true,
//         write: true,
//         execute: true
//       },
//       group: {
//         read: true,
//         execute: true
//       },
//       others: {
//         read: true,
//         execute: true
//       }
//     }))
//     .pipe(gulp.dest('../../../.git/hooks')));

// Reload html file when changes are saved
gulp.task('html', () =>
  gulp.src(paths.src.html)
  .on('end', reload));

gulp.task('serve', () => {
  browserSync.init({
    server: './',
    //https: true,
    startPath: paths.dest.startPath
  });

  gulp.watch(paths.src.sass, ['sass']);
  gulp.watch(paths.src.templateSass, ['sass:template']);
  gulp.watch(paths.src.js, ['js', 'js:template']);
  gulp.watch(paths.src.templateJs, ['js:template']);
  gulp.watch(paths.src.html, ['ejs', 'html']);
});

gulp.task('build', ['js', 'sass', 'ejs']);

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['js', 'sass', 'ejs'], () => {
  gulp.run('serve');
});
