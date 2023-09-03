module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		"plugin:vue/vue3-strongly-recommended",
		"plugin:import/recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
	],
	settings: {
		"import/resolver": {
			typescript: {}
		},
	},
	parserOptions: {
		"ecmaVersion": "latest",
		"sourceType": "module",
		"parser": "@typescript-eslint/parser",
	},
	rules: {
		"vue/html-self-closing": ["error", {
			"html": {
				"void": "never",
				"normal": "always",
				"component": "always"
			},
			"svg": "always",
			"math": "always"
		}],
		"indent": [
			"error",
			"tab"
		],
		"vue/html-indent": [
			"error",
			"tab",
			{
				attribute: 1,
				baseIndent: 1,
				closeBracket: 0,
				alignAttributesVertically: true,
				ignores: []
			}
		],
		'no-tabs': 0,
		'vue/max-attributes-per-line': ['error', {
			'singleline': {
				'max': 3
			},
			'multiline': {
				'max': 1
			}
		}],
		'import/no-extraneous-dependencies': ['error', {'includeInternal': true, 'includeTypes': true}],
		'vue/order-in-components': ['error', {
			order: [
				'el',
				'name',
				'key',
				'parent',
				'functional',
				['delimiters', 'comments'],
				['components', 'directives', 'filters'],
				'extends',
				'mixins',
				['provide', 'inject'],
				'ROUTER_GUARDS',
				'layout',
				'middleware',
				'validate',
				'scrollToTop',
				'transition',
				'loading',
				'inheritAttrs',
				'model',
				['props', 'propsData'],
				'emits',
				'setup',
				'asyncData',
				'data',
				'fetch',
				'head',
				'computed',
				'watch',
				'watchQuery',
				'LIFECYCLE_HOOKS',
				'methods',
				['template', 'render'],
				'renderError'
			]
		}],
		"vue/attributes-order": ["error", {
			"order": [
				"DEFINITION",
				"LIST_RENDERING",
				"CONDITIONALS",
				"RENDER_MODIFIERS",
				"GLOBAL",
				["UNIQUE", "SLOT"],
				"TWO_WAY_BINDING",
				"OTHER_DIRECTIVES",
				"OTHER_ATTR",
				"EVENTS",
				"CONTENT"
			],
			"alphabetical": false
		}],
		"vue/no-irregular-whitespace": ["error", {
			"skipStrings": true,
			"skipComments": false,
			"skipRegExps": false,
			"skipTemplates": false,
			"skipHTMLAttributeValues": false,
			"skipHTMLTextContents": false
		}],
		"vue/component-definition-name-casing": ["error", "PascalCase"],
		"vue/match-component-file-name": ["error", {
			"extensions": ["vue"],
			"shouldMatchCase": false
		}],
		"vue/no-dupe-keys": ["error", {
			"groups": []
		}],
		"vue/component-name-in-template-casing": ["error", "kebab-case", {
			"registeredComponentsOnly": true,
		}],
		'vue/multi-word-component-names': 'off',
		'comma-dangle': ['error', {
			arrays: 'never',
			objects: 'never',
			imports: 'never',
			exports: 'never',
			functions: 'never'
		}],
		'linebreak-style': ["error", "unix"],
		'no-console': 'error',
		'no-debugger': 'error',
		'arrow-parens': ['error', 'always'],
		'no-plusplus': 'off',
		'constructor-super': 'off',
		"no-mixed-operators": [
			"error",
			{
				"groups": [
					["+", "-", "*", "/", "%", "**"],
					["&", "|", "^", "~", "<<", ">>", ">>>"],
					["==", "!=", "===", "!==", ">", ">=", "<", "<="],
					["&&", "||"],
					["in", "instanceof"]
				],
				"allowSamePrecedence": true
			}
		],
		'import/extensions': 'off',
		'import/prefer-default-export': 'off',
		'no-unused-expressions': 'error',
		'no-param-reassign': 'off',
		'prefer-destructuring': ["error", {
			"array": true,
			"object": true
		}, {
			"enforceForRenamedProperties": false
		}
		],
		'no-bitwise': ['error', {allow: ['~']}],
		'no-unused-vars': 'off',
		'max-len': ['error', {code: 350}],
		'object-curly-newline': ['error', {
			ObjectExpression: {multiline: true, consistent: true},
			ObjectPattern: {multiline: true, consistent: true}
		}],
		'lines-between-class-members': ['error', 'always', {exceptAfterSingleLine: true}]
	},
};