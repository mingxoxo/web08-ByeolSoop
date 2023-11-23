import React, { useState, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { useMutation } from "react-query";
import styled from "styled-components";
import headerAtom from "../../atoms/headerAtom";
import ModalWrapper from "../../styles/Modal/ModalWrapper";
import ModalTitle from "../../styles/Modal/ModalTitle";
import ModalButton from "../../styles/Modal/ModalButton";
import ModalInputBox from "../../styles/Modal/ModalInputBox";
import ModalBackground from "../ModalBackground/ModalBackground";

function SignUpModal() {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const setHeaderState = useSetRecoilState(headerAtom);
  const errorRef = useRef();

  const { mutate: signUp } = useMutation(() => {
    fetch("http://223.130.129.145:3005/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, password, email, nickname }),
    }).then(async (res) => {
      if (res.status === 204) {
        setHeaderState((prev) => ({
          ...prev,
          isLogin: true,
          isSignUp: false,
        }));
      } else {
        const data = await res.json();
        errorRef.current.innerText = data.message;
      }
    });
  });

  function checkValid() {
    if (userId === "") {
      errorRef.current.innerText = "아이디를 입력해주세요";
      return;
    }

    const idRegex = /^[A-Za-z0-9_-]{5,20}$/;
    if (!idRegex.test(userId)) {
      errorRef.current.innerText = "아이디 형식이 올바르지 않습니다.";
      return;
    }

    if (password === "") {
      errorRef.current.innerText = "비밀번호를 입력해주세요";
      return;
    }

    const pwRegex = /^[A-Za-z0-9!@#$%^&*()_+=-~]{5,20}$/;
    if (!pwRegex.test(password)) {
      errorRef.current.innerText = "비밀번호 형식이 올바르지 않습니다.";
      return;
    }

    if (passwordCheck === "") {
      errorRef.current.innerText = "비밀번호 확인을 입력해주세요";
      return;
    }

    if (password !== passwordCheck) {
      errorRef.current.innerText = "비밀번호가 일치하지 않습니다.";
      return;
    }

    if (email === "") {
      errorRef.current.innerText = "이메일을 입력해주세요";
      return;
    }

    const emailRegex = /^[A-Za-z0-9_-]+@[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/;
    if (!emailRegex.test(email)) {
      errorRef.current.innerText = "이메일 형식이 올바르지 않습니다.";
      return;
    }

    if (nickname === "") {
      errorRef.current.innerText = "닉네임을 입력해주세요";
      return;
    }

    signUp();
  }

  return (
    <>
      <ModalBackground />
      <ModalWrapper left='50%' width='25rem' height='40rem'>
        <SignUpModalTitleWrapper>
          <ModalTitle>회원가입</ModalTitle>
          <SignUpModalSubtitle>당신의 이야기를 펼쳐보세요!</SignUpModalSubtitle>
        </SignUpModalTitleWrapper>
        <SignUpModalInputWrapper>
          <SignUpModalInput>
            <SignUpModalInputTitle>* 아이디</SignUpModalInputTitle>
            <ModalInputBox
              height='3.1rem'
              type='text'
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            />
          </SignUpModalInput>
          <SignUpModalInput>
            <SignUpModalInputTitle>* 비밀번호</SignUpModalInputTitle>
            <ModalInputBox
              height='3.1rem'
              type='password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </SignUpModalInput>
          <SignUpModalInput>
            <SignUpModalInputTitle>* 비밀번호 확인</SignUpModalInputTitle>
            <ModalInputBox
              height='3.1rem'
              type='password'
              onChange={(e) => {
                setPasswordCheck(e.target.value);
              }}
            />
          </SignUpModalInput>
          <SignUpModalInput>
            <SignUpModalInputTitle>* 이메일</SignUpModalInputTitle>
            <ModalInputBox
              height='3.1rem'
              type='email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </SignUpModalInput>
          <SignUpModalInput>
            <SignUpModalInputTitle>* 닉네임</SignUpModalInputTitle>
            <ModalInputBox
              height='3.1rem'
              type='text'
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
          </SignUpModalInput>
        </SignUpModalInputWrapper>
        <ModalButtonContainer>
          <div id='sign-up-error' style={{ color: "red" }} ref={errorRef} />
          <ModalButton
            onClick={() => {
              checkValid();
            }}
          >
            가입하기
          </ModalButton>
        </ModalButtonContainer>
      </ModalWrapper>
    </>
  );
}

const SignUpModalTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SignUpModalSubtitle = styled.div`
  font-size: 1rem;
`;

const SignUpModalInputWrapper = styled.div`
  width: 100%;
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SignUpModalInput = styled.div`
  width: 100%;
`;

const SignUpModalInputTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  gap: 0.5rem;
  height: 6rem;
`;

export default SignUpModal;
