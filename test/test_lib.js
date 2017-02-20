#!/opt/bin/mocha --ui=tdd

'use strict';

let assert = require('assert')
let ru_ua = require('../lib')

suite('lib', function() {
    test('subst', function() {
	assert.equal(ru_ua.subst('Ё', null), 'Йо')
	assert.equal(ru_ua.subst('', null), '')
	assert.equal(ru_ua.subst(null, null), '')

	assert.equal(ru_ua.subst('Ё', ''), 'Йо')
	assert.equal(ru_ua.subst('ё', ''), 'йо')
	assert.equal(ru_ua.subst('ё', 'л'), 'ьо')

	assert.equal(ru_ua.subst('и'), 'і')
	assert.equal(ru_ua.subst('q', 'q'), 'q')
    })

    test('trans', function() {
	assert.equal(ru_ua.trans(), '')
	assert.equal(ru_ua.trans(''), '')

	assert.equal(ru_ua.trans('Однажды, в студёную зимнюю пору'),
		     'Однажди, в студьоную зімнюю пору')
    })

    test('mixed case', function() {
	assert.equal(ru_ua.trans('ЁМАЁ wSx'), 'ЙОМАЙО wSx')
	assert.equal(ru_ua.trans('Ёмаё'), 'Йомайо')
	assert.equal(ru_ua.trans('ЁМаё'), 'ЙОМайо')
	assert.equal(ru_ua.trans('ёмаЁ'), 'йомаЙо')
	assert.equal(ru_ua.trans('ёмАЁ'), 'йомАЙО')
    })
})
