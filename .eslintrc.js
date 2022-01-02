module.exports = {
	root: true,
	extends: '@react-native-community',
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	rules: {
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': ['error'],
		'no-console': 'off',
		'global-require': 0,
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'prettier/prettier': 1 // prettier 检测到的标红展示
	}
};
