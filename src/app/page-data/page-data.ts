import { Role } from "./role";

export interface PageData {
    role: Role;
    content: string;
    can_rollback: boolean;
}
