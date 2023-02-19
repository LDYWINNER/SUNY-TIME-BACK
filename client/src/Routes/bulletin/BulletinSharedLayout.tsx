import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/BulletinSharedLayout";
import { Header, BigSidebar } from "../../Components";
import { bgImages } from "../../assets/assets";

const BulletinSharedLayout = () => {
  const [bgImage, setbgImage] = useState("");
  useEffect(() => {
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
  }, [bgImage]);

  return (
    <Wrapper bgImage={bgImage}>
      <main>
        <Header />
        <div className="bulletin">
          <div className="big-sidebar">
            <BigSidebar />
          </div>
          <div className="bulletin-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default BulletinSharedLayout;
