import express from 'express';
import userService from '../services/user.js';
import { hashPassword } from '../util/passwordUtils.js';
import { isValidUserId, isValidPassword } from '../util/validationCheck.js';
const app = express();

const signup = async (req, res) => {
    try {
        // TODO 누락건 : 사용자 이름, 이메일
        const { user_id, password, name, email } = req.body;

        // 유효성 검사를 수행
        if (!isValidUserId(user_id) || !isValidPassword(password)) {
            return res.status(400).send("Invalid username or password format.");
        }

        // 이미 존재하는 아이디인지 확인
        const userExists = await userService.checkIfUserExists(user_id);
        if (userExists) {
            return res.status(400).send("이미 존재하는 아이디 입니다. 다른 아이디를 입력해주세요.");
        }

        // 비밀번호 암호화
        const hashedPassword = await hashPassword(password);

        // 디비에 저장
        await userService.signupUser(user_id, hashedPassword, name, email);

        // 회원 가입 완료 메시지
        return res.status(200).send("회원가입 성공! 로그인을 해주세요.");
    } catch (error) {
        console.error(error);
        return res.status(500).send("회원가입을 하는 동안 문제가 발생했습니다.");
    }
};

const login = async (req, res) => {
    try {
        const { userId, password } = req.body;

        // 입력한 아이디로 사용자 정보를 가져옴.
        const user = await findUserById(userId);
        if (!user) {
            return res.status(401).send("계정 정보가 일치하지 않습니다.");
        }

        // TODO: 만약 사용자가 밴이나 삭제처리가 되어 있으면 리턴

        // 입력된 비밀번호를 해시된 비밀번호와 비교.
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send("비밀번호 틀림");
        }

        // 세션 생성 (세션 관리 미들웨어가 설정되어야 함)
        req.session.user = user;

        res.redirect('/main');
    } catch (error) {
        console.error(error);
        res.status(500).send("로그인 중 오류 발생");
    }
};

const logout = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                res.status(500).send("로그아웃 중 오류 발생");
            } else {
                res.redirect('/login');
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("로그아웃 중 오류 발생");
    }
};

export default {
    signup,
    login,
    logout
};
