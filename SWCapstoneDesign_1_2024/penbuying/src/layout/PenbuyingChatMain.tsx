import { Route, Routes } from 'react-router-dom';
import PenbuyingChat from '../pageMain/PenbuyingChat';
import Chat from '../pageMain/Chat';

export default function PenbuyingChatMain() {
  return (
    <main className="flex h-full flex-col">
      <Routes>
        <Route path="/" element={<PenbuyingChat />} />
        <Route path="/:chatId" element={<Chat />} />
      </Routes>
    </main>
  );
}
