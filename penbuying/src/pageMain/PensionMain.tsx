import { Route, Routes } from 'react-router-dom';
import PensionShare from '../component/PensionShare';
import PensionInfoInvest from '../component/PensionInfoInvest';

export default function PensionMain() {
  return (
    <main className="flex h-full flex-col">
      <Routes>
        <Route path="/" element={<PensionShare />} />
        <Route
          path="/pensionInvest/:pensionId"
          element={<PensionInfoInvest />}
        />
      </Routes>
    </main>
  );
}
