import './App.css'
import Home from './components/Home';
import ViewPaste from './components/ViewPaste';
import Navbar from './components/Navbar';
import Paste from './components/Paste';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/pastes",
    element: (
      <Layout>
        <Paste />
      </Layout>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <Layout>
        <ViewPaste />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App