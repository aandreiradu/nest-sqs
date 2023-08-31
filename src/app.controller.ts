import { Controller, Get } from '@nestjs/common';
import { ProducerService } from './common/aws/sqs/producer/producer.service';

@Controller()
export class AppController {
  constructor(private readonly producerService: ProducerService) {}

  @Get()
  async getHello() {
    try {
      return this.producerService.publishMessage({
        message: 'Hey, message from NestJS',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.log('error producer', error);
      return error;
    }
  }
}
