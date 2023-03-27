import "bootstrap/dist/css/bootstrap.min.css"
// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExerciseList from './components/ExercisesList'
import {EditExercise} from './components/EditExercise'
import CreateExercise from './components/CreateExercise'
import CreateUser from './components/CreateUser'
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navbar />
          <Routes>
          <Route path='/' element={<ExerciseList />} />
          <Route path='/edit/:id' element={<EditExercise />} />
          <Route path='/create' element={<CreateExercise />} />
          <Route path='/user' element={<CreateUser />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
