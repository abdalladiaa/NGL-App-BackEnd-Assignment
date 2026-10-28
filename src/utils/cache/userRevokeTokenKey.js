
export function userRevokeTokenKey(id , jti){
    return `User::${id}::RevokeToken::${jti}`
}
