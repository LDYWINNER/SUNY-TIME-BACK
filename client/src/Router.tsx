import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components";
import {
  Info,
  ScheduleManager,
  Home,
  Register,
  ProtectedRoute,
  Error,
} from "./Routes";
import {
  AllBulletin,
  BulletinHome,
  BulletinSharedLayout,
} from "./Routes/bulletin/index";
import {
  CMSharedLayout,
  CMHome,
  AllCourses,
} from "./Routes/courseManager/index";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/schedule-manager" element={<ScheduleManager />} />

        <Route path="/school-info" element={<Info />} />

        <Route
          path="/course-manager"
          element={
            <ProtectedRoute>
              <CMSharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CMHome />} />
          <Route path="all" element={<AllCourses />} />
        </Route>

        <Route
          path="/bulletin"
          element={
            <ProtectedRoute>
              <BulletinSharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<BulletinHome />} />
          <Route path="all" element={<AllBulletin />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
