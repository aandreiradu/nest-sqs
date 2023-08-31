import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConsumerModule } from './common/aws/sqs/consumer/consumer.module';
import { ProducerModule } from './common/aws/sqs/producer/producer.module';
import { ConfigModule } from './common/config/config.module';
import { ProducerService } from './common/aws/sqs/producer/producer.service';
import { ConsumerService } from './common/aws/sqs/consumer/consumer.service';

@Module({
  imports: [ConfigModule, ProducerModule, ConsumerModule],
  controllers: [AppController],
  providers: [ProducerService, ConsumerService],
})
export class AppModule {}
