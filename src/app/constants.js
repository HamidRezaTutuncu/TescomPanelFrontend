export const ROLE = {
    ADMIN: 1,
    TECHNICIAN: 2,
    OPERATOR: 3,
};

export function hasRole(user, allowed = []) {
    if (!user) return false;
    if (!Array.isArray(allowed) || allowed.length === 0) return true;
    return allowed.includes(user.roleId);
}
