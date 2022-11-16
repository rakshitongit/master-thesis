ng new $1 --routing --style=scss
cd $1
npm i @angular-devkit/schematics
npm i @schematics/angular
ng add @angular/material --skip-confirmation --defaults
npm i ui-prototyping-schematics
# npm link ../ui-prototyping-schematics
schematics ui-prototyping-schematics:ui-prototyping-schematics https://github.com/rakshitongit/ui-prototyping-schematics-files/blob/main/files/example.json