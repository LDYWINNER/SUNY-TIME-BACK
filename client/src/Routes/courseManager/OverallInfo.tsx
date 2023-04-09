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
      {/* <ApexChart
        type="bar"
        series={[
          {
            name: "Price",
            data:
              reviews?.map((review) => ({
                x: 100,
                y: [review.homeworkQuantity],
              })) ?? [],
          },
        ]}
        options={{
          theme: {
            mode: isDark ? "dark" : "light",
          },
          chart: {
            height: 300,
            width: 500,
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
          yaxis: {
            show: false,
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
          fill: {
            type: "gradient",
            gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
          },
          colors: ["#0fbcf9"],
          tooltip: {
            y: {
              formatter: (value) => `$${value.toFixed(2)}`,
            },
          },
        }}
      /> */}
    </Wrapper>
  );
};

export default OverallInfo;
