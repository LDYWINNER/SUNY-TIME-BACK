import styled from "styled-components";

export const Wrapper = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .react-calendar {
    width: 70%;
    height: 33%;
    background-color: ${(props) => props.theme.bgColor.lighter};
    color: ${(props) => props.theme.textColor.lighter};
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 3px 1px ${(props) => props.theme.textColor.lighter};

    button {
      &:hover {
        background-color: ${(props) => props.theme.main.lightBlue};
      }
      &:active {
        background-color: ${(props) => props.theme.main.blue};
      }
    }

    //오늘 표시 변경
    .react-calendar__tile--now {
      background: tomato;
      color: ${(props) => props.theme.bgColor.lighter};
      box-shadow: 0 0 3px 1px black;
    }
    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
    }

    //년 월 표시 커스텀
    .react-calendar__navigation__label > span {
      font-size: 1.2rem;
      font-weight: 600;
      color: ${(props) => props.theme.textColor.darker};
    }

    //요일 부분 커스텀
    .react-calendar__month-view__weekdays {
      abbr {
        /*월,화,수... 글자 부분*/
        color: ${(props) => props.theme.main.blue};
        font-size: 1rem;
        font-weight: 500;
        text-decoration: none;
      }
    }

    //day tile 각 모양
    .react-calendar__tile {
      text-align: center;
    }

    .react-calendar__tile--range {
      box-shadow: 0 0 3px 1px black;
    }

    .react-calendar__year-view__months,
    .react-calendar__decade-view__years,
    .react-calendar__century-view__decades {
      display: grid !important;
      grid-template-columns: 20% 20% 20% 20% 20%;

      &.react-calendar__year-view__months {
        grid-template-columns: 33.3% 33.3% 33.3%;
      }

      .react-calendar__tile {
        max-width: initial !important;
      }
    }
  }
`;

export const Span = styled.span`
  color: ${(props) => props.theme.bgColor.lighter};
  text-align: center;
  font-weight: 600;
  font-size: 2rem;
  margin-top: 1.5rem;
`;
