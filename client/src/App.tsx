import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./Components";
import {
  Info,
  CourseManager,
  ScheduleManager,
  Bulletin,
  Daangn,
  Home,
  Register,
  Error,
} from "./Routes";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/school-info" element={<Info />} />
        <Route path="/course-manager" element={<CourseManager />} />
        <Route path="/schedule-manager" element={<ScheduleManager />} />
        <Route path="/bulletin-board" element={<Bulletin />} />
        <Route path="/daangn" element={<Daangn />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
