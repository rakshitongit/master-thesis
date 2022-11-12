import { Entity, model, property } from '@loopback/repository';

@model()
export class View extends Entity {

    @property({
        type: 'string',
        id: true
    })
    id: string;
    
    @property({
        type: 'boolean',
        required: true,
    })
    isMaster?: boolean;

    @property({
        type: 'string',
    })
    parentId?: string;

    @property({
        type: 'string',
    })
    name?: string;

    @property({
        type: 'object',
    })
    property?: Object;

    @property({
        type: 'array',
        itemType: 'object',
    })
    elements?: ComponentContainer[];

    @property({
        type: 'array',
        itemType: 'object',
    })
    children?: View[];

    @property({
        type: 'string',
    })
    type?: ContainerType;

    @property({
        type: 'object',
    })
    cssProperty?: Object;
    
    constructor(data?: Partial<View>) {
        super(data);
    }
}

export interface ViewRelations {
    // describe navigational properties here
}

export type ViewWithRelations = View & ViewRelations;

export abstract class IDClass {
    _id!: string

    get id(): string {
        return this._id
    }

    set id(id: string) {
        this._id = id
    }
}

export abstract class AbstractProperty extends IDClass {
    name!: string
}

export abstract class Interaction extends IDClass {
    connectionId!: string
}

export abstract class AbstractUIProperty extends AbstractProperty {
    value!: string
    label!: string
}

export class CanvasProperty extends AbstractProperty {

}

export class CSSProperty {
    json: any = {};
}

export class ComponentContainer extends IDClass {
    name!: string
    cssProperty!: CSSProperty['json']
    type: ContainerType = ContainerType.VIEW
    interactions!: Interaction[]
    property!: AbstractUIProperty
}

export class OnClickInteraction extends Interaction {
    
    action: Actions = Actions.NAVIGATE
    connector: Connectors = Connectors.VIEW
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