import { AbstractContainer, AbstractProperty, AbstractUIProperty, Interaction } from "./abstract-classes";
import { Actions, Connectors } from "./ud-enums";

export class CSSProperty {
    json!: Object;
}

export class View extends AbstractContainer {
    isMaster!: boolean
    children!: View[]
    parentId!: string
    override property!: CanvasProperty
}

export class Component extends AbstractContainer {
    interactions!: Interaction[]
    override property!: AbstractUIProperty
}

export class OnClick extends Interaction {
    
    action!: Actions
    connector!: Connectors

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