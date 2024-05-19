import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/global/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/user/Register";
import Layout from "./services/Layout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import ChangePassword from "./pages/auth/ChangePassword";
import MyAppointments from "./pages/user/MyAppointments";
import MyProfile from "./pages/global/MyProfile";
import MyPosts from "./pages/user/MyPosts";
import ReportBug from "./pages/global/ReportBug";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from "./pages/post/CreatePost";
import UserRoute from "./services/UserRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus, getUser } from "./redux/auth/authActions";
import { SET_LOGIN, SET_USER } from "./redux/auth/authSlice";
import axios from "axios";
import PostCommentSesion from "./pages/post/PostCommentSesion";
import PostInfo from "./pages/post/PostInfo";

const AdminDashboardHOC = Layout(AdminDashboard);
const UserDashboardHOC = Layout(UserDashboard);
const UserChangePwdHOC = Layout(ChangePassword);
const UserPostHOC = Layout(MyPosts);
const UserAppoitmentHOC = Layout(MyAppointments);
const MyProfileHOC = Layout(MyProfile);
const CreatePostHOC = Layout(CreatePost);
const ReportBugHOC = Layout(ReportBug);
const PostCommentSessionHOC = Layout(PostCommentSesion);
const PostInfoHOC = Layout(PostInfo);

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
      if (status) {
        const user = await getUser();
        // console.log(user);
        dispatch(SET_USER(user));
      }
    }
    loginStatus();
  }, [dispatch]);

  return (
    <>
      {/* <BrowserRouter> */}
      <HashRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/dashboard" element={<AdminDashboardHOC />} />
          <Route path="/user/dashboard" element={<UserDashboardHOC />} />
          <Route path="/user/posts" element={<UserPostHOC />} />
          <Route
            path="/post/comments/session/:id"
            element={<PostCommentSessionHOC />}
          />
          <Route
            path="/post/info/:id"
            element={<PostInfoHOC />}
          />
          <Route path="/posts/create-post" element={<CreatePostHOC />} />
          <Route path="/change-password" element={<UserChangePwdHOC />} />
          <Route path="/user/appointments" element={<UserAppoitmentHOC />} />
          <Route path="/profile" element={<MyProfileHOC />} />
          <Route path="/report-bug" element={<ReportBugHOC />} />
          <Route path="/report-bug" element={<ReportBugHOC />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:tk" element={<ResetPassword />} />
        </Routes>
      </HashRouter>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
