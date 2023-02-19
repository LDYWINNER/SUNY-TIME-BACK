import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/BulletinSharedLayout";
import { Header, BigSidebar } from "../../Components";

const bulletinSharedLayout = () => {
  return (
    <Wrapper>
      <main>
        <Header />
        <div className="bulletin">
          <BigSidebar />
          <div className="bulletin-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default bulletinSharedLayout;
