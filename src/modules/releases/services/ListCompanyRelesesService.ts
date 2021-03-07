import { injectable, inject } from 'tsyringe';

import IReleasesRepository from '@modules/releases/repositories/IReleasesRepository';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';

import Release from '@modules/releases/infra/typeorm/entities/Release';
import AppError from '@shared/errors/AppError';
import { IReleaseDatesRepository } from '../repositories/IReleaseDatesRepository';
import { IReleaseGroupsRepository } from '../repositories/IReleaseGroupsRepository';

interface IRequest {
  company_id: string;
}

interface IReleaseWithDates extends Release {
  interval: Date[];
  dates_counter: number;
}

@injectable()
class ListCompanyReleasesService {
  constructor(
    @inject('ReleaseGroupsRepository')
    private releaseGroupsRepository: IReleaseGroupsRepository,

    @inject('ReleaseDatesRepository')
    private releaseDatesRepository: IReleaseDatesRepository,

    @inject('ReleasesRepository')
    private releasesRepository: IReleasesRepository,

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({ company_id }: IRequest): Promise<IReleaseWithDates[]> {
    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError('Companie does not exist.');
    }

    const releases = await this.releasesRepository.findByCompany(company_id);

    const releasesWithDates = await Promise.all(
      releases.map(async release => {
        const dates = await this.releaseDatesRepository.findByRelease(
          release.id,
        );

        const groups = await this.releaseGroupsRepository.findByRelease(
          release.id,
        );

        if (dates.length <= 0) {
          return {
            ...release,
            interval: [],
            dates_counter: dates.length,
            groups_counter: groups.length,
          };
        }

        return {
          ...release,
          interval: [dates[dates.length - 1].date, dates[0].date],
          dates_counter: dates.length,
          groups_counter: groups.length,
        };
      }),
    );

    return releasesWithDates;
  }
}

export { ListCompanyReleasesService };
