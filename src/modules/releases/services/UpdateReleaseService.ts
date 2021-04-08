import { injectable, inject } from 'tsyringe';

import { IReleasesRepository } from '@modules/releases/repositories/IReleasesRepository';

import { AppError } from '@shared/errors/AppError';

import { Release } from '../infra/typeorm/entities/Release';

interface IRequest {
  id: string;
  name?: string;
  paid?: boolean;
  annotations?: string;
  customer_id?: string;
}

@injectable()
export class UpdateReleaseService {
  constructor(
    @inject('ReleasesRepository')
    private releasesRepository: IReleasesRepository,
  ) {}

  public async execute({
    id,
    name,
    paid,
    annotations,
    customer_id,
  }: IRequest): Promise<Release> {
    const release = await this.releasesRepository.findById(id);

    if (!release) {
      throw new AppError('Release does not exist.');
    }

    if (name !== undefined) {
      release.name = name;
    }

    if (paid !== undefined) {
      release.paid = paid;
    }

    if (annotations !== undefined) {
      release.annotations = annotations;
    }

    if (customer_id !== undefined) {
      release.customer_id = customer_id;
    }

    await this.releasesRepository.save(release);

    return release;
  }
}
