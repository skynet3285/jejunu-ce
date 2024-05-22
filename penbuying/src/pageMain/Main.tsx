import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PensionMain from './PensionMain';
import MyMain from './MyMain';
import IconPensionHome from '../asset/imgs/pensionMain.svg';
import IconActivePensionHome from '../asset/imgs/pensionMainA.svg';
import IconChat from '../asset/imgs/pensionChat.svg';
import IconActiveChat from '../asset/imgs/pensionChatA.svg';
import IconInfo from '../asset/imgs/pensionInvestInfo.svg';
import IconActiveInfo from '../asset/imgs/pensionInvestInfoA.svg';
import IconUser from '../asset/imgs/pensionUser.svg';
import IconActiveUser from '../asset/imgs/pensionUserA.svg';

export default function Main() {
  const location = useLocation();
  const [select, setSelect] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = sessionStorage.getItem('userInfo');
    if (data !== null) {
      setIsActive(true);
    } else {
      navigate('/');
      alert(`로그인이 필요합니다.`);
    }
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith('/main/pensionMain')) {
      setSelect(0);
    } else if (location.pathname.startsWith('/main/chat')) {
      setSelect(1);
    } else if (location.pathname.startsWith('/main/investGuide')) {
      setSelect(2);
    } else if (location.pathname.startsWith('/main/my')) {
      setSelect(3);
    } else {
      setSelect(0);
    }
  }, [location.pathname]);

  function getColor(index: number) {
    return select === index ? 'text-[#7223D8]' : '';
  }

  return (
    <div className="flex h-screen w-screen flex-col ">
      <main className="h-[90vh] overflow-y-auto">
        {/* 라우팅되는 페이지가 삽입되는 자리입니다 */}
        <Routes>
          <Route path="/pensionMain/*" element={<PensionMain />} />
          <Route path="/chat/*" element={<PensionMain />} />
          <Route path="/investGuide/*" element={<PensionMain />} />
          <Route path="/my/*" element={<MyMain />} />
        </Routes>
      </main>
      {isActive && (
        <footer className="flex flex-col">
          <div className="flex h-[6rem] w-full">
            <a
              href="/main/pensionMain"
              className="flex w-full flex-col items-center justify-center"
            >
              {select === 0 ? (
                <img src={IconActivePensionHome} alt="pension home" />
              ) : (
                <img src={IconPensionHome} alt="pension home" />
              )}
              <p className={`${getColor(0)} text-xs`}>펜션공구</p>
            </a>
            <a
              href="/main/chat"
              className="flex w-full flex-col items-center justify-center"
            >
              {select === 1 ? (
                <img src={IconActiveChat} alt="pension chat" />
              ) : (
                <img src={IconChat} alt="pension chat" />
              )}
              <p className={`${getColor(1)} text-xs`}>채팅</p>
            </a>
            <a
              href="/main/investGuide"
              className="flex w-full flex-col items-center justify-center"
            >
              {select === 2 ? (
                <img src={IconActiveInfo} alt="pension info" />
              ) : (
                <img src={IconInfo} alt="pension info" />
              )}
              <p className={`${getColor(2)} text-xs`}>투자가이드</p>
            </a>
            <a
              href="/main/my"
              className="flex w-full flex-col items-center justify-center"
            >
              {select === 3 ? (
                <img src={IconActiveUser} alt="pension user" />
              ) : (
                <img src={IconUser} alt="pension user" />
              )}
              <p className={`${getColor(3)} text-xs`}>My</p>
            </a>
          </div>
        </footer>
      )}
    </div>
  );
}
