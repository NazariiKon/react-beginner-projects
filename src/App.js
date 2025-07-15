import './index.scss';
import React from 'react';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

function Result({ correctAnswers }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {correctAnswers} ответа из {questions.length}</h2>
      <a href='/'>
        <button>Попробовать снова</button>
      </a>
    </div>
  );
}

function Game({ step, question, handleOnClickVariant }) {
  const percantage = Math.round((step / questions.length) * 100)
  console.log(percantage)
  return (
    <>
      <div className="progress">
        <div style={{ width: `${percantage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((variant, index) => (
          <li key={index} onClick={() => handleOnClickVariant(index)}>{variant}</li>
        ))
        }
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = React.useState(0)
  const [correctAnswers, setCorrectAnswers] = React.useState(0)
  const question = questions[step]

  const handleOnClickVariant = (index) => {
    if (index == question.correct) {
      setCorrectAnswers(correctAnswers + 1)
    }
    setStep(step + 1)
  };

  return (
    <div className="App">
      {
        step != questions.length ?
          (
            <Game step={step} question={question} handleOnClickVariant={handleOnClickVariant} />
          )
          :
          (
            <Result correctAnswers={correctAnswers} />
          )
      }
    </div>
  );
}

export default App;
