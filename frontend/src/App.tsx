import './App.css';
import Toolbar from './UI/Toolbar/Toolbar';
import Register from './features/users/Register';
import { Route, Routes } from 'react-router-dom';
import Home from './container/Home/Home';
import Login from './features/users/Login';
import AddNewItem from './container/AddNewItem/AddNewItem';
import OneItem from './container/OneItem/OneItem';

const App = () => {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <main className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-item" element={<AddNewItem />} />
          <Route path="/items/:id" element={<OneItem />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
