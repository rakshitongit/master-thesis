cd ..
ng new $1 --routing --style=scss
cd $1
npm i @angular-devkit/schematics
npm i @schematics/angular
ng add @angular/material --skip-confirmation --defaults
schematics ../ui-prototyping-schematics:ui-prototyping-schematics http://localhost:3000/json/example.json --debug=false