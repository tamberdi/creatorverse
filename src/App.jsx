import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AddCreator from './pages/AddCreator';
import ShowCreators from './pages/ShowCreators';
import EditCreator from'./pages/EditCreator';
import ViewCreator from './pages/ViewCreator';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add">Add Creator</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ShowCreators />} />
        <Route path="/add" element={<AddCreator />} />
        <Route path="/edit/:id" element={<EditCreator />} />
        <Route path="/view/:id" element={<ViewCreator />} />
      </Routes>    
    </BrowserRouter>
  )
}

export default App