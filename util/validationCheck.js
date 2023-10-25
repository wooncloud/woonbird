function isValidUserId(value) {
    // 아이디는 최소 3자에서 최대 100자여야 하며, 영어 대문자, 소문자, 숫자로만 구성되어야 합니다.
    return /^[A-Za-z]+[A-Za-z0-9]{2,99}$/.test(value);
} 

function isValidPassword(value) {
    // 비밀번호는 최소 7자에서 최대 15자여야 하며, 영어 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.
    return /^(?=.*[\w])(?=.*\d)(?=.*[@$!%*?&])[\w\d@$!%*?&]{7,15}$/.test(value);
}
export {
    isValidUserId,
    isValidPassword,
}