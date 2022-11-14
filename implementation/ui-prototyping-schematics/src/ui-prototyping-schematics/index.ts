import { apply, chain, MergeStrategy, mergeWith, move, renameTemplateFiles, Rule, SchematicContext, strings, template, Tree, url } from '@angular-devkit/schematics';
import { AngularSchema, ContainerType, View } from './main-view.class';

import fetch from 'node-fetch';
import { normalize } from 'path';
import { dasherize } from '@angular-devkit/core/src/utils/strings';
const Validator = require('jsonschema').Validator;
const v = new Validator();

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function uiPrototypingSchematics(_options: any): Rule {
    return parseJsonFile(_options)
}

function parseJsonFile(options: Schema): Rule {
    return async (_: Tree, __: SchematicContext) => {
        const res = await fetch(options.pathJson)
        const json: AngularSchema = await res.json()
        const response = v.validate(json, require('./schema_for_angular.json'))
        if (!response.valid) {
            console.error("Schema Validation error!")
            response.errors.forEach((e: any) => console.log(e.stack))
            return chain([])
        }
        const rules: Rule[] = []
        const componentNames: string[] = []
        createFromValidJson([json.schemaForAngular], rules, json.schemaForAngular.id || '', componentNames)
        rules.push(replaceAppMainPage());
        // rules.push(createService())
        // rules.push(createMeasurementAndParameterComponent())
        // rules.push(addLoginComponent())
        rules.push(addDefaultComponent({ children: getChildrenComponents(json.schemaForAngular.children) }))
        rules.push(addAbstractElement())
        rules.push(addButtonElement())
        rules.push(addInputElement())
        // rules.push(addAuthInterceptorComponent())
        rules.push(addToRoutesFile({ children: componentNames }))
        // componentNames.push('Measurement')
        // componentNames.push('Login')
        // componentNames.push('Parameter')
        rules.push(addToModuleFile({ children: componentNames }))
        // rules.push(addPackageJsonDependencies())
        // rules.push(installPackageJsonDependencies())
        return chain(rules)
    }
}

function getChildrenComponents(views: View[]): string[] {
    return views.map(v => v.name)
}

function replaceAppMainPage(): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const content: Buffer | null = tree.read(FOLDER.ROOT + 'app.component.html')
        if (content != null) {
            const content2Append: string = "<router-outlet></router-outlet>";
            tree.overwrite(FOLDER.ROOT + 'app.component.html', content2Append)
        }
    }
}

function addAbstractElement(): Rule {
    const sourceTemplate = url('./files/abstract-element');

    const templateSource = apply(sourceTemplate, [
        template({
            ...strings,
        }),
        renameTemplateFiles(),
        move(normalize(FOLDER.COMPONENTS + 'abstract-element'))
    ])
    return mergeWith(templateSource, MergeStrategy.Overwrite)
}

function addInputElement(): Rule {
    const sourceTemplate = url('./files/input-element');

    const templateSource = apply(sourceTemplate, [
        template({
            ...strings,
        }),
        renameTemplateFiles(),
        move(normalize(FOLDER.COMPONENTS + 'input-element'))
    ])
    return mergeWith(templateSource, MergeStrategy.Overwrite)
}

function addButtonElement(): Rule {
    const sourceTemplate = url('./files/button-element');

    const templateSource = apply(sourceTemplate, [
        template({
            ...strings,
        }),
        renameTemplateFiles(),
        move(normalize(FOLDER.COMPONENTS + 'button-element'))
    ])
    return mergeWith(templateSource, MergeStrategy.Overwrite)
}

function addToModuleFile(options: any) {
    const sourceTemplate = url('./files/modules');

    const templateSource = apply(sourceTemplate, [
        template({
            ...options,
            ...strings,
        }),
        renameTemplateFiles(),
        move(normalize(FOLDER.COMPONENTS))
    ])
    return mergeWith(templateSource, MergeStrategy.Overwrite)
}

function addDefaultComponent(options: any) {
    const sourceTemplate = url('./files/default');

    const templateSource = apply(sourceTemplate, [
        template({
            ...strings,
            ...options
        }),
        renameTemplateFiles(),
        move(normalize(FOLDER.COMPONENTS + 'default'))
    ])
    return mergeWith(templateSource, MergeStrategy.Overwrite)
}

function addToRoutesFile(options: any) {
    const sourceTemplate = url('./files/routing');

    const templateSource = apply(sourceTemplate, [
        template({
            ...options,
            ...strings,
        }),
        renameTemplateFiles(),
        move(normalize(FOLDER.COMPONENTS))
    ])
    return mergeWith(templateSource, MergeStrategy.Overwrite)
}

function createFromValidJson(views: View[], rules: Rule[], featureId: string, componentNames: string[]): any {
    for (let view of views) {
        if (view.type == ContainerType.VIEW) {
            // Create an angular parent component directory
            rules.push(createFolderForComponents(view.name))
            componentNames.push(view.name)
            rules.push(createParentComponentWithoutVariants({ name: view.name, elements: view.elements, property: view.cssProperty }))
            rules.push(cleanTheDirectoryForComponent(view.name))
        }
        createFromValidJson(view.children, rules, featureId, componentNames)
    }
}

function createFolderForComponents(folderName: string): Rule {
    return createFolder(FOLDER.COMPONENTS + dasherize(folderName))
}

function createFolder(folderPath: string): Rule {
    return (tree: Tree, _: SchematicContext) => {
        tree.create(normalize(folderPath + `/.gitkeep`), '')
        return tree
    }
}

function createParentComponentWithoutVariants(options: any): Rule {
    const sourceTemplate = url('./files/parentFilesWithoutVarients');

    const templateSource = apply(sourceTemplate, [
        template({
            ...options,
            ...strings,
        }),
        renameTemplateFiles(),
        move(normalize(FOLDER.COMPONENTS + `${dasherize(options.name)}/`))
    ])
    return mergeWith(templateSource, MergeStrategy.Overwrite)
}

function cleanTheDirectoryForComponent(folderName: string): Rule {
    return (tree: Tree, _: SchematicContext) => {
        tree.delete(normalize(FOLDER.COMPONENTS + `${dasherize(folderName)}/.gitkeep`))
        return tree
    }
}

interface Schema {
    pathJson: string,
    example: boolean
}

enum FOLDER {
    COMPONENTS = './src/app/components/', SERVICES = './src/app/services/', EXAMPLE = './src/app/exampleProject/', INTERCEPTORS = './src/app/interceptors', ROOT = './src/app/'
}