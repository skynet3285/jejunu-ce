import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import userProfile from '../asset/imgs/userDefaultProfile.png';
import PensionOwnBox from '../component/PensionOwnBox';
import { User, OwnPension, loadOwnPensionsByUserId } from '../module/sqlOrm';
import { getSessionUser } from '../module/session';

export default function My() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    user_id: '',
    user_pw: '',
    user_name: '',
    user_access: 0,
    user_phone_number: '',
    user_email: '',
  });
  const [ownPensions, setOwnPensions] = useState<OwnPension[] | null>(null);

  useEffect(() => {
    const fetchOwnPensions = async (userId: string) => {
      const response = await loadOwnPensionsByUserId(userId);
      const data = response as OwnPension[];
      setOwnPensions(data);
    };
    const sessionUser = getSessionUser();

    if (sessionUser === null) {
      navigate('/');
      alert(`로그인이 필요합니다.`);
    } else {
      setUser(sessionUser);
      fetchOwnPensions(sessionUser.user_id);
    }
  }, []);

  return (
    <article className="flex flex-col">
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
    </article>
  );
}
