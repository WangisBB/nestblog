
import {ApiProperty,ApiPropertyOptional} from "@nestjs/swagger";


export class articleMenuCreateDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    pid: number;
    @ApiProperty()
    menuname: number;
    @ApiProperty()
    remork: number;
    @ApiProperty()
    type: number;
}
export class ArticleDetailDto {
    @ApiProperty()
    id: number;
}
export class ArticleTypeDto {
    @ApiProperty()
    type: number;
}
export class GetArtcleDto {
    @ApiPropertyOptional()
      readonly id: number;
      @ApiPropertyOptional()
      readonly artTitle: string;
      @ApiPropertyOptional()
      readonly abstract: string;
      @ApiPropertyOptional()
      readonly category: string;
       @ApiPropertyOptional()
      readonly tag: string;
       @ApiPropertyOptional()
      readonly thumbnail: string;
       @ApiPropertyOptional()
      readonly  content: string;
       @ApiPropertyOptional()
      readonly  cdate: number;
       @ApiPropertyOptional()
      readonly editdate: number;
       @ApiPropertyOptional()
      readonly  pv: number;
       @ApiPropertyOptional()
      readonly   discuss: number;
       @ApiPropertyOptional()
      readonly  status: number;
       @ApiProperty()
      readonly  pageNum: number;
       @ApiProperty()
      readonly  pageSize: number;
  }
  export class QueryArtcleDto {
    @ApiProperty()
       readonly id: number;
   }