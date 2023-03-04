import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { BigSidebar } from "../../Components";
import {
  Wrapper,
  Main,
  MainContent,
  SubContent,
} from "../../assets/wrappers/BulletinSharedLayout";
import { bgImages } from "../../assets/assets";
import { FaAlignLeft } from "react-icons/fa";
import links from "../../utils/bulletinLinks";

const BulletinSharedLayout = () => {
  const [bgImage, setbgImage] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  useEffect(() => {
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
  }, [bgImage]);

  return (
    <Wrapper bgImage={bgImage}>
      <main className="bulletin-main">
        <div>
          <BigSidebar links={links} showSidebar={showSidebar}></BigSidebar>
          <button
            type="button"
            className={
              showSidebar ? "toggle-btn toggle-btn-hide" : "toggle-btn "
            }
            onClick={toggleSidebar}
          >
            <FaAlignLeft />
          </button>
        </div>
        <div className="bulletin">
          <Main>
            <MainContent>
              <Outlet />
            </MainContent>
            <SubContent></SubContent>
          </Main>
        </div>
      </main>
    </Wrapper>
  );
};

export default BulletinSharedLayout;
