import Grid from './components/Grid'

import './css/App.css'

function App() {
    return (
        <div>
            <Grid isDark={true}></Grid>
            <Grid isDark={false}></Grid>
        </div>
    )
}

export default App
