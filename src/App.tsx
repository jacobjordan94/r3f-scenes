import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import SteeleScene from './scenes/steele/steele';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <Navigate to="steele" /> } />
        <Route path='steele' element={ <SteeleScene /> } />
      </Routes>
    </BrowserRouter>
  );
}
export default App;