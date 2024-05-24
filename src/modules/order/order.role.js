import { roles } from "../../middleware/auth.js";


export const permissions = {
    create:[roles.User],
    getAll:[roles.Admin],
    update:[roles.Admin],
    delete:[roles.Admin],
    getDetails:[roles.Admin],
}