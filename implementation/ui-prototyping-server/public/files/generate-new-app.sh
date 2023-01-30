echo "Enter the name of the App you want to create"
read my_app
npm i -g @angular/cli
ng new $my_app --routing --style=scss
cd $my_app
npm i @angular-devkit/schematics
npm i @schematics/angular
npm i dasherize
ng add @angular/material --skip-confirmation --defaults
npm i ui-prototyping-schematics
# npm link ../ui-prototyping-schematics
schematics ui-prototyping-schematics:ui-prototyping-schematics https://raw.githubusercontent.com/rakshitongit/ui-prototyping-schematics-files/main/files/example.json