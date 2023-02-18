import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Info,
  CourseManager,
  ScheduleManager,
  Daangn,
  Home,
  Register,
  Error,
} from "./Routes";
import {
  AllBulletin,
  BulletinHome,
  SharedLayout,
} from "./Routes/bulletin/index";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/schedule-manager" element={<ScheduleManager />} />
        <Route path="/daangn" element={<Daangn />} />

        <Route path="/school-info" element={<Info />} />
        <Route path="/course-manager" element={<CourseManager />} />

        <Route path="/bulletin" element={<SharedLayout />}>
          <Route index element={<BulletinHome />} />
          <Route path="all" element={<AllBulletin />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
