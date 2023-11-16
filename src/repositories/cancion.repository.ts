import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DataJsonDataSource} from '../datasources';
import {Cancion, CancionRelations} from '../models';

export class CancionRepository extends DefaultCrudRepository<
  Cancion,
  typeof Cancion.prototype.idCancion,
  CancionRelations
> {
  constructor(
    @inject('datasources.dataJSON') dataSource: DataJsonDataSource,
  ) {
    super(Cancion, dataSource);
  }
}
