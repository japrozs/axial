import { Post } from "../entities/Post";
import { isAuth } from "../middleware/isAuth";
import {
    Query,
    Resolver,
    UseMiddleware,
    Mutation,
    Arg,
    Ctx,
    Int,
} from "type-graphql";
import { Context } from "../types";

@Resolver()
export class PostResolver {
    @UseMiddleware(isAuth)
    @Query(() => [Post])
    getAllPosts() {
        return Post.find({
            relations: ["creator", "comments"],
            order: { createdAt: "DESC" },
        });
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Post)
    async createPost(@Arg("desc") desc: string, @Ctx() { req }: Context) {
        const post = await Post.create({
            imgUrl: "",
            description: desc,
            creatorId: req.session.userId,
        }).save();
        return post;
    }

    @UseMiddleware(isAuth)
    @Query(() => Post)
    async getPost(@Arg("id", () => Int) id: number) {
        return Post.findOne({
            where: { id: id },
            relations: ["creator", "comments"],
        });
    }
}
