import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import executeQuery from '../module/sql';
import leftArrow from '../asset/imgs/leftArrowIcon.svg';

interface Agenda {
  agenda_no: number;
  pension_id: number;
  agenda_title: string;
  agenda_contents: string;
  voting_type: string;
  deadline_date: string;
}

interface AgendaVote {
  agenda_no: number;
  user_id: string;
  participate_vote: boolean;
  vote: string;
}

interface User {
  user_id: string;
  user_pw?: string;
  user_access?: number;
  user_name?: string;
  user_phone_number?: string;
  user_email?: string;
}

const loadAgendaByPensionId = async (
  agendaNo: string,
): Promise<Agenda | null> => {
  const query = `
          SELECT *
          FROM agenda
          WHERE agenda_no = '${agendaNo}'
        `;

  const response = await executeQuery(query);
  const data = response.data as Agenda[];
  if (data.length > 0) {
    return data[0];
  }
  return null;
};

const loadVote = async (
  agendaNo: string,
  userId: string,
): Promise<AgendaVote | null> => {
  const query = `
        SELECT vote
        FROM agenda_vote
        WHERE agenda_no = '${agendaNo}' AND user_id = '${userId}'
    `;

  const response = await executeQuery(query);
  const data = response.data as AgendaVote[];
  if (data.length > 0) {
    return data[0];
  }
  return null;
};

const insertVote = async (
  agendaNo: string,
  userId: string,
  vote: string,
): Promise<void> => {
  const query = `
    INSERT INTO agenda_vote (
        agenda_no,
        user_id,
        participate_vote,
        vote
    )
        VALUES ('${agendaNo}', '${userId}', true, '${vote}')
    `;

  await executeQuery(query);
};

export default function Vote() {
  const { agendaId } = useParams();
  const navigate = useNavigate();
  const [agenda, setAgenda] = useState<Agenda | null>(null);
  const [vote, setVote] = useState<AgendaVote | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    const data = sessionStorage.getItem('userInfo');

    if (data !== null) {
      const userInfo = JSON.parse(data) as User;
      setUser(userInfo);
    } else {
      navigate('/');
      alert(`로그인이 필요합니다.`);
    }
  }, []);

  useEffect(() => {
    const fetchAgenda = async () => {
      if (agendaId === undefined) {
        return;
      }
      const response = await loadAgendaByPensionId(agendaId);
      const data = response as Agenda;
      setAgenda(data);
    };

    fetchAgenda();
  }, []);

  useEffect(() => {
    const fetchAgendaVote = async () => {
      if (agendaId === undefined || user === null) {
        return;
      }
      const response = await loadVote(agendaId, user.user_id);
      const data = response as AgendaVote;
      setVote(data);
    };

    fetchAgendaVote();
  }, [user, reload]);

  return (
    <article className="flex h-full flex-col">
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
          투표 하기
        </p>
        <div className="w-[24px]" />
      </div>
      <div className="flex h-[100vw] flex-col">
        <div className="mt-4 flex  flex-col">
          <div className="px-4">
            <p className="font-bold">{agenda?.agenda_title}</p>
            <p className="text-sm text-gray-500">
              마감날짜 {agenda?.deadline_date.slice(0, 10)}
            </p>
          </div>
          <div className="mt-2 h-[0.05rem] w-full bg-gray-400" />
          <div className="mt-2 px-4">
            <p className="text-sm font-bold">{agenda?.agenda_contents}</p>
          </div>
        </div>
      </div>

      {vote === null ? (
        <div className="absolute bottom-20 flex w-full justify-around">
          <button
            className="w-[44%] rounded-lg border border-green-600 bg-green-600 py-1 text-white"
            type="button"
            onClick={() => {
              insertVote(agendaId as string, user?.user_id as string, '찬성');
              alert('찬성 투표가 완료되었습니다.');
              setReload(!reload);
            }}
          >
            찬성투표
          </button>
          <button
            className="w-[44%] rounded-lg border border-red-600 bg-red-600 py-1 text-white"
            type="button"
            onClick={() => {
              insertVote(agendaId as string, user?.user_id as string, '반대');
              alert('반대 투표가 완료되었습니다.');
              setReload(!reload);
            }}
          >
            반대투표
          </button>
        </div>
      ) : (
        <div className="absolute bottom-20 flex w-full justify-around">
          {vote.vote === '찬성' ? (
            <>
              <div className="w-[44%] rounded-lg border border-gray-600 bg-gray-600 py-1 text-center text-white">
                찬성투표
              </div>
              <div className="w-[44%] rounded-lg border border-red-600 bg-red-600 py-1 text-center text-white">
                반대투표
              </div>
            </>
          ) : (
            <>
              <div className="w-[44%] rounded-lg border border-green-600 bg-green-600 py-1 text-center text-white">
                찬성투표
              </div>
              <div className="w-[44%] rounded-lg border border-gray-600 bg-gray-600 py-1 text-center text-white">
                반대투표
              </div>
            </>
          )}
        </div>
      )}
    </article>
  );
}
