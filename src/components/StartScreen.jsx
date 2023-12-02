import { useQuize } from '../contexts/quizContext'

function StartScreen() {
    const { numQuestions, dispach } = useQuize()
    return (
        <div className="start">
            <h2>Welcome To The React Quize! </h2>
            <h3>{numQuestions} questions to test your React mastry</h3>
            <button
                className="btn btn-ui"
                onClick={() => dispach({ type: 'start' })}
            >
                Let's start
            </button>
        </div>
    )
}

export default StartScreen
