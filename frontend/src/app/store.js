import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import adminReducer from '../features/admin/adminSlice';
import blogReducer from '../features/blog/blogSlice';
import blogCategoryReducer from '../features/blogCategory/blogCategorySlice';
import courseReducer from '../features/course/courseSlice';
import subtopicReducer from '../features/subtopic/subtopicSlice';
import guideReducer from '../features/guide/guideSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    blog: blogReducer,
    blogCategory: blogCategoryReducer,
    course: courseReducer,
    subtopic: subtopicReducer,
    guide: guideReducer,
  },
});
