import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateTaskDto } from './task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    const task = await this.prisma.task.findUnique({ where: { id: id } });

    if (!task) throw new NotAcceptableException('task not found');

    return task;
  }

  getAll() {
    return this.prisma.task.findMany();
  }

  create(dto: CreateTaskDto) {
    return this.prisma.task.create({ data: dto });
  }

  async toggleTask(id: string) {
    const task = await this.getById(id);

    return this.prisma.task.update({
      where: { id: id },
      data: { isDone: !task.isDone }
    });
  }
}
