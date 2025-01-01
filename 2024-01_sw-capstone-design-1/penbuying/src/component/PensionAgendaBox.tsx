import { useNavigate } from 'react-router-dom';

interface Props {
  agendaNo: number;
  agendaTitle: string;
  deadlineDate: string;
}

export default function PensionAgendaBox({
  agendaNo,
  agendaTitle,
  deadlineDate,
}: Props) {
  const navigate = useNavigate();

  const checkDeadline = (): boolean => {
    const now = new Date();
    const deadline = new Date(deadlineDate);
    return now < deadline;
  };

  const isDeadLine = checkDeadline();

  return (
    <div className="flex w-[21rem] flex-col space-y-1 rounded-l p-3 shadow-2xl">
      <p className="font-bold">{agendaTitle}</p>
      {isDeadLine ? (
        <p className="text-sm text-blue-700">투표중</p>
      ) : (
        <p className="text-sm text-red-700">투표마감</p>
      )}
      {isDeadLine ? (
        <button
          className="rounded bg-violet-700 p-2 text-white"
          type="button"
          onClick={() => {
            navigate(`../vote/${agendaNo}`);
          }}
        >
          투표하기
        </button>
      ) : (
        <button className="rounded bg-gray-500 p-2 text-white" type="button">
          투표하기
        </button>
      )}
    </div>
  );
}
