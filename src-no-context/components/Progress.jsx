import Animateion from './Animation'

function Progress({ index, numQustions, points, maxPossiblePoints, answer }) {
    return (
        <>
            <Animateion />
            <header className="progress">
                <progress
                    max={numQustions}
                    value={index + Number(answer !== null)}
                />

                <p>
                    Question <strong>{index + 1}</strong> / {numQustions}
                </p>
                <p>
                    Points <strong>{points}</strong>/{maxPossiblePoints}
                </p>
            </header>
        </>
    )
}

export default Progress
