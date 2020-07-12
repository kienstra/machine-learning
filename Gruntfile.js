/* eslint-env node */
/* jshint node:true */

/**
 * Mainly copied from the AMP Plugin for WordPress.
 *
 * @see https://github.com/ampproject/amp-wp
 * @param {Object} grunt The grunt object.
 */
module.exports = function( grunt ) {
	'use strict';

	grunt.initConfig( {

		pkg: grunt.file.readJSON( 'package.json' ),

		// Clean up the build.
		clean: {
			build: {
				src: [ 'build' ],
			},
		},

		// Shell actions.
		shell: {
			options: {
				stdout: true,
				stderr: true,
			},
			readme: {
				command: './vendor/xwp/wp-dev-lib/scripts/generate-markdown-readme', // Generate the readme.md.
			},
			phpunit: {
				command: 'phpunit',
			},
			webpack_production: {
				command: 'cross-env BABEL_ENV=production webpack',
			},
			create_build_zip: {
				command: 'if [ ! -e build ]; then echo "Run grunt build first."; exit 1; fi; if [ -e machine-learning.zip ]; then rm machine-learning.zip; fi; cd build; zip -r ../machine-learning.zip .; cd ..; echo; echo "ZIP of build: $(pwd)/machine-learning.zip"',
			},
		},

	} );

	// Load tasks.
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-shell' );
	grunt.loadNpmTasks( 'grunt-wp-deploy' );

	// Register tasks.
	grunt.registerTask( 'default', [
		'build',
	] );

	grunt.registerTask( 'readme', [
		'shell:readme',
	] );

	grunt.registerTask( 'build', function() {
		const done = this.async();
		const spawnQueue = [];
		const stdout = [];

		grunt.task.run( 'shell:webpack_production' );

		spawnQueue.push(
			{
				cmd: 'git',
				args: [ '--no-pager', 'log', '-1', '--format=%h', '--date=short' ],
			},
			{
				cmd: 'git',
				args: [ 'ls-files' ],
			}
		);

		function finalize() {
			const commitHash = stdout.shift();
			const lsOutput = stdout.shift();
			const versionAppend = new Date().toISOString().replace( /\.\d+/, '' ).replace( /-|:/g, '' ) + '-' + commitHash;

			const paths = lsOutput.trim().split( /\n/ ).filter( function( file ) {
				return ! /^(blocks|\.|bin|([^/]+)+\.(md|json|xml)|Gruntfile\.js|tests|wp-assets|dev-lib|readme\.md|composer\..*|webpack.*|languages\/README.*)/.test( file );
			} );
			paths.push( 'vendor/autoload.php' );
			paths.push( 'assets/js/*-compiled.js' );
			paths.push( 'vendor/composer/**' );
			paths.push( 'assets/vendor/**' );

			grunt.task.run( 'clean' );
			grunt.config.set( 'copy', {
				build: {
					src: paths,
					dest: 'build',
					expand: true,
					options: {
						noProcess: [ '*/**', 'LICENSE' ], // That is, only process amp.php and readme.txt.
						process( content, srcpath ) {
							if ( /amp\.php$/.test( srcpath ) ) {
								const versionRegex = /(\*\s+Version:\s+)(\d+(\.\d+)+-\w+)/;

								// If not a stable build (e.g. 0.7.0-beta), amend the version with the git commit and current timestamp.
								const matches = content.match( versionRegex );
								if ( matches ) {
									const version = matches[ 2 ] + '-' + versionAppend;
									// eslint-disable-next-line no-console
									console.log( 'Updating version in amp.php to ' + version );
									content = content.replace( versionRegex, '$1' + version );
									content = content.replace( /(define\(\s*'AMP__VERSION',\s*')(.+?)(?=')/, '$1' + version );
								}
							}
							return content;
						},
					},
				},
			} );
			grunt.task.run( 'readme' );
			grunt.task.run( 'copy' );

			done();
		}

		function doNext() {
			const nextSpawnArgs = spawnQueue.shift();
			if ( ! nextSpawnArgs ) {
				finalize();
			} else {
				grunt.util.spawn(
					nextSpawnArgs,
					function( err, res ) {
						if ( err ) {
							throw new Error( err.message );
						}
						stdout.push( res.stdout );
						doNext();
					}
				);
			}
		}

		doNext();
	} );

	grunt.registerTask( 'create-build-zip', [
		'shell:create_build_zip',
	] );

	grunt.registerTask( 'deploy', [
		'shell:phpunit',
	] );
};
