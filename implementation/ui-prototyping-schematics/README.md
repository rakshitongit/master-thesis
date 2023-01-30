# Getting Started With Package

This package is a Schematic implementation that helps to generate a new app for UI prototyping as per the configuration file provided.

### Using the package

- To install locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool.
- Install the package `npm i ui-prototyping-schematics`

### Use the package

- Must use a JSON file as per the schema [file](https://github.com/rakshitongit/ui-prototyping-schematics-files/blob/main/files/schema_for_angular.json).

- To use the command, go to the angular folder (recommended to create a new angular application, and install the angular materials). 
```bash
schematics ui-prototyping-schematics:ui-prototyping-schematics https://raw.githubusercontent.com/rakshitongit/ui-prototyping-schematics-files/main/files/example.json
```
