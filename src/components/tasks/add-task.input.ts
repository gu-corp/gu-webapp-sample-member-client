import { MaxLength, IsNotEmpty } from 'class-validator';

export class NewTaskInput {
  @MaxLength(10, {
    message: 'the_number_of_characters_cannot_be_more_than_10',
    context: {
      errorCode: 'MAX_LENGTH',
      developerNote: 'The validated string must contain 10 or more characters.',
    }
  })
  @IsNotEmpty({
    message: 'this_field_cannot_be_empty',
    context: {
      errorCode: 'IS_NOT_EMPTY',
      developerNote: 'The validated string must contain 32 or more characters.',
    }
  })
  taskName: string;
}