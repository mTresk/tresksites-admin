import antfu from '@antfu/eslint-config'

export default antfu({
	stylistic: {
		indent: 'tab',
		quotes: 'single',
	},
	rules: {
		'node/prefer-global/process': 0,
	},
})
