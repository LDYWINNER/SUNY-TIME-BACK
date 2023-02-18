import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/BulletinSharedLayout";
import { Header } from "../../Components";

const bulletinSharedLayout = () => {
  return (
    <Wrapper>
      <main className="bulletin">
        {/* <SmallSidebar />
        <BigSidebar /> */}
        <div>
          <Header />
          <div className="bulletin-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default bulletinSharedLayout;
