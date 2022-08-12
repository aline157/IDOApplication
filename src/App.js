import './App.css';
import Login from './Pages/Login/Login';
import HomePage from './Pages/Home/HomePage';
import ProfileScreen from './Pages/Profile/ProfileScreen'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './Pages/Register/Register';
import AddTodo from './Pages/AddTodo/AddTodo';
import EditTodo from './Pages/EditTodo/EditTodo';

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
        <Route exact path="/homePage" element={<HomePage />} />  
        <Route exact path="/profile" element={<ProfileScreen />} />  
        <Route exact path="/Register" element={<Register />} />  
        <Route exact path="/addTodo" element={<AddTodo />} />
        <Route exact path="/editTodo" element={<EditTodo/>}/>
        </Routes>
    </Router>
  );
}

export default App;
