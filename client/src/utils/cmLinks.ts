interface ILink {
  id: number;
  text: string;
  path: string;
}

const links: ILink[] = [
  { id: 1, text: "All Courses", path: "/course-manager" },
  { id: 2, text: "My Course", path: "my" },
];

export default links;
