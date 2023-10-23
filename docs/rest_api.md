[REST API 설계 참고](https://velog.io/@suyeonpi/Dimelo-Project-REST-API-%EC%84%A4%EA%B3%84
)

Method | url | 기능
-----|---|---|
POST | /users/signup | 회원가입
POST | /users/login | 로그인
POST | /users/logout | 로그아웃
POST | /users/check/email | 이메일 중복 조회
POST | /users/check/nickname | 닉네임 중복 조회
GET | /users/me | 내 정보 조회
PATCH | /users/me | 내 프로필 편집
DELETE | /users/me | 회원 탈퇴
POST | /users/password | 비밀번호 찾기
PATCH | /users/password | 비밀번호 변경
GET | /users/:id | 해당 회원 정보 가져오기

