import { CSSProperty } from "./concrete-classes"

export abstract class IDClass {
    id!: string
}

export abstract class AbstractContainer extends IDClass {
    name!: string
    property!: AbstractProperty
    cssProperty!: CSSProperty['json']
}

export abstract class AbstractProperty extends IDClass {
    name!: string
}

export abstract class AbstractUIProperty extends AbstractProperty {
    value!: string
    label!: string
}

export abstract class Interaction extends IDClass {
    abstract canNavigate(): boolean
}