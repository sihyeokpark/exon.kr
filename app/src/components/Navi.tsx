import logo from '../images/logo.png'
import github from '../images/github.png'

import '../css/Navi.css'

function Navi() {
    return (
        <nav>
            <div className='left'>
                <img src={logo} alt='logo' className='logo' height='50vh'/>
            </div>
            <div className='right'>
                <img src={github} alt='github' className='github' height='30vh'/>
            </div>
        </nav>
    )
}

export default Navi