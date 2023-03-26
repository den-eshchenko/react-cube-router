import { Routes, Route } from 'react-router-dom';
import { Auth } from './components/Auth/Auth';
import { CubeRouting } from './components/Cube/Cube';

function App() {
  return (
    <Routes>
      <Route path="*" element={<CubeRouting />}/>
      <Route path="/" element={<Auth />}/>
      <Route path="/:side" element={<CubeRouting />} />
    </Routes>
  );
}

export default App;
