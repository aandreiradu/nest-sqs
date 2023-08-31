import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ConfigService } from 'src/common/config/config.service';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ConfigModule } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Module({
  imports: [
    SqsModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          consumers: [],
          producers: [
            {
              name: configService.get('AWS_QUEUE_NAME'),
              queueUrl: configService.get('AWS_QUEUE_URL'),
              region: configService.get('AWS_REGION'),
            },
          ],
        };
      },
    }),
  ],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {
  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
      region: this.configService.get('AWS_REGION'),
    });
  }
}
