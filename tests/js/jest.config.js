module.exports = {
	rootDir: '../../',
	...require( '@wordpress/scripts/config/jest-unit.config' ),
	transform: {
		'^.+\\.[jt]sx?$': '<rootDir>/node_modules/@wordpress/scripts/config/babel-transform',
	},
	"transformIgnorePatterns": [
		"node_modules/(?!is-plain-obj)"
	],
	testPathIgnorePatterns: [
		'<rootDir>/.git',
		'<rootDir>/node_modules',
	],
	coveragePathIgnorePatterns: [
		'<rootDir>/node_modules',
	],
	moduleNameMapper: {
		'^react($|/.+)': '<rootDir>/node_modules/react$1'
	},
	coverageReporters: [ 'lcov' ],
	coverageDirectory: '<rootDir>/coverage',
	setupFilesAfterEnv: [ '<rootDir>/tests/js/jest.setup.js' ],
};
