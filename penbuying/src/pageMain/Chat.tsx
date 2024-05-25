import { useNavigate, useParams } from 'react-router-dom';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import executeQuery from '../module/sql';
import ChatBox from '../layout/ChatBox';
import leftArrow from '../asset/imgs/leftArrowIcon.svg';

interface User {
  user_id: string;
  user_pw?: string;
  user_access?: number;
  user_name?: string;
  user_phone_number?: string;
  user_email?: string;
}

interface Chat {
  chat_no: number;
  chat_id: number;
  user_id: string;
  chat_contents: string;
  chat_date: string;
}

interface ChatParticipant {
  chat_id: number;
  user_id: string;
  participant_date: string;
}

interface ChatRoom {
  chat_id: number;
  chat_title: string;
  chat_number_ofparticipants: number;
}

const loadParticipantChatByUserId = async (
  userId: string,
): Promise<ChatParticipant[] | null> => {
  const query = `
        SELECT *
        FROM chat_participants
        WHERE user_id = '${userId}'
    `;

  const response = await executeQuery(query);
  const data = response.data as ChatParticipant[];
  if (data.length > 0) {
    return data;
  }
  return null;
};

const loadChatRoomByChatId = async (
  chatId: string,
): Promise<ChatRoom | null> => {
  const query = `
          SELECT *
          FROM chat_room
          WHERE chat_id = '${chatId}'
        `;

  const response = await executeQuery(query);
  const data = response.data as ChatRoom[];
  if (data.length > 0) {
    return data[0];
  }
  return null;
};

const loadChatByChatId = async (chatId: string): Promise<Chat[] | null> => {
  const query = `
          SELECT *
          FROM chat
          WHERE chat_id = ${chatId};
      `;

  const response = await executeQuery(query);
  const data = response.data as Chat[];
  if (data.length > 0) {
    return data;
  }
  return null;
};

interface SendChatParams {
  chat_id: number;
  user_id: string;
  chat_contents: string;
}

const sendChat = async (param: SendChatParams): Promise<void> => {
  const formatDateToSQL = (): string => {
    const date = new Date();
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  const query = `
    INSERT INTO chat (
        chat_id,
        user_id,
        chat_contents,
        chat_date
    ) VALUES (${param.chat_id}, '${param.user_id}', '${param.chat_contents}', '${formatDateToSQL()}')
    `;

  await executeQuery(query);
};

export default function ChatMain() {
  const navigate = useNavigate();
  const [chatTitle, setChatTitle] = useState<string>('');
  const { chatId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [validMsg, setValidMsg] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [chat, setChat] = useState<Chat[] | null>(null);
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (validMsg !== '') {
      alert(validMsg);
      navigate('..');
    }
  }, [validMsg]);

  useEffect(() => {
    const data = sessionStorage.getItem('userInfo');

    if (data !== null) {
      const userInfo = JSON.parse(data) as User;
      setUser(userInfo);
    } else {
      navigate('/');
      alert(`로그인이 필요합니다.`);
    }
  }, []);

  useEffect(() => {
    const checkValidUser = async () => {
      if (user === null) {
        setValidMsg('사용자 정보를 불러올수 없습니다');
        return false;
      }
      const response = await loadParticipantChatByUserId(user.user_id);
      const data = response as ChatParticipant[];

      if (data === null) {
        setValidMsg('채팅방을 불러올수 없습니다');
        return false;
      }
      const hasMatchingChatId = data.some(d => d.chat_id.toString() === chatId);
      if (!hasMatchingChatId) {
        setValidMsg('채팅방에 참여하지 않은 사용자입니다');
        return false;
      }
      return true;
    };

    const checkChatRoom = async () => {
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
        ((await checkChatRoom()) as boolean)
      ) {
        setIsActive(true); // 유효성 검사 통과
      }
    };

    if (user === null) {
      return;
    }
    executeTasks();
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setReload(prevReload => !prevReload);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchChat = async () => {
      const response = await loadChatByChatId(chatId as string);
      const data = response as Chat[];
      if (data === null) {
        return;
      }
      setChat(data);
    };

    if (isActive) {
      fetchChat();
    }
  }, [reload]);

  useEffect(() => {
    if (!chatContainerRef.current) {
      return;
    }
    const chatContainer = chatContainerRef.current as HTMLDivElement;

    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
      console.log(
        'scroll to bottom',
        chatContainer.scrollTop,
        chatContainer.scrollHeight,
      );
    }
  }, [chat]);

  const adjustTextareaHeight = () => {
    if (!textareaRef.current) {
      return;
    }
    const textarea = textareaRef.current as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };

  const sanitizeInput = (input: string): string =>
    // 이 정규식은 입력값에서 특정 특수문자를 제거합니다.
    input.replace(/['"\\`#;]/g, '');

  const handleSendMessage = () => {
    setMessage('');
    const msg = sanitizeInput(message);

    if (msg.trim() === '') {
      return; // 메시지가 빈 문자열이거나 공백만 포함된 경우 전송하지 않음
    }
    sendChat({
      chat_id: Number(chatId),
      user_id: user?.user_id as string,
      chat_contents: msg,
    });
  };

  const handleKeyDown = (e: {
    key: string;
    shiftKey: any;
    preventDefault: () => void;
  }) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 기본 Enter 동작을 막습니다 (줄바꿈 방지)
      handleSendMessage(); // 메시지 전송
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

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
        ref={chatContainerRef}
        className={`ref=${chatContainerRef} mt-2 flex h-[75vh] flex-col space-y-1 overflow-y-auto px-2`}
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
        <div className="absolute bottom-20 flex w-full items-center px-2">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
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
