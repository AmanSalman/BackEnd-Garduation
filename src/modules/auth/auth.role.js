import { roles } from "../../middleware/auth.js";


export const permissions = {
    create:[roles.Admin],
    getAll:[roles.Admin],
    getActive:[roles.User],
    update:[roles.Admin, roles.User],
    delete:[roles.Admin],
    getDetails:[roles.Admin],
    changePassword:[roles.Admin, roles.User]
}