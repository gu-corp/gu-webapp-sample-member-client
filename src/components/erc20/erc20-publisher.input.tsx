import { MaxLength, IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class ERC20PublisherInput {
  @IsNotEmpty({
    message: 'this_field_cannot_be_empty',
    context: {
      errorCode: 'IS_NOT_EMPTY',
      developerNote: 'The validated string must contain 1 or more characters.',
    }
  })
  tokenName: string;

  @IsNotEmpty({
    message: 'this_field_cannot_be_empty',
    context: {
      errorCode: 'IS_NOT_EMPTY',
      developerNote: 'The validated string must contain 2 or more characters.',
    }
  })
  tokenSimbol: string;

  // @IsInt()
  totalSupply: number;
}