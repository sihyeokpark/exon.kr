import Grid from './components/Grid'
import Navi from './components/Navi'

import './css/App.css'

function App() {
    return (
        <div>
            <Grid isDark={false}>
                <Navi></Navi>
                <main>
                    <div className='part'>
                        <p>세상을 바꿉니다.</p>
                        <h1 className='title'>EXON</h1>
                    </div>
                    
                </main>
            </Grid>
            <Grid isDark={true}></Grid>
        </div>
    )
}

export default App
