import { CustomInput } from "components/Atoms/CustomInput/styles";
import FindIdPwdBtn from "components/Atoms/FindIdPwdBtn";
import { useRouter } from "next/router";
import React, { useCallback, useRef, VFC } from "react";
import useGotoPage from "../../../../Hooks/useGotoPage";
import { useLogin } from "../../../../Hooks/User";
import { EtcWrapper, LoginBtn, LoginWrapper } from "./styles";

const LoginBlock: VFC = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const gotoPage = useGotoPage();

  const loginMutation = useLogin();

  const Submit = useCallback(
    (e) => {
      e.preventDefault();
      if (!emailRef?.current?.value) return alert("*이메일을 입력해주세요");

      if (!passwordRef?.current?.value) return alert("*비밀번호를 입력해주세요");

      const reqData = {
        email: emailRef?.current?.value,
        passwd: passwordRef?.current?.value,
      };
      loginMutation.mutate(reqData);
    },
    [loginMutation]
  );

  return (
    <>
      <LoginWrapper onSubmit={Submit}>
        <div>
          <CustomInput ref={emailRef} placeholder="ID(이메일 주소)" type="email" />
        </div>
        <div>
          <CustomInput ref={passwordRef} placeholder="비밀번호" type="password" />
        </div>
        <div>
          <LoginBtn onClick={Submit}>로그인</LoginBtn>
        </div>
      </LoginWrapper>
      <EtcWrapper>
        <button onClick={gotoPage("/SignUp")}>회원가입</button>
        <FindIdPwdBtn />
      </EtcWrapper>
    </>
  );
};

export default LoginBlock;