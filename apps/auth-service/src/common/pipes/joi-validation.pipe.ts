import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const { error, value: validated } = this.schema.validate(value, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new BadRequestException(
        error.details.map(d => d.message),
      );
    }

    return validated;
  }
}
