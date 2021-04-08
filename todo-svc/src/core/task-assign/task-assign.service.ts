import { Injectable, Logger } from "@nestjs/common";
import { TASK_STATUS } from "../../domain";
import { EventBusService, ProfileStore, TaskStore } from "../../infrastructure";

@Injectable()
export class TaskAssignService {
  private readonly logger = new Logger(TaskAssignService.name);
  constructor(
    private readonly taskStore: TaskStore,
    private readonly profileStore: ProfileStore,
    private readonly eventService: EventBusService
  ) {

  }
  async process() {
    const [profileIds, taskIds] = await Promise.all([
      this.profileStore.getAll().then(res => res.map(i => i.publicId)),
      this.taskStore.getTasks({ status: TASK_STATUS.NEW }).then(res => res.map(i => i.publicId))
    ]);

    for (const taskId of taskIds) {
      const randomProfileId = profileIds[Math.floor(Math.random() * profileIds.length)];
      this.processTask(taskId, randomProfileId)
    }
  }

  async processTask(taskId: string, assigneeId: string) {
    try {
      await this.taskStore.updateTaskById(taskId, { assigneeId });
      console.log({taskId, profileId: assigneeId})
      await this.eventService.sendTaskAssigned({taskId, profileId: assigneeId});
    } catch (error) {
      this.logger.error('problem with task assign process', error.message);
    }
  }
}