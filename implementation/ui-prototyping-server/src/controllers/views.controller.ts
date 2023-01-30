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
import { View } from '../models';
import { ViewRepository } from '../repositories';
const jsonFileDir = require('../../public/json/example.json').dirname
import fs from 'fs-extra'
import path from 'path';

export class ViewsController {
    constructor(
        @repository(ViewRepository)
        public viewRepository: ViewRepository,
    ) { }

    @post('/views')
    @response(200, {
        description: 'View model instance',
        content: { 'application/json': { schema: getModelSchemaRef(View) } },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(View, {
                        title: 'NewView',

                    }),
                },
            },
        })
        view: View,
    ): Promise<View | void> {
        const views = await this.viewRepository.find()
        this.saveToJson(view)
        if (views.length > 0) {
            return this.viewRepository.updateById(view.id, view);
        } else {
            return this.viewRepository.create(view);
        }

    }

    saveToJson(view: View) {
        const myPath = path.join(__dirname, '..', '..', 'public/json/example.json')
        let jsonFile = fs.readJSONSync(myPath, { encoding: 'utf-8' })
        if(typeof jsonFile == 'string') {
            jsonFile = JSON.parse(jsonFile)
        }
        jsonFile.schemaForAngular = view
        fs.writeJSONSync(myPath, jsonFile)
    }

    @get('/views/count')
    @response(200, {
        description: 'View model count',
        content: { 'application/json': { schema: CountSchema } },
    })
    async count(
        @param.where(View) where?: Where<View>,
    ): Promise<Count> {
        return this.viewRepository.count(where);
    }

    @get('/views')
    @response(200, {
        description: 'Array of View model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(View, { includeRelations: true }),
                },
            },
        },
    })
    async find(
        @param.filter(View) filter?: Filter<View>,
    ): Promise<View[]> {
        return this.viewRepository.find(filter);
    }

    @patch('/views')
    @response(200, {
        description: 'View PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(View, { partial: true }),
                },
            },
        })
        view: View,
        @param.where(View) where?: Where<View>,
    ): Promise<Count> {
        return this.viewRepository.updateAll(view, where);
    }

    @get('/views/{id}')
    @response(200, {
        description: 'View model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(View, { includeRelations: true }),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(View, { exclude: 'where' }) filter?: FilterExcludingWhere<View>
    ): Promise<View> {
        return this.viewRepository.findById(id, filter);
    }

    @patch('/views/{id}')
    @response(204, {
        description: 'View PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(View, { partial: true }),
                },
            },
        })
        view: View,
    ): Promise<void> {
        await this.viewRepository.updateById(id, view);
    }

    @put('/views/{id}')
    @response(204, {
        description: 'View PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() view: View,
    ): Promise<void> {
        await this.viewRepository.replaceById(id, view);
    }

    @del('/views/{id}')
    @response(204, {
        description: 'View DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.viewRepository.deleteById(id);
    }
}
