export interface ICreateReleaseGroupDTO {
  name: string;
  type: 'whatsapp' | 'discord' | 'telegram';
  release_date_id?: string;
  release_id: string;
  company_id: string;
}
