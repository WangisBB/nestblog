import {Body, Controller, HttpCode, Post, Put,Get, UseGuards,Query,Param, Delete} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags,ApiQuery} from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import {articleMenuService} from "./articleMenu.service";
import { articleMenuCreateDto,GetArtcleDto,QueryArtcleDto,ArticleDetailDto,ArticleTypeDto } from "./dto/article.dto";

@ApiTags('文集')
@Controller('articleMenu')
export class articleMenuController {
    constructor(
        private readonly articleMenuService: articleMenuService
    ) {}
    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiOperation({
        summary: '添加文集'
    })
    @HttpCode(200)
    async addarticleMenu(@Body() params:articleMenuCreateDto): Promise<any> {
        const addArt = await this.articleMenuService.addarticleMenu(params)
        return addArt
    }
    @UseGuards(AuthGuard('jwt'))
    @Put()
    @ApiOperation({
        summary: '编辑文集'
    })
    @HttpCode(200)
  
    @ApiBearerAuth()
    async editArticle(@Body() params:articleMenuCreateDto): Promise<any> {
        const editArt = await this.articleMenuService.editArticle(params)
        return editArt
    }

    @Get()
    @ApiOperation({
        summary: '获取文集/tag列表,type=1,文集，type=2，tag'
    })
    @HttpCode(200)
    async getArticleMenu(@Query() params:ArticleTypeDto): Promise<any> {
        const List = await this.articleMenuService.getArticleMenu(params)
        return List
    }
    // @Get(':id')
    // @ApiOperation({
    //     summary: '获取文集详情'
    // })
    // @HttpCode(200)
    // async getArticleDetail(@Param() params:ArticleDetailDto): Promise<any> {
    //     const List = await this.articleMenuService.getArticleDetail(params)
    //     return List
    // }
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @ApiOperation({
        summary: '删除文集/tag列表'
    })
    @HttpCode(200)
    async DelArticle(@Param() params:QueryArtcleDto ): Promise<any> {
        const deleteArticle = await this.articleMenuService.deleteArticle(params)
        // console.log(params,deleteArticle)
        return deleteArticle
    }
}
