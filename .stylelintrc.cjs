/* eslint-env node */
module.exports = {
	extends: [
		'stylelint-config-standard-scss',
		'stylelint-config-recommended-vue',
		'stylelint-config-recess-order',
		'stylelint-prettier',
	],
	ignoreFiles: ['src/assets/primevue/**/*.scss'],
	rules: {
		'at-rule-no-unknown': null,
		'media-query-no-invalid': null,
		'selector-class-pattern': null,
		'scss/dollar-variable-pattern': null,
		'scss/at-mixin-pattern': null,
	},
}
