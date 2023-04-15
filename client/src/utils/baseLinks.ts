interface ILink {
  id: number;
  text: string;
  path: string;
}

const links: ILink[] = [
  { id: 10, text: "home", path: "/" },
  { id: 20, text: "school info", path: "school-info" },
  { id: 30, text: "course manager", path: "course-manager" },
  { id: 40, text: "bulletin board", path: "bulletin" },
  { id: 50, text: "login / register", path: "register" },
];

export default links;
