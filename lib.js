// utf-8, ru -> ua

'use strict';

let tr_ru_ua = {};

(function(exports) {
    let tbl = {
	'и': {
	    ss: "ї",		// after a soft sign
	    b: "і",
	    v: "ї",
	    c: "і"
	},
	'ы': 'и',
	'э': 'є',
	'е': 'є',
	'ё': {
	    ss: 'йо',
	    b: 'йо',		// in the beginning of a word
	    v: 'йо',		// after a vowel
	    c: 'ьо',		// after a consonant
	},
	'г': 'ґ',
	'ъ': "'",
    }

    let trans = function(str) {
	if (!str) return ''

	let r = []
	for (let idx = 0; idx < str.length; ++idx) {
	    r.push(subst(str[idx], str[idx-1], str[idx+1]))
	}
	return r.join('')
    }

    let subst = function(ch, prev, next) {
	if (!ch) return ''

	let nominee = tbl[ch.toLowerCase()]
	if (!nominee) return ch

	if (typeof nominee !== 'object') {
	    // a simple 1 to 1
	    return isupper(ch) ? nominee.toUpperCase() : nominee
	}

	prev = prev || ''
	if (prev.match(/\s/) || prev === '') {
	    nominee = nominee.b
	} else if (prev === 'ь' || prev === 'ъ') { // soft/hard signs
	    nominee = nominee.ss
	} else if (isvowel(prev)) {
	    nominee = nominee.v
	} else {
	    nominee = nominee.c
	}

	if (!isupper(ch)) return nominee

	if (isupper(prev) || isupper(next)) return nominee.toUpperCase()
	return capitalize(nominee)
    }

    let capitalize = function(str) {
	return str = str[0].toUpperCase() + str.slice(1)
    }

    let isupper = function(ch) {
	if (!ch) return false
	// don't laugh, /^[А-Я]$/ doesn't work
	return ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л',
		'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш',
		'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'].indexOf(ch) !== -1
    }

    let isvowel = function(ch) {
	if (!ch) return false
	return ['а', 'и', 'о', 'у', 'ы', 'э', 'е', 'ё', 'ю', 'я']
	    .indexOf(ch.toLowerCase()) !== -1
    }

    exports.trans = trans
    exports.subst = subst
    exports.capitalize = capitalize
    exports.isupper = isupper
    exports.isvowel = isvowel

})(typeof exports === 'object' ? exports : tr_ru_ua)
