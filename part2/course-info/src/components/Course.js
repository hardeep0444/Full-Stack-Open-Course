const Header = ({ heading }) => {
  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  return (
    <div>
      <strong>
        total of {parts.reduce((a, b) => a + b.exercises, 0)} exercises
      </strong>
    </div>
  );
};

const Course = ({ courses }) => (
  <div>
    <h1>Web development curriculum</h1>
    {courses.map((course) => (
      <div key={course.id}>
        <Header heading={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))}
  </div>
);

export default Course;