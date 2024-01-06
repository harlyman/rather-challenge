import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ResposeResultsPaginationDTO {
  @ApiProperty({ required: true })
  @IsNumber()
  total: number;

  @ApiProperty({ required: true })
  @IsNumber()
  pageSize: number;

  @ApiProperty({ required: true })
  @IsNumber()
  offset: number;

  @ApiProperty({ required: true })
  @IsNumber()
  results: any[];
}
