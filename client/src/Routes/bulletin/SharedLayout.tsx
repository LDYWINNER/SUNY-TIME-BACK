import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/BulletinSharedLayout";
import { Header } from "../../Components";

const SharedLayout = () => {
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

export default SharedLayout;
