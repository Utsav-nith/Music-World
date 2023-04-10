import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Spinner from "./components/Spinner";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import CreateEditPlaylist from "./pages/CreateEditPlaylist";
import AdminHome from "./pages/Admin/AdminHome";
import AddEditSong from "./pages/Admin/AddEditSong";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div className="App">
      <div style={{ backgroundImage: `url("https://img.freepik.com/free-vector/beautiful-musical-notes-wave-background-design_1017-11415.jpg?w=740&t=st=1680984396~exp=1680984996~hmac=db6180fb4760292e264fef3cdbd4b0593bb873d6f5036f60f117cb7fb937ea98")` }}>
    </div>
      {loading && <Spinner />}
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
                
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/create-edit-playlist"
            element={
              <ProtectedRoute>
                <CreateEditPlaylist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-edit-song"
            element={
              <ProtectedRoute>
                <AddEditSong />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

