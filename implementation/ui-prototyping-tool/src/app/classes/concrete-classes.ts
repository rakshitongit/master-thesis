import { AbstractContainer, AbstractProperty, AbstractUIProperty, Interaction } from "./abstract-classes";
import { Actions, Connectors, InputType } from "./ud-enums";
import { v4 as uuidv4 } from 'uuid';

export class CSSProperty {
    json: any = {};
}

export class View extends AbstractContainer {
    isMaster!: boolean
    children!: View[]
    parentId!: string
    override property!: CanvasProperty
    elements: ComponentContainer[] = []
    variants: View[] = []

    constructor(v?: View) {
        super()
        if (v != undefined) {
            this.id = uuidv4()
            this.name = v.name
            this.elements = []
            this.cssProperty = v.cssProperty
        }
    }

    static getView(isMaster: boolean, name: string): View {
        let v: View = new View()
        v.id = uuidv4()
        v.isMaster = isMaster
        v.name = name
        v.children = []
        v.parentId = ''
        return v
    }
}

export class ComponentContainer extends AbstractContainer {
    interactions!: Interaction[]
    override property!: AbstractUIProperty
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
    btnName!: string
    isDisabled!: boolean
}

export class SelectElementProperty extends AbstractUIProperty {
    options: OptionElementProperty[] = []
    labelText!: string;
}

export class OptionElementProperty extends AbstractUIProperty {

}

export class InputElementProperty extends AbstractUIProperty {
    type!: InputType
    labelText!: string
}

export class Experiment {
    id!: string
    name!: string
    start!: string
    end!: string
    priority!: number
    evaluationType!: EvaluationType
    experimentVarients: Variant[] = []
}

export class Variant {
    id!: string
    name!: string
    percentage!: number
    masterView!: View

    static createVariant(percentage: number, name: string): Variant {
        const v: Variant = new Variant()
        v.name = name
        v.percentage = percentage
        v.id = uuidv4()
        v.masterView = new View()
        return v
    }
}

export enum EvaluationType {
    MIN = 'MIN', MAX = 'MAX', MEDIAN = 'MEDIAN', AVERAGE = 'AVERAGE', SUM = 'SUM'
}