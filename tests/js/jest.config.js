module.exports = {
	rootDir: '../../',
	...require( '@wordpress/scripts/config/jest-unit.config' ),
	"transformIgnorePatterns": [
		"node_modules/(?!is-plain-obj)"
	],
	setupFilesAfterEnv: [ '<rootDir>/tests/js/jest.setup.js' ],
};
