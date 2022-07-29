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
import EditBlog from './pages/EditBlog';
import AllCourses from './pages/AllCourses';
import SingleCourse from './pages/SingleCourse';
import AddResources from './pages/AddResources';
import UpdateCourse from './pages/UpdateCourse';
import AllGuides from './pages/AllGuides';
import SingleGuide from './pages/SingleGuide';
import CreateGuide from './pages/CreateGuide';
import MyGuide from './pages/MyGuide';
import EditGuide from './pages/EditGuide';
import Contact from './pages/Contact';
import Reference from './pages/Reference';

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

            <Route path='/userProfile/:id' element={<UserProfile/>} />

            <Route path='/changePassword' element={<ChangePassword/>} />

            <Route path='/allBlogs' element={<AllBlogs/>} />
            <Route path='/singleBlog/:blogId' element={<SingleBlog/>} />
            <Route path='/createBlog' element={<CreateBlog/>} />
            <Route path='/myBlog' element={<MyBlog/>} />
            <Route path='/editBlog' element={<EditBlog/>} />

            <Route path='/allCourses' element={<AllCourses/>} />
            <Route path='/singleCourse/:courseId' element={<SingleCourse/>} />
            <Route path='/addResources' element={<AddResources/>} />
            <Route path='/updateCourse' element={<UpdateCourse/>} />

            <Route path='/allGuides' element={<AllGuides/>} />
            <Route path='/singleGuide/:guideId' element={<SingleGuide/>} />
            <Route path='/createGuide' element={<CreateGuide/>} />
            <Route path='/myGuide' element={<MyGuide/>} />
            <Route path='/editGuide' element={<EditGuide/>} />

            <Route path='contact' element={<Contact/>}/>

            <Route path='reference' element={<Reference/>}/>
            
            {/* Default: Redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />}/>
          </Routes>
        </div>

      </Router>
    </>
  );
}

export default App;
