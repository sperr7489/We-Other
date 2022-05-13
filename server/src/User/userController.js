const baseResponseStatus = require("../../config/baseResponseStatus");
const { basicResponse, resultResponse } = require("../../config/response");
const userService = require("./userService");
const userProvider = require("./userProvider");
const regex = require("../../config/regex");
const jwt = require("jsonwebtoken");
const { token } = require("../../config/jwt");
//회원가입 과정
exports.signUpUser = async (req, res) => {
  const { email, passwd, userName, department, sex, admission } = req.body;

  // 어느하나라도 제대로 입력되지 않았을 때
  if (!email || !passwd || !userName || !department || !sex || !admission)
    return res.send(basicResponse(baseResponseStatus.PARAMS_NOT_EXACT));

  const emailCheck = await userProvider.emailCheck(email);
  //   console.log(emailCheck[0].exist);
  if (emailCheck)
    return res.send(basicResponse(baseResponseStatus.EMAIL_EXISTS));

  const emailValid = regex.email(email);
  // 이메일의 형식이 틀렸을 경우에
  if (!emailValid)
    return res.send(basicResponse(baseResponseStatus.EMAIL_INVALID));
  //최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
  const passwdCheck = regex.passwd(passwd);
  if (!passwdCheck)
    return res.send(basicResponse(baseResponseStatus.PASSWORD_INVALID));

  //   const userNameCheck = await userProvider.userNameCheck(userName);
  //   if (userNameCheck[0].exist)
  //     return res.send(basicResponse(baseResponseStatus.USERNAME_EXISTS));

  await userService.createUser(
    email,
    passwd,
    userName,
    department,
    sex,
    admission
  );
  //   const accessToken = token().access(email);
  //   const refreshToken = token().refresh(email);

  //   res.cookie("access", accessToken);
  //   res.cookie("refresh", refreshToken);
  return res.send(basicResponse(baseResponseStatus.SIGN_UP_SUCCESS));
};

exports.signIn = async (req, res) => {
  console.log("테스트")
  const { email, passwd } = req.body;

  if (!email || !passwd)
    return res.send(basicResponse(baseResponseStatus.PARAMS_NOT_EXACT));

  const emailValid = regex.email(email);
  // 이메일의 형식이 틀렸을 경우에

  if (!emailValid) {
    // console.log(emailValid);
    return res.send(basicResponse(baseResponseStatus.EMAIL_INVALID));
  }
  const emailCheck = await userProvider.emailCheck(email);
  // 해당 이메일이 존재하지 않을 때
  if (!emailCheck)
    return res.send(basicResponse(baseResponseStatus.EMAIL_NOT_EXIST));
  // 패스워드 형식이 틀렸을 경우에
  const passwdCheck = regex.passwd(passwd);
  if (!passwdCheck)
    return res.send(basicResponse(baseResponseStatus.PASSWORD_INVALID));

  //이메일과 패스워드가 제대로 되었다면 이를 제대로 되었는지 비교해 봐야겠지?
  const signInResult = await userService.signIn(email, passwd);
  // console.log(signInResult, ": signInResult");
  return res.send(signInResult);
};

// 유저의 상세 정보 가져오기
exports.getUserDeepInfo = async (req, res) => {
  const { userIdx } = req.params;
  if (!userIdx)
    return res.send(basicResponse(baseResponseStatus.PARAMS_NOT_EXACT));
  const userIdxCheck = await userProvider.userIdxCheck(userIdx);
  if (!userIdxCheck)
    return res.send(basicResponse(baseResponseStatus.USER_NOT_EXIST));
  const userDeepInfo = await userProvider.getUserDeepInfo(userIdx);
  return res.send(resultResponse(baseResponseStatus.SUCCESS, userDeepInfo));
};

exports.test = async (req, res) => {
  const testResult = await userProvider.test();
  const { accessTokenNew } = req; //새롭게 발급받은 accessToken
  testResult.accessTokenNew = accessTokenNew;
  return res.send(testResult);
};

// 게시물에 좋아요 등록하기
exports.pushLike = async (req, res) => {

  // 게시물이나 댓글 둘중에 하나 받아와서 게시물을 좋아요 한것인지 댓글을 좋아요 한것인지 판단한다. 
  // 댓글에 대한 좋아요는 게시물에 대한 좋아요가 이미 있는 경우에 insert 가 아닌 update를 해주는 방향으로 진행되어야 한다. 
  const { postIdx, commentIdx } = req.body;
  const userIdx = req.userIdx // 좋아요를 이미 한 유저의 경우에는 한 번 더 좋아요를 할 수 없자나!
  if (!postIdx && !commentIdx) return res.send(basicResponse(baseResponseStatus.PARAMS_NOT_EXACT));

  const pushLikeResult = await userService.pushLike(userIdx, postIdx, commentIdx);
  return res.send(pushLikeResult);
}