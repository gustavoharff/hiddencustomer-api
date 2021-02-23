interface ICreateReleaseGroupDTO {
  name: string;
  type: 'whatsapp' | 'discord' | 'telegram';
  release_id: string;
}

export { ICreateReleaseGroupDTO };
