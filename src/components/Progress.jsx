import { useQuize } from '../contexts/quizContext'
import Animateion from './Animation'

function Progress() {
    const { index, numQuestions, points, maxPossiblePoints, answer } =
        useQuize()
    console.log(numQuestions)
    return (
        <>
            <Animateion />
            <header className="progress">
                <progress
                    max={numQuestions}
                    value={index + Number(answer !== null)}
                />

                <p>
                    Question <strong>{index + 1}</strong> / {numQuestions}
                </p>
                <p>
                    Points <strong>{points}</strong>/{maxPossiblePoints}
                </p>
            </header>
        </>
    )
}

export default Progress
