import { Routes, Route, Navigate } from 'react-router-dom';
import { Game } from './components/Game';

function App() {
  return (
    <Routes>
      <Route path="/daily" element={<Game mode="daily" />} />
      <Route path="/hourly" element={<Game mode="hourly" />} />
      <Route path="/infinite" element={<Game mode="infinite" />} />
      <Route path="/" element={<Navigate to="/daily" replace />} />
      <Route path="*" element={<Navigate to="/daily" replace />} />
    </Routes>
  );
}

export default App;
