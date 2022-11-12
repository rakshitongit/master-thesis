import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {View, ViewRelations} from '../models';

export class ViewRepository extends DefaultCrudRepository<
  View,
  typeof View.prototype.id,
  ViewRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(View, dataSource);
  }
}
