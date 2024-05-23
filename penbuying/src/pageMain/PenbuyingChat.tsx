import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import executeQuery from '../module/sql';
import userProfile from '../asset/imgs/userDefaultProfile.png';

interface User {
  user_id: string;
  user_pw?: string;
  user_access?: number;
  user_name?: string;
  user_phone_number?: string;
  user_email?: string;
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

interface PChat {
  chat_id: number;
  chat_title: string;
  recent_message: string;
}

interface Chat {
  chat_no: number;
  chat_id: number;
  user_id: string;
  chat_contents: string;
  chat_date: string;
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

const loadRecentChatByChatId = async (chatId: string): Promise<Chat | null> => {
  const query = `
        SELECT c.*
        FROM chat c
        JOIN (
            SELECT chat_id, MAX(chat_no) AS max_chat_no
            FROM chat
            GROUP BY chat_id
        ) AS subquery ON c.chat_id = subquery.chat_id AND c.chat_no = subquery.max_chat_no
        WHERE c.chat_id = ${chatId};
    `;

  const response = await executeQuery(query);
  const data = response.data as Chat[];
  if (data.length > 0) {
    return data[0];
  }
  return null;
};

export default function PenbuyingChat() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [chatParticipants, setChatParticipants] = useState<
    ChatParticipant[] | null
  >([]);
  const [penbuyingChat, setPenbuyingChat] = useState<PChat[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setReload(prevReload => !prevReload);
    }, 500);

    return () => clearInterval(interval);
  }, []);

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
    const fetchParticipantChat = async (userId: string) => {
      const response = await loadParticipantChatByUserId(userId);
      const data = response as ChatParticipant[];
      setChatParticipants(data);
    };

    const processChatParticipants = async (): Promise<void> => {
      const pchat: PChat[] = [];

      if (chatParticipants === null) {
        return;
      }

      const promises = (chatParticipants as ChatParticipant[])
        .filter(participant => participant !== undefined)
        .map(async participant => {
          const recentChat = await loadRecentChatByChatId(
            participant.chat_id.toString(),
          );
          const chat = await loadChatRoomByChatId(
            participant.chat_id.toString(),
          );
          if (recentChat === null || chat === null) {
            return null;
          }
          return {
            chat_id: recentChat.chat_id,
            chat_title: chat.chat_title,
            recent_message: recentChat.chat_contents,
          } as PChat;
        });

      const results = await Promise.all(promises);
      const validResults = results.filter(result => result !== null);
      pchat.push(...(validResults as PChat[]));

      setPenbuyingChat(pchat);
    };

    if (user === null) {
      return;
    }
    fetchParticipantChat(user.user_id);
    processChatParticipants();
  }, [reload, user]);

  return (
    <article className="flex flex-col">
      <div className="mt-10 flex h-auto w-full flex-col justify-center">
        <div className="flex items-center justify-center">
          <div>
            {penbuyingChat.map(chat => (
              <button
                type="button"
                className="flex items-center justify-center"
                key={chat.chat_id}
                onClick={() => {
                  navigate(`${chat.chat_id}`);
                }}
              >
                <img className="w-18" src={userProfile} alt="profile" />
                <div className="ml-4 flex flex-col items-start justify-center">
                  <p className="font-bold">{chat.chat_title}</p>
                  <p className="text-sm text-gray-500">{chat.recent_message}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
