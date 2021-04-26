
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export class ArticleCreateDto {
    @ApiPropertyOptional()
    readonly  id: number;
    @ApiProperty()
    readonly  menuid: number;
    @ApiProperty()
    readonly  artTitle: string;
    @ApiPropertyOptional()
    readonly  abstract: string;
    @ApiPropertyOptional()
    readonly   category: string;
    @ApiPropertyOptional()
    readonly tag: number;
    @ApiPropertyOptional()
    readonly   thumbnail: string;
    @ApiProperty()
    readonly  content: string;
    @ApiPropertyOptional()
    readonly    cdate: number;
    @ApiPropertyOptional()
    readonly    editdate: number;
    @ApiPropertyOptional()
    readonly    pv: number;
    @ApiPropertyOptional()
    readonly   discuss: number;
    @ApiPropertyOptional()
    readonly  status: number;
    @ApiPropertyOptional()
    readonly  recommend: number;
}
export class QueryArtcleDto {
    @ApiProperty()
    readonly id: number;
}
export class QueryMenuArtcleDto {
    @ApiProperty()
    readonly  artTitle: string;
    @ApiPropertyOptional()
    readonly  id: number;
    @ApiPropertyOptional()
    readonly menuid: number;
    @ApiPropertyOptional()
    readonly tag: number;
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
    readonly tag: number;
    @ApiPropertyOptional()
    readonly thumbnail: string;
    @ApiPropertyOptional()
    readonly content: string;
    @ApiPropertyOptional()
    readonly cdate: number;
    @ApiPropertyOptional()
    readonly editdate: number;
    @ApiPropertyOptional()
    readonly pv: number;
    @ApiPropertyOptional()
    readonly discuss: number;
    @ApiPropertyOptional()
    readonly status: number;
    @ApiPropertyOptional()
    readonly recommend: number;
    @ApiProperty()
    readonly pageNum: number;
    @ApiProperty()
    readonly pageSize: number;
}