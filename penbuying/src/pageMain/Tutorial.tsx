import { useNavigate } from 'react-router-dom';
import leftArrow from '../asset/imgs/leftArrowIcon.svg';
import IconActivePensionHome from '../asset/imgs/pensionMainA.svg';
import IconActiveChat from '../asset/imgs/pensionChatA.svg';
import IconActiveInfo from '../asset/imgs/pensionInvestInfoA.svg';
import IconActiveUser from '../asset/imgs/pensionUserA.svg';

export default function Tutorial() {
  const navigate = useNavigate();
  return (
    <article className="flex flex-col">
      <div className="mt-10 flex h-auto w-full">
        <button
          className="h-auto w-auto"
          type="button"
          onClick={() => {
            navigate('..');
          }}
        >
          <img src={leftArrow} alt="leftArrow" />
        </button>
        <p className="h-[2rem] w-full text-center text-lg font-bold">
          펜바잉 튜토리얼
        </p>
        <div className="w-[24px]" />
      </div>
      <div className="mt-10 flex flex-col items-center justify-center">
        <div className="tablet:w-[24rem] tablet:text-sm flex h-auto w-[20rem] flex-col justify-center rounded-3xl border bg-gray-300 p-4 text-[0.65rem]">
          <div className=" my-1 flex items-center">
            <img
              className="h-[1.4rem] w-[1.4rem]"
              src={IconActivePensionHome}
              alt="pension home"
            />
            <div className="w-1" />
            <p>펜션 공구를 작성하고 참여자를 모집할 수 있습니다 </p>
          </div>
          <div className="my-1 flex items-center">
            <img
              className="h-[1.4rem] w-[1.4rem]"
              src={IconActiveChat}
              alt="chat"
            />
            <div className="w-1" />
            <p>채팅은 펜바잉 유저와 상호작용할 수 있습니다</p>
          </div>
          <div className="my-1 flex items-center">
            <img
              className="h-[1.4rem] w-[1.4rem]"
              src={IconActiveInfo}
              alt="info"
            />
            <div className="w-1" />
            <p>펜바잉에 관한 가이드를 제공합니다</p>
          </div>
          <div className="my-1 flex items-center">
            <img
              className="h-[1.4rem] w-[1.4rem]"
              src={IconActiveUser}
              alt="user"
            />
            <div className="w-1" />
            <p>계정을 관리하고 소유한 펜션을 확인할 수 있습니다</p>
          </div>
        </div>
        <div className="mt-5 font-bold">
          <p>펜바잉을 이용하여 펜션을 공동 소유하세요!</p>
        </div>
      </div>
    </article>
  );
}
