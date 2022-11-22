import { AbstractContainer, AbstractProperty, AbstractUIProperty, Interaction } from "./abstract-classes";
import { Actions, Connectors, InputType } from "./ud-enums";

export class CSSProperty {
    json: any = {};
}

export class View extends AbstractContainer {
    isMaster!: boolean
    children: View[] = []
    parentId!: string
    override property!: CanvasProperty
    elements: ComponentContainer[] = []
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
    height!: number
    width!: number
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