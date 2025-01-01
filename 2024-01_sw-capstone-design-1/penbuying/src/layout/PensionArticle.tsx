import { Route, Routes } from 'react-router-dom';
import PensionShare from '../pageMain/PensionShare';
import PensionInfoInvest from '../pageMain/PensionInfoInvest';
import PensionInfoArticleWrite from '../pageMain/PensionInfoArticleWrite';

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
