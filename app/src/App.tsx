import './css/App.css'
import logo1 from './images/1.png'
import logo2 from './images/2.png'
import logo from './images/logo.png'

function App() {
    return (
        <>
            <div className='app'>
                <nav>
                    <img src={logo}></img>
                    <h1>exon.kr</h1>
                </nav>
                {/* <div className='logos'>
                    <img src={logo1} className='logo1'></img>
                    <img src={logo2} className='logo2'></img>
                </div> */}
                <section>
                    <h1>Hi, I'm Sihyeok Park — <br/> known as EXON</h1>
                    <p>I'm Hacker who is into Full-Stack Web, Hacking and Deeplearning.</p>
                    <p></p>
                </section>
            </div>
        </>
    )
}

export default App
