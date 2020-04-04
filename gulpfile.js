/**************************************************
 * modules load
 *************************************************/
const gulp   = require('gulp');
const fs     = require('fs');
// gulp-pugに変更。変数名も変えたよ。
const pug   = require('gulp-pug');
const data   = require('gulp-data');
const rename = require('gulp-rename');

/**************************************************
 * config
 *************************************************/
const template = './src/pug/cleaning.pug';
//const syokuhin = './src/pug/syokuhin.pug';
const jsonPath = './src/json/koriyama.json';
const dest     = './dest/';

/**************************************************
 * task
 *************************************************/
// 指定するのが面倒なのでtask名をdefaultに変更
gulp.task('default', (done) => {
  const json = JSON.parse(fs.readFileSync(jsonPath));
  // タグ展開したいときはここから↓
  //for (let key of json) {
    gulp.src(template) //  ./src/pug/planTemplate.pug
        .pipe(data (function (file){
          return {
            //'fileName': file.path.split('/').pop().replace('.html', ''),ここコメントアウトで良かったｗｗｗｗ
            // json全体を渡すのをやめた。
            'list': json
          }
        }))
        .pipe(pug({
          pretty: true
        }))
        .pipe(rename("koriyama" + ".html"))//出力名を決定
        .pipe(gulp.dest(dest));
  //} ここまでの範囲にtag.txtをコピペする↑*/
  /*gulp.src(syokuhin)
      .pipe(pug({
        pretty: true
      }))
      .pipe(rename("calorie.html"))
      .pipe(gulp.dest(dest));*/

    // gulp4系から明示的に終了のコールバックを実行しないとエラーが出るので追加。
  done();
});