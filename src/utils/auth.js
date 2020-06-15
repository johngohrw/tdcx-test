const tokenKey = 'AUTH_TOKEN'
const profileImgKey = 'PROFILE_IMG_URL'


export const getAuthToken = () => {
    const token = window.localStorage.getItem(tokenKey);
    return (token ? token : null)
}

export const setAuthToken = (token) => {
    window.localStorage.setItem(tokenKey, token)
}

export const clearAuthToken = () => {
    window.localStorage.setItem(tokenKey, null)
    window.localStorage.removeItem(tokenKey)
}

export const getAuthConfig = () => {
    if (isLoggedIn()) {
        const token = getAuthToken()
        return {
            headers: { Authorization: `Bearer ${token}` }
        }
    }
    return null
}

export const setProfileImg = (imgUrl) => {
    window.localStorage.setItem(profileImgKey, imgUrl)
}

export const getProfileImg = () => {
    return window.localStorage.getItem(profileImgKey)
}

export const isLoggedIn = () => {
    return (getAuthToken() ? true : false)
}