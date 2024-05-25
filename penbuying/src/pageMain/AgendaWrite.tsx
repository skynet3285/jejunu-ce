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

const insertAgenda = async (agenda: Agenda): Promise<void> => {
  const query = `
  INSERT INTO agenda(
    pension_id,
    agenda_title,
    agenda_contents,
    voting_type,
    deadline_date
  ) VALUES (
    ${agenda.pension_id},
    '${agenda.agenda_title}',
    '${agenda.agenda_contents}',
    '${agenda.voting_type}',
    '${agenda.deadline_date}'
  )
  `;

  await executeQuery(query);
};

export default function AgendaWrite() {
  const navigate = useNavigate();
  const { pensionId } = useParams();
  const [agenda, setAgenda] = useState<Agenda>({
    agenda_no: 0,
    pension_id: Number(pensionId),
    agenda_title: '',
    agenda_contents: '',
    voting_type: 'secret',
    deadline_date: '',
  });

  useEffect(() => {
    if (!pensionId) {
      alert('잘못된 접근입니다.');
      navigate('..');
    }
  }, []);

  const fetchAgenda = async () => {
    await insertAgenda(agenda);
  };

  const sanitizeInput = (input: string): string =>
    // 이 정규식은 입력값에서 특정 특수문자를 제거합니다.
    input.replace(/['"\\`#;]/g, '');

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
    if (!pensionId) {
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
    navigate('..');
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
