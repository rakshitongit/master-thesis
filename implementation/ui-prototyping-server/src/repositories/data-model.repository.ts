import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DataModelLowcodeDataSource} from '../datasources';
import {DataModel, DataModelRelations} from '../models';

export class DataModelRepository extends DefaultCrudRepository<
  DataModel,
  typeof DataModel.prototype.id,
  DataModelRelations
> {
  constructor(
    @inject('datasources.dataModelLowcode') dataSource: DataModelLowcodeDataSource,
  ) {
    super(DataModel, dataSource);
  }
}
