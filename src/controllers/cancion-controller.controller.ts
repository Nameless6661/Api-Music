import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Cancion} from '../models';
import {CancionRepository} from '../repositories';

export class CancionControllerController {
  constructor(
    @repository(CancionRepository)
    public cancionRepository : CancionRepository,
  ) {}

  @post('/canciones')
  @response(200, {
    description: 'Cancion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cancion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cancion, {
            title: 'NewCancion',
            exclude: ['idCancion'],
          }),
        },
      },
    })
    cancion: Omit<Cancion, 'idCancion'>,
  ): Promise<Cancion> {
    return this.cancionRepository.create(cancion);
  }

  @get('/canciones/count')
  @response(200, {
    description: 'Cancion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cancion) where?: Where<Cancion>,
  ): Promise<Count> {
    return this.cancionRepository.count(where);
  }

  @get('/canciones')
  @response(200, {
    description: 'Array of Cancion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cancion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cancion) filter?: Filter<Cancion>,
  ): Promise<Cancion[]> {
    return this.cancionRepository.find(filter);
  }

  @patch('/canciones')
  @response(200, {
    description: 'Cancion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cancion, {partial: true}),
        },
      },
    })
    cancion: Cancion,
    @param.where(Cancion) where?: Where<Cancion>,
  ): Promise<Count> {
    return this.cancionRepository.updateAll(cancion, where);
  }

  @get('/canciones/{id}')
  @response(200, {
    description: 'Cancion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cancion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Cancion, {exclude: 'where'}) filter?: FilterExcludingWhere<Cancion>
  ): Promise<Cancion> {
    return this.cancionRepository.findById(id, filter);
  }

  @patch('/canciones/{id}')
  @response(204, {
    description: 'Cancion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cancion, {partial: true}),
        },
      },
    })
    cancion: Cancion,
  ): Promise<void> {
    await this.cancionRepository.updateById(id, cancion);
  }

  @put('/canciones/{id}')
  @response(204, {
    description: 'Cancion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cancion: Cancion,
  ): Promise<void> {
    await this.cancionRepository.replaceById(id, cancion);
  }

  @del('/canciones/{id}')
  @response(204, {
    description: 'Cancion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cancionRepository.deleteById(id);
  }
}
