import { Entity, model, property } from '@loopback/repository';
import { View } from './view.model';

@model({ settings: { strict: false } })
export class Experiment extends Entity {

    @property({
        type: 'string',
        id: true,
        generated: true
    })
    id?: string;

    @property({
        type: 'string',
        required: true,
    })
    name: string;

    @property({
        type: 'string',
    })
    start?: string;

    @property({
        type: 'string',
    })
    end?: string;

    @property({
        type: 'number',
        required: true,
    })
    priority: number;

    @property({
        type: 'string',
        required: true,
    })
    evaluationType: EvaluationType;

    @property({
        type: 'array',
        itemType: 'object',
        required: false,
        default: []
    })
    experimentVarients: ExperimentVariant[];

    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(data?: Partial<Experiment>) {
        super(data);
    }
}

export interface ExperimentRelations {
    // describe navigational properties here
}

export type ExperimentWithRelations = Experiment & ExperimentRelations;

export enum EvaluationType {
    MIN = 'MIN', MAX = 'MAX', MEDIAN = 'MEDIAN', AVERAGE = 'AVERAGE', SUM = 'SUM'
}

export class ExperimentVariant {
    id: string
    varientName: string
    percentage: number
    masterView: View
}