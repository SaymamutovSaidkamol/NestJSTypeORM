export class CreateAuthorDto {
    name: string;
    description: string;
    profiles?: { id: number }[]; // profiles ID larini jo‘natish uchun
  }
  