interface ILink {
  id: number;
  text: string;
  path: string;
}

const links: ILink[] = [
  { id: 10, text: "Home", path: "/school-info" },
  { id: 20, text: "Contact", path: "contact" },
  { id: 30, text: "Campus Life", path: "campus-life" },
  { id: 40, text: "Academics", path: "academics" },
];

export default links;
