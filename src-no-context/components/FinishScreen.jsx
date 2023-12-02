import Lottie from './Lottie'

function FinishScreen({ points, maxPossiblePoints, highscore, dispach }) {
    const percentage = (points / maxPossiblePoints) * 100
    let emoji
    if (percentage === 100) {
        emoji = (
            <Lottie src="https://lottie.host/6047cf3e-3367-4c12-bf6a-3d6129f1e0b7/wopB3TEsQs.json" />
        )
    }
    if (percentage >= 80 && percentage < 100) {
        emoji = (
            <Lottie
                src="https://lottie.host/f4b8e48d-b772-4a26-83b8-e915f9c2ccc2/XZOl7ME5J0.json"
                margin="-20px 0 0px -20px"
            />
        )
    }
    if (percentage >= 50 && percentage < 80) {
        emoji = (
            <Lottie src="https://lottie.host/4fb3efae-a8c3-4c4a-a3c6-9e92518b887c/MWBeDPj7CV.json" />
        )
    }
    if (percentage > 0 && percentage < 50) {
        emoji = (
            <Lottie src="https://lottie.host/34e3e02d-0c31-45d0-921e-10b5858846fa/fRjFX0q1aA.json" />
        )
    }
    if (percentage === 0) {
        emoji = (
            <Lottie
                src="https://lottie.host/6c084a4e-436a-4688-af9a-ba058c1c81fa/elQxFxcMpG.json"
                width="70"
                height="70"
            />
        )
    }
    return (
        <>
            <p className="result">
                <span>{emoji}</span> You scored
                <strong> {points} </strong> out of {maxPossiblePoints} (
                {Math.ceil(percentage)}%)
            </p>
            <p className="highscore"> (Highscore : {highscore} point)</p>
            <button
                className="btn btn-ui"
                onClick={() => {
                    dispach({ type: 'Restart' })
                }}
            >
                Restart Quiz
            </button>
        </>
    )
}

export default FinishScreen
