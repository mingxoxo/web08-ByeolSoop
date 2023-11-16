import React from "react";
import styled from "styled-components";
import ModalWrapper from "../../styles/Modal/ModalWrapper";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import starIcon from "../../assets/star.svg";
import indicatorArrowIcon from "../../assets/indicator-arrow.svg";

function DiaryModalEmotionIndicator({ emotion }) {
  return (
    <EmotionIndicatorWrapper>
      <EmotionIndicatorBar>
        <EmotionIndicator ratio={emotion.positive} color='#618CF7' />
        <EmotionIndicatorArrow>
          <img
            src={indicatorArrowIcon}
            alt='arrow'
            style={{ width: "1rem", height: "1rem" }}
          />
        </EmotionIndicatorArrow>
        <EmotionIndicator ratio={emotion.neutral} color='#A848F6' />
        <EmotionIndicatorArrow>
          <img
            src={indicatorArrowIcon}
            alt='arrow'
            style={{ width: "1rem", height: "1rem" }}
          />
        </EmotionIndicatorArrow>
        <EmotionIndicator ratio={emotion.negative} color='#E5575B' />
      </EmotionIndicatorBar>
      <EmotionTextWrapper>
        <EmotionText>긍정 {emotion.positive}</EmotionText>
        <EmotionText>중립 {emotion.neutral}</EmotionText>
        <EmotionText>부정 {emotion.negative}</EmotionText>
      </EmotionTextWrapper>
    </EmotionIndicatorWrapper>
  );
}

function DiaryReadModal() {
  return (
    <ModalWrapper left='67%' width='40vw' height='65vh' opacity='0.3'>
      <DiaryModalHeader>
        <DiaryModalTitle>아주 멋진 나!</DiaryModalTitle>
        <DiaryButton>
          <img
            src={editIcon}
            alt='edit'
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
          />
        </DiaryButton>
        <DiaryButton>
          <img
            src={deleteIcon}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            alt='delete'
          />
        </DiaryButton>
      </DiaryModalHeader>
      <DiaryModalContent>
        오늘은 멋있는 모달을 만들었다. 멋있다! 오늘은 멋있는 모달을 만들었다.
        멋있다! 오늘은 멋있는 모달을 만들었다. 멋있다! 오늘은 멋있는 모달을
        만들었다. 멋있다! 오늘은 멋있는 모달을 만들었다. 멋있다! 오늘은 멋있는
        모달을 만들었다. 멋있다! 오늘은 멋있는 모달을 만들었다. 멋있다! 오늘은
        멋있는 모달을 만들었다. 멋있다! 오늘은 멋있는 모달을 만들었다. 멋있다!
        오늘은 멋있는 모달을 만들었다. 멋있다! 오늘은 멋있는 모달을 만들었다.
        멋있다! 오늘은 멋있는 모달을 만들었다. 멋있다! 오늘은 멋있는 모달을
        만들었다. 멋있다! 오늘은 멋있는 모달을 만들었다. 멋있다! 오늘은 멋있는
        모달을 만들었다. 멋있다! 오늘은 멋있는 모달을 만들었다. 멋있다! 오늘은
        멋있는 모달을 만들었다. 멋있다! 오늘은 멋있는 모달을 만들었다. 멋있다!
        오늘은 멋있는 모달을 만들었다. 멋있다! 오늘은 멋있는 모달을 만들었다.
        멋있다! 오늘은 멋있는 모달을 만들었다. 멋있다! 오늘은 멋있는 모달을
        만들었다. 멋있다! 오늘은 멋있는 모달을 만들었다. 멋있다! 오늘은 멋있는
        모달을 만들었다. 멋있다! 오늘은 멋있는 모달을 만들었다. 멋있다! 오늘은
        멋있는 모달을 만들었다. 멋있다! 오늘은 멋있는 모달을 만들었다. 멋있다!
        오늘은 멋있는 모달을 만들었다. 멋있다! 오늘은 멋있는 모달을 만들었다.
        멋있다! 오늘은 멋있는 모달을 만들었다. 멋있다! 오늘은 멋있는 모달을
        만들었다. 멋있다! 오늘은 멋있는 모달을 만들었다. 멋있다! 오늘은 멋있는
        모달을 만들었다. 멋있다! 오늘은 멋있는 모달을 만들었다. 멋있다! 오늘은
        멋있는 모달을 만들었다. 오늘은 멋있는 모달을 만들었다. 멋있다! 오늘은
        멋있는 모달을 만들었다. 멋있다! 오늘은 멋있는 모달을 만들었다. 멋있다!
        오늘은 멋있는 모달을 만들었다. 오늘은 멋있는 모달을 만들었다. 멋있다!
        오늘은 멋있는 모달을 만들었다. 멋있다! 오늘은 멋있는 모달을 만들었다.
        멋있다! 오늘은 멋있는 모달을 만들었다. 오늘은 멋있는 모달을 만들었다.
        멋있다! 오늘은 멋있는 모달을 만들었다. 멋있다! 오늘은 멋있는 모달을
        만들었다. 멋있다! 오늘은 멋있는 모달을 만들었다.
      </DiaryModalContent>
      <DiaryModalTagBar>
        <DiaryModalTagName>태그</DiaryModalTagName>
        <DiaryModalTagList>
          <DiaryModalTag>멋있다!</DiaryModalTag>
          <DiaryModalTag>맛있다!</DiaryModalTag>
        </DiaryModalTagList>
      </DiaryModalTagBar>
      <DiaryModalEmotionBar>
        <DiaryModalEmotionIndicator
          emotion={{
            positive: "50%",
            neutral: "20%",
            negative: "30%",
          }}
        />
        <DiaryModalIcon>
          <img
            src={starIcon}
            alt='star'
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </DiaryModalIcon>
      </DiaryModalEmotionBar>
    </ModalWrapper>
  );
}

// ToDo: 통합 필요
const DiaryModalHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const DiaryModalTitle = styled.div`
  flex-grow: 1;
  font-size: 1.5rem;
`;

const DiaryButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 1rem;
  border: hidden;
  background: none;

  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;

  gap: 0.5rem;
  cursor: pointer;
`;

const DiaryModalContent = styled.div`
  width: 100%;
  height: 60%;
  line-height: 1.5rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const DiaryModalTagName = styled.div`
  width: 3rem;
  font-size: 1rem;
`;

const DiaryModalTagBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const DiaryModalTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 2rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 0.5rem;
  box-sizing: border-box;
  color: #ffffff;
  outline: none;
`;

const DiaryModalTagList = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DiaryModalEmotionBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: 5rem;
`;

const DiaryModalIcon = styled.div`
  width: 5rem;
  height: 5rem;
`;

const EmotionIndicatorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const EmotionIndicatorBar = styled.div`
  width: 20rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EmotionIndicator = styled.div`
  width: ${(props) => props.ratio};
  height: 100%;
  background-color: ${(props) => props.color};
`;

const EmotionIndicatorArrow = styled.div`
  display: flex;
  justify-content: center;
  width: 0;
  height: 4rem;
`;

const EmotionTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const EmotionText = styled.div`
  font-size: 0.9rem;
`;

export default DiaryReadModal;
