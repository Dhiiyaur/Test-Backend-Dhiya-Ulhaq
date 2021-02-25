import './App.css';
import Navbar from "./component/Navbar";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import Home from "./component/Home";
import News from "./component/News";
import AddNews from "./component/AddNews";
import AddComment from "./component/AddComment";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom"


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth/signin" exact component={SignIn} />
          <Route path="/auth/signup" exact component={SignUp} />
          <Route path="/news/:newsID" exact component={News} />
          <Route path="/write/" exact component={AddNews} />
          <Route path="/write/:newsID" exact component={AddComment} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
