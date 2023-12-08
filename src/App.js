import './App.css';
// import Counter from './features/counter/Counter';
// lesson 1: add back <Counter /> in the main
import PostsList from './features/posts/PostsList';
import AddPostForm from './features/posts/AddPostForm';

function App() {
  return (
    <main className="App">
       <AddPostForm />
      <PostsList />
    </main>
  );
}

export default App;
