import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "../Auth/Sign-up";
import Login from "../Auth/Login";
import Home from "../home/Home";
import Navbar from "../components/Navbar";
import MainSnippets from "./snippets/MainSnippets";
import UploadSnippets from "./UploadSnippets";
import OneSnippet from "./SingleSnippet/OneSnippet";
import ChatWithAnotherUser from "../components/ChatWithAnotherUser";
import Artify from "../components/ai/Artify";
import Profile from "../components/Profile";
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
        <Route path="/userChat/:userId" element={<ChatWithAnotherUser />} />
        <Route path="/askAi" element={<Artify />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default RouterPath;
