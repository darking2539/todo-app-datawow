import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, RegisterPage, TodosPage, UnlockPDF } from '../pages'
import { ContentLayout } from '../layouts'


const WebRoutes = () =>{

    return (
      <Routes>
        <Route path="/" element={<Navigate to="/todos" />} />
        <Route path="/redirect" element={<Navigate to="/todos" />} />
        <Route path="/todos"  element={<ContentLayout children={<TodosPage/>}  />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/pdf" element={<UnlockPDF/>} />
      </Routes>
    );
  }

  export default WebRoutes;