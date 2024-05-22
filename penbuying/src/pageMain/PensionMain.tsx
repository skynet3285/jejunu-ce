import { Route, Routes } from 'react-router-dom';
import PensionShare from '../component/PensionShare';
import PensionInfoInvest from '../component/PensionInfoInvest';
import PensionInfoArticleWrite from '../component/PensionInfoArticleWrite';

export default function PensionMain() {
  return (
    <main className="flex h-full flex-col justify-between">
      <Routes>
        <Route path="/" element={<PensionShare />} />
        <Route
          path="/pensionInvest/:pensionId"
          element={<PensionInfoInvest />}
        />
        <Route
          path="/pensionInvest/write/:pensionId"
          element={<PensionInfoArticleWrite />}
        />
      </Routes>
    </main>
  );
}
