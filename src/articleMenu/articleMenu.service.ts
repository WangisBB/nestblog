import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { ArtcleMenu } from "../../libs/db/Mysql/src/entity/artcleMenu.entity";
import { InjectRepository } from "@nestjs/typeorm";
// import {CustomException} from "@common/common/common/http.decoration";
const request = require('request')
@Injectable()
export class articleMenuService {
    constructor(
        @InjectRepository(ArtcleMenu)
        private readonly ArtcleMenuRepository: Repository<ArtcleMenu>
    ) { }
    async addarticleMenu(params): Promise<any> {
        return await this.ArtcleMenuRepository.save(params).then(res => {
            return { type: 'success', msg: "操作成功" }
        }).catch(err => {
            console.log('addArticle-err', err)
            // throw new CustomException('操作失败')
        })
    }
    async editArticle(params): Promise<any> {
    
        return await this.ArtcleMenuRepository.update(params.id,params).then(res => {
            if (res.raw.affectedRows > 0) {
                return { type: 'success', msg: "操作成功" }
            } else {
                return { type: 'error', msg: "操作失败" }
            }

            // 百度推送
            request.post({
                url: `http://data.zz.baidu.com/update?site=${process.env.BAIDU_PUSH_SITE}&token=${process.env.BAIDU_PUSH_TOKEN}`,
                headers: { 'Content-Type': 'text/plain' },
                body: `${process.env.BAIDU_PUSH_SITE}/article/${params.id}`
            }, (error, response, body) => {
                console.log('百度更新结果：', body);
            })

        }).catch(err => err)
    }

    // async getArticleMenuTree(): Promise<any> {
    //     const artList = JSON.parse(JSON.stringify(await this.ArtcleMenuRepository.query(`SELECT id,pid,menuname,sort,remork,cdate FROM artcle_menu order by sort`)))
    //     let parentchild = {}
    //     let parent = {}
    //     artList.forEach(el => {
    //         (parentchild[el.pid] || (parentchild[el.pid] = [])).push(el)
    //     })

    //     let parentchildkeys = Object.keys(parentchild)
    //     parentchildkeys.forEach(_pid => {
    //         artList.forEach(el => {
    //             if (el.id == _pid) {
    //                 return parent[_pid] = el
    //             }
    //         });

    //         (parent[_pid] || (parent[_pid] = {})).children = parentchild[_pid]
    //     })
    //     return parent[0].children
    // }

    async getArticleMenu(params): Promise<any> {
        // const artList = await this.ArtcleMenuRepository.find({ type: 1 })
        const artList = await this.ArtcleMenuRepository.createQueryBuilder("artcle_menu"). where('artcle_menu.type= :type',{type: params.type}). orderBy("artcle_menu.sort", "DESC").getMany();
        // const artList = await this.ArtcleMenuRepository.query(`SELECT id,pid,menuname,sort,remork,cdate FROM artcle_menu WHERE type = 1  ORDER BY sort ASC`)
        return artList
    }

    /**
     * 
     * @param params 查询文集详情
     */
    async getArticleDetail(params): Promise<any> {
        const articleDetail = await this.ArtcleMenuRepository.find({ type: 2, pid: params.id })
        return articleDetail
    }
    /**
     * 查询总条数
     */

    async getArtCount(): Promise<number> {
        return await this.ArtcleMenuRepository.createQueryBuilder().getCount()
    }
    /**
     * 
     * @param params id 删除文集
     */
    async deleteArticle(params): Promise<any> {
        return await this.ArtcleMenuRepository.delete(params.id).then(res => {
            if (res.raw.affectedRows > 0) {
                return { type: 'success', msg: "操作成功" }
            }
        }).catch(err => err)


    }
}
