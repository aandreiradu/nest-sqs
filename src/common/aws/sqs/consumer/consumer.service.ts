import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';

@Injectable()
export class ConsumerService {
  @SqsMessageHandler('nest-sqs', false)
  async handleMessage(message: AWS.SQS.Message) {
    console.log('message from consumer', message);
    return true;
  }
}
