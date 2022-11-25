import { CSSProperty } from "./concrete-classes"
import { ContainerType } from "./ud-enums"

export const baseUrl: string = 'http://experimentationplatform.cs.uni-paderborn.de/'
export const url: string = 'http://localhost:3000/'
// export const url: string =  baseUrl + 'ui-prototyping/api/'

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
    property!: AbstractProperty
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