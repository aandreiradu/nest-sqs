import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl, validateSync } from 'class-validator';
type AWS_REGIONS =
  | 'eu-central-1'
  | 'eu-west-1'
  | 'eu-west-2'
  | 'eu-west-3'
  | 'eu-north-1';

export class EnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  AWS_ACCESS_KEY: string;

  @IsNotEmpty()
  @IsString()
  AWS_SECRET_KEY: string;

  @IsNotEmpty()
  @IsString()
  AWS_REGION: string;

  @IsNotEmpty()
  @IsString()
  AWS_QUEUE_NAME: AWS_REGIONS;

  @IsNotEmpty()
  @IsUrl()
  AWS_QUEUE_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
