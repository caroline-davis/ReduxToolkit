import "./App.css";
// import Counter from './features/counter/Counter';
// lesson 1: add back <Counter /> in the main
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
        <Route path ="user">
        <Route index element={<UsersList />} />
        <Route path=":userId" element={<UserPage />}/>

        {/* Catch all = replace with 404 component. Will go back to homepage for now*/}
        <Route path="*" element={<Navigate to="/" replace />}/>

        </Route>
      </Route>
    </Routes>
  );
}

export default App;
