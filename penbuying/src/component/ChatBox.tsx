import userProfile from '../asset/imgs/userDefaultProfile.png';

interface Props {
  sender: boolean;
  msg: string;
}

export default function ChatBox({ sender, msg }: Props) {
  return (
    <div
      className={`flex w-full items-center ${sender ? 'justify-end' : 'justify-start'}`}
    >
      <div className="flex items-center justify-center">
        {!sender ? (
          <img className="mr-2 w-10" src={userProfile} alt="profile" />
        ) : (
          ''
        )}
        <p
          className={`rounded-xl border p-[0.4rem] text-white ${sender ? 'border-violet-900 bg-violet-900' : 'border-green-600 bg-green-600'}`}
        >
          {msg}
        </p>
      </div>
    </div>
  );
}
