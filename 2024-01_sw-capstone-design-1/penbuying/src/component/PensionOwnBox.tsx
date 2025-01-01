import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PensionOwnReservation from './PensionOwnReservation';
import { Pension, loadPensionByPensionId } from '../module/sqlOrm';

interface Props {
  pensionId: number;
  ownPercent: number;
}

export default function PensionOwnBox({ pensionId, ownPercent }: Props) {
  const navigate = useNavigate();
  const [pension, setPension] = useState<Pension | null>(null);
  const [select, setSelect] = useState<number>(0);

  useEffect(() => {
    const fetchPension = async () => {
      const data = (await loadPensionByPensionId(pensionId)) as Pension;
      setPension(data);
    };

    fetchPension();
  }, []);

  function handleSelect12(index: number) {
    // 이미 눌린 버튼을 한번더 누르면 선택 해제
    if (select === index) {
      setSelect(0);
    } else {
      setSelect(index);
    }
  }

  function handleSelect34(index: number) {
    // 이미 눌린 버튼을 한번더 누르면, 2번으로 선택
    if (select === index) {
      setSelect(2);
    } else {
      setSelect(index);
    }
  }

  function getVioletButtonStyle(index: number) {
    const notActive = 'border-violet-950 bg-violet-950';
    const active = 'border-gray-400 bg-gray-400';

    switch (index) {
      case 1:
        if (select === 1) {
          return active;
        }
        return notActive;
      case 2:
        if (select >= 2) {
          return active;
        }
        return notActive;
      default:
        return notActive;
    }
  }

  function getGreenButtonStyle(index: number) {
    const notActive = 'border-green-700 bg-green-700';
    const active = 'border-gray-400 bg-gray-400';

    switch (index) {
      case 3:
        if (select === 3) {
          return active;
        }
        return notActive;
      case 4:
        if (select === 4) {
          return active;
        }
        return notActive;
      default:
        return notActive;
    }
  }

  return (
    <div className="h-auto w-auto rounded px-4 py-2 shadow-xl">
      <div className="flex w-[21rem] space-x-1">
        <img src={pension?.pension_img} alt="pension1" />
        <div className="flex w-full flex-col justify-center">
          <h1 className="font-bold">{pension?.article_title}</h1>
          <p className="text-sm text-gray-500">
            공구인원 {pension?.number_of_participants}명
          </p>
          <p className="text-sm text-gray-500">
            모집금액 {pension && pension?.total_investment_amount / 100000000}
            억원
          </p>
          <p className="text-sm font-bold text-blue-500">
            지분{ownPercent}% 소유중
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className={`w-[48%] rounded border-2 ${getVioletButtonStyle(1)} py-1 text-sm text-white`}
          type="button"
          onClick={() => {
            handleSelect12(1);
          }}
        >
          펜션예약
        </button>
        <button
          className={`w-[48%] rounded border-2 ${getVioletButtonStyle(2)} py-1 text-sm text-white`}
          type="button"
          onClick={() => {
            handleSelect12(2);
          }}
        >
          펜션관리
        </button>
      </div>
      <div className="w-[21rem]">
        {select === 1 && <PensionOwnReservation />}
        {select > 1 && (
          <div className="mt-2 flex justify-between">
            <button
              className={`w-[48%] rounded border-2 ${getGreenButtonStyle(3)} py-1 text-sm text-white`}
              type="button"
              onClick={() => {
                handleSelect34(3);
                navigate(`info/${pensionId}`);
              }}
            >
              펜션정보
            </button>
            <button
              className={`w-[48%] rounded border-2 ${getGreenButtonStyle(4)} py-1 text-sm text-white`}
              type="button"
              onClick={() => {
                handleSelect34(4);
                navigate(`agenda/${pensionId}`);
              }}
            >
              안건관리
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
