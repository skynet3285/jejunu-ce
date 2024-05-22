import { Route, Routes } from 'react-router-dom';
import My from './My';
import PensionInfo from '../component/PensionInfo';

export default function MyMain() {
  return (
    <article className="flex flex-col">
      <Routes>
        <Route path="/" element={<My />} />
        <Route path="/pensionInfo/:pensionId" element={<PensionInfo />} />
      </Routes>
    </article>
  );
}
