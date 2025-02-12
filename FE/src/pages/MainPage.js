/* eslint-disable */

import React, { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import diaryAtom from "../atoms/diaryAtom";
import shapeAtom from "../atoms/shapeAtom";
import userAtom from "../atoms/userAtom";
import starAtom from "../atoms/starAtom";
import DiaryCreateModal from "../components/DiaryModal/DiaryCreateModal";
import DiaryReadModal from "../components/DiaryModal/DiaryReadModal";
import DiaryListModal from "../components/DiaryModal/DiaryListModal";
import DiaryAnalysisModal from "../components/DiaryModal/DiaryAnalysisModal";
import DiaryUpdateModal from "../components/DiaryModal/DiaryUpdateModal";
import DiaryLoadingModal from "../components/DiaryModal/DiaryLoadingModal";
import PurchaseModal from "../components/PurchaseModal/PurchaseModal";
import StarPage from "./StarPage";
import RedirectToHomepage from "./Redirection";
import handleResponse from "../utils/handleResponse";

function MainPage() {
  const [diaryState, setDiaryState] = useRecoilState(diaryAtom);
  const [userState, setUserState] = useRecoilState(userAtom);
  const setShapeState = useSetRecoilState(shapeAtom);
  const [loaded, setLoaded] = React.useState(false);
  const setStarState = useSetRecoilState(starAtom);

  const { refetch } = useQuery(
    ["diaryList", userState.accessToken],
    async () => {
      return fetch(`${process.env.REACT_APP_BACKEND_URL}/diaries`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userState.accessToken}`,
        },
      }).then((res) =>
        handleResponse(res, userState.accessToken, {
          successStatus: 200,
          onSuccessCallback: () => {
            setLoaded(true);
            return res.json();
          },
          on403Callback: () => {
            setDiaryState((prev) => ({
              ...prev,
              isRedirect: true,
            }));
          },
          on401Callback: (accessToken) => {
            setUserState((prev) => ({
              ...prev,
              accessToken,
            }));
          },
        }),
      );
    },
    {
      onSuccess: (data) => {
        data.forEach((diary) => {
          diary.coordinate.x /= 100000;
          diary.coordinate.y /= 100000;
          diary.coordinate.z /= 100000;
        });

        setDiaryState((prev) => ({ ...prev, diaryList: data }));
      },
    },
  );

  const { refetch: pointsRefetch } = useQuery(
    ["points", userState.accessToken],
    async () =>
      fetch(`${process.env.REACT_APP_BACKEND_URL}/lines`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userState.accessToken}`,
        },
      }).then((res) =>
        handleResponse(res, userState.accessToken, {
          successStatus: 200,
          onSuccessCallback: () => res.json(),
          on403Callback: () => {
            setDiaryState((prev) => ({
              ...prev,
              isRedirect: true,
            }));
          },
          on401Callback: (accessToken) => {
            setUserState((prev) => ({
              ...prev,
              accessToken,
            }));
          },
        }),
      ),
    {
      onSuccess: (data) => {
        data.forEach((point) => {
          const { first, second } = point;
          first.coordinate.x /= 100000;
          first.coordinate.y /= 100000;
          first.coordinate.z /= 100000;
          second.coordinate.x /= 100000;
          second.coordinate.y /= 100000;
          second.coordinate.z /= 100000;
        });

        setStarState((prev) => ({ ...prev, points: data }));
      },
    },
  );

  const { refetch: premiumRefetch } = useQuery(
    "isPremium",
    async () =>
      fetch(`${process.env.REACT_APP_BACKEND_URL}/purchase/premium`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userState.accessToken}`,
        },
      }).then((res) =>
        handleResponse(res, userState.accessToken, {
          successStatus: 200,
          onSuccessCallback: () => res.json(),
          on403Callback: () => {
            setDiaryState((prev) => ({
              ...prev,
              isRedirect: true,
            }));
          },
          on401Callback: (accessToken) => {
            setUserState((prev) => ({
              ...prev,
              accessToken,
            }));
          },
        }),
      ),
    {
      onSuccess: (data) => {
        if (data?.premium === "TRUE") {
          setUserState((prev) => ({ ...prev, isPremium: true }));
        } else if (data?.premium === "FALSE") {
          setUserState((prev) => ({ ...prev, isPremium: false }));
        }
      },
    },
  );

  useEffect(() => {
    setDiaryState((prev) => {
      const newState = {
        ...prev,
        isCreate: false,
        isRead: false,
        isUpdate: false,
        isList: false,
      };
      return newState;
    });

    async function getShapeFn() {
      return fetch(`${process.env.REACT_APP_BACKEND_URL}/shapes/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userState.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then(async (data) => {
          setShapeState(() => {
            const shapeList = Object.keys(data).map((key) => ({
              uuid: data[key].uuid,
              data: data[key].svg,
            }));
            return shapeList;
          });
        });
    }

    if (loaded) {
      getShapeFn();
    }
  }, [loaded]);

  return (
    <div>
      {loaded ? (
        <MainPageWrapper>
          <NickNameWrapper>
            <NickName>{userState.nickname}님의 별숲</NickName>
          </NickNameWrapper>
          <StarPage refetch={refetch} pointsRefetch={pointsRefetch} />
          {diaryState.isCreate ? <DiaryCreateModal refetch={refetch} /> : null}
          {diaryState.isRead ? (
            <DiaryReadModal refetch={refetch} pointsRefetch={pointsRefetch} />
          ) : null}
          {diaryState.isUpdate ? <DiaryUpdateModal refetch={refetch} /> : null}
          {diaryState.isList ? <DiaryListModal /> : null}
          {diaryState.isAnalysis ? <DiaryAnalysisModal /> : null}
          {diaryState.isLoading ? <DiaryLoadingModal /> : null}
          {diaryState.isPurchase ? (
            <PurchaseModal premiumRefetch={premiumRefetch} />
          ) : null}
          {diaryState.isRedirect ? <RedirectToHomepage /> : null}
        </MainPageWrapper>
      ) : null}
    </div>
  );
}

const MainPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const NickNameWrapper = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  position: absolute;
  top: 0;
  right: 5rem;

  z-index: 1001;
`;

const NickName = styled.div`
  font-size: 1.2rem;
  font-weight: thin;
  color: #fff;
  margin-right: 2vw;
`;

export default MainPage;
