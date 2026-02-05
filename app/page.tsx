"use client"

import {ChangeEvent, TextareaHTMLAttributes, useEffect, useRef, useState} from "react";
import DeleteIcon from "@/public/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"

class Answer {
  id: string = "";
  text: string = "";
  weight: number = 5;
}

const defaultAnswers: Answer[][] = [[], [], [], []]

export default function Home() {

  const [answers, setAnswers] = useState<Answer[][]>(defaultAnswers)

  const score0 = answers[0].reduce((prev, current) => prev += current.weight, 0)
  const score1 = answers[1].reduce((prev, current) => prev += current.weight, 0)
  const score2 = answers[2].reduce((prev, current) => prev += current.weight, 0)
  const score3 = answers[3].reduce((prev, current) => prev += current.weight, 0)
  const score = score0 + score1 - score2 - score3;

  return (
    <div
      className="flex flex-col min-h-screen items-center p-10 relative"
      style={{
        "backgroundColor": "#eef5ff",
        "backgroundImage": "radial-gradient(at 6% 4%, #eef5ff 0%, transparent 60%), radial-gradient(at 13% 67%, #b4d4ff 0%, transparent 50%), radial-gradient(at 86% 0%, #86b6f6 0%, transparent 40%), radial-gradient(at 16% 39%, #176b87 0%, transparent 30%)"
      }}
    >
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

        {
          answers.some((list) => list.length > 0) &&
            <>
                <button
                    className="sticky bottom-5 mt-5
                    h-17 pl-8 pr-8 flex justify-center items-center rounded-full
                    bg-[#105097] text-white font-bold cursor-pointer
                    transition-all duration-200 hover:scale-102"
                    onClick={() => {
                      document.getElementById("result")?.scrollIntoView({ behavior: "smooth" });
                    }}
                >
                    Результат
                </button>

                <div
                    id="result"
                    className="rounded-[1.5rem] p-[2px] mt-5 bg-linear-45 from-blue-300 to-pink-300"
                >
                    <div className="rounded-[calc(1.5rem-2px)] md:p-8 p-4 bg-white flex flex-col">
                        <div className="text-4xl text-center text-[#105097] font-bold">{score}</div>
                        <div className="text-4xl text-center">
                          { score > 0 && "Хорошее решение" }
                          { score < 0 && "Плохое решение" }
                        </div>
                    </div>
                </div>

                <button
                    className="mt-5
                    h-17 pl-8 pr-8 flex justify-center items-center rounded-full
                    border-1 border-[#105097] font-bold cursor-pointer
                    transition-all duration-200 hover:scale-102"
                    onClick={() => {
                      setAnswers(defaultAnswers);
                    }}
                >
                    Очистить
                </button>
            </>
        }
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

  const [_editingAnswer, setEditingAnswer] = useState<Answer | null>(null)
  const editingAnswer = answers.find(a => a.id === _editingAnswer?.id) ?? null

  // useEffect(() => {
  //   if (editingAnswer) {
  //     if (!answers.some((it) => it.id === editingAnswer.id)) {
  //       setEditingAnswer(null)
  //     }
  //   }
  // }, [answers, editingAnswer]);

  return (
    <div className="rounded-4xl p-7 flex flex-col justify-between bg-[#ffffff30] border-1 border-[#ffffff60]">
      <div className="flex flex-col items-start">
        <div
          className={`rounded-full pb-1 pt-1 pl-3 pr-3 text-sm ${subtitleBackground} ${subtitleColor}`}>{subtitle}</div>
        <div className="text-3xl mt-2">{title}</div>

        <div className="mt-5 mb-5 flex flex-col w-full">
          {answers.map((answer, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 hover:bg-[#ffffff30] cursor-pointer transition-all duration-200 p-2 w-full rounded-xl ${editingAnswer && (editingAnswer?.id === answer.id) ? 'bg-[#ffffff30]' : ''}`}
              onClick={() => { setEditingAnswer(answer) }}
            >
              <div className="rounded-full bg-[#bdd5ee] text-[#105097] font-bold w-6 h-6 flex items-center justify-center text-sm">
                {answer.weight}
              </div>
              <div className="whitespace-pre-wrap">
                {answer.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddAnswer
        key={editingAnswer?.id ?? 'new'}
        editingAnswer={editingAnswer}
        onAdd={(it: Answer) => onAnswersUpdate([...answers, it])}
        onEdit={(nextAnswer: Answer) => {
          onAnswersUpdate(answers.map((answer) => {
            if (answer.id === nextAnswer.id) {
              return nextAnswer
            } else {
              return answer
            }
          }))
          setEditingAnswer(null)
        }}
        onRemove={(answer: Answer) => {
          onAnswersUpdate(answers.filter((it) => it.id !== answer.id))
          setEditingAnswer(null)
        }}
      />
    </div>
  )
}

interface AddAnswerProps {
  editingAnswer: Answer | null;
  onAdd: (it: Answer) => void;
  onEdit: (it: Answer) => void;
  onRemove: (it: Answer) => void;
}

const getDefaultAnswer = (): Answer => (
  {
    id: crypto.randomUUID(),
    text: "",
    weight: 5
  }
)
const defaultAnswer = getDefaultAnswer()

function AddAnswer({ onAdd, onEdit, onRemove, editingAnswer }: AddAnswerProps) {

  const [answer, setAnswer] = useState<Answer>(
    () => editingAnswer ?? defaultAnswer
  );

  // const [answer, setAnswer] = useState<Answer>(defaultAnswer)

  // useEffect(() => {
  //   if (editingAnswer) {
  //     setAnswer(editingAnswer)
  //   } else {
  //
  //   }
  // }, [editingAnswer]);

  return (
    <div className="w-full flex flex-col">
      <AutoResizeTextarea
        className="p-5 w-full rounded-4xl bg-[#ffffff60] outline-none resize-none"
        placeholder="Ответ..."
        value={answer.text}
        onChange={(e: ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>) => {
          setAnswer(({...answer, text: e.target.value}))
        }}
      />

      <div className="flex gap-1 justify-between items-center mt-2">
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm">Важность</span>
          <div className="flex gap-1 items-center">
            <button
              className="w-12 h-12 flex justify-center items-center rounded-full bg-[#ffffff60] cursor-pointer text-2xl font-medium"
              onClick={() => setAnswer(({...answer, weight: Math.max(answer.weight - 1, 0)}))}
            >
              -
            </button>
            <span className="w-8 text-center font-bold">{answer.weight}</span>
            <button
              className="w-12 h-12 flex justify-center items-center rounded-full bg-[#ffffff60] cursor-pointer text-2xl font-medium"
              onClick={() => setAnswer(({...answer, weight: Math.min(answer.weight + 1, 10)}))}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-1">
          {
            editingAnswer &&
              <button
                  className="h-17 pl-4 pr-4 flex justify-center items-center rounded-full bg-red-800 text-red-100 font-bold cursor-pointer"
                  onClick={() => {
                    onRemove(answer)
                    setAnswer(getDefaultAnswer())
                  }}
              >
                  <DeleteIcon className="w-6 h-6" />
              </button>
          }

          {
            editingAnswer &&
              <button
                  className="h-17 pl-4 pr-4 flex justify-center items-center rounded-full bg-[#bdd5ee] text-[#105097] font-bold cursor-pointer"
                  onClick={() => {
                    onEdit(answer)
                    setAnswer(getDefaultAnswer())
                  }}
              >
                  Изменить
              </button>
          }

          {
            !editingAnswer &&
              <button
                  className="h-17 pl-4 pr-4 flex justify-center items-center rounded-full bg-[#bdd5ee] text-[#105097] font-bold cursor-pointer"
                  onClick={() => {
                    onAdd(answer)
                    setAnswer(getDefaultAnswer())
                  }}
              >
                  Добавить
              </button>
          }
        </div>
      </div>
    </div>
  )
}


export function AutoResizeTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ref = useRef(null);

  const resize = () => {
    if (ref.current) {
      const el: HTMLElement = ref.current;
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  };

  useEffect(() => {
    resize(); // на случай value по умолчанию
  }, []);

  return (
    <textarea
      {...props}
      ref={ref}
      rows={1}
      style={{
        resize: "none",
        overflowY: "hidden",
        ...props.style,
      }}
      onInput={resize}
    />
  );
}
