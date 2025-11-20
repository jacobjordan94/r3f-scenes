import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import SeeleScene from './scenes/seele/seele';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <Navigate to="steele" /> } />
        <Route path='steele' element={ <SeeleScene /> } />
      </Routes>
    </BrowserRouter>
  );
}
export default App;