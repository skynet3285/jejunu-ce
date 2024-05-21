import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PensionMain from './PensionMain';
import IconPensionHome from '../imgs/pensionMain.svg';
import IconActivePensionHome from '../imgs/pensionMainA.svg';
import IconChat from '../imgs/pensionChat.svg';
import IconActiveChat from '../imgs/pensionChatA.svg';
import IconInfo from '../imgs/pensionInvestInfo.svg';
import IconActiveInfo from '../imgs/pensionInvestInfoA.svg';
import IconUser from '../imgs/pensionUser.svg';
import IconActiveUser from '../imgs/pensionUserA.svg';

export default function Main() {
  const location = useLocation();
  const [select, setSelect] = useState<number>(0);

  useEffect(() => {
    switch (location.pathname) {
      case '/main/pensionMain':
        setSelect(0);
        break;
      case '/main/chat':
        setSelect(1);
        break;
      case '/main/investGuide':
        setSelect(2);
        break;
      case '/main/my':
        setSelect(3);
        break;
      default:
        setSelect(0);
    }
  }, [location.pathname]);

  function getColor(index: number) {
    return select === index ? 'text-[#7223D8]' : '';
  }

  return (
    <div className="flex h-screen w-screen flex-col ">
      <div className="h-full">
        <Routes>
          <Route path="/pensionMain" element={<PensionMain />} />
          <Route path="/chat" element={<PensionMain />} />
          <Route path="/investGuide" element={<PensionMain />} />
          <Route path="/my" element={<PensionMain />} />
        </Routes>
      </div>
      <Outlet />
      <footer className="flex h-[6rem] w-full">
        <a
          onClick={() => setSelect(0)}
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
          onClick={() => setSelect(1)}
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
          onClick={() => setSelect(2)}
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
          onClick={() => setSelect(3)}
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
      </footer>
    </div>
  );
}
