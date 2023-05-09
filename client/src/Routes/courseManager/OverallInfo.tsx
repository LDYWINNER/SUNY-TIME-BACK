import ApexChart from "react-apexcharts";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Wrapper,
  Charts,
  Chart,
  Span,
  NoReviewContainer,
} from "../../assets/wrappers/OverallInfo";
import {
  courseReviewInstructorState,
  courseReviewResultState,
  courseReviewsState,
  globalCurrentState,
  isDarkAtom,
} from "../../atoms";
import img from "../../assets/images/no-review.svg";
import nodataimg from "../../assets/images/no-data.svg";
import { useForm } from "react-hook-form";
import {
  amsInstructors,
  accbusInstructors,
  cseInstructors,
  eseInstructors,
  estempInstructors,
  mecInstructors,
} from "../../utils";
import { useEffect } from "react";

interface IForm {
  instructor: string;
  semester: string;
}

const OverallInfo = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const instructor = useRecoilValue(courseReviewInstructorState);
  const [crResult, setCourseReviewResult] = useRecoilState(
    courseReviewResultState
  );
  const courseReview = useRecoilValue(courseReviewsState);
  const { register } = useForm<IForm>({
    defaultValues: {
      instructor: "-2",
      semester: "-1",
    },
  });
  const filterInstructor = localStorage.getItem("filterInstructor");
  const filterSemester = localStorage.getItem("filterSemester");
  const courseSubjSearchFilter = localStorage.getItem("courseSubjSearchFilter");
  const data = JSON.parse(localStorage.getItem("currentCourse") as string);
  // console.log(data.subj);
  const globalState = useRecoilValue(globalCurrentState);

  const calculateReviewResult = () => {
    let reviews;
    if (filterInstructor !== "ALL" && filterSemester === "ALL") {
      reviews = courseReview.filter(
        (review) => review.instructor === filterInstructor
      );
    } else if (filterInstructor === "ALL" && filterSemester !== "ALL") {
      reviews = courseReview.filter(
        (review) => review.semester === filterSemester
      );
    } else {
      reviews = courseReview;
    }

    //calculate course review data
    let starTemp = 0;
    let hwqTemp = [0, 0, 0];
    let difficultyTemp = [0, 0, 0];
    let tqTemp = [0, 0, 0, 0, 0];
    let tppTemp = [0, 0];
    let qpTemp = [0, 0];
    const totalLength = reviews.length;
    for (let i = 0; i < totalLength; i++) {
      //star
      starTemp += reviews[i].overallGrade;
      //homeworkQuantity
      if (reviews[i].homeworkQuantity === "many") {
        hwqTemp[0]++;
      } else if (reviews[i].homeworkQuantity === "soso") {
        hwqTemp[1]++;
      } else {
        hwqTemp[2]++;
      }
      //difficulty
      if (reviews[i].difficulty === "difficult") {
        difficultyTemp[0]++;
      } else if (reviews[i].difficulty === "soso") {
        difficultyTemp[1]++;
      } else {
        difficultyTemp[2]++;
      }
      //testQuantity
      if (reviews[i].testQuantity === 0) {
        tqTemp[0]++;
      } else if (reviews[i].testQuantity === 1) {
        tqTemp[1]++;
      } else if (reviews[i].testQuantity === 2) {
        tqTemp[2]++;
      } else if (reviews[i].testQuantity === 3) {
        tqTemp[3]++;
      } else {
        tqTemp[4]++;
      }
      //teamProjectPresence
      if (reviews[i].teamProjectPresence === true) {
        tppTemp[0]++;
      } else {
        tppTemp[1]++;
      }
      //quizPresence
      if (reviews[i].quizPresence === true) {
        qpTemp[0]++;
      } else {
        qpTemp[1]++;
      }
    }
    //star
    starTemp = starTemp / totalLength;
    //homeworkQuantity, difficulty
    for (let j = 0; j < 3; j++) {
      hwqTemp[j] = Math.floor((hwqTemp[j] / totalLength) * 100);
      difficultyTemp[j] = Math.floor((difficultyTemp[j] / totalLength) * 100);
    }
    //testQuantity
    for (let k = 0; k < 5; k++) {
      tqTemp[k] = Math.floor((tqTemp[k] / totalLength) * 100);
    }
    //teamProjectPresence, quizPresence
    for (let j = 0; j < 2; j++) {
      tppTemp[j] = Math.floor((tppTemp[j] / totalLength) * 100);
      qpTemp[j] = Math.floor((qpTemp[j] / totalLength) * 100);
    }

    setCourseReviewResult((currentState) => {
      return {
        ...currentState,
        stars: parseFloat(starTemp.toFixed(2)),
        homeworkQuantity: hwqTemp,
        difficulty: difficultyTemp,
        testQuantity: tqTemp,
        teamProjectPresence: tppTemp,
        quizPresence: qpTemp,
      };
    });
    // console.log(crResult);
  };

  useEffect(() => {
    calculateReviewResult();
  }, []);

  if (globalState.user?.courseReviewNum < 3) {
    return (
      <div style={{ display: "flex" }}>
        <img src={nodataimg} alt="not data" />
        <div>
          <Span>
            Data is available after you finish your registration process :)
          </Span>
          <br />
          <Span>(3 course reviews)</Span>
        </div>
      </div>
    );
  }
  if (isNaN(crResult.stars)) {
    return (
      <NoReviewContainer>
        <div className="form-row">
          <label className="form-label">교수 & 수강학기 선택</label>
          <select
            {...register("instructor", { required: true })}
            value={filterInstructor as string}
            onChange={(e) => {
              localStorage.setItem("filterSemester", "ALL");
              localStorage.setItem("filterInstructor", e.target.value);
              window.location.reload();
            }}
          >
            <>
              <option value="-2" disabled>
                교수
              </option>
              <option value="ALL">ALL</option>
              {courseSubjSearchFilter === "AMS" || data.subj === "MAT" ? (
                amsInstructors.map((instructor) => (
                  <option key={instructor} value={instructor}>
                    {instructor}
                  </option>
                ))
              ) : courseSubjSearchFilter === "ACC/BUS" ? (
                accbusInstructors.map((instructor) => (
                  <option key={instructor} value={instructor}>
                    {instructor}
                  </option>
                ))
              ) : courseSubjSearchFilter === "CSE" ? (
                cseInstructors.map((instructor) => (
                  <option key={instructor} value={instructor}>
                    {instructor}
                  </option>
                ))
              ) : courseSubjSearchFilter === "ESE" ? (
                eseInstructors.map((instructor) => (
                  <option key={instructor} value={instructor}>
                    {instructor}
                  </option>
                ))
              ) : courseSubjSearchFilter === "EST/EMP" ? (
                estempInstructors.map((instructor) => (
                  <option key={instructor} value={instructor}>
                    {instructor}
                  </option>
                ))
              ) : courseSubjSearchFilter === "MEC" ? (
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
          <select
            {...register("semester", { required: true })}
            style={{ width: "10%" }}
            value={filterSemester as string}
            onChange={(e) => {
              localStorage.setItem("filterInstructor", "ALL");
              localStorage.setItem("filterSemester", e.target.value);
              window.location.reload();
            }}
          >
            <option value="-1" disabled>
              수강학기
            </option>
            <option value="ALL">ALL</option>
            <option value="2022-fall">2022 Fall</option>
            <option value="2022-spring">2022 Spring</option>
            <option value="2021-fall">2021 Fall</option>
            <option value="2021-spring">2021 Spring</option>
            <option value="2020-fall">2020 Fall</option>
            <option value="2020-spring">2020 Spring</option>
          </select>
        </div>
        <img src={img} alt="not review" />
        <Span>
          No review yet for this course for the semester you chose OR This
          instructor never taught this course... :(
        </Span>
      </NoReviewContainer>
    );
  }
  return (
    <Wrapper>
      <h1>총점: {crResult.stars} / 5 </h1>
      <h4>
        {filterInstructor === "ALL" &&
          filterSemester === "ALL" &&
          "교수: ALL & 수강학기: ALL"}
        {filterInstructor !== "ALL" && `교수: ${filterInstructor}`}
        {filterSemester !== "ALL" && `수강학기: ${filterSemester}`}
      </h4>
      <div className="form-row">
        <select
          {...register("instructor", { required: true })}
          value={filterInstructor as string}
          onChange={(e) => {
            localStorage.setItem("filterSemester", "ALL");
            localStorage.setItem("filterInstructor", e.target.value);
            window.location.reload();
          }}
        >
          <>
            <option value="-2" disabled>
              교수
            </option>
            <option value="ALL">ALL</option>
            {courseSubjSearchFilter === "AMS" || data.subj === "MAT" ? (
              amsInstructors.map((instructor) => (
                <option key={instructor} value={instructor}>
                  {instructor}
                </option>
              ))
            ) : courseSubjSearchFilter === "ACC/BUS" ? (
              accbusInstructors.map((instructor) => (
                <option key={instructor} value={instructor}>
                  {instructor}
                </option>
              ))
            ) : courseSubjSearchFilter === "CSE" ? (
              cseInstructors.map((instructor) => (
                <option key={instructor} value={instructor}>
                  {instructor}
                </option>
              ))
            ) : courseSubjSearchFilter === "ESE" ? (
              eseInstructors.map((instructor) => (
                <option key={instructor} value={instructor}>
                  {instructor}
                </option>
              ))
            ) : courseSubjSearchFilter === "EST/EMP" ? (
              estempInstructors.map((instructor) => (
                <option key={instructor} value={instructor}>
                  {instructor}
                </option>
              ))
            ) : courseSubjSearchFilter === "MEC" ? (
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
        <select
          {...register("semester", { required: true })}
          style={{ width: "10%" }}
          value={filterSemester as string}
          onChange={(e) => {
            localStorage.setItem("filterInstructor", "ALL");
            localStorage.setItem("filterSemester", e.target.value);
            window.location.reload();
          }}
        >
          <option value="-1" disabled>
            수강학기
          </option>
          <option value="ALL">ALL</option>
          <option value="2022-fall">2022 Fall</option>
          <option value="2022-spring">2022 Spring</option>
          <option value="2021-fall">2021 Fall</option>
          <option value="2021-spring">2021 Spring</option>
          <option value="2020-fall">2020 Fall</option>
          <option value="2020-spring">2020 Spring</option>
        </select>
      </div>
      <Charts>
        <Chart>
          <h4>과제량</h4>
          <ApexChart
            type="bar"
            series={[
              {
                name: "과제량",
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
                categories: ["많음", "보통", "적음"],
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
          <h4>난이도</h4>
          <ApexChart
            type="bar"
            series={[
              {
                name: "난이도",
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
                categories: ["어려움", "중간", "쉬움"],
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
          <h4>시험 개수</h4>
          <ApexChart
            type="bar"
            series={[
              {
                name: "시험 개수",
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
          <h4>팀플 유무</h4>
          <ApexChart
            type="bar"
            series={[
              {
                name: "팀플 유무",
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
                categories: ["있음", "없음"],
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
          <h4>퀴즈 유무</h4>
          <ApexChart
            type="bar"
            series={[
              {
                name: "퀴즈 유무",
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
                categories: ["있음", "없음"],
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
