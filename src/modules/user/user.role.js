import { roles } from "../../middleware/auth.js";

export const permissions = {
    get:[roles.Admin],
    Disable:[roles.Admin],
    Activate:[roles.Admin],
    Profile:[roles.User,roles.Admin],
}