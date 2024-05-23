import { Route, Routes } from 'react-router-dom';
import My from '../pageMain/My';
import PensionInfo from '../pageMain/PensionInfo';

export default function MyMain() {
  return (
    <main className="flex flex-col">
      <Routes>
        <Route path="/" element={<My />} />
        <Route path="/info/:pensionId" element={<PensionInfo />} />
      </Routes>
    </main>
  );
}
