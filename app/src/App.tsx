import './css/App.css'
import logo from './images/logo.png'

function App() {
    return (
        <>
            <nav>
                <div className='center'>
                    <img src={logo}></img>
                    <h1>exon.kr</h1>
                </div>
            </nav>
            <div className='app'>
                
                {/* <div className='logos'>
                    <img src={logo1} className='logo1'></img>
                    <img src={logo2} className='logo2'></img>
                </div> */}
                <section className='top'>
                    <h1><span className='light' data-text={'Hi, I\'m Sihyeok Park —'}>Hi, I'm Sihyeok Park —</span><br/> <span className='light' data-text='known as EXON'>known as EXON</span></h1>
                    <p className='intro'>
                        I'm Hacker who is into Full-Stack Web, Hacking and Deeplearning.
                        Currently {new Date().getFullYear() - 2007 + 1}-years-old({(() => {
                        const date = new Date()
                        return ((date.getMonth()+1 === 10 && date.getDate() >= 22) ? date.getFullYear() - 2007
                            : (date.getMonth()+1 > 10) ? date.getFullYear() - 2007 : date.getFullYear() - 2007 - 1)
                        })()} in Korean age).
                        And I am a student at Korea Digital Media High School.
                    </p>
                </section>
                <section>
                    <h1>Project</h1>
                    <p>
                        I'm Hacker who is into Full-Stack Web, Hacking and Deeplearning.
                        Currently {new Date().getFullYear() - 2007 + 1}-years-old({(() => {
                        const date = new Date()
                        return ((date.getMonth()+1 === 10 && date.getDate() >= 22) ? date.getFullYear() - 2007
                            : (date.getMonth()+1 > 10) ? date.getFullYear() - 2007 : date.getFullYear() - 2007 - 1)
                        })()} in Korean age).
                    </p>
                </section>
            </div>
        </>
    )
}

export default App
