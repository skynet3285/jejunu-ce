import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import leftArrow from '../asset/imgs/leftArrowIcon.svg';
import {
  User,
  Agenda,
  loadAgendaByAgendaNo,
  AgendaVote,
  loadVoteByAgendaNoAndUserId,
  registerVote,
} from '../module/sqlOrm';
import { getSessionUser } from '../module/session';

export default function Vote() {
  const navigate = useNavigate();
  const { agendaNo } = useParams();
  const [agenda, setAgenda] = useState<Agenda | null>(null);
  const [vote, setVote] = useState<AgendaVote | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    const sessionUser = getSessionUser();

    if (sessionUser == null) {
      navigate('/');
      alert(`로그인이 필요합니다.`);
    } else {
      setUser(sessionUser);
    }
  }, []);

  useEffect(() => {
    const fetchAgenda = async () => {
      if (agendaNo === undefined) {
        return;
      }
      const response = await loadAgendaByAgendaNo(agendaNo);
      const data = response as Agenda;
      setAgenda(data);
    };

    fetchAgenda();
  }, []);

  useEffect(() => {
    const fetchAgendaVote = async () => {
      if (agendaNo === undefined || user === null) {
        return;
      }
      const response = await loadVoteByAgendaNoAndUserId(
        agendaNo,
        user.user_id,
      );
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
              registerVote({
                agenda_no: Number(agendaNo),
                user_id: user?.user_id as string,
                participate_vote: true,
                vote: '찬성',
              });
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
              registerVote({
                agenda_no: Number(agendaNo),
                user_id: user?.user_id as string,
                participate_vote: true,
                vote: '반대',
              });
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
