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
import { DataModel } from '../models';
import { DataModelRepository } from '../repositories';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import csv from 'fast-csv';

export class DataModelController {
    constructor(
        @repository(DataModelRepository)
        public dataModelRepository: DataModelRepository,
    ) { }

    storage = multer.diskStorage({
        destination: (req, file, callBack) => {
            callBack(null, './uploads/')    
        },
        filename: (req, file, callBack) => {
            callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })

    upload = multer({
        storage: this.storage
    });

    @post('/data-models')
    @response(200, {
        description: 'DataModel model instance',
        content: { 'application/json': { schema: getModelSchemaRef(DataModel) } },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(DataModel, {
                        title: 'NewDataModel',
                        exclude: ['id'],
                    }),
                },
            },
        })
        dataModel: Omit<DataModel, 'id'>
    ): Promise<DataModel> {
        console.log(this.upload.single("import-csv"))
        this.uploadCsv(__dirname + '/uploads/' + this.upload.single("import-csv"))
        return this.dataModelRepository.create(dataModel);
    }

    @get('/data-models/count')
    @response(200, {
        description: 'DataModel model count',
        content: { 'application/json': { schema: CountSchema } },
    })
    async count(
        @param.where(DataModel) where?: Where<DataModel>,
    ): Promise<Count> {
        return this.dataModelRepository.count(where);
    }

    @get('/data-models')
    @response(200, {
        description: 'Array of DataModel model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(DataModel, { includeRelations: true }),
                },
            },
        },
    })
    async find(
        @param.filter(DataModel) filter?: Filter<DataModel>,
    ): Promise<DataModel[]> {
        return this.dataModelRepository.find(filter);
    }

    @patch('/data-models')
    @response(200, {
        description: 'DataModel PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(DataModel, { partial: true }),
                },
            },
        })
        dataModel: DataModel,
        @param.where(DataModel) where?: Where<DataModel>,
    ): Promise<Count> {
        return this.dataModelRepository.updateAll(dataModel, where);
    }

    @get('/data-models/{id}')
    @response(200, {
        description: 'DataModel model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(DataModel, { includeRelations: true }),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(DataModel, { exclude: 'where' }) filter?: FilterExcludingWhere<DataModel>
    ): Promise<DataModel> {
        return this.dataModelRepository.findById(id, filter);
    }

    @patch('/data-models/{id}')
    @response(204, {
        description: 'DataModel PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(DataModel, { partial: true }),
                },
            },
        })
        dataModel: DataModel,
    ): Promise<void> {
        await this.dataModelRepository.updateById(id, dataModel);
    }

    @put('/data-models/{id}')
    @response(204, {
        description: 'DataModel PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() dataModel: DataModel,
    ): Promise<void> {
        await this.dataModelRepository.replaceById(id, dataModel);
    }

    @del('/data-models/{id}')
    @response(204, {
        description: 'DataModel DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.dataModelRepository.deleteById(id);
    }

    uploadCsv(uriFile: string){
        let stream = fs.createReadStream(uriFile);
        let csvDataColl: any[] = [];
        let fileStream = csv
            .parse()
            .on("data", function (data) {
                csvDataColl.push(data);
            })
            .on("end", function () {
                csvDataColl.shift();
      
                console.log(csvDataColl)
                 
                fs.unlinkSync(uriFile)
            });
      
        stream.pipe(fileStream);
    }
}
