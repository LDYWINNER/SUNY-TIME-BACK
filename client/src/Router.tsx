import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components";
import {
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
import {
  SchoolInfoSharedLayout,
  SchoolInfoHome,
  SchoolContact,
  CampusLife,
  Academics,
} from "./Routes/schoolInfo/index";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/schedule-manager" element={<ScheduleManager />} />

        <Route
          path="/school-info"
          element={
            <ProtectedRoute>
              <SchoolInfoSharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SchoolInfoHome />} />
          <Route path="contact" element={<SchoolContact />} />
          <Route path="campus-life" element={<CampusLife />} />
          <Route path="academics" element={<Academics />} />
        </Route>

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
