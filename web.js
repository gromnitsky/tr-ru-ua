/* global tr_ru_ua */

'use strict';

let scroll_mirror = function(from, to) {
    // should we debounce this event?
    from.addEventListener('scroll', () => {
	to.scrollTop = from.scrollTop
    })
}

let tr = function(from, to) {
    let r = []
    let prev = ''
    for (let ch of from.value) {
	r.push(tr_ru_ua.subst(ch, prev))
	prev = ch
    }
    to.value = r.join('')
}

let btn_reset_hook = function(textarea) {
    let btn = textarea.previousElementSibling // bwaa!
    btn.onclick = function() {
	textarea.value = ''
	// trigger input event
	textarea.dispatchEvent(new Event('input'))
	textarea.focus()
    }
}

/* Main */
document.addEventListener('DOMContentLoaded', () => {
    let ru = document.getElementById('ru')
    let ua = document.getElementById('ua')

    scroll_mirror(ru, ua)
    scroll_mirror(ua, ru)

    btn_reset_hook(ru)

    let tr_debounced = debounce(function() {
	tr(ru, ua)
	ua.scrollTop = ru.scrollTop
    }, 250)
    ru.addEventListener('input', tr_debounced)
})


/* 3rd party code */

// from underscore.js 1.8.3
function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
	var last = Date.now() - timestamp;

	if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
	} else {
            timeout = null;
            if (!immediate) {
		result = func.apply(context, args);
		if (!timeout) context = args = null;
            }
	}
    };

    return function() {
	context = this;
	args = arguments;
	timestamp = Date.now();
	var callNow = immediate && !timeout;
	if (!timeout) timeout = setTimeout(later, wait);
	if (callNow) {
            result = func.apply(context, args);
            context = args = null;
	}

	return result;
    };
}
