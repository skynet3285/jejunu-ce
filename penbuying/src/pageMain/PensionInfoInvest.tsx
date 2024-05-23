import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import executeQuery from '../module/sql';
import leftArrow from '../asset/imgs/leftArrowIcon.svg';
import pensionBackground from '../asset/imgs/pensionBackground.png';
import hwpIcon from '../asset/imgs/hwpIcon.png';

interface Pension {
  article_id: number;
  pension_id: number;
  article_title: string;
  article_contents: string;
  pension_img: string;
  article_active: boolean;
  current_investment_amount: number;
  total_investment_amount: number;
  minimum_investment_amount: number;
  number_of_participants: number;
  maximum_of_participants: number;
  deadline_date: string;
}

const loadPension = async (pensionId: string): Promise<Pension | null> => {
  const query = `
      SELECT *
      FROM share_pension
      WHERE pension_id = ${pensionId}
    `;

  const response = await executeQuery(query);
  const data = response.data as Pension[]; // Assuming response is an array of users
  if (data.length > 0) {
    return data[0];
  }
  return null;
};

export default function PensionInfoInvest() {
  const [pension, setPension] = useState<Pension>();
  const [investmentAmount, setInvestmentAmount] = useState<string>('');

  const { pensionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPension = async () => {
      if (!pensionId) {
        return;
      }
      const response = await loadPension(pensionId);
      const data = response as Pension;

      setPension(data);
    };

    fetchPension();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // 정규식을 사용하여 숫자만 입력 허용
    if (/^\d*$/.test(value)) {
      setInvestmentAmount(value); // Convert value to a number
    }
  };

  const handleSubmit = async () => {
    if (investmentAmount === '') {
      alert('투자 금액을 입력해주세요.');
      return;
    }

    alert(`${Number(investmentAmount)}만원 투자요청 했습니다.`);
    navigate('..');
  };

  return (
    <article className="flex h-full w-full flex-col">
      {pension && (
        <div className="flex h-full w-full flex-col justify-between">
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
              투자 하기
            </p>
            <div className="w-[24px]" />
          </div>
          <div className="flex h-auto flex-col justify-between">
            <div className="mt-4 flex h-auto w-full flex-col justify-center">
              <div className="h-auto w-full justify-center">
                <img
                  className="w-full"
                  src={pensionBackground}
                  alt="background"
                />
              </div>
              <div className="mt-5 flex flex-col px-4">
                <div className="font-bold">{pension?.article_title}</div>
                <div className="text-sm">
                  공구 인원 {pension.number_of_participants}명 /{' '}
                  {pension.maximum_of_participants}명
                </div>
                <div className="text-sm">
                  모집 금액 {pension.current_investment_amount / 100000000}억원
                  / {pension.total_investment_amount / 100000000}억원
                </div>
                <div className="text-sm text-gray-500">
                  마감 날짜 {pension.deadline_date.split('T')[0]}
                </div>
              </div>
              <div className="mt-2 h-[0.05rem] w-full bg-gray-400" />
              <div className="p-4 font-bold">{pension.article_contents}</div>
              <div className="m-4 flex flex-col rounded-xl border border-gray-300 bg-gray-300 p-2">
                <p className="text-sm">첨부파일</p>
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
              <div className="mx-4 flex flex-col">
                <input
                  className="h-[3rem] w-full rounded border p-2 text-sm shadow-lg"
                  type="text"
                  name="investment_amount"
                  value={investmentAmount}
                  placeholder="투자 금액(만원 단위)"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onChange={handleChange}
                />
                <p className="p-2 text-xs text-gray-500">
                  최소 투자 금액은 {pension.minimum_investment_amount / 10000}
                  만원입니다.
                </p>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="m-4 h-[4rem] rounded bg-violet-700 text-lg text-white"
            onClick={handleSubmit}
          >
            투자요청
          </button>
        </div>
      )}
    </article>
  );
}
