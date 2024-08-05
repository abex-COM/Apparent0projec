import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/userPages/RegistrationPage";
import SignInPage from "./pages/userPages/SignIn";
import TaskPage from "./pages/taskPages/TaskPage";
import FetchData from "./pages/userPages/FetchData";
import Layout from "./component/Layout";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/signup" element={<RegistrationPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/userlists" element={<FetchData />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
