import './css/App.css'
import logo1 from './images/1.png'
import logo2 from './images/2.png'

function App() {
    return (
        <div className='app'>
            <nav>
                <h1>EXON</h1>
            </nav>
            <div className='logos'>
                <img src={logo1} className='logo1'></img>
                <img src={logo2} className='logo2'></img>
            </div>
            <section>
                <h1>Hello, I am Sihyeok Park</h1>
            </section>
            
        </div>
    )
}

export default App
