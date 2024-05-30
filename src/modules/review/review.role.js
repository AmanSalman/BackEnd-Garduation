import { roles } from "../../middleware/auth.js";


export const permissions = {
    create:[roles.User],
    getAll:[roles.Admin],
    delete:[roles.Admin],
}