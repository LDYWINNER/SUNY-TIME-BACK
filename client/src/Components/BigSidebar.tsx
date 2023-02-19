import Wrapper from "../assets/wrappers/BigSidebar";
import { useRecoilState } from "recoil";
import { globalCurrentState } from "../atoms";
import { FaAlignLeft } from "react-icons/fa";

function BigSidebar() {
  //toggle sidebar
  const [globalState, setGlobalCurrentState] =
    useRecoilState(globalCurrentState);
  const toggleSidebar = () => {
    setGlobalCurrentState((currentState) => {
      return {
        ...currentState,
        showSidebar: !currentState.showSidebar,
      };
    });
  };

  return (
    <Wrapper>
      <h1>BigSidebar</h1>
      <button type="button" className="toggle-btn" onClick={toggleSidebar}>
        <FaAlignLeft />
      </button>
    </Wrapper>
  );
}
export default BigSidebar;
