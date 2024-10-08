import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {
  User,
  isEmail,
  isPhoneNumber,
  registerUser,
  sanitizeInput,
} from '../module/sqlOrm';

export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    user_id: '',
    user_pw: '',
    user_access: 0,
    user_name: '',
    user_phone_number: '',
    user_email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser(prevUser => ({
      ...prevUser,
      [name]: sanitizeInput(value),
    }));
  };

  const handleSubmit = async () => {
    if (
      user.user_id === '' ||
      user.user_pw === '' ||
      user.user_name === '' ||
      user.user_phone_number === '' ||
      user.user_email === ''
    ) {
      alert('모든 항목을 입력해주세요.');
    } else if (!isPhoneNumber(user.user_phone_number)) {
      alert('전화번호 형식이 아닙니다.');
    } else if (!isEmail(user.user_email)) {
      alert('이메일 형식이 아닙니다.');
    } else {
      try {
        await registerUser(user);
        alert('회원가입 성공');
        navigate('/');
      } catch {
        alert('이미 존재하는 회원입니다.');
      }
    }
  };

  return (
    <article className="flex flex-col">
      <div className="mb-10 mt-40 flex flex-col justify-center">
        <p className="text-bold text-center text-2xl font-bold	">
          펜션 그룹 투자
        </p>
        <p className="text-bold text-center text-2xl font-bold">
          &lsquo;펜바잉&lsquo;
        </p>
      </div>
      <div className="flex w-full flex-col items-center">
        <input
          className="mb-2 w-[18rem] rounded border-2 border-black p-2 text-sm"
          type="text"
          name="user_id"
          value={user.user_id}
          placeholder="아이디"
          onChange={handleChange}
        />
        <input
          className="mb-2 w-[18rem] rounded border-2 border-black p-2 text-sm"
          type="password"
          name="user_pw"
          value={user.user_pw}
          placeholder="비밀번호"
          onChange={handleChange}
        />
        <input
          className="mb-2 w-[18rem] rounded border-2 border-black p-2 text-sm"
          type="text"
          name="user_name"
          value={user.user_name}
          placeholder="이름"
          onChange={handleChange}
        />
        <input
          className="mb-2 w-[18rem] rounded border-2 border-black p-2 text-sm"
          type="text"
          name="user_phone_number"
          value={user.user_phone_number}
          placeholder="휴대전화"
          onChange={handleChange}
        />
        <input
          className="mb-7 w-[18rem] rounded border-2 border-black p-2 text-sm"
          type="email"
          name="user_email"
          value={user.user_email}
          placeholder="이메일"
          onChange={handleChange}
        />
        <button
          className="mb-2 w-[18rem] rounded border-2 border-black bg-violet-950 p-2 text-sm text-white"
          type="button"
          onClick={handleSubmit}
        >
          회원가입
        </button>
      </div>
    </article>
  );
}
