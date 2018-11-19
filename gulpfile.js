const gulp = require('gulp')
const connect = require('gulp-connect')
// 启动server
gulp.task('connect', () => {
    connect.server({
        port: 8088
    })
})

gulp.task('default', function() {
    gulp.run(['connect'])
})
