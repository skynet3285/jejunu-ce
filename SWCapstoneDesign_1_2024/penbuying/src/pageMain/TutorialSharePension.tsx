import { useNavigate } from 'react-router-dom';
import leftArrow from '../asset/imgs/leftArrowIcon.svg';
import hwpIcon from '../asset/imgs/hwpIcon.png';
import guide1 from '../asset/imgs/share_guide1.png';
import guide2 from '../asset/imgs/share_guide2.png';
import guide3 from '../asset/imgs/share_guide3.png';
import guide4 from '../asset/imgs/share_guide4.png';
import guide5 from '../asset/imgs/share_guide5.png';
import guide6 from '../asset/imgs/share_guide6.png';
import guide7 from '../asset/imgs/share_guide7.png';

export default function TutorialSharePension() {
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
          부동산 지분 공유 튜토리얼
        </p>
        <div className="w-[24px]" />
      </div>
      <div className="mt-10 flex flex-col items-center justify-center">
        <div className="mx-4 mt-4 flex flex-col rounded-xl border border-gray-300 bg-gray-300 p-2">
          <p className="text-sm">양식파일</p>
          <p className="my-1 flex text-sm">
            <img src={hwpIcon} alt="hwp" />
            부동산 공유지분 매매계약서.hwp
          </p>
          <p className="my-1 flex text-sm">
            <img src={hwpIcon} alt="hwp" />
            부동산 공유지분 위치확인동의서.hwp
          </p>
          <p className="my-1 flex text-sm">
            <img src={hwpIcon} alt="hwp" />
            지분 공유 펜션 이용약관.hwp
          </p>
        </div>
        <div className="mt-5 font-bold">
          <p>양식 파일을 이용하여 개인간 계약을 하세요</p>
        </div>
        <div className="mt-10 flex h-auto flex-col items-center justify-center tablet:text-sm">
          <div className="flex h-[15rem] flex-col items-center justify-around">
            <img className="w-[10rem]" src={guide1} alt="guide1" />
            <p>주도자는 부동산 매물을 확인합니다</p>
          </div>
          <div className="flex h-[15rem] flex-col items-center justify-around">
            <img className="w-[10rem]" src={guide2} alt="guide2" />
            <p>주도자는 부동산 거래자와 가계약을 합니다</p>
          </div>
          <div className="flex h-[15rem] flex-col items-center justify-around">
            <img className="w-[10rem]" src={guide3} alt="guide3" />
            <p>공동구매자는 부동산 거래자와 매매 계약을 합니다</p>
          </div>
          <div className="flex h-[15rem] flex-col items-center justify-around">
            <img className="w-[10rem]" src={guide4} alt="guide4" />
            <p>부동산 거래를 관련 기관에 신고합니다</p>
          </div>
          <div className="flex h-[15rem] flex-col items-center justify-around">
            <img className="w-[10rem]" src={guide5} alt="guide5" />
            <p>공동구매자는 매매 대금을 납입합니다</p>
          </div>
          <div className="flex h-[15rem] flex-col items-center justify-around">
            <img className="w-[10rem]" src={guide6} alt="guide6" />
            <p>공동구매자와 부동산거래자는 등기소에 신고합니다</p>
          </div>
          <div className="flex h-[15rem] flex-col items-center justify-around">
            <img className="w-[10rem]" src={guide7} alt="guide7" />
            <p>공동구매자는 위치확인동의서를 작성합니다</p>
          </div>
        </div>
      </div>
    </article>
  );
}
