import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from './Register';
import executeQuery from '../module/sql';
import { useUser } from '../UserContext';

interface UserLogin {
  user_id: string;
  user_pw: string;
}

const loginUser = async (user: UserLogin): Promise<User | null> => {
  const query = `
    SELECT *
    FROM user
    WHERE user_id = '${user.user_id}' AND user_pw = '${user.user_pw}'
  `;

  const response = await executeQuery(query);
  const userData: User[] = response.data; // Assuming response is an array of users
  if (userData.length > 0) {
    return userData[0];
  }
  return null;
};

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [userLogin, setUserLogin] = useState<UserLogin>({
    user_id: '',
    user_pw: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserLogin(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await loginUser(userLogin);
    if (response) {
      alert('로그인 성공');
      const user = response as User;
      setUser(user);

      navigate('/main/PensionMain');
      return;
    }
    alert('아이디 패스워드를 확인하세요');
  };

  return (
    <div>
      <div className="mb-10 mt-40 flex flex-col justify-center">
        <p className="text-bold text-center text-2xl font-bold	">
          펜션 그룹 투자
        </p>
        <p className="text-bold text-center text-2xl font-bold">
          &lsquo;펜바잉&lsquo;
        </p>
      </div>
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <input
          className="mb-2 w-[18rem] rounded border-2 border-black p-2 text-sm"
          type="text"
          name="user_id"
          placeholder="아이디"
          value={userLogin.user_id}
          onChange={handleChange}
        />
        <input
          className="mb-7 w-[18rem] rounded border-2 border-black p-2 text-sm"
          type="password"
          name="user_pw"
          placeholder="비밀번호"
          value={userLogin.user_pw}
          onChange={handleChange}
        />
        <button
          className="mb-2 w-[18rem] rounded border-2 border-black bg-violet-950 p-2 text-sm text-white"
          type="submit"
        >
          로그인
        </button>
      </form>
      <div className="mt-2 flex w-full items-center justify-center space-x-3">
        <a className="text-sm text-gray-500" href="/findID">
          아이디 찾기
        </a>
        <div className="h-[1rem] w-[0.05rem] bg-gray-500" />
        <a className="text-sm text-gray-500" href="/findPW">
          비밀번호 찾기
        </a>
        <div className="h-[1rem] w-[0.05rem] bg-gray-500" />
        <a className="text-sm text-gray-500" href="/register">
          회원가입
        </a>
      </div>
    </div>
  );
}
