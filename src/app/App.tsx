import "./app.scss";
import { Outlet } from "react-router-dom";
import NavBar from "../shared/components/navbar/navbar";
import Footer from "../shared/components/footer/footer";

function App() {
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
