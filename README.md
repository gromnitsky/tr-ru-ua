# tr-ru-ua

Transliteration from Russian to Ukrainian. E.g. a dull 'Однажды, в
студёную зимнюю пору' becomes a jolly good 'Однажди, в студьоную
зімнюю пору'.

Includes a library, a CLI util & a [simple web interface](http://gromnitsky.users.sourceforge.net/js/tr-ru-ua/) (ES6-only browsers).

## Example

	$ npm i tr-ru-ua

~~~
$ node
> tr = require('tr-ru-ua')
> tr.trans('Лёша, ну ёмаё!')
'Льоша, ну йомайо!'
~~~

## Why?

JFF! I get a kick out of

> 'Однажди, в студьоную зімнюю пору<br>
> Я із лєсу вишєл; бил сільний мороз.<br>
> Ґляжу — подимаєтся мєдлєнно в ґору<br>
> Лошадка, вєзущая хворосту воз.'

ггг

## License

MIT.
