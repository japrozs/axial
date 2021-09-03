import { Post } from "../entities/Post";
import { isAuth } from "../middleware/isAuth";
import { Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class PostResolver {
    @UseMiddleware(isAuth)
    @Query(() => [Post])
    getAllPosts() {
        return Post.find({
            relations: ["creator"],
            order: { createdAt: "DESC" },
        });
    }
}
