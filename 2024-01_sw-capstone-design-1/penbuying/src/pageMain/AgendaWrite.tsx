import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Agenda,
  registerAgenda,
  sanitizeInput,
  loadOwnPensionByUserIdAndPensionId,
  OwnPension,
} from '../module/sqlOrm';
import { getSessionUser } from '../module/session';
import leftArrow from '../asset/imgs/leftArrowIcon.svg';

export default function AgendaWrite() {
  const navigate = useNavigate();
  const { pensionId } = useParams();
  const [agenda, setAgenda] = useState<Agenda>({
    agenda_no: 0,
    pension_id: pensionId ? Number(pensionId) : 0,
    agenda_title: '',
    agenda_contents: '',
    voting_type: 'secret',
    deadline_date: '',
  });

  useEffect(() => {
    const checkOwnPesion = async (
      userId: string,
      pensio_id: string,
    ): Promise<void> => {
      const response = await loadOwnPensionByUserIdAndPensionId(
        userId,
        pensio_id,
      );
      const data = response as OwnPension | null;
      if (data === null) {
        alert('잘못된 접근입니다.');
        navigate('..');
      }
    };

    const sessionUser = getSessionUser();
    if (sessionUser === null) {
      navigate('/');
      alert(`로그인이 필요합니다.`);
    } else {
      checkOwnPesion(sessionUser.user_id, pensionId as string);
    }
  }, []);

  const fetchAgenda = async () => {
    await registerAgenda(agenda);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    const sanitizedValue = sanitizeInput(value);

    setAgenda(prevPension => ({
      ...prevPension,
      [name]: sanitizedValue,
    }));
  };

  const handleSubmit = async () => {
    if (pensionId === undefined) {
      return;
    }

    if (
      agenda.agenda_title === '' ||
      agenda.agenda_contents === '' ||
      agenda.deadline_date === ''
    ) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    await fetchAgenda();

    alert('안건 작성 완료');
    navigate(`../agenda/${pensionId}`);
  };

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
          안건 생성
        </p>
        <div className="w-[24px]" />
      </div>
      <div className="mt-5 flex flex-col space-y-2 px-4">
        <input
          type="text"
          name="agenda_title"
          value={agenda.agenda_title}
          placeholder="제목"
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="date"
          name="deadline_date"
          value={agenda.deadline_date}
          onChange={handleChange}
          className="w-full rounded-md border p-2 shadow-2xl"
        />
        <textarea
          name="agenda_contents"
          value={agenda.agenda_contents}
          placeholder="안건내용"
          onChange={handleChange}
          className="h-80 w-full rounded-md border p-2 shadow-2xl"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 p-2 text-white"
        >
          등록하기
        </button>
      </div>
    </article>
  );
}
