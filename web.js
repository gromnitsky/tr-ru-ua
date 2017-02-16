/* global tr_ru_ua */

'use strict';

let scroll_mirror = function(from, to) {
    // should we debounce this event?
    from.addEventListener('scroll', () => {
	to.scrollTop = from.scrollTop
    })
}

let btn_clear_hook = function(btn, textarea) {
    btn.onclick = function() {
	textarea.value = ''
	// trigger input event
	textarea.dispatchEvent(new Event('input'))
	textarea.focus()
	return false
    }
}


/* Main */
document.addEventListener('DOMContentLoaded', () => {
    let ru = document.querySelector('#ru')
    let rut = ru.querySelector('textarea')
    let ruc = ru.querySelector('.btn--clear')
    let ua = document.querySelector('#ua')
    let uat = ua.querySelector('textarea')

    scroll_mirror(rut, uat)
    scroll_mirror(uat, rut)

    btn_clear_hook(ruc, rut)

    // react on input
    let tr = debounce(function() {
	uat.value = tr_ru_ua.trans(rut.value)
	uat.scrollTop = rut.scrollTop
    }, 200)
    rut.addEventListener('input', tr)

    // update status
    let rui = ru.querySelector('.info')
    let uai = ua.querySelector('.info')
    let status = debounce(function() {
	rui.innerHTML = rut.value.length
	uai.innerHTML = uat.value.length
    }, 250)
    rut.addEventListener('input', status)
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
