import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Header from './components/Header';

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import ChangePassword from './pages/ChangePassword';
import AllBlogs from './pages/AllBlogs';
import SingleBlog from './pages/SingleBlog';
import CreateBlog from './pages/CreateBlog';
import MyBlog from './pages/MyBlog';

function App() {
  return (
    <>
      <Router>
        <Header />

        <div className="container">
          <Routes>
            <Route path='/' element={<Home/>} />
                    
            <Route path='/dashboard' element={<Dashboard/>} />
                    
            <Route path='/login' element={<Login/>} />
                    
            <Route path='/register' element={<Register/>} />

            <Route path='/userProfile' element={<UserProfile/>} />

            <Route path='/changePassword' element={<ChangePassword/>} />

            <Route path='/allBlogs' element={<AllBlogs/>} />
            <Route path='/singleBlog' element={<SingleBlog/>} />
            <Route path='/createBlog' element={<CreateBlog/>} />
            <Route path='/myBlog' element={<MyBlog/>} />

            {/* Default: Redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />}/>
          </Routes>
        </div>

      </Router>
    </>
  );
}

export default App;
