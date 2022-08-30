import './css/App.css'

import javascript from './images/javascript.png'
import python from './images/python.png'

import github from './images/github.png'

function App() {
    return (
        <div>
            <div className='container'>
                <section className='dark'>
                    <div className='content'>
                        <h1 data-text='EXON'>EXON</h1>
                        <p>안녕하세요. 박시혁입니다.</p>
                    </div>
                </section>
                <section className='light'>
                    <div className='content'>
                        <p>{new Date().getFullYear() - 2007 + 1}살({(() => {
                            const date = new Date()
                            return ((date.getMonth()+1 === 10 && date.getDate() >= 22) ? date.getFullYear() - 2007 : (date.getMonth()+1 > 10) ? date.getFullYear() - 2007 : date.getFullYear() - 2007 - 1)
                        })()}) 학생 프로그래머입니다.</p>
                        <h1>쓸데없어 보여도 쓸모 있다.</h1>
                        <p>쓸데없는 것처럼 보이지만 누군가에겐 쓸모 있는 프로그램을 개발하고 있습니다.</p>
                    </div>
                </section>
                <section className='dark'>
                    <div className='content'>
                        <div className='loader'></div>
                        <div className='center'>
                            <h1>Languages & Frameworks</h1>
                            {/* <div className='stack'>
                                <img src={javascript} height='100px'></img>
                                <img src={python} height='100px'></img>
                            </div> */}
                            <div className='float'>
                                <p>JavaScript</p>
                                <p>TypeScript</p>
                                <p>Python</p>
                                <p>C#</p>
                                <p>C</p>
                                
                                <p>React.js</p>
                                <p>PyQt5</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section  className='light'>
                    <div className='content'>
                        <h1>Contact</h1>
                        <a href='https://github.com/1-EXON'>Github</a>
                        <a href='https://discord.com/users/774607106732326922'>Discord</a>
                    </div>
                </section>
                
            </div>
        </div>
    )
}

export default App
