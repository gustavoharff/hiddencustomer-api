import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { CreateUserService } from '@modules/users/services/CreateUserService';
import { ChangeUserAccessService } from '@modules/users/services/ChangeUserAccessService';
import { UpdateUserService } from '@modules/users/services/UpdateUserService';
import { ListUsersService } from '@modules/users/services/ListUsersService';

export class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute();

    return response.json(classToClass(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, company_id } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      company_id,
    });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { active } = request.body;
    const { name, email, password, company_id } = request.body;
    const { id } = request.params;

    const changeUserAccess = container.resolve(ChangeUserAccessService);

    if (active) {
      const user = await changeUserAccess.execute({
        active,
        user_id: id,
      });

      return response.json(classToClass(user));
    }
    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      name,
      company_id,
      email,
      user_id: id,
      password,
    });

    return response.json(classToClass(user));
  }
}
