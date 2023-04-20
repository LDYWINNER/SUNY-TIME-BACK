import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { Wrapper, Charts, Chart } from "../../assets/wrappers/OverallInfo";
import { isDarkAtom } from "../../atoms";
import img from "../../assets/images/no-review.svg";

interface IOverallInfo {
  crResult: {
    stars: number;
    homeworkQuantity: [number, number, number];
    difficulty: [number, number, number];
    testQuantity: [number, number, number, number];
    teamProjectPresence: [number, number];
    quizPresence: [number, number];
  };
}

const OverallInfo = ({ crResult }: IOverallInfo) => {
  const isDark = useRecoilValue(isDarkAtom);

  if (isNaN(crResult.stars)) {
    return (
      <div>
        <img src={img} alt="not review" />
        <p>No review yet for this course</p>
      </div>
    );
  }
  return (
    <Wrapper>
      <h1>Overall Grade: {crResult.stars} / 5</h1>
      <Charts>
        <Chart>
          <h4>Homework Quantity</h4>
          <ApexChart
            type="bar"
            series={[
              {
                name: "Homework Quantity",
                data: [...crResult.homeworkQuantity],
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                height: 400,
                width: 200,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: {
                show: false,
              },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              plotOptions: {
                bar: {
                  borderRadius: 4,
                  horizontal: true,
                },
              },
              dataLabels: {
                enabled: false,
              },
              xaxis: {
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                categories: ["many", "soso", "few"],
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => value + "%",
                },
              },
            }}
          />
        </Chart>
        <Chart>
          <h4>Difficulty</h4>
          <ApexChart
            type="bar"
            series={[
              {
                name: "Difficulty",
                data: [...crResult.difficulty],
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                height: 350,
                width: 200,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: {
                show: false,
              },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              plotOptions: {
                bar: {
                  borderRadius: 4,
                  horizontal: true,
                },
              },
              dataLabels: {
                enabled: false,
              },
              xaxis: {
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                categories: ["difficult", "soso", "easy"],
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => value + "%",
                },
              },
            }}
          />
        </Chart>
        <Chart>
          <h4>Test Quantity</h4>
          <ApexChart
            type="bar"
            series={[
              {
                name: "Test Quantity",
                data: [...crResult.testQuantity],
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                height: 350,
                width: 200,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: {
                show: false,
              },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              plotOptions: {
                bar: {
                  borderRadius: 4,
                  horizontal: true,
                },
              },
              dataLabels: {
                enabled: false,
              },
              xaxis: {
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                categories: [0, 1, 2, 3],
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => value + "%",
                },
              },
            }}
          />
        </Chart>
        <Chart>
          <h4>Teamproject Presence</h4>
          <ApexChart
            type="bar"
            series={[
              {
                name: "Team Project Presence",
                data: [...crResult.teamProjectPresence],
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                height: 350,
                width: 200,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: {
                show: false,
              },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              plotOptions: {
                bar: {
                  borderRadius: 4,
                  horizontal: true,
                },
              },
              dataLabels: {
                enabled: false,
              },
              xaxis: {
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                categories: ["Yes", "No"],
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => value + "%",
                },
              },
            }}
          />
        </Chart>
        <Chart>
          <h4>Quiz Presence</h4>
          <ApexChart
            type="bar"
            series={[
              {
                name: "Quiz Presence",
                data: [...crResult.quizPresence],
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                height: 350,
                width: 200,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: {
                show: false,
              },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              plotOptions: {
                bar: {
                  borderRadius: 4,
                  horizontal: true,
                },
              },
              dataLabels: {
                enabled: false,
              },
              xaxis: {
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                categories: ["Yes", "No"],
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => value + "%",
                },
              },
            }}
          />
        </Chart>
      </Charts>
    </Wrapper>
  );
};

export default OverallInfo;
