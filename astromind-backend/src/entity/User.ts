import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    public id: string

    @Column()
    public firstName: string

    @Column()
    public lastName: string

    @Column()
    public email: string

    @Column({ default: true })
    public isActive: boolean
}
