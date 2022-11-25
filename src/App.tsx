import { useEffect, useState, ReactElement } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignInForm from "./components/SignInForm";
import PersonalDataForm from "./components/PersonalDataForm";
import PersonalDataDisplay from "./components/PersonalDataDisplay";
import Navigation from "./components/Navigation";
import { isNil } from "ramda";

const App = () => {
  const [loggedInAs, setLoggedInAs] = useState<string | null | undefined>("");

  // done in an async way to simulate async request
  useEffect(() => {
    const getUserInfo = async () => {
      const loggedInUser = await localStorage.getItem("loggedInAs");
      setLoggedInAs(loggedInUser);
    };
    getUserInfo();
  }, []);

  const redirectFallback = (
    component: ReactElement,
    redirectPath: string,
    redirectCondition: boolean
  ): ReactElement => {
    return redirectCondition ? <Navigate to={redirectPath} /> : component;
  };

  return (
    <div>
      <Router>
        {loggedInAs && <Navigation setLoggedInAs={setLoggedInAs} />}
        <Routes>
          <Route
            path="/"
            element={redirectFallback(
              <SignInForm setLoggedInAs={setLoggedInAs} />,
              "/form",
              !!loggedInAs
            )}
          />
          <Route
            path="/form"
            element={redirectFallback(
              <PersonalDataForm loggedInAs={loggedInAs} />,
              "/",
              isNil(loggedInAs)
            )}
          />
          <Route
            path="/display"
            element={redirectFallback(
              <PersonalDataDisplay loggedInAs={loggedInAs} />,
              "/",
              isNil(loggedInAs)
            )}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
