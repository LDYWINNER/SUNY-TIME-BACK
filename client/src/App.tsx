import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./Components";
import {
  Info,
  CourseManager,
  ScheduleManager,
  Bulletin,
  Daangn,
  Home,
  Register,
} from "./Routes";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/school-info">
          <Info />
        </Route>
        <Route path="/course-manager">
          <CourseManager />
        </Route>
        <Route path="/schedule-manager">
          <ScheduleManager />
        </Route>
        <Route path="/bulletin-board">
          <Bulletin />
        </Route>
        <Route path="/daangn">
          <Daangn />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
