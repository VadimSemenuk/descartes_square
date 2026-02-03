"use client"

import {useState} from "react";

class Answer {
  text: string = "";
  weight: number = 5;
}

export default function Home() {

  const [answers, setAnswers] = useState<Answer[][]>([[], [], [], []])

  return (
    <div
      className="flex flex-col min-h-screen items-center p-10"
      style={{
        "backgroundColor": "#eef5ff",
        "backgroundImage": "radial-gradient(at 6% 4%, #eef5ff 0%, transparent 60%), radial-gradient(at 13% 67%, #b4d4ff 0%, transparent 50%), radial-gradient(at 86% 0%, #86b6f6 0%, transparent 40%), radial-gradient(at 16% 39%, #176b87 0%, transparent 30%)"
      }}
    >
      {/*<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">*/}
      <main className="container flex flex-col items-center">
        <h1 className="text-xl opacity-50 text-center">Квадрат Декарта</h1>
        <h2 className="text-6xl text-center">Принимайте <span className="text-[#105097] font-bold">решения</span><br/>ответив
          на 4 вопроса</h2>

        <input
          className="text-4xl mt-10 w-full text-center outline-none"
          type="text"
          placeholder={"Введите Ваш вопрос..."}
        />

        <div className="grid lg:grid-cols-2 gap-4 mt-7 w-full">
          <Square
            title="Что будет, если это произойдёт"
            subtitle="Выгода, к которой приведет действие"
            subtitleBackground="bg-green-100"
            subtitleColor="text-green-800"
            answers={answers[0]}
            onAnswersUpdate={(it) => {
              setAnswers([it, answers[1], answers[2], answers[3]]);
            }}
          />

          <Square
            title="Что будет, если это не произойдёт"
            subtitle="Что хорошего произойдет, если отказаться от идеи"
            subtitleBackground="bg-blue-100"
            subtitleColor="text-blue-800"
            answers={answers[1]}
            onAnswersUpdate={(it) => {
              setAnswers([answers[0], it, answers[2], answers[3]]);
            }}
          />

          <Square
            title="Чего не будет, если это произойдёт"
            subtitle="что плохого произойдет, если реализуете идею"
            subtitleBackground="bg-yellow-100"
            subtitleColor="text-yellow-800"
            answers={answers[2]}
            onAnswersUpdate={(it) => {
              setAnswers([answers[0], answers[1], it, answers[3]]);
            }}
          />

          <Square
            title="Чего не будет, если это не произойдёт"
            subtitle="Что плохого может случиться, если отказаться от идеи"
            subtitleBackground="bg-red-100"
            subtitleColor="text-red-800"
            answers={answers[3]}
            onAnswersUpdate={(it) => {
              setAnswers([answers[0], answers[1], answers[2], it]);
            }}
          />
        </div>
      </main>
    </div>
  );
}

interface SquareProps {
  title: string;
  subtitle: string;
  subtitleBackground: string;
  subtitleColor: string;
  answers: Answer[];
  onAnswersUpdate: (it: Answer[]) => void;
}

function Square({title, subtitle, subtitleBackground, subtitleColor, answers, onAnswersUpdate}: SquareProps) {
  return (
    <div className="rounded-4xl p-7 flex flex-col justify-between bg-[#ffffff30] border-1 border-[#ffffff60]">
      <div className="flex flex-col items-start">
        <div className={`rounded-full pb-1 pt-1 pl-3 pr-3 text-sm ${subtitleBackground} ${subtitleColor}`}>{subtitle}</div>
        <div className="text-3xl mt-2">{title}</div>

        <div className="mt-5 mb-5">
          {answers.map((answer, index) => (
            <div key={index}>
              {answer.text}
            </div>
          ))}
        </div>
      </div>

      <AddAnswer
        onAdd={(it: Answer) => onAnswersUpdate([...answers, it])}
      />
    </div>
  )
}

interface AddAnswerProps {
  onAdd: (it: Answer) => void
}

function AddAnswer({ onAdd }: AddAnswerProps) {

  const [answer, setAnswer] = useState<Answer>({text: "", weight: 5})

  return (
    <div className="w-full flex flex-col">
      <input
        className="p-5 w-full rounded-full bg-[#ffffff60] outline-none"
        type="text"
        placeholder="Ответ..."
        value={answer.text}
        onChange={(e) => {
          setAnswer(({...answer, text: e.target.value}))
        }}
      />

      <div className="flex gap-1 justify-between items-center mt-2">
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm">Важность</span>
          <div className="flex gap-1 items-center">
            <button
              className="w-12 h-12 flex justify-center items-center rounded-full bg-[#ffffff60] cursor-pointer"
              onClick={() => setAnswer(({...answer, weight: Math.max(answer.weight - 1, 0)}))}
            >
              -
            </button>
            <span className="w-10 text-center font-bold">{answer.weight}</span>
            <button
              className="w-12 h-12 flex justify-center items-center rounded-full bg-[#ffffff60] cursor-pointer"
              onClick={() => setAnswer(({...answer, weight: Math.min(answer.weight + 1, 10)}))}
            >
              +
            </button>
          </div>
        </div>

        <button
          className="h-17 pl-4 pr-4 flex justify-center items-center rounded-full bg-[#105097] text-white font-bold cursor-pointer"
          onClick={() => onAdd(answer)}
        >Добавить
        </button>
      </div>
    </div>
  )
}

