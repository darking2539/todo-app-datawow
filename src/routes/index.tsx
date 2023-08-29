import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, RegisterPage, TodosPage } from '../pages'
import { ContentLayout } from '../layouts'

const WebRoutes = (props:any) =>{
    const {} = props;
  
    return (
      <Routes>

        <Route path="/" element={<Navigate to="/todos" />} />
        <Route path="/todos"  element={<ContentLayout children={<TodosPage/>}  />} />
        {/* <Route path="/login" element={<LoginPage/>} /> */}
        <Route path="/register" element={<RegisterPage/>} />

      </Routes>
    );
  }

  export default WebRoutes;