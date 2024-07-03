import { Route, Routes } from 'react-router-dom';
import My from '../pageMain/My';
import PensionInfo from '../pageMain/PensionInfo';
import Agenda from '../pageMain/Agenda';
import AgendaWrite from '../pageMain/AgendaWrite';
import Vote from '../pageMain/Vote';

export default function MyMain() {
  return (
    <main className="flex flex-col">
      <Routes>
        <Route path="/" element={<My />} />
        <Route path="/info/:pensionId" element={<PensionInfo />} />
        <Route path="/agenda/:pensionId" element={<Agenda />} />
        <Route path="/agendaWrite/:pensionId" element={<AgendaWrite />} />
        <Route path="/vote/:agendaNo" element={<Vote />} />
      </Routes>
    </main>
  );
}
