import { useEffect } from 'react'
import { useQuize } from '../contexts/quizContext'

function Timer() {
    const { dispach, secRemaining } = useQuize()

    const mins = Math.floor(secRemaining / 60)
    const secs = secRemaining % 60
    useEffect(
        function () {
            const id = setInterval(function () {
                dispach({ type: 'Tick' })
            }, 1000)
            return () => clearInterval(id)
        },
        [dispach]
    )
    return (
        <div className=" timer">
            {mins < 10 ? '0' : ''}
            {mins}:{secs < 10 ? '0' : ''}
            {secs}
        </div>
    )
}

export default Timer
