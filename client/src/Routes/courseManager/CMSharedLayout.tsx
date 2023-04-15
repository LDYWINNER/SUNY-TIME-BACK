import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { BigSidebar } from "../../Components";
import { bgImages } from "../../assets/assets";
import { FaAlignLeft } from "react-icons/fa";
import links from "../../utils/cmLinks";
import { Wrapper, Main } from "../../assets/wrappers/CMSharedLayout";

const CMSharedLayout = () => {
  const [bgImage, setbgImage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  useEffect(() => {
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
  }, [bgImage]);

  return (
    <Wrapper bgImage={bgImage}>
      <main className="bulletin-main">
        <div className="big-sidebar">
          <BigSidebar links={links} showSidebar={showSidebar} />
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
            <Outlet />
          </Main>
        </div>
      </main>
    </Wrapper>
  );
};

export default CMSharedLayout;
