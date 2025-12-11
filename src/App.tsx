import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import SeeleScene from './scenes/seele/seele';
import GameboyScene from './scenes/gameboy/gameboy';
import TombRaiderScene from './scenes/tomb-raider/tomb-raider';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={ <Navigate to="seele" /> } />
                <Route path='seele' element={ <SeeleScene /> } />
                <Route path='gameboy' element={ <GameboyScene /> } />
                <Route path="tomb-raider" element={ <TombRaiderScene /> } />
            </Routes>
        </BrowserRouter>
    );
}
export default App;