import { IconType } from "react-icons/lib";
import { FaWpforms } from "react-icons/fa";
import { AiOutlineForm } from "react-icons/ai";

interface ILinks {
  id: number;
  text: string;
  path: string;
  icon: IconType;
}

const links: ILinks[] = [
  {
    id: 1,
    text: "bulletin home",
    path: "/bulletin",
    icon: AiOutlineForm,
  },
  { id: 2, text: "all bulletin boards", path: "all", icon: FaWpforms },
];

export default links;
