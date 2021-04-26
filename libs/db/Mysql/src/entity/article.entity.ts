/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/7 10:42
 */

import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Article {
    @PrimaryColumn({
        type: 'bigint',
        comment: '文章id',
        nullable: false
    })
    id: number
    @Column({
        type: 'int',
        comment: '文章绑定文集id',
        nullable: true
    })
    menuid: number

    @Column({
        type: 'text',
        comment: '文章标题',
        nullable: false
    })
    artTitle: string

    @Column({
        type: 'text',
        comment: '文章摘要',
        nullable: true
    })
    abstract: string

    @Column({
        type: 'text',
        comment: '文章分类',
        nullable: true
    })
    category: string

    @Column({
        type: 'int',
        comment: '文章标签',
        nullable: true
    })
    tag: number

    @Column({
        type: 'text',
        comment: '文章缩略图',
        nullable: true,
    })
    thumbnail: string

    @Column({
        type: 'text',
        comment: '文章内容',
        nullable: false
    })
    content: string

    @Column({
        type: 'bigint',
        comment: '文章发布时间',
        nullable: true,
    })
    cdate: number

    @Column({
        type: 'bigint',
        comment: '文章修改时间',
        nullable: true,
    })
    editdate: number

    @Column({
        type: 'int',
        comment: '文章浏览量',
        nullable: true,
        default: 0
    })
    pv: number

    @Column({
        type: 'int',
        comment: '文章留言数',
        nullable: true,
        default: 0
    })
    discuss: number

    @Column({
        type: 'int',
        comment: '文章状态：1-公开；0-未公开',
        nullable: true,
        default: 0
    })
    status: number
    @Column({
        type: 'int',
        comment: '文章推荐，数字越大推荐越高，0为不推荐',
        nullable: true,
        default: 0
    })
    recommend: number
    
}