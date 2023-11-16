import {Entity, model, property} from '@loopback/repository';

@model()
export class Cancion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idCancion?: number;

  @property({
    type: 'number',
    required: true,
  })
  nomCancion: number;

  @property({
    type: 'string',
    required: true,
  })
  duracion: string;


  constructor(data?: Partial<Cancion>) {
    super(data);
  }
}

export interface CancionRelations {
  // describe navigational properties here
}

export type CancionWithRelations = Cancion & CancionRelations;
