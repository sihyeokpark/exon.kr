import Grid from './components/Grid'
import Navi from './components/Navi'

import './css/App.css'

function App() {
    return (
        <div>
            <Grid isDark={false}>
                <Navi></Navi>
                <main>
                    <h1 className='title'>EXON</h1>
                </main>
            </Grid>
            <Grid isDark={true}></Grid>
        </div>
    )
}

export default App
