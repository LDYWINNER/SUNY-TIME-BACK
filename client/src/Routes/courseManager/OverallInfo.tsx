import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { Wrapper } from "../../assets/wrappers/OverallInfo";
import { isDarkAtom } from "../../atoms";

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

  return (
    <Wrapper>
      <h4>Stars</h4>
      <h1>{crResult.stars}</h1>
      <h4>homework quantity</h4>
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
            categories: ["many", "soso", "few"],
          },
          colors: ["#0fbcf9"],
        }}
      />
      <h4>difficulty</h4>
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
        }}
      />
      <h4>test quantity</h4>
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
        }}
      />
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
        }}
      />
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
        }}
      />
    </Wrapper>
  );
};

export default OverallInfo;
