import Header from "./Header"
import Content from "./Content"
import Total from "./Total"
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course}/>
      <Content pt1={part1} ex1={exercises1} pt2={part2} ex2={exercises2} pt3={part3} ex3={exercises3} />
      <Total ex1={exercises1} pt2={part2} ex2={exercises2} pt3={part3} ex3={exercises3}/>
    </>
  )
}

export default App;