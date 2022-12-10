import { User, UserRepository } from '@loopback/authentication-jwt';
import {
    Count,
    CountSchema,
    Filter,
    FilterExcludingWhere,
    model,
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
    HttpErrors,
} from '@loopback/rest';
import { Experiment, ExperimentVariant, ExperimentTask } from '../models';
import { ExperimentRepository } from '../repositories';

export class ExperimentController {
    constructor(
        @repository(ExperimentRepository)
        public experimentRepository: ExperimentRepository,
        @repository(UserRepository) protected userRepository: UserRepository,
    ) { }

    @post('/experiments')
    @response(200, {
        description: 'Experiment model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Experiment) } },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Experiment, {
                        title: 'NewExperiment',
                        exclude: ['id'],
                    }),
                },
            },
        })
        experiment: Omit<Experiment, 'id'>,
    ): Promise<Experiment> {
        return this.experimentRepository.create(experiment);
    }

    @get('/experiments/count')
    @response(200, {
        description: 'Experiment model count',
        content: { 'application/json': { schema: CountSchema } },
    })
    async count(
        @param.where(Experiment) where?: Where<Experiment>,
    ): Promise<Count> {
        return this.experimentRepository.count(where);
    }

    @get('/experiments')
    @response(200, {
        description: 'Array of Experiment model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(Experiment, { includeRelations: true }),
                },
            },
        },
    })
    async find(
        @param.filter(Experiment) filter?: Filter<Experiment>,
    ): Promise<Experiment[]> {
        return this.experimentRepository.find(filter);
    }

    @patch('/experiments')
    @response(200, {
        description: 'Experiment PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Experiment, { partial: true }),
                },
            },
        })
        experiment: Experiment,
        @param.where(Experiment) where?: Where<Experiment>,
    ): Promise<Count> {
        return this.experimentRepository.updateAll(experiment, where);
    }

    @get('/experiments/{id}')
    @response(200, {
        description: 'Experiment model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Experiment, { includeRelations: true }),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(Experiment, { exclude: 'where' }) filter?: FilterExcludingWhere<Experiment>
    ): Promise<Experiment> {
        return this.experimentRepository.findById(id, filter);
    }

    @patch('/experiments/{id}')
    @response(204, {
        description: 'Experiment PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Experiment, { partial: true }),
                },
            },
        })
        experiment: Experiment,
    ): Promise<void> {
        const total: number = experiment.experimentVarients.map(v => parseFloat(v.percentage.toString())).reduce((acc, cur) => acc + cur, 0)

        if (total > 100) {
            throw new HttpErrors.UnprocessableEntity('Sum of all varients cannot be greater than 100%');
        }
        if (experiment.experimentVarients.find((v) => v.percentage == 0)) {
            throw new HttpErrors.UnprocessableEntity('Percentage cannot be 0');
        }
        if (experiment.addtask) {
            // add the tasks to the user directory
            await this.addExperimentTaskToUsers(experiment.id, experiment.newTask)
        }
        await this.experimentRepository.updateById(id, experiment);
    }

    @put('/experiments/{id}')
    @response(204, {
        description: 'Experiment PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() experiment: Experiment,
    ): Promise<void> {
        await this.experimentRepository.replaceById(id, experiment);
    }

    @del('/experiments/{id}')
    @response(204, {
        description: 'Experiment DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.experimentRepository.deleteById(id);
    }

    @get('/experiments/{eId}/{vId}')
    @response(200, {
        description: 'Experiment model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Experiment, { includeRelations: true }),
            },
        },
    })
    async findVariantById(
        @param.path.string('eId') eId: string,
        @param.path.string('vId') vId: string,
    ): Promise<ExperimentVariant> {
        return (await this.experimentRepository.findById(eId)).experimentVarients.filter(v => v.id == vId)[0];
    }

    async addExperimentTaskToUsers(expId: string, task: ExperimentTask) {
        const users: User[] = await this.userRepository.find()
        for (let u of users) {
            u.experimentVariants.forEach(async (v: any) => {
                if (v.exp_id == expId) {
                    console.log('Comes here')
                    if (v.experimentTasks) {
                        v.experimentTasks.push(task)
                    } else {
                        v.experimentTasks = [task]
                    }
                }
                await this.userRepository.updateById(u.id, u)
            })
        }
    }
}


class AddTask extends Experiment {
    addtask: boolean
    newTask: ExperimentTask
}