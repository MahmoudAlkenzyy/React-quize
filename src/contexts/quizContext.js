import { createContext, useContext, useEffect, useReducer } from 'react';
const initialState = {
    questions: [],
    status: 'Loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secRemaining: 10,
};
const Secs_per_question = 30;

const quizContixt = createContext();
function reducer(state, action) {
    switch (action.type) {
        case 'dataRecived':
            return { ...state, status: 'Ready', questions: action.payload };
        case 'dataFailed':
            return { ...state, status: 'Error' };
        case 'start':
            return {
                ...state,
                status: 'Active',
                secRemaining: state.questions.length * Secs_per_question,
            };
        case 'newAnswer':
            const question = state.questions.at(state.index);
            return {
                ...state,
                answer: action.payload,
                points:
                    question.correctOption === action.payload
                        ? state.points + question.points
                        : state.points,
            };
        case 'next':
            return { ...state, index: state.index++, answer: null };
        case 'finisheQuiz':
            return {
                ...state,
                status: 'Finished',
                highscore:
                    state.highscore > state.points
                        ? state.highscore
                        : state.points,
            };
        case 'Restart':
            return {
                ...initialState,
                status: 'Ready',
                questions: state.questions,
            };
        case 'Tick':
            return {
                ...state,
                secRemaining: state.secRemaining - 1,
                status: state.secRemaining === 0 ? 'Finished' : state.status,
            };

        default:
            throw new Error('Action unkonwn');
    }
}
function QuizProvider({ children }) {
    const [
        { answer, status, questions, index, points, highscore, secRemaining },
        dispach,
    ] = useReducer(reducer, initialState);
    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce(
        (prev, cur) => prev + cur.points,
        0
    );

    useEffect(function () {
        fetch('http://localhost:5001')
            .then((res) => res.json())
            .then((data) =>
                dispach({ type: 'dataRecived', payload: data.questions })
            )
            .catch((err) => dispach({ type: 'dataFailed' }));
    }, []);
    return (
        <quizContixt.Provider
            value={{
                questions,
                status,
                index,
                answer,
                points,
                highscore,
                secRemaining,
                numQuestions,
                maxPossiblePoints,
                dispach,
            }}
        >
            {children}
        </quizContixt.Provider>
    );
}

function useQuize() {
    const context = useContext(quizContixt);
    if (context === undefined)
        throw new Error('useQuize is used out of quizProvider');

    return context;
}
export { useQuize, QuizProvider };
