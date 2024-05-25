import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  User,
  ChatParticipant,
  loadRecentChatByChatId,
  loadChatRoomByChatId,
  loadChatParticipantsByUserId,
} from '../module/sqlOrm';
import { getSessionUser } from '../module/session';
import userProfile from '../asset/imgs/userDefaultProfile.png';

interface PChat {
  chat_id: number;
  chat_title: string;
  recent_message: string;
}

export default function PenbuyingChat() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [chatParticipants, setChatParticipants] = useState<
    ChatParticipant[] | null
  >([]);
  const [penbuyingChat, setPenbuyingChat] = useState<PChat[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    const sessionUser = getSessionUser();

    if (sessionUser === null) {
      navigate('/');
      alert(`로그인이 필요합니다.`);
    } else {
      setUser(sessionUser);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setReload(prevReload => !prevReload);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchParticipantChat = async (userId: string) => {
      const response = await loadChatParticipantsByUserId(userId);
      const data = response as ChatParticipant[];
      setChatParticipants(data);
    };

    const processChatParticipants = async (): Promise<void> => {
      if (chatParticipants === null) {
        // 참여중인 채팅방이 없습니다.
        return;
      }
      const chats: PChat[] = [];
      let chatNo = 0;

      // 참여중인 모든 채팅방 각각의 최근 메시지를 가져옵니다.
      const promises = (chatParticipants as ChatParticipant[])
        .filter(participant => participant !== undefined)
        .map(async participant => {
          const participantChatId: string = participant.chat_id.toString();

          const recentChat = await loadRecentChatByChatId(participantChatId);
          const chatRoom = await loadChatRoomByChatId(participantChatId);
          chatNo += 1;

          if (chatRoom === null) {
            return null;
          }
          if (recentChat === null) {
            return {
              chat_id: chatNo,
              chat_title: chatRoom.chat_title,
              recent_message: '',
            } as PChat;
          }
          return {
            chat_id: chatNo,
            chat_title: chatRoom.chat_title,
            recent_message: recentChat.chat_contents,
          } as PChat;
        });

      const results = await Promise.all(promises);
      const validResults = results.filter(result => result !== null);
      chats.push(...(validResults as PChat[]));

      setPenbuyingChat(chats);
    };

    if (user === null) {
      return;
    }
    fetchParticipantChat(user.user_id);
    processChatParticipants();
  }, [reload]);

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
