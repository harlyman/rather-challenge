import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class OrderbookHistoryPaginationDTO {
  @ApiProperty({ required: true, default: '0' })
  @IsString()
  offset?: string = '0';

  @ApiProperty({ required: true, default: '10' })
  @IsString()
  pageSize?: string = '10';

  @ApiProperty({ required: false, type: 'string', default: 'createdAt' })
  @IsOptional()
  @IsString()
  orderBy?: 'pair' | 'createdAt' = 'createdAt';

  @ApiProperty({ required: false, type: 'string', default: 'DESC' })
  @IsOptional()
  @IsString()
  orderType?: 'ASC' | 'DESC' = 'DESC';
}
