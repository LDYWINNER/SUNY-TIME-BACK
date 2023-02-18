import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Info,
  CourseManager,
  ScheduleManager,
  Daangn,
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

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/schedule-manager" element={<ScheduleManager />} />

        <Route path="/school-info" element={<Info />} />
        <Route
          path="/course-manager"
          element={
            <ProtectedRoute>
              <CourseManager />
            </ProtectedRoute>
          }
        />

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

        <Route
          path="/daangn"
          element={
            <ProtectedRoute>
              <Daangn />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
