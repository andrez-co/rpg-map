import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useGameStore } from './store/gameStore';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Game from './pages/Game';
import Map from './pages/Map';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const playerName = useGameStore(state => state.playerName);
  
  if (!playerName) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route 
              path="game" 
              element={
                <ProtectedRoute>
                  <Game />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="map" 
              element={
                <ProtectedRoute>
                  <Map />
                </ProtectedRoute>
              } 
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;