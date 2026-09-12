export const authorization = (role = []) => {
    return async (req, res, next) => {
        if (!role.includes(req.user.role)) {
            throw new Error("unauthorized");
        }
        next()
    }
}