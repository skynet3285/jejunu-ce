import { Route, Routes } from 'react-router-dom';
import My from '../pageMain/My';
import PensionInfo from '../component/PensionInfo';

export default function MyMain() {
  return (
    <article className="flex flex-col">
      <Routes>
        <Route path="/" element={<My />} />
        <Route path="/info/:pensionId" element={<PensionInfo />} />
      </Routes>
    </article>
  );
}
