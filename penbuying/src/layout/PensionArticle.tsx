import { Route, Routes } from 'react-router-dom';
import PensionShare from '../component/PensionShare';
import PensionInfoInvest from '../component/PensionInfoInvest';
import PensionInfoArticleWrite from '../component/PensionInfoArticleWrite';

export default function PensionArticle() {
  return (
    <main className="flex h-full flex-col justify-between">
      <Routes>
        <Route path="/" element={<PensionShare />} />
        <Route path="/invest/:pensionId" element={<PensionInfoInvest />} />
        <Route
          path="/invest/write/:pensionId"
          element={<PensionInfoArticleWrite />}
        />
      </Routes>
    </main>
  );
}
