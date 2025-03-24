import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestList from "../pages/TestList";
import TestForm from "../pages/TestForm";
import Login from "../pages/Login";
const AppRoutes = () => (
  <Router>
    <Routes>
      {" "}
      <Route path="/login" element={<Login />} />
      <Route path="/tests" element={<TestList />} />
      <Route path="/tests/new" element={<TestForm />} />
      <Route path="/tests/edit/:id" element={<TestForm />} />
    </Routes>
  </Router>
);

export default AppRoutes;
