export interface ICreateReleaseGroupDTO {
  name: string;
  type: 'whatsapp' | 'discord' | 'telegram';
  release_id: string;
  company_id: string;
}
