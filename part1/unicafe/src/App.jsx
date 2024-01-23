import { useState } from 'react'
import Button from './components/Button'
import Statistics from './components/Statistics'

function App() {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [flag, setFlag] = useState(false)
  const handleClick = (val) => {
    setFlag(true)
    if (val === 1) {
      setGood((prev) => prev + 1)
    }
    else if (val === 0) {
      setNeutral((prev) => prev + 1)
    }
    else {
      setBad((prev) => prev + 1)
    }
  }

  return (
    <>
     <h1>give feedback</h1>
     <Button onClk={() => handleClick(1)}>good</Button>
     <Button onClk={() => handleClick(0)}>neutral</Button>
     <Button onClk={() => handleClick(-1)}>bad</Button>
     <h1>statistics</h1>
     { flag ? <Statistics good={good} neutral={neutral} bad={bad} /> : <p>No feedback given</p>}
    </>
  )
}

export default App
