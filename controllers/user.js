const signup = async (req, res) => {
    let result = null;
    // try {
    //     result = await ...
    // } catch (e) {
    //     console.error(e);
    // }

    console.log(req, res);
    // 유효한 아이디인가?
    // 유효한 비밀번호인가? (길이, 형식)
    // 이미 존재하는 아이디인가?
    // 비밀번호 암호화
    // 디비 저장
    // 회원 가입 완료. 로그인 해주세요.

    res.send(result);
};

const login = async (req, res) => {
    let result = null;
    console.log(req, res);

    // 입력한 아이디의 정보를 가져온다.
    // 아이디가 없으면 없는 아이디 리턴
    // 아이디가 있으면 입력받은 비밀번호 암호화
    // 두 비밀번호를 비교하여 계정이 맞는지 확인
    // 틀리면 비밀번호 틀렸다고 리턴
    // 세션 생성
    // 메인 페이지로 리다이렉트

    res.send(result);
};

const logout = (req, res) => {
    let result = null;
    console.log(req, res);

    // 입력한 아이디의 세션을 삭제.
    

    res.send(result);
};

export default {
    signup,
};
