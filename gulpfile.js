const {src, dest, parallel, series, watch} = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const notify = require("gulp-notify");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const fileinclude = require("gulp-file-include");
const svgSprite = require("gulp-svg-sprite");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const fs = require("fs");
const del = require("del");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");


const fonts = () => {
    src("./src/fonts/**.ttf")
        .pipe(ttf2woff())
        .pipe(dest("./app/fonts/"))
    return src("./src/fonts/**.ttf")
        .pipe(ttf2woff2())
        .pipe(dest("./app/fonts/"))
}

const cb = () => {}

let srcFonts = "./src/scss/_fonts.scss";
let appFonts = "./app/fonts/";

const fontsStyle = (done) => {
	let file_content = fs.readFileSync(srcFonts);

	fs.writeFile(srcFonts, '', cb);
	fs.readdir(appFonts, function (err, items) {
		if (items) {
			let c_fontname;
			for (var i = 0; i < items.length; i++) {
				let fontname = items[i].split('.');
				fontname = fontname[0];
				if (c_fontname != fontname) {
					fs.appendFile(srcFonts, '@include font-face("' + fontname + '", "' + fontname + '", 400);\r\n', cb);
				}
				c_fontname = fontname;
			}
		}
	})

	done();
}

const svgSprites = () => {
    return src("./src/images/icons/**.svg")
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../sprite.svg"
                }
            }
        }))
        .pipe(dest("./app/images"))
}

const styles = () => {
    return src("./src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "expanded" /* This option doesn't work properly */
        }
        ).on("error", notify.onError()))
        .pipe(autoprefixer({
            cascade: false,
        }))
        .pipe(sourcemaps.write("."))
        .pipe(dest("./app/css/"))
        .pipe(browserSync.stream());
}

const htmlInclude = () => {
    return src(["./src/index.html"])
        .pipe(fileinclude({
            prefix: "@",
            basepath: "@file"
        }))
        .pipe(dest("./app"))
        .pipe(browserSync.stream());
}

const imagesToApp = () => {
    return src(["./src/images/**.jpg", "./src/images/**.png", "./src/images/**.jpeg"])
        .pipe(dest("./app/images"))
}

const others = () => {
    return src("./src/others/**")
        .pipe(dest("./app"))
}

const clean = () => {
    return del(["app/*"])
}

const scripts = () => {
    return src("./src/js/scripts.js")
    .pipe(webpackStream({
        mode: "development",
        output: {
            filename: "scripts.js",
        },
        module: {
            rules: [
              {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                        ['@babel/preset-env']
                    ]
                  }
                }
              }
            ]
          },
    }))
    .on('error', function (err) {
        console.error('WEBPACK ERROR', err);
        this.emit('end'); // Don't stop the rest of the task
    })
    .pipe(dest("./app/js/"))
    .pipe(browserSync.stream());
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });

    watch("./src/scss/**/*.scss", styles);
    watch("./src/index.html", htmlInclude);
    watch("./src/images/**.jpg", imagesToApp);
    watch("./src/images/**.png", imagesToApp);
    watch("./src/images/**.jpeg", imagesToApp);
    watch("./src/images/icons/**.svg", svgSprites);
    watch("./src/others/**", others);
    watch("./src/fonts/**.ttf", fonts);
    watch("./src/fonts/**.ttf", fontsStyle);
    watch("./src/js/**/*.js", scripts);
}

exports.styles = styles;
exports.watchFiles = watchFiles;
exports.fileinclude = htmlInclude;

exports.default = series(clean, parallel(htmlInclude, scripts, fonts, others, imagesToApp, svgSprites), fontsStyle, styles, watchFiles);