#!/opt/bin/mocha --ui=tdd

'use strict';

let assert = require('assert')
let ru_ua = require('../lib')

suite('lib', function() {
    setup(function() {
    })

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
})
