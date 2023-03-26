import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components";
import {
  Home,
  Register,
  Bulletin,
  ProtectedRoute,
  Error,
  SinglePost,
} from "./Routes";
import {
  CMSharedLayout,
  CMHome,
  AllCourses,
} from "./Routes/courseManager/index";
import SingleCourse from "./Routes/courseManager/SingleCourse";
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
        {/* <Route path="/schedule-manager" element={<ScheduleManager />} /> */}

        <Route
          path="/bulletin"
          element={
            <ProtectedRoute>
              <Bulletin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bulletin/:postId"
          element={
            <ProtectedRoute>
              <SinglePost />
            </ProtectedRoute>
          }
        />

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
          <Route path=":courseId" element={<SingleCourse />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
