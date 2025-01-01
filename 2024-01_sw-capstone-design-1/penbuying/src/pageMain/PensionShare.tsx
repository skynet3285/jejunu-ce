import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PensionInvestBox from '../component/PensionInvestBox';
import plusIcon from '../asset/imgs/plus.svg';
import { Pension, loadPensions } from '../module/sqlOrm';

export default function PensionShare() {
  const navigate = useNavigate();
  const [pensionMaxId, setPensionMaxId] = useState<number>(0);
  const [pensions, setPensions] = useState<Pension[]>([]);

  useEffect(() => {
    const fetchPensions = async () => {
      const response = await loadPensions();
      const data = response as Pension[];
      setPensions(data);
    };

    fetchPensions();
  }, []);

  useEffect(() => {
    if (pensions.length > 0) {
      const maxId = Math.max(...pensions.map(pension => pension.pension_id));
      setPensionMaxId(maxId);
    }
  }, [pensions]);

  const handleClick = () => {
    navigate(`invest/write/${pensionMaxId + 1}`);
  };

  return (
    <article className="mt-10 flex h-full w-full flex-col items-center">
      <div className="h-auto w-auto">
        {pensions &&
          pensions.map(pension => (
            <PensionInvestBox
              key={pension.article_id}
              pensionId={pension.pension_id}
              pensionImg={pension.pension_img}
              title={pension.article_title}
              member={`${pension.number_of_participants}명 / ${pension.maximum_of_participants}명`}
              price={`${pension.current_investment_amount / 100000000}억원 / ${pension.total_investment_amount / 100000000}억원`}
              status={pension.article_active ? '모집중' : '모집마감'}
            />
          ))}
      </div>
      <div className="absolute bottom-[6rem] right-[0.5rem] p-3">
        <button
          className="flex h-[2.5rem] w-[6rem] items-center justify-center rounded-full bg-violet-700 text-white"
          type="button"
          onClick={handleClick}
        >
          <img src={plusIcon} alt="plus" />
          <div className="w-[0.3rem]" />
          글쓰기
        </button>
      </div>
    </article>
  );
}
