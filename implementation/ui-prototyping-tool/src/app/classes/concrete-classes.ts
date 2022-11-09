import { AbstractContainer, AbstractProperty, AbstractUIProperty, Interaction } from "./abstract-classes";
import { Actions, Connectors } from "./ud-enums";
import { v4 as uuidv4 } from 'uuid';

export class CSSProperty {
    json!: any;
}

export class View extends AbstractContainer {
    isMaster!: boolean
    children!: View[]
    parentId!: string
    override property!: CanvasProperty
    elements: ComponentContainer[] = []

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

}

export class SelectElementProperty extends AbstractUIProperty {

}

export class OptionElementProperty extends AbstractUIProperty {

}

export class InputElementProperty extends AbstractUIProperty {

}