import 'Styles/colors.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Tasks from 'pages/Tasks';
import {GetFromCookie} from 'data/Auth'
function App() {
  GetFromCookie();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}>
          </Route>
          <Route path='/register' element={<Register/>}>
          </Route>
          <Route path='/tasks' element={<Tasks/>}>
          </Route>
          <Route path='/' element={ <Navigate to="/login" /> }>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
