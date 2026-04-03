import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Upload from './pages/Upload.jsx'
import Document from './pages/Document.jsx'
import Auth from './pages/Auth.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="upload" element={<Upload />} />
          <Route path="document" element={<Document />} />
          <Route path="auth" element={<Auth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
