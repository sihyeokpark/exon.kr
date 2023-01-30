import './css/App.css'
import logo from './images/logo.png'
import award from './images/medal.png'
import codefair from './images/codefair.jpg'

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
                <section className='top'>
                    <h1 className='title'>
                        <span className='light' data-text={'Hi, I\'m Sihyeok Park —'}>Hi, I'm Sihyeok Park —</span><br/>
                        <span className='light' data-text='known as EXON'>known as EXON</span>
                    </h1>
                    <p className='intro'>
                        I'm Hacker who is into Full-Stack Web, Hacking and Deeplearning.
                        Currently {new Date().getFullYear() - 2007 + 1}-years-old({(() => {
                        const date = new Date()
                        return ((date.getMonth()+1 === 10 && date.getDate() >= 22) ? date.getFullYear() - 2007
                            : (date.getMonth()+1 > 10) ? date.getFullYear() - 2007 : date.getFullYear() - 2007 - 1)
                        })()} in Korean age).
                        And I am a student at Korea Digital Media High School.
                        I enjoy breaking challenges and thinking outside the box.
                    </p>
                </section>
                <section>
                    <div className='both'>
                        <div className='left'>
                            <h1>The 4th Korea-CodeFair <sup>2022.12</sup></h1>
                            <div className='award'>
                                <img src={award} height='30px'></img>
                                <span>The 4th Korea-CodeFair Hackathon <strong>Grand Prize(1st)</strong> in Middle School Division</span>
                            </div>
                            <p>
                                I won the 4th Korea-CodeFair Hackathon Grand Prize in Middle School Division with my team "Coding Without Hand", Wonkyu Go, Seungsoo Kim.
                                We made project that can detect items in a convenience store and speak out the name of the item for the visually impaired.
                                this project was made with Python, Tensorflow, and pure Javascript.
                            </p>
                        </div>
                        <div className='right'>
                            <img src={codefair} className='codefair'></img>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default App
