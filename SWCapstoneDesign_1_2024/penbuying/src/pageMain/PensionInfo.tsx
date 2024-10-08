import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import leftArrow from '../asset/imgs/leftArrowIcon.svg';
import pensionBackground from '../asset/imgs/pensionBackground.png';
import hwpIcon from '../asset/imgs/hwpIcon.png';
import { Pension, loadPensionByPensionId } from '../module/sqlOrm';
import {
  getFormFileContractOfSale,
  getFormFileLocationConfirmationConsent,
  getFormFileTermsOfUse,
} from '../module/penbuying_form_file';

export default function PensionInfo() {
  const navigate = useNavigate();
  const { pensionId } = useParams();
  const [pension, setPension] = useState<Pension>();

  useEffect(() => {
    const fetchPension = async () => {
      if (pensionId === undefined) {
        return;
      }
      const response = await loadPensionByPensionId(Number(pensionId));
      const data = response as Pension;

      setPension(data);
    };

    fetchPension();
  }, []);

  return (
    <article className="flex flex-col">
      {pension && (
        <div>
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => {
                navigate('..');
              }}
            >
              <img src={leftArrow} alt="leftArrow" />
            </button>
            <p className="w-full text-center text-lg font-bold">펜션 정보</p>
            <div className="w-[24px]" />
          </div>
          <div className="mt-4 flex flex-col justify-center">
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
                모집 금액 {pension.current_investment_amount / 100000000}억원 /{' '}
                {pension.total_investment_amount / 100000000}억원
              </div>
              <div className="text-sm text-gray-500">
                마감 날짜 {pension.deadline_date.split('T')[0]}
              </div>
            </div>
            <div className="mt-2 h-[0.05rem] w-full bg-gray-400" />
            <div className="mt-4 px-4 font-bold">
              {pension.article_contents}
            </div>
            <div className="m-4 flex flex-col rounded-xl border border-gray-300 bg-gray-300 p-2">
              <p className="text-sm">첨부파일</p>
              <a
                href={getFormFileContractOfSale()}
                className="my-1 flex text-sm"
              >
                <img src={hwpIcon} alt="hwp" />
                부동산 공유지분 매매계약서.hwp
              </a>
              <a
                href={getFormFileLocationConfirmationConsent()}
                className="my-1 flex text-sm"
              >
                <img src={hwpIcon} alt="hwp" />
                부동산 공유지분 위치확인동의서.hwp
              </a>
              <a href={getFormFileTermsOfUse()} className="my-1 flex text-sm">
                <img src={hwpIcon} alt="hwp" />
                지분 공유 펜션 이용약관.hwp
              </a>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
