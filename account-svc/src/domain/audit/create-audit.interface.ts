export interface ICreateAudit {
  readonly profileId: string;
  readonly debit: number;
  readonly credit: number;
  readonly reason: string;
  readonly comment?: string;
}