import { useEffect, useState } from 'react';
import PensionInvestBox from '../component/PensionInvestBox';
import executeQuery from '../module/sql';

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

const loadPension = async (): Promise<Pension[] | null> => {
  const query = `
    SELECT *
    FROM share_pension
  `;

  const response = await executeQuery(query);
  const data = response.data as Pension[]; // Assuming response is an array of users
  if (data.length > 0) {
    return data;
  }
  return null;
};

export default function PensionMain() {
  const [pensions, setPensions] = useState<Pension[]>([]);

  useEffect(() => {
    const fetchPensions = async () => {
      const response = await loadPension();
      const data = response as Pension[];
      setPensions(data);
    };

    fetchPensions();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center py-10">
        {pensions &&
          pensions.map(pension => (
            <PensionInvestBox
              key={pension.article_id}
              pensionImg={pension.pension_img}
              title={pension.article_title}
              member={`${pension.number_of_participants}명 / ${pension.maximum_of_participants}명`}
              price={`${pension.current_investment_amount / 100000000}억원 / ${pension.total_investment_amount / 100000000}억원`}
              status={pension.article_active ? '모집중' : '모집마감'}
            />
          ))}
      </div>
    </div>
  );
}
