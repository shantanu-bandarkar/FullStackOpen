import React from "react";

const Header = ({ children }) => {
  return <h1>{children}</h1>;
};

const Content = ({ pts }) => {
  console.log("Part", pts);
  return pts.map((part) => (
    <div key={part.id}>
      <Part part={part.name} exercises={part.exercises} />
    </div>
  ));
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Total = ({ pts }) => {
  const totalExercises = pts.reduce((sum, pt) => sum + pt.exercises, 0);

  return <p>Number of exercises {totalExercises}</p>;
};

const Course = ({ course }) => {
  return (
    <>
      {course.map((course) => (
        <div key={course.id}>
          <Header>{course.name}</Header>
          <Content pts={course.parts} />
          <Total pts={course.parts} />
        </div>
      ))}
    </>
  );
};

export default Course;
