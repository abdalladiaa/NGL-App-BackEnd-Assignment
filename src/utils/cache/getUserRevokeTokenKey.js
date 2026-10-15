
export function getUserRevokeTokenKey(id , jti){
    return `User::${id}::RevokeToken::${jti}`
}
