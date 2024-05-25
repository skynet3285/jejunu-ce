import { useNavigate, useParams } from 'react-router-dom';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import ChatBox from '../layout/ChatBox';
import leftArrow from '../asset/imgs/leftArrowIcon.svg';
import {
  User,
  Chat,
  loadChatsByChatId,
  sendChat,
  ChatParticipant,
  loadChatParticipantsByUserId,
  ChatRoom,
  loadChatRoomByChatId,
  sanitizeInput,
} from '../module/sqlOrm';
import { getSessionUser } from '../module/session';

interface ChatParams {
  chat_id: number;
  user_id: string;
  chat_contents: string;
}

async function sendChatA(param: ChatParams): Promise<void> {
  const formatDateToSQL = (): string => {
    const date = new Date();
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  await sendChat({
    chat_no: 0,
    chat_id: param.chat_id,
    user_id: param.user_id,
    chat_contents: param.chat_contents,
    chat_date: formatDateToSQL(),
  });
}

export default function ChatMain() {
  // 채팅창의 스크롤을 가장 아래로 내리기 위한 ref
  // const chatContainerRef = useRef(null);
  //
  // 채팅창의 스크롤을 가장 아래로 내리기 위한 useEffect
  // useEffect(() => {
  //   if (!chatContainerRef.current) {
  //     return;
  //   }
  //   const chatContainer = chatContainerRef.current as HTMLDivElement;

  //   if (chatContainer) {
  //     chatContainer.scrollTop = chatContainer.scrollHeight;
  //   }
  // }, [chat]);

  const navigate = useNavigate();
  const { chatId } = useParams();
  const [validMsg, setValidMsg] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [chatTitle, setChatTitle] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [chat, setChat] = useState<Chat[] | null>(null);
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    // 유효성 검사후 이상이 감지되면 경고창을 띄우고 이전 페이지로 이동
    if (validMsg !== '') {
      alert(validMsg);
      navigate('..');
    }
  }, [validMsg]);

  useEffect(() => {
    const checkValidUser = async () => {
      const sessionUser = getSessionUser();

      if (sessionUser === null) {
        navigate('/');
        alert(`로그인이 필요합니다.`);
        return false;
      }
      setUser(sessionUser);

      const response = await loadChatParticipantsByUserId(sessionUser.user_id);
      const data = response as ChatParticipant[];

      if (data === null || !data.some(d => d.chat_id.toString() === chatId)) {
        // data가 null이 아닐때 오른쪽 식이 수행됨
        setValidMsg('채팅방에 참여하지 않은 사용자입니다');
        return false;
      }
      return true;
    };

    const checkValidChatRoom = async () => {
      if (chatId === undefined) {
        setValidMsg('채팅방을 선택해주세요');
        return false;
      }

      const response = await loadChatRoomByChatId(chatId.toString());
      const data = response as ChatRoom;
      if (data === null) {
        setValidMsg('채팅방을 불러올수 없습니다');
        return false;
      }
      setChatTitle(data.chat_title);
      return true;
    };

    const executeTasks = async () => {
      if (
        ((await checkValidUser()) as boolean) &&
        ((await checkValidChatRoom()) as boolean)
      ) {
        setIsActive(true); // 유효성 검사 통과
      }
    };

    executeTasks();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setReload(prevReload => !prevReload);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchChat = async () => {
      const response = await loadChatsByChatId(chatId as string);
      const data = response as Chat[];
      if (data === null) {
        return;
      }
      setChat(data);
    };

    fetchChat();
  }, [reload]);

  const adjustTextareaHeight = () => {
    // 텍스트가 길때 입력창의 높이 조절하는 함수
    if (!textareaRef.current) {
      return;
    }
    const textarea = textareaRef.current as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  adjustTextareaHeight();
  useEffect(() => {}, [message]);

  const handleSendMessage = () => {
    setMessage('');
    const msg = sanitizeInput(message);

    if (msg.trim() === '') {
      return; // 메시지가 빈 문자열이거나 공백만 포함된 경우 전송하지 않음
    }

    sendChatA({
      chat_id: Number(chatId),
      user_id: user?.user_id as string,
      chat_contents: msg,
    });
  };

  return (
    <article className="flex h-[90vh] flex-col">
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
          {chatTitle}
        </p>
        <div className="w-[24px]" />
      </div>
      <div
        // 채팅창의 스크롤을 가장 아래로 내리기 위한 ref
        // ref={chatContainerRef}
        className="mt-2 flex h-[75vh] flex-col space-y-1 overflow-y-auto px-2"
      >
        {isActive &&
          chat &&
          chat.map(c => (
            <ChatBox
              key={c.chat_no}
              sender={c.user_id === user?.user_id}
              msg={c.chat_contents}
            />
          ))}
      </div>
      {isActive && (
        <div className="absolute bottom-40 flex w-full items-center px-2">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e: { target: { value: SetStateAction<string> } }) => {
              setMessage(e.target.value);
            }}
            onKeyDown={(e: {
              key: string;
              shiftKey: any;
              preventDefault: () => void;
            }) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // 기본 Enter 동작을 막습니다 (줄바꿈 방지)
                handleSendMessage(); // 메시지 전송
              }
            }}
            className="flex-grow resize-none overflow-hidden rounded border p-2"
            placeholder="메시지를 입력하세요."
            rows={1}
          />
          <button
            type="submit"
            onClick={handleSendMessage}
            className="ml-1 rounded bg-blue-500 px-4 py-2 text-white"
          >
            전송
          </button>
        </div>
      )}
    </article>
  );
}
