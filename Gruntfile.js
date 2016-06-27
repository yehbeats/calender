//包装函数
module.exports = function(grunt){
	//任务配置，所有插件的配置信息
	grunt.initConfig({
		//获取package.json的信息
		pkg: grunt.file.readJSON('package.json'),
		
		//uglify插件的配置信息
		uglify: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			build: {
				src: 'src/js/calendar.js',
				dest: 'dist/js/calendar.min.js'
			}
		},
		
		//jshint插件的配置信息
		jshint: {
			build: [ 'Gruntfile.js', 'src/js/*.js' ],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		
		//less插件配置信息
		less: {
			development: {
				files: {
					"css/main.css": "less/style.less"
				}
			},
		},
		
		//watch插件的配置信息
		watch: {
			build: {
				files: ['src/*.js', 'less/style.less'],
				tasks: ['less'],
				options: {spawn: false}
			}
		},
		
		//cssmin插件的配置信息
		cssmin: {
		  target: {
			files: [{
			  expand: true,
			  cwd: 'src/css',
			  src: ['main.css'],
			  dest: 'dist/css',
			  ext: '.min.css'
			}]
		  }
		}
	});
	
	//告诉grunt我们将使用插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	//告诉grunt当我们在终端输入grunt时需要做些什么（注意先后顺序）
	grunt.registerTask('default', ['jshint', 'uglify', 'watch', 'cssmin']);
	
};