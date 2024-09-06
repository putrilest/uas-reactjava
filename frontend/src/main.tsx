import { StrictMode } from 'react'
import App from './App.tsx'
import SignIn from './Application/Signin.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Register from './Application/Register.tsx';
import "./index.css";
import Dashboard from './Application/Dashboard.tsx';
import Position from './Application/Position.tsx';
import Employee from './Application/Employee.tsx';
import AddEmployee from './Application/AddEmployee.tsx';
import Payroll from './Application/Payroll.tsx';
import AddPayroll from './Application/AddPayroll.tsx';
import Information from './Application/Information.tsx';
import SignOut from './Application/SignOut.tsx';
import PayrollSlip from './Application/PayrollSlip.tsx';



const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Register/>,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/position",
        element: <Position />,
      },
      {
        path: "/employee",
        element: <Employee />,
      },
      {
        path: "/addEmployee",
        element: <AddEmployee />,
      },
      {
        path: "/payroll",
        element: <Payroll />,
      },
      {
        path: "/addPayroll",
        element: <AddPayroll/>,
      },
      {
        path: "/payrollSlip",
        element: <PayrollSlip/>,
      },
      {
        path: "/information",
        element: <Information/>,
      },
      {
        path: "/signout",
        element: <SignOut />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
