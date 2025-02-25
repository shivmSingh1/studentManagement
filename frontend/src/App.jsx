import { Routes, Route } from 'react-router-dom'
import './App.css'
import StudentList from './component/StudentList'
import StudentRegistration from './component/StudentRegistration'
import StudentDetails from './component/StudentDetails'
import Header from './component/header'
import { ToastContainer } from 'react-toastify';

function App() {


  return (
    <>
      <div className='container'>
        <ToastContainer
          position="top-center"
        />
        <Header />
        <Routes>
          {/* <Route path='/' element={<SearchStudent />} /> */}
          <Route path='/' element={<StudentRegistration />} />
          <Route path="/student" element={<StudentList />} />
          <Route path='/student/:id' element={<StudentDetails />} />
        </Routes>
      </div>
    </>
  )
}

export default App
