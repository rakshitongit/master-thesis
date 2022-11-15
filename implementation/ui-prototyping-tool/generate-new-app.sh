if test ! -f "generate-new-app.sh"; then
    printf "Execute this script from the Web-UI directory\n"
	exit
fi

cd ..
ng new $1 --routing --style=scss
cd $1
npm i @angular-devkit/schematics
npm i @schematics/angular
ng add @angular/material --skip-confirmation --defaults
schematics ../ui-prototyping-schematics:ui-prototyping-schematics http://localhost:3000/json/example.json --debug=false