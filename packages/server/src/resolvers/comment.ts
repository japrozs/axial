import { Context } from "../types";
import { Comment } from "../entities/Comment";
import { isAuth } from "../middleware/isAuth";
import {
    Arg,
    Ctx,
    Int,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";

@Resolver()
export class CommentResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Comment)
    async createComment(
        @Arg("id", () => Int) id: number,
        @Arg("comment") comment: string,
        @Ctx() { req }: Context
    ) {
        return Comment.create({
            postId: id,
            body: comment,
            creatorId: req.session.userId,
        }).save();
    }
}
