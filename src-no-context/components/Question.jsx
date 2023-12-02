import Options from './Options'

function Question({ question, dispach, answer }) {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} dispach={dispach} answer={answer} />
        </div>
    )
}

export default Question
