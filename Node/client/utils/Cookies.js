let { token } = Cookies.get();

export const getToken = () => token

const getUserData = () => {
    const decodedToken = token ? jwt_decode(token) : undefined;
    return decodedToken;
}

export const removeCookies = () => {
    Cookies.remove(key)
};

export const isAdmin = () => {
    let decodeToken = getUserData();
    return decodeToken.role == 'ADMIN';
}

export const isSuperAdmin = () => {
    let decodedToken = getUserData();
    return decodedToken.role == 'SUPERADMIN';
}

export const isActiveAccount = () => {
    let decodedToken = getUserData();
    return decodedToken.isActive;
};

export default getUserData;