import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { BigSidebar } from "../../Components";
import { bgImages } from "../../assets/assets";
import links from "../../utils/cmLinks";
import { Wrapper } from "../../assets/wrappers/CMSharedLayout";

const CMSharedLayout = () => {
  const [bgImage, setbgImage] = useState("");
  useEffect(() => {
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
  }, [bgImage]);

  return (
    <Wrapper bgImage={bgImage}>
      <main>
        <div className="bulletin">
          <div className="big-sidebar">
            <BigSidebar links={links} />
          </div>
          <div className="bulletin-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default CMSharedLayout;
