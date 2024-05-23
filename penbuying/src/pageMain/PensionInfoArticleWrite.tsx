import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import executeQuery from '../module/sql';
import leftArrow from '../asset/imgs/leftArrowIcon.svg';
import cameraIcon from '../asset/imgs/camera.svg';
import plusIcon from '../asset/imgs/plusBlack.svg';
import crossIcon from '../asset/imgs/cross.svg';
import hwpIcon from '../asset/imgs/hwpIcon.png';

interface Pension {
  pension_id: string | undefined;
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

const insertArticle = async (data: Pension): Promise<void> => {
  const query = `
  INSERT INTO share_pension (
    pension_id,
    article_title,
    article_contents,
    pension_img,
    article_active,
    current_investment_amount,
    total_investment_amount,
    minimum_investment_amount,
    number_of_participants,
    maximum_of_participants,
    deadline_date
  ) VALUES (
    ${data.pension_id},
    '${data.article_title}',
    '${data.article_contents}',
    '${data.pension_img}',
    ${data.article_active},
    ${data.current_investment_amount},
    ${data.total_investment_amount},
    ${data.minimum_investment_amount},
    ${data.number_of_participants},
    ${data.maximum_of_participants},
    '${data.deadline_date}'
  )
    `;

  await executeQuery(query);
};

export default function PensionInfoArticleWrite() {
  const { pensionId } = useParams();
  const navigate = useNavigate();

  const [pension, setPension] = useState<Pension>({
    pension_id: pensionId,
    article_title: '',
    article_contents: '',
    pension_img: '../imgs/pension1.png',
    article_active: true,
    current_investment_amount: 0,
    total_investment_amount: 0,
    minimum_investment_amount: 0,
    number_of_participants: 0,
    maximum_of_participants: 0,
    deadline_date: '',
  });

  const fetchPension = async () => {
    await insertArticle(pension);
  };

  const changeUnit = () => {
    setPension(prevPension => ({
      ...prevPension,
      minimum_investment_amount: prevPension.minimum_investment_amount * 10000,
      total_investment_amount: prevPension.total_investment_amount * 10000,
    }));
  };

  useEffect(() => {}, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (
      name === 'total_investment_amount' ||
      name === 'minimum_investment_amount' ||
      name === 'maximum_of_participants'
    ) {
      if (/^\d*$/.test(value)) {
        setPension(prevPension => ({
          ...prevPension,
          [name]: Number(value),
        }));
      }
    } else {
      setPension(prevPension => ({
        ...prevPension,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!pensionId) {
      alert('잘못된 접근입니다.');
      return;
    }

    if (
      pension.article_title === '' ||
      pension.article_contents === '' ||
      pension.total_investment_amount === 0 ||
      pension.minimum_investment_amount === 0 ||
      pension.maximum_of_participants === 0 ||
      pension.deadline_date === ''
    ) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    changeUnit();

    console.log(pension);

    await fetchPension();

    alert('게시글 작성 완료');
    navigate('..');
  };

  return (
    <article className="flex h-full w-full flex-col">
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
            펜션공동구매 글쓰기
          </p>
          <div className="w-[24px]" />
        </div>
        <div className="mt-5 flex h-full flex-col justify-start px-5">
          <div className="mt-4 flex h-auto w-full flex-col justify-start">
            <button
              // onClick = {파일추가기능} <- 미구현
              type="button"
              className="flex h-[3.875rem] w-[3.875rem] items-center justify-center rounded bg-gray-300"
            >
              <img src={cameraIcon} alt="camera" />
            </button>
            <div className="my-2 flex">
              <input
                className="h-[3rem] w-full rounded-xl border p-2 text-sm shadow-lg"
                type="text"
                name="article_title"
                value={pension.article_title}
                placeholder="제목"
                inputMode="text"
                onChange={handleChange}
              />
            </div>
            <div className="my-2 flex justify-between">
              <input
                className="h-[3rem] w-[49.5%] rounded-xl border p-2 text-sm shadow-lg"
                type="date"
                name="deadline_date"
                value={pension.deadline_date}
                onChange={handleChange}
              />
              <input
                className="h-[3rem] w-[49.5%] rounded-xl border p-2 text-sm shadow-lg"
                type="text"
                name="maximum_of_participants"
                value={
                  pension.maximum_of_participants === 0
                    ? ''
                    : pension.maximum_of_participants
                }
                placeholder="최대모집인원"
                onChange={handleChange}
              />
            </div>
            <div className="my-2 flex justify-between">
              <input
                className="h-[3rem] w-[49.5%] rounded-xl border p-2 text-sm shadow-lg"
                type="text"
                name="total_investment_amount"
                value={
                  pension.total_investment_amount === 0
                    ? ''
                    : pension.total_investment_amount
                }
                placeholder="모집금액(만원 단위)"
                onChange={handleChange}
              />
              <input
                className="h-[3rem] w-[49.5%] rounded-xl border p-2 text-sm shadow-lg"
                type="text"
                name="minimum_investment_amount"
                value={
                  pension.minimum_investment_amount === 0
                    ? ''
                    : pension.minimum_investment_amount
                }
                placeholder="최소투자금액(만원 단위)"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="my-2 flex h-[20rem]">
            <textarea
              className="h-full w-full rounded-xl border border-gray-300 bg-gray-300 p-2 text-sm shadow-lg"
              name="article_contents"
              value={pension.article_contents}
              placeholder="공동투자 계획 내용"
              onChange={handleChange}
            />
          </div>
          <div className="my-2 flex flex-col rounded-xl border border-gray-300 bg-gray-300 p-2 shadow-lg">
            <p className="flex text-sm">
              <img src={plusIcon} alt="plus" />
              <div className="w-1" />
              파일 업로드
            </p>
            <p className="my-1 flex text-sm">
              <img src={hwpIcon} alt="hwp" />
              부동산 공유지분 매매계약서.hwp
              <img src={crossIcon} alt="cross" />
            </p>
            <p className="my-1 flex text-sm">
              <img src={hwpIcon} alt="hwp" />
              부동산 공유지분 위치확인동의서.hwp
              <img src={crossIcon} alt="cross" />
            </p>
            <p className="my-1 flex text-sm">
              <img src={hwpIcon} alt="hwp" />
              지분 공유 펜션 이용약관.hwp
              <img src={crossIcon} alt="cross" />
            </p>
          </div>
        </div>
        <button
          type="button"
          className="m-4 h-[4rem] rounded bg-violet-700 text-lg text-white"
          onClick={handleSubmit}
        >
          등록하기
        </button>
      </div>
    </article>
  );
}
