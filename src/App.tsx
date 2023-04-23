import { Routes, Route, Navigate } from 'react-router-dom';
import { CubeRouting } from './components/CubeRouting/CubeRouting';

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/front_side" replace />} />
      <Route path="/:side" element={<CubeRouting />} />
    </Routes>
  );
}

export default App;
