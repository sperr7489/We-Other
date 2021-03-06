import { CustomInput } from "components/Atoms/Common/CustomInput/styles";
import { useLogin } from "Hooks/User";
import React, { useCallback, useRef } from "react";
import { LoginBtn, LoginWrapper } from "./styles";

const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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
  );
};

export default LoginForm;
