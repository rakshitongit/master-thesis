import {Model, model, property} from '@loopback/repository';
import { randomUUID } from 'crypto';

@model({settings: {strict: false}})
export class MyUser extends Model {

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: false,
    default: []
  })
  experimentVariants: ExperimentUser[] = [];

  static createInstance(password: string): MyUser {
    const user: MyUser = new MyUser()
    user.email = randomUUID() + '@co.in'
    user.password = password
    return user
  }
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<MyUser>) {
    super(data);
  }
}
export class ExperimentUser {
  exp_id: string
  variant_id: string
  variant_name: string
}
export interface MyUserRelations {
  // describe navigational properties here
}

export type MyUserWithRelations = MyUser & MyUserRelations;
