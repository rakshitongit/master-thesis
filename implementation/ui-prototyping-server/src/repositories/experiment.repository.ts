import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Experiment, ExperimentRelations} from '../models';

export class ExperimentRepository extends DefaultCrudRepository<
  Experiment,
  typeof Experiment.prototype.id,
  ExperimentRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Experiment, dataSource);
  }
}
