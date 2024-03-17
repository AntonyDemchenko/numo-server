import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get APi' })
  @ApiResponse({ status: 200 })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
