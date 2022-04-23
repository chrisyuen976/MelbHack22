import Form from "./components/Formpage/Form";
import ProgressBar from "./components/Journeypage/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Homepage from "./components/Homepage";
import SavedJourneyPage from "./components/SavedJourneyPage";
// import journeyList from "./dummyJourney.json";
import userData from "./dummyUser.json";
import LoggedHeader from "./components/shared/LoggedHeader";
import Header from "./components/shared/Header";
import {
  getUser,
  handleSignUp,
  handleLogin,
  getAllJourneys,
  getSavedJourneys,
} from "./controllers/clientController";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  useEffect(() => {
    getAllJourneys(setJourneyList);
    getSavedJourneys(setSavedJourneys);
    getUser(setUserCallback);
  }, []);

  const setUserCallback = (user) => {
    setLogged(true);
    setUsername(user.username);
  };

  const onClickLogin = (username, password) => {
    handleLogin(username, password, setUserCallback);
  };

  const onClickSignUp = (username, password) => {
    handleSignUp(username, password, setUserCallback);
  };

  // Global variables passing around
  const [isLoggedIn, setLogged] = useState(false);
  const [username, setUsername] = useState(userData.username);
  const [journeyList, setJourneyList] = useState([]);
  const [savedJourneys, setSavedJourneys] = useState([]);
  return (
    <Router>
      <div>
        {isLoggedIn ? (
          <LoggedHeader username={username} />
        ) : (
          <Header handleLogin={onClickLogin} handleSignUp={onClickSignUp} />
        )}
        {/* <div className = 'formPage'>
      <Form />
      </div> */}
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Homepage
                isLoggedIn={isLoggedIn}
                username={username}
                allJourney={journeyList}
                savedJourney={savedJourneys}
              />
            }
          ></Route>

          <Route
            exact
            path="/saved"
            element={
              <SavedJourneyPage
                isLoggedIn={isLoggedIn}
                username={username}
                journeyList={journeyList}
                savedList={userData.saved_journey}
              />
            }
          ></Route>

          {/* <Homepage
            isLoggedIn={isLoggedIn}
            username={username}
            allJourney={journeyList}
            savedJourney={savedJourneys}
          /> */}
        </Routes>

        {/* <SavedJourneyPage
          isLoggedIn={isLoggedIn}
          username={username}
          journeyList={journeyList}
          savedList={userData.saved_journey}
        /> */}
        {/* <ProgressBar data={data} setData={setData} />; */}
      </div>
    </Router>
  );
}

export default App;
