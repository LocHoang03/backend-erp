import { SetMetadata } from '@nestjs/common';

export const Permission = (value: string) => SetMetadata('permission', value);
