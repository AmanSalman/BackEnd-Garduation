import { roles } from "../../middleware/auth.js";


export const permissions = {
    create:[roles.User],
    get:[roles.User],
    delete:[roles.User],
    clearCart:[roles.User],
    ChangeQty:[roles.User],
}