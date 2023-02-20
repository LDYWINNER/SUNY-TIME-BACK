interface ILink {
  id: number;
  text: string;
  path: string;
}

const links: ILink[] = [
  { id: 1, text: "My Course", path: "/course-manager" },
  { id: 2, text: "All Courses", path: "all" },
];

export default links;
