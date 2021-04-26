import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {Article} from "./../../libs/db/Mysql/src/entity/article.entity";
import {InjectRepository} from "@nestjs/typeorm";
// import {CustomException} from "@common/common/common/http.decoration";
const request = require('request')
@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>
    ) {}
    async addArticle(params): Promise<any>{
        const currentTime = new Date().getTime()
        const newArticle =Object.assign(new Article(),params) 

        newArticle.id = currentTime
        // newArticle.artTitle = params.artTitle
        // newArticle.abstract = params.abstract
        // newArticle.category = params.category
        // newArticle.content = params.content
        // newArticle.tag = params.tag
        // newArticle.thumbnail = params.thumbnail
        newArticle.cdate = currentTime
        newArticle.editdate = currentTime
        console.log(newArticle)
        return await this.articleRepository.save(newArticle).then(res => {
            // 百度 seo push
            // request.post({
            //     url: `http://data.zz.baidu.com/urls?site=${process.env.BAIDU_PUSH_SITE}&token=${process.env.BAIDU_PUSH_TOKEN}`,
            //     headers: { 'Content-Type': 'text/plain' },
            //     body: `${process.env.BAIDU_PUSH_SITE}/article/${newArticle.id}`
            // }, (error, response, body) => {
            //     console.log('推送结果：', body)
            // })
            return {type:'success',msg: "操作成功"}
        }).catch( err => {
            console.log('addArticle-err', err)
            // throw new CustomException('操作失败')
        })
    }
    async editArticle(params): Promise<any>{
        const currentTime = new Date().getTime()
        return await this.articleRepository.update(params.id, {
            artTitle: params.artTitle,
            abstract: params.abstract,
            category: params.category,
            content: params.content,
            tag: params.tag,
            thumbnail: params.thumbnail,
            editdate: currentTime,
        }).then(res => {
            if(res.raw.affectedRows>0){
                return {type:'success',msg: "操作成功"}
            }else{
                 return {type:'error',msg: "操作失败"}
            }
         
            // 百度推送
            // request.post({
            //     url: `http://data.zz.baidu.com/update?site=${process.env.BAIDU_PUSH_SITE}&token=${process.env.BAIDU_PUSH_TOKEN}`,
            //     headers: { 'Content-Type': 'text/plain' },
            //     body: `${process.env.BAIDU_PUSH_SITE}/article/${params.id}`
            // }, (error, response, body) => {
            //     console.log('百度更新结果：', body);
            // })
           
        }).catch( err =>err)
    }
    /**
     * 
     * @param params 查询文章列表
     */
    async getArticleList(params): Promise<any>{
        console.log(params)
        const artList = await this.articleRepository.query(`
            select 
            A.id, A.artTitle, A.abstract, 
            (SELECT categoryname FROM category where FIND_IN_SET(A.category, id) ) as category, 
            GROUP_CONCAT(T.tagname) as tag, 
            A.thumbnail, A.pv, 
            (SELECT COUNT(*) FROM comment where artId = A.id ) as discuss, 
            A.content, 
            A.cdate,  
            A.editdate,
            A.status
            from article as A
            left join tag as T 
            on FIND_IN_SET(T.id , A.tag)
            group by A.id    
            ORDER BY A.cdate desc 
            limit ${(params.pageNum - 1) * params.pageSize}, ${params.pageSize};
        `)
        // const artList = await this.articleRepository.find(params)
        console.log(artList)
        return artList
    }
    async getMenuArticle(params): Promise<any>{
        const artList = await this.articleRepository.find(params)
        console.log(artList)
        return artList
    }
    /**
     * 
     * @param params 查询文章详情
     */
    async getArticleDetail(params): Promise<any>{
        const articleDetail = await this.articleRepository.
            createQueryBuilder('article').
            where('article.id= :id',{id: params.id}).getOne()
        return articleDetail
    }
    /**
     * 查询总条数
     */

    async getArtCount():Promise<number> {
        return await this.articleRepository.createQueryBuilder().getCount()
    }
    /**
     * 
     * @param params id 删除文章
     */
    async deleteArticle(params): Promise<any> {
        return await this.articleRepository.delete(params.id).then(res=>{
            if(res.raw.affectedRows>0){
              return{type:'success',msg: "操作成功"}
            }
        }).catch(err=>err)
        // DeleteResult {
        //     raw: OkPacket {
        //       fieldCount: 0,
        //       affectedRows: 1,
        //       insertId: 0,
        //       serverStatus: 2,
        //       warningCount: 0,
        //       message: '',
        //       protocol41: true,
        //       changedRows: 0
        //     },
        //     affected: 1
        //   }
        // return await this.articleRepository.update(params.id, {
        //     status: params.status
        // }).then( res => {
        //     const affectedRows = res.raw.affectedRows
        //     if(affectedRows > 0){
        //         if (params.status == 0) {
        //             request.post({
        //                 url: `http://data.zz.baidu.com/del?site=${process.env.BAIDU_PUSH_SITE}&token=${process.env.BAIDU_PUSH_TOKEN}`,
        //                 headers: { 'Content-Type': 'text/plain' },
        //                 body: `${process.env.BAIDU_PUSH_SITE}/article/${params.id}`
        //             }, (error, response, body) => {
        //                 console.log('百度删除结果：', body);
        //             })
        //         } else if (params.status == 1) {
        //             request.post({
        //                 url: `http://data.zz.baidu.com/urls?site=${process.env.BAIDU_PUSH_SITE}&token=${process.env.BAIDU_PUSH_TOKEN}`,
        //                 headers: { 'Content-Type': 'text/plain' },
        //                 body: `${process.env.BAIDU_PUSH_SITE}/article/${params.id}`
        //             }, (error, response, body) => {
        //                 console.log('推送结果：', body)
        //             })
        //         }
        //         return '操作成功'
        //     } else {
        //         // throw new CustomException('操作失败')
        //     }
        // }).catch( err => {
        //     console.log('delArticle-err', err)
            // throw new CustomException('操作失败')
        // })

    }
}
