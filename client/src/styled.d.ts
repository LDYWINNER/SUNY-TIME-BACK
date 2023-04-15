import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
    };
    white: {
      darker: string;
      lighter: string;
    };
    main: {
      blue: string;
      lightBlue: string;
      red: string;
    };
    bgColor:
      | {
          veryDark: string;
          darker: string;
          lighter: string;
        }
      | { darker: string; lighter: string };
    textColor:
      | {
          veryDark: string;
          darker: string;
          lighter: string;
        }
      | { darker: string; lighter: string };
    todoBoardColor: string;
    todoCardColor: string;
  }
}
