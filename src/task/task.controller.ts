import { CreateTaskDto, Task } from './task.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { TaskService } from './task.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

@ApiTags('TaskService')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, type: [Task] })
  async getTasks() {
    return this.taskService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({ status: 200, description: 'Created task', type: Task })
  @ApiBody({ type: CreateTaskDto })
  @UsePipes(new ValidationPipe())
  async createTasks(
    @Body()
    dto: CreateTaskDto
  ) {
    return this.taskService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Toggle isDone for one task' })
  @ApiResponse({ status: 200, description: 'Changed task', type: Task })
  @ApiParam({ name: 'id', description: 'Task ID', type: 'integer', example: 1 })
  async toggleTask(
    @Param()
    params: {
      id: string;
    }
  ) {
    return this.taskService.toggleTask(params.id);
  }
}
