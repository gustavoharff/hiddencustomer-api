import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCompanyReleasesDatesService } from '@modules/releases/services/ListCompanyReleasesDatesService';

export class CompanyReleaseDatesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.user;

    const listReleseDates = container.resolve(ListCompanyReleasesDatesService);

    const dates = await listReleseDates.execute({
      company_id,
    });

    return response.json(dates);
  }
}
