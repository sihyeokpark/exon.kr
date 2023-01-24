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
                <section>
                    <h1>Hi, I'm Sihyeok Park — <br/> known as EXON</h1>
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
