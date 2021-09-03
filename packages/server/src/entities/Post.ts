import { Field, ObjectType } from "type-graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    creatorId: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.posts)
    creator: User;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column({ default: 0 })
    likes: number;

    @Field()
    @Column()
    imgUrl: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
