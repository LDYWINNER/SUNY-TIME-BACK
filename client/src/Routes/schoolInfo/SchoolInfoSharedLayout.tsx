import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SchoolInfoSharedLayout";
import { BigSidebar } from "../../Components";
import { bgImages } from "../../assets/assets";
import links from "../../utils/schoolInfoLinks";

const SchoolInfoSharedLayout = () => {
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

export default SchoolInfoSharedLayout;