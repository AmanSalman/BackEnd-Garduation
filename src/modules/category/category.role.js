import { roles } from "../../middleware/auth.js";


export const permissions = {
    create:[roles.Admin],
    getAll:[roles.Admin],
    getActive:[roles.User],
    update:[roles.Admin],
    delete:[roles.Admin],
    getDetails:[roles.Admin],
}