import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from 'src/common/config/config.service';
import * as AWS from 'aws-sdk';

@Module({
  imports: [
    SqsModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          producers: [],
          consumers: [
            {
              name: configService.get('AWS_QUEUE_NAME'),
              queueUrl: configService.get('AWS_QUEUE_URL'),
              region: configService.get('AWS_REGION'),
              MaxNumberOfMessages: 10,
              WaitTimeSeconds: 20,
              VisibilityTimeout: 120,
              MessageAttributeNames: ['All'],
              AttributeNames: ['ApproximateReceiveCount'],
            },
          ],
        };
      },
    }),
  ],
  providers: [ConsumerService],
  exports: [ConsumerService],
})
export class ConsumerModule {
  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
      region: this.configService.get('AWS_REGION'),
    });
  }
}
