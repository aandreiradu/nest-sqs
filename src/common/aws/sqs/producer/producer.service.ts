import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { ConfigService } from 'src/common/config/config.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProducerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly sqsService: SqsService,
  ) {}

  async publishMessage(message) {
    const id = uuidv4();
    return this.sqsService.send(this.configService.get('AWS_QUEUE_NAME'), {
      body: message,
      id,
    });
  }
}
