export class AngularSchema {
    schemaForAngular: View
}

export abstract class IDClass {
    id!: string

    // get id(): string {
    //     return this._id
    // }

    // set id(id: string) {
    //     this._id = id
    // }
}

export abstract class AbstractContainer extends IDClass {
    name!: string
    cssProperty!: CSSProperty['json']
    type: ContainerType = ContainerType.VIEW
}

export abstract class AbstractProperty extends IDClass {
    name!: string
}

export abstract class AbstractUIProperty extends AbstractProperty {
    value!: string
    label!: string
}

export abstract class Interaction extends IDClass {
    connectionId!: string
    abstract canNavigate(): boolean
}

export class CSSProperty {
    json: any = {};
}

export class View extends AbstractContainer {
    isMaster!: boolean
    children!: View[]
    parentId!: string
    property!: CanvasProperty
    elements: ComponentContainer[] = []
}

export class ComponentContainer extends AbstractContainer {
    interactions!: Interaction[]
    property!: AbstractUIProperty
}

export class OnClickInteraction extends Interaction {
    
    action: Actions = Actions.NAVIGATE
    connector: Connectors = Connectors.VIEW

    canNavigate(): boolean {
        throw new Error("Method not implemented.");
    }
}

export class CanvasProperty extends AbstractProperty {

}

export class ButtonElementProperty extends AbstractUIProperty {

}

export class SelectElementProperty extends AbstractUIProperty {

}

export class OptionElementProperty extends AbstractUIProperty {

}

export class InputElementProperty extends AbstractUIProperty {

}

export enum Connectors {
    VIEW = 'VIEW', COMPONENT = 'COMPONENT'
}

export enum Actions {
    NAVIGATE = 'NAVIGATE', OPEN = 'OPEN'
}

export enum UIElements {
    BUTTON = "Button", SELECT = "Select", INPUT = "Input"
}

export enum ContainerType {
    VIEW = "VIEW", COMPONENT = "COMPONENT"
}