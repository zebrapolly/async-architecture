export class CreateTaskDto {
  readonly title: string;
  readonly description: string;
  readonly assigneeId: string;
  readonly assignerId: string;
}