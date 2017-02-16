// ru -> ua

'use strict';

let tr_ru_ua = {};

(function(exports) {
    let tbl = {
	'и': 'і',
	'ы': 'и',
	'э': 'є',
	'е': 'є',
	'ё': {
	    b: 'йо',		// in the beginning of a word
	    v: 'йо',		// after a vowel
	    c: 'ьо',		// after a consonant
	},
	'г': 'ґ',
	'ъ': "'",
    }

    let capitalize = function(str) {
	return str = str[0].toUpperCase() + str.slice(1)
    }

    // All praise JavaScript!
    let dup = function(obj) {
	return JSON.parse(JSON.stringify(obj))
    }

    // modify TABLE in-place
    let tbl_add_upper = function(table) {
	for (let key in table) {
	    let val = dup(table[key])
	    if (typeof val === 'object') {
		for (let attr in val) val[attr] = capitalize(val[attr])
		table[key.toUpperCase()] = val
	    } else {
		table[key.toUpperCase()] = capitalize(table[key])
	    }
	}
    }

    tbl_add_upper(tbl)

    let subst = function(src, prev) {
	let dest = tbl[src]
	if (!dest) return src || ''

	if (typeof dest !== 'object') return dest

	prev = prev || ''
	if (prev.match(/\s/) || prev === '') return dest.b
	if (isvowel(prev)) return dest.v
	return dest.c
    }

    let isvowel = function(ch) {
	ch = ch.toLowerCase()
	return ['а', 'и', 'о', 'у', 'ы', 'э', 'е', 'ё', 'ю', 'я']
	    .some( el => ch === el)
    }

    let trans = function(str) {
	let r = []
	let prev
	for (let ch of str || '') {
	    r.push(subst(ch, prev))
	    prev = ch
	}
	return r.join('')
    }

    exports.capitalize = capitalize
    exports.subst = subst
    exports.isvowel = isvowel
    exports.trans = trans

})(typeof exports === 'object' ? exports : tr_ru_ua)
