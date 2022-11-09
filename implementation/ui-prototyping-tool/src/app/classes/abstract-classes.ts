import { CSSProperty } from "./concrete-classes"

export abstract class IDClass {
    id!: string
}

export abstract class AbstractContainer extends IDClass {
    name!: string
    property!: AbstractProperty
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

export enum ContainerType {
    VIEW = "VIEW", COMPONENT = "COMPONENT"
}