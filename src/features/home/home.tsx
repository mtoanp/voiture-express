import "./home.scss";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page fpy">
      <div className="home">
        <div className="banner blur-6 box-shadow">
          <div className="text-you text-rainbow">
            <p>free</p>DRIVE
          </div>

          <div className="start">
            <button className="bg-rainbow" onClick={() => navigate("/auth")}>
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
