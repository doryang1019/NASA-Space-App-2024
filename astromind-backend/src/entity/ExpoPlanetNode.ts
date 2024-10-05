import { Entity, PrimaryGeneratedColumn, Column, Tree, TreeChildren, TreeParent } from "typeorm"

@Entity()
@Tree("closure-table")
export class ExpoPlanetNode {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @TreeChildren()
    children: ExpoPlanetNode[]

    @TreeParent()
    parent: ExpoPlanetNode

    constructor(name: string) {
        this.name = name
    }

    addChild(child: ExpoPlanetNode) {
        if (!this.children) {
            this.children = []
        }
        this.children.push(child)
        child.parent = this
    }
}
