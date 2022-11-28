import { authenticate, TokenService } from '@loopback/authentication';
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  User,
  UserRepository,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import { inject } from '@loopback/core';
import { model, property, repository } from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  post,
  requestBody,
  SchemaObject,
  response
} from '@loopback/rest';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { genSalt, hash } from 'bcryptjs';
import { randomUUID } from 'crypto';
import _ from 'lodash';
import { Experiment, MyUser } from '../models';
import { ExperimentRepository } from '../repositories';

class UsersSet {
  number_of_users: number
  password: string
}

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': { schema: CredentialsSchema },
  },
};

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, { optional: true })
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
    @repository(ExperimentRepository) protected experimentRepository: ExperimentRepository,
  ) { }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{ token: string }> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return { token };
  }

  @authenticate('jwt')
  @get('/whoAmI', {
    responses: {
      '200': {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<string> {
    return currentUserProfile[securityId];
  }

  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MyUser, {
            title: 'NewUser',
          }),
        },
      },
    })
    newUserRequest: MyUser,
  ): Promise<User> {
    const password = await hash(newUserRequest.password, await genSalt());
    const savedUser = await this.userRepository.create(
      _.omit(newUserRequest, 'password'),
    );

    await this.userRepository.userCredentials(savedUser.id).create({ password });

    return savedUser;
  }

  @post('/users/newSet', {
    responses: {
      '200': {
        description: 'Users added'
      },
    },
  })
  async addUsers(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsersSet, {
            title: 'Add users',
          }),
        },
      },
    })
    userSet: UsersSet,
  ): Promise<boolean> {
    await this.userRepository.deleteAll()
    for (let i = 0; i < userSet.number_of_users; i++) {
      const user: MyUser = MyUser.createInstance(userSet.password)
      await this.signUp(user)
    }
    const users: any[] = await this.userRepository.find();
    const experiments: Experiment[] = await this.experimentRepository.find()
    console.log(experiments)
    experiments.forEach(experiment => {
      assign_experiment_to_users(experiment, users)
    })
    console.log(users.forEach(u=> console.log(u.experimentVarients)))
    users.forEach(async u => await this.userRepository.updateById(u.id, u))
    return true
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, { includeRelations: true }),
        },
      },
    },
  })
  async find(): Promise<User[]> {
    return this.userRepository.find();
  }
}

export function assign_experiment_to_users(experiment: Experiment, users: MyUser[], isDelete: boolean = false) {
  // remove if this experiment exists
  users.forEach(user => user.experimentVariants = user.experimentVariants?.filter(exp => exp.exp_id != experiment.id))
  if (isDelete) {
    return
  }
  const varients_length: number = experiment.experimentVarients.length
  let user_assigned: number = 0
  for (let i = 0; i < varients_length; i++) {
    if (i == varients_length - 1) {
      const users_to_be_assigned: number = users.length - user_assigned
      add_users(experiment, users_to_be_assigned, users, i)
    } else {
      const percentage: number = experiment.experimentVarients[i].percentage
      const users_to_be_assigned: number = Math.floor(percentage * users.length / 100)
      add_users(experiment, users_to_be_assigned, users, i)
      user_assigned += users_to_be_assigned
    }
  }
}

function add_users(experiment: Experiment, users_to_be_assigned: number, users: MyUser[], i: number) {
  let j = 0
  for (let u of users) {
    if (u.experimentVariants == undefined) {
      u.experimentVariants = []
    } else {
      if (!u.experimentVariants.flatMap(ex => ex.exp_id).includes(experiment.getId())) {
        if (j != users_to_be_assigned) {
          // add experiment varient
          if (u.experimentVariants) {
            u.experimentVariants.push({ exp_id: experiment.getId(), variant_id: experiment.experimentVarients[i].id, variant_name: experiment.experimentVarients[i].name })
          } else {
            u.experimentVariants = [{ exp_id: experiment.getId(), variant_id: experiment.experimentVarients[i].id, variant_name: experiment.experimentVarients[i].name }]
          }
          j++
        }
      }
    }
  }
}
