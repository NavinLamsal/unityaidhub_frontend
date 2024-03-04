import { Donation } from "./Donations";
import { Posts } from "./Posts";
import { User } from "./User";

export type UserDetail = User & {
    post: Posts[]; // Assuming Posts type is already defined
    donations: Donation[]; // Assuming Donation type is already defined
};