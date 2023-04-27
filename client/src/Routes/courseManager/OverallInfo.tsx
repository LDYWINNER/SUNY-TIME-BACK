import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import {
  Wrapper,
  Charts,
  Chart,
  Span,
  NoReviewContainer,
} from "../../assets/wrappers/OverallInfo";
import {
  courseReviewInstructorState,
  courseSearchState,
  isDarkAtom,
} from "../../atoms";
import img from "../../assets/images/no-review.svg";
import { useForm } from "react-hook-form";
import {
  amsInstructors,
  accbusInstructors,
  cseInstructors,
  eseInstructors,
  estempInstructors,
  mecInstructors,
} from "../../utils";

interface IOverallInfo {
  crResult: {
    stars: number;
    homeworkQuantity: [number, number, number];
    difficulty: [number, number, number];
    testQuantity: [number, number, number, number, number];
    teamProjectPresence: [number, number];
    quizPresence: [number, number];
  };
}

interface IForm {
  instructor: string;
}

const OverallInfo = ({ crResult }: IOverallInfo) => {
  const isDark = useRecoilValue(isDarkAtom);
  const { courseSubjFilter } = useRecoilValue(courseSearchState);
  const instructor = useRecoilValue(courseReviewInstructorState);
  const { register, handleSubmit, reset } = useForm<IForm>({
    defaultValues: {
      instructor: "-2",
    },
  });

  if (isNaN(crResult.stars)) {
    return (
      <NoReviewContainer>
        <img src={img} alt="not review" />
        <Span>No review yet for this course... :(</Span>
      </NoReviewContainer>
    );
  }
  return (
    <Wrapper>
      <h1>Overall Grade: {crResult.stars} / 5</h1>
      <div className="form-row">
        <select
          {...register("instructor", { required: true })}
          defaultValue="-2"
          onChange={() => {}}
        >
          <>
            <option value="-2" disabled>
              SELECT INSTRUCTOR
            </option>
            {courseSubjFilter === "AMS" ? (
              amsInstructors.map((instructor) => (
                <option key={instructor} value={instructor}>
                  {instructor}
                </option>
              ))
            ) : courseSubjFilter === "ACC/BUS" ? (
              accbusInstructors.map((instructor) => (
                <option key={instructor} value={instructor}>
                  {instructor}
                </option>
              ))
            ) : courseSubjFilter === "CSE" ? (
              cseInstructors.map((instructor) => (
                <option key={instructor} value={instructor}>
                  {instructor}
                </option>
              ))
            ) : courseSubjFilter === "ESE" ? (
              eseInstructors.map((instructor) => (
                <option key={instructor} value={instructor}>
                  {instructor}
                </option>
              ))
            ) : courseSubjFilter === "EST/EMP" ? (
              estempInstructors.map((instructor) => (
                <option key={instructor} value={instructor}>
                  {instructor}
                </option>
              ))
            ) : courseSubjFilter === "MEC" ? (
              mecInstructors.map((instructor) => (
                <option key={instructor} value={instructor}>
                  {instructor}
                </option>
              ))
            ) : instructor.instructorNum === 1 ? (
              <>
                <option
                  key={instructor.instructorName[0]}
                  value={instructor.instructorName[0]}
                >
                  {instructor.instructorName[0]}
                </option>
              </>
            ) : (
              <>
                <option
                  key={instructor.instructorName[0]}
                  value={instructor.instructorName[0]}
                >
                  {instructor.instructorName[0]}
                </option>
                <option
                  key={instructor.instructorName[1]}
                  value={instructor.instructorName[1]}
                >
                  {instructor.instructorName[1]}
                </option>{" "}
              </>
            )}
          </>
        </select>
      </div>
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
                categories: [0, 1, 2, 3, 4],
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
