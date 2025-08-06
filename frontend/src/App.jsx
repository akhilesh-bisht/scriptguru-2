import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteCreationPage from './pages/features/NoteCreationPage';
import NoteEditorPage from './pages/features/NoteEditorPage';

function App() {
  return (<>

  <h1 className='text-4xl font-bold font-serif text-center'>Real-Time Collaborative Notes App</h1>
    <Router>
      <Routes>
        <Route path="/" element={<NoteCreationPage />} />
        <Route path='/note/:id' element={<NoteEditorPage/>}/>
       
      </Routes>
    </Router>
  </>
  );
}

export default App;
