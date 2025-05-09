import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useEffect } from "react";
import PersonalProfile from "./pages/PersonalProfile";
import EditProfile from "./pages/EditProfile";
import axios from "axios";
import { server } from "./server";
import ScrollToTop from "./pages/ScrollToTop";
// import LoaderContext from "./components/LoaderContext.js/LoaderContext.js";
import WatchAndEnjoy from "./pages/WatchAndEnjoy";
import './index.css';
import UploadData from "./pages/UploadData.js";
function App() {
  // const location = useLocation();
  // const [IsAuthenticated, setIsAuthenticated] = useState(false);
  // const { isLoading, setIsLoading } = useContext(LoaderContext); 
  useEffect(() => {
    const fetchUserAuthStatus = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Authentication token not found");
        }

        const response = await axios.get(`${server}/check-auth`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.data.isAuthenticated) {
          // setIsAuthenticated(true);
          localStorage.setItem("isAuthentication", true);
          console.log("User is authenticated");
        } else {
          // setIsAuthenticated(false);
          localStorage.setItem("isAuthentication", false);
          localStorage.setItem("userName", "unknown");
          localStorage.setItem("userEmail", "unknown");
          console.log("User is not authenticated");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        localStorage.setItem("isAuthentication", false);
      }
    };

    fetchUserAuthStatus();
  }, []);

  return (
    <div>
      <ScrollToTop />
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/upload-data" element={<UploadData />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/personal-profile" element={<PersonalProfile />} />
          <Route exact path="/edit-profile" element={<EditProfile />} />
          <Route
            exact
            path="/watchandenjoy"
            element={<WatchAndEnjoy />}
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
