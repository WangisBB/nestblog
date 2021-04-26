/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/7 11:42
 */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ArtcleMenu {
  @PrimaryGeneratedColumn({
    type: "int",
    comment: 'id'
  })
  id: number
  @Column({
    type: "int",
    comment: '父目录id',
    nullable: true
  })
  pid: number
  @Column({
    type: "text",
    comment: '目录名称',
    nullable: false
  })
  menuname: string
  @Column({
    type: "int",
    comment: '排序',
    default: 0,
    nullable: false,
  })
  sort: number
  @Column({
    type: "int",
    comment: '类型，1：文集，2：文章',
    default: 1,
    nullable: false
  })
  type: number
  @Column({
    type: "text",
    comment: '备注',
    nullable: true
  })
  remork: string
  @Column({
    type: "bigint",
    comment: '创建时间',
    nullable: false,
    default: new Date().getTime()
  })
  cdate: number
}