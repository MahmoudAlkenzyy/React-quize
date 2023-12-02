import { useReducer, useState } from 'react'

function DateCounter() {
    const intialState = { count: 0, step: 0 }
    function reducer(state, action) {
        console.log(state, action.type)

        switch (action.type) {
            case 'inc':
                return { ...state, count: state.count + state.step }
            case 'dec':
                return { ...state, count: state.count - state.step }
            case 'setCount':
                return { ...state, count: action.payload }
            case 'setStep':
                return { ...state, step: action.payload }
            case 'reset':
                return intialState
            default:
                throw new Error('Unknown action')
        }

        // if (action.type === 'inc') return state + 1
        // if (action.type === 'dec') return state - 1

        // if (action.type === 'setCount') return action.payload
    }
    // const [count, setCount] = useState(0);
    // const [step, setStep] = useState(1)

    const [state, dispach] = useReducer(reducer, intialState)
    const { step, count } = state
    // This mutates the date object.
    const date = new Date('june 21 2027')
    date.setDate(date.getDate() + count)

    const dec = function () {
        // setCount((count) => count - 1);
        // setCount((count) => count - step)
        dispach({ type: 'dec' })
    }

    const inc = function () {
        // setCount((count) => count + 1);
        // setCount((count) => count + step)
        dispach({ type: 'inc' })
    }

    const defineCount = function (e) {
        dispach({ type: 'setCount', payload: Number(e.target.value) })
        // setCount(Number(e.target.value))
    }

    const defineStep = function (e) {
        dispach({ type: 'setStep', payload: Number(e.target.value) })
        // setStep(Number(e.target.value))
    }

    const reset = function () {
        // setCount(0)
        // setStep(1)
        dispach({ type: 'reset' })
    }

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={step}
                    onChange={defineStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={count} onChange={defineCount} />
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    )
}
export default DateCounter
