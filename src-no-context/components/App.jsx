import { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './Main'
import Error from './Error'
import Loader from './Loader'
import StartScreen from './StartScreen'
import Question from './Question'
import NextButton from './NextButton'
import Progress from './Progress'
import FinishScreen from './FinishScreen'
import Animateion from './Animation'
import Footer from './Footer'
import Timer from './Timer'

const Secs_per_question = 30
const initialState = {
    questions: [],
    status: 'Loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secRemaining: 10,
}
function reducer(state, action) {
    switch (action.type) {
        case 'dataRecived':
            return { ...state, status: 'Ready', questions: action.payload }
        case 'dataFailed':
            return { ...state, status: 'Error' }
        case 'start':
            return {
                ...state,
                status: 'Active',
                secRemaining: state.questions.length * Secs_per_question,
            }
        case 'newAnswer':
            const question = state.questions.at(state.index)
            return {
                ...state,
                answer: action.payload,
                points:
                    question.correctOption === action.payload
                        ? state.points + question.points
                        : state.points,
            }
        case 'next':
            return { ...state, index: state.index++, answer: null }
        case 'finisheQuiz':
            return {
                ...state,
                status: 'Finished',
                highscore:
                    state.highscore > state.points
                        ? state.highscore
                        : state.points,
            }
        case 'Restart':
            return {
                ...initialState,
                status: 'Ready',
                questions: state.questions,
            }
        case 'Tick':
            return {
                ...state,
                secRemaining: state.secRemaining - 1,
                status: state.secRemaining === 0 ? 'Finished' : state.status,
            }

        default:
            throw new Error('Action unkonwn')
    }
}
export default function App() {
    const [
        { answer, status, questions, index, points, highscore, secRemaining },
        dispach,
    ] = useReducer(reducer, initialState)
    const numQuestions = questions.length
    const maxPossiblePoints = questions.reduce(
        (prev, cur) => prev + cur.points,
        0
    )

    useEffect(function () {
        fetch('http://localhost:3001/questions')
            .then((res) => res.json())
            .then((data) => dispach({ type: 'dataRecived', payload: data }))
            .catch((err) => dispach({ type: 'dataFailed' }))
    }, [])
    return (
        <div className="app">
            <Header />

            <Main>
                {status === 'Loading' && <Loader />}
                {status === 'Error' && <Error />}
                {status === 'Ready' && (
                    <StartScreen
                        numQuestions={numQuestions}
                        dispach={dispach}
                    />
                )}
                {status === 'Active' && (
                    <>
                        <Progress
                            numQustions={numQuestions}
                            index={index}
                            maxPossiblePoints={maxPossiblePoints}
                            points={points}
                            answer={answer}
                        />
                        <Question
                            question={questions[index]}
                            dispach={dispach}
                            answer={answer}
                        />
                        <Footer>
                            <Timer
                                dispach={dispach}
                                secRemaining={secRemaining}
                            />
                            <NextButton
                                dispach={dispach}
                                answer={answer}
                                index={index}
                                numQuestions={numQuestions}
                            />
                        </Footer>
                    </>
                )}
                {status === 'Finished' && (
                    <FinishScreen
                        points={points}
                        maxPossiblePoints={maxPossiblePoints}
                        highscore={highscore}
                        dispach={dispach}
                    />
                )}
            </Main>
        </div>
    )
}
