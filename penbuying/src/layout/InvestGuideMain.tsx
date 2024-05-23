import { Route, Routes } from 'react-router-dom';
import InvestGuide from '../pageMain/InvestGuide';
import Tutorial from '../pageMain/Tutorial';
import TutorialSharePension from '../pageMain/TutorialSharePension';

export default function InvestGuideMain() {
  return (
    <main className="flex h-full flex-col">
      <Routes>
        <Route path="/" element={<InvestGuide />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/sharePension" element={<TutorialSharePension />} />
      </Routes>
    </main>
  );
}
