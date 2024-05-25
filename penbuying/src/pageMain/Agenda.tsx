import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import executeQuery from '../module/sql';
import PensionAgendaBox from '../component/PensionAgendaBox';
import leftArrow from '../asset/imgs/leftArrowIcon.svg';
import plusIcon from '../asset/imgs/plus.svg';

interface Agenda {
  agenda_no: number;
  pension_id: number;
  agenda_title: string;
  agenda_contents: string;
  voting_type: string;
  deadline_date: string;
}

const loadAgendaByPensionId = async (
  pensionId: string,
): Promise<Agenda[] | null> => {
  const query = `
        SELECT *
        FROM agenda
        WHERE pension_id = '${pensionId}'
      `;

  const response = await executeQuery(query);
  const data = response.data as Agenda[];
  if (data.length > 0) {
    return data;
  }
  return null;
};

export default function AgendaMain() {
  const { pensionId } = useParams();
  const navigate = useNavigate();
  const [agenda, setAgenda] = useState<Agenda[] | null>(null);

  useEffect(() => {
    const fetchAgenda = async () => {
      if (pensionId === undefined) {
        return;
      }
      const response = await loadAgendaByPensionId(pensionId);
      const data = response as Agenda[];
      setAgenda(data);
    };

    fetchAgenda();
  }, []);

  return (
    <article className="flex h-[90vh] flex-col">
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
          안건 관리
        </p>
        <div className="w-[24px]" />
      </div>
      <div className="mt-10 flex w-full flex-col items-center space-y-2">
        {agenda &&
          agenda.map(a => (
            <PensionAgendaBox
              key={a.agenda_no}
              agendaNo={a.agenda_no}
              agendaTitle={a.agenda_title}
              deadlineDate={a.deadline_date}
            />
          ))}
      </div>
      <div className="absolute bottom-[6rem] right-[0.5rem] p-3">
        <button
          className="flex h-[2.5rem] w-[7rem] items-center justify-center rounded-full bg-violet-700 text-white"
          type="button"
          onClick={() => {
            navigate(`../agendaWrite/${pensionId}`);
          }}
        >
          <img src={plusIcon} alt="plus" />
          <div className="w-[0.3rem]" />
          안건생성
        </button>
      </div>
    </article>
  );
}
