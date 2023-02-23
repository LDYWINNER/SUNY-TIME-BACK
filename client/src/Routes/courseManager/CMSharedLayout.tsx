import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { BigSidebar } from "../../Components";
import { bgImages } from "../../assets/assets";
import { FaAlignLeft } from "react-icons/fa";
import links from "../../utils/cmLinks";
import { Wrapper } from "../../assets/wrappers/CMSharedLayout";

const CMSharedLayout = () => {
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
      <main>
        <div className="bulletin">
          <div className="big-sidebar">
            <BigSidebar links={links} showSidebar={showSidebar} />
          </div>
          <div className="bulletin-page">
            <button
              type="button"
              className="toggle-btn"
              onClick={toggleSidebar}
            >
              <FaAlignLeft />
            </button>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default CMSharedLayout;
