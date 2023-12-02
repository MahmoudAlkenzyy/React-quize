import { useEffect } from 'react'
import Header from './Header'
import Main from './Main'
import Error from './Error'
import Loader from './Loader'
import StartScreen from './StartScreen'
import Question from './Question'
import NextButton from './NextButton'
import Progress from './Progress'
import FinishScreen from './FinishScreen'

import Footer from './Footer'
import Timer from './Timer'
import { useQuize } from '../contexts/quizContext'

export default function App() {
    const { status } = useQuize()

    return (
        <div className="app">
            <Header />

            <Main>
                {status === 'Loading' && <Loader />}
                {status === 'Error' && <Error />}
                {status === 'Ready' && <StartScreen />}
                {status === 'Active' && (
                    <>
                        <Progress />
                        <Question />
                        <Footer>
                            <Timer />
                            <NextButton />
                        </Footer>
                    </>
                )}
                {status === 'Finished' && <FinishScreen />}
            </Main>
        </div>
    )
}
