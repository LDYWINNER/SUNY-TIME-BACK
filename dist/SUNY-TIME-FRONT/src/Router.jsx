"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Components_1 = require("./Components");
const Routes_1 = require("./Routes");
const index_1 = require("./Routes/courseManager/index");
const SingleCourse_1 = __importDefault(require("./Routes/courseManager/SingleCourse"));
function Router() {
    return (<react_router_dom_1.BrowserRouter>
      <Components_1.Header />
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<Routes_1.Home />}/>
        <react_router_dom_1.Route path="/register" element={<Routes_1.Register />}/>
        <react_router_dom_1.Route path="/login-email" element={<Routes_1.LoginEmail />}/>
        <react_router_dom_1.Route path="/verify-email" element={<Routes_1.VerifyEmail />}/>
        <react_router_dom_1.Route path="/course-review" element={<Routes_1.CRBeforeRegister />}/>
        <react_router_dom_1.Route path="/school-info" element={<Routes_1.SchoolInfoHome />}/>
        {/* <Route path="/schedule-manager" element={<ScheduleManager />} /> */}

        <react_router_dom_1.Route path="/bulletin" element={<Routes_1.ProtectedRoute>
              <Routes_1.Bulletin />
            </Routes_1.ProtectedRoute>}/>
        <react_router_dom_1.Route path="/bulletin/:postId" element={<Routes_1.ProtectedRoute>
              <Routes_1.SinglePost />
            </Routes_1.ProtectedRoute>}/>

        <react_router_dom_1.Route path="/course-manager" element={<Routes_1.ProtectedRoute>
              <index_1.CMSharedLayout />
            </Routes_1.ProtectedRoute>}>
          <react_router_dom_1.Route index element={<index_1.AllCourses />}/>
          <react_router_dom_1.Route path="my" element={<index_1.CMHome />}/>
          <react_router_dom_1.Route path=":courseId" element={<SingleCourse_1.default />}/>
        </react_router_dom_1.Route>

        <react_router_dom_1.Route path="*" element={<Routes_1.Error />}/>
      </react_router_dom_1.Routes>
      <Components_1.Footer />
    </react_router_dom_1.BrowserRouter>);
}
exports.default = Router;
