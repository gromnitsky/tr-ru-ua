.PHONY: upload
upload:
	rsync -avPL --delete -e ssh *.png *.js *.html gromnitsky@web.sourceforge.net:/home/user-web/gromnitsky/htdocs/js/tr-ru-ua
