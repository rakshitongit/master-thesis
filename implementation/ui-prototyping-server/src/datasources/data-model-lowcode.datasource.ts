import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
require('dotenv/config');

const config = {
  name: 'dataModelLowcode',
  connector: 'mongodb',
  url: process.env.DB_HOST_LOW_CODE,
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DataModelLowcodeDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'dataModelLowcode';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.dataModelLowcode', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
