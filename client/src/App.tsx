import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Info from "./Routes/Info";
import CourseManager from "./Routes/CourseManager";
import ScheduleManager from "./Routes/ScheduleManager";
import Bulletin from "./Routes/Bulletin";
import Daangn from "./Routes/Daangn";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
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
