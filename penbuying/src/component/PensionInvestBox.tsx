import { useNavigate } from 'react-router-dom';

interface Props {
  pensionId: number;
  pensionImg: string;
  title: string;
  member: string;
  price: string;
  status: '모집중' | '모집마감';
}

export default function PensionInvestBox(props: Props) {
  const { pensionId, pensionImg, title, member, price, status } = props;
  const navigate = useNavigate();

  return (
    <div className="h-auto w-auto rounded px-4 py-2 shadow-xl">
      <div className="flex w-[21rem] space-x-1">
        <img src={pensionImg} alt="pension1" />
        <div className="flex w-full flex-col justify-center">
          <h1 className="font-bold">{title}</h1>
          <p className="text-sm text-gray-500">공구인원 {member}</p>
          <p className="text-sm text-gray-500">모집금액 {price}</p>
          <p
            className={`text-sm font-bold ${status === '모집중' ? 'text-blue-500' : 'text-red-500'}`}
          >
            {status}
          </p>
        </div>
      </div>
      {status === '모집중' ? (
        <button
          className="mb-2 w-full rounded border-2 border-black bg-violet-950 p-2 text-sm text-white"
          type="button"
          onClick={() => {
            navigate(`invest/${pensionId}`);
          }}
        >
          투자하기
        </button>
      ) : (
        <div className="mb-2 w-full rounded border-2 border-gray-400 bg-gray-400 p-2 text-center text-sm text-white">
          투자마감
        </div>
      )}
    </div>
  );
}
