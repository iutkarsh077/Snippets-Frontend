import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "../Auth/Sign-up";
import Login from "../Auth/Login";
import Home from "../home/Home";
import Navbar from "../components/Navbar";
import MainSnippets from "./snippets/MainSnippets";
import UploadSnippets from "./UploadSnippets";
import OneSnippet from "./SingleSnippet/OneSnippet";
const RouterPath = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/snippets" element={<MainSnippets />} />
        <Route path="/uploadSnippets" element={<UploadSnippets />} />
        <Route path="/description/:id" element={<OneSnippet />} />
      </Routes>
    </Router>
  );
};

export default RouterPath;
