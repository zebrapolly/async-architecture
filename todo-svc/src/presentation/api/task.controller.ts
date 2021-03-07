import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "../../core";
import { CreateTaskDto } from "./dto";

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  @Get()
  getTasks() {
    return this.taskService.getTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Post() 
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Put('/complete/:id')
  completeTask(@Param('id') id: string) {
    return this.taskService.completeTask(id);
  }

  @Put('/undone/:id')
  undoneTask(@Param('id') id: string) {
    return this.taskService.undoneTask(id);
  }
}