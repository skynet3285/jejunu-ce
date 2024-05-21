import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from '../pageUser/Register';
import userProfile from '../asset/imgs/userDefaultProfile.png';
import PensionOwnBox from '../component/PensionOwnBox';
import executeQuery from '../module/sql';

interface OwnPension {
  user_id: string;
  pension_id: number;
  own_percent: number;
  investment_amount: number;
}

const loadOwnPensionByUserId = async (
  userId: string,
): Promise<OwnPension[] | null> => {
  const query = `
      SELECT *
      FROM own
      WHERE user_id = '${userId}'
    `;

  const response = await executeQuery(query);
  const data = response.data as OwnPension[];
  if (data.length > 0) {
    return data;
  }
  return null;
};

export default function My() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    user_id: '',
    user_name: '',
    user_access: 0,
    user_phone_number: '',
    user_email: '',
  });
  const [ownPensions, setOwnPensions] = useState<OwnPension[] | null>(null);

  useEffect(() => {
    const fetchOwnPensions = async (userId: string) => {
      const response = await loadOwnPensionByUserId(userId);
      const data = response as OwnPension[];
      setOwnPensions(data);
    };

    const data = sessionStorage.getItem('userInfo');
    if (data !== null) {
      const userInfo = JSON.parse(data) as User;
      setUser(userInfo);

      fetchOwnPensions(userInfo.user_id);
    } else {
      navigate('/');
      alert(`로그인이 필요합니다.`);
    }
  }, []);

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <div className="h-auto w-auto rounded px-4 py-2 shadow-xl">
        <div className="flex h-[6rem] w-[21rem] flex-col justify-center space-x-1">
          <div className="flex justify-between">
            <img src={userProfile} alt="profile" />
            <div className="flex w-[11rem] flex-col justify-around">
              <h1 className="font-bold">안녕하세요, {user.user_name}님</h1>
              <p className="text-sm text-gray-500">계정관리</p>
            </div>
            <button
              className="rounded bg-red-700 p-2 text-white"
              type="button"
              onClick={() => {
                sessionStorage.removeItem('userInfo');
                navigate('/');
                alert('로그아웃 되었습니다.');
              }}
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
      <div className="my-4 flex flex-col">
        {ownPensions &&
          ownPensions.map(ownPension => (
            <PensionOwnBox
              key={ownPension.pension_id}
              pensionId={ownPension.pension_id}
              ownPercent={ownPension.own_percent}
            />
          ))}
      </div>
    </div>
  );
}
