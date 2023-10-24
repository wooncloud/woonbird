import bcrypt from 'bcrypt';

const saltRounds = 10;

/**
 * bcrypt 기반 패스워드 해시 함수.
 * 
 * @param {string} password - 해시화할 원본 패스워드.
 * @returns {Promise<string>} - 패스워드를 해시화한 문자열을 반환하는 프로미스 객체.
 * @throws {Error} - 해시 생성 중 발생하는 오류를 던질 수 있음.
 */
export async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw error;
    }
}
