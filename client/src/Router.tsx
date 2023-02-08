import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function Router() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default Router;
