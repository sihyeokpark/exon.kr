import Grid from './components/Grid'
import Navi from './components/Navi'

import './css/App.css'

function App() {
    return (
        <div>
            <Grid isDark={false}>
                <Navi></Navi>
            </Grid>
            <Grid isDark={true}></Grid>
        </div>
    )
}

export default App
