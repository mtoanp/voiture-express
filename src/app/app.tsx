import "./app.scss";
import { Outlet } from "react-router-dom";
import NavBar from "../shared/components/navbar/navbar";
import Footer from "../shared/components/footer/footer";

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("test env: apiUrl", apiUrl);

  return (
    <div className="app">
      <NavBar />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
