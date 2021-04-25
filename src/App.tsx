import "./App.css";
import Header from "./components/Header";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import GlobalStyles from "./utils/GlobalStyles";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/" component={Dashboard} />
        </Switch>
      </Router>
      <GlobalStyles />
    </div>
  );
};

export default App;
