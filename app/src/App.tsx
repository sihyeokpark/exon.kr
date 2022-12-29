import './css/App.css'

function App() {
    return (
        <div>
            <div className='container'>
                <section>
                    <p className='name'>SIHYEOK PARK</p>
                    <h1 className='title'>Best Code for Better Life</h1>
                    <p>박시혁</p>
                </section>
                <section className='contents'>
                    <p className='name'>교육/상</p>
                    <h1 className='title'>Education / Awards</h1>
                    <li>(2020~2022) 중앙기독중학교 14기</li>
                    <li>(2022.12.28) 제 4회 한국코드페어 해커톤 중등부 <strong>대상(1등)</strong></li>
                    <li>(2023~) 한국디지털미디어고등학교 <strong>해킹방어과 22기</strong></li>
                </section>
                <section className='contents'>
                    <p className='name'>프로젝트</p>
                    <h1 className='title'>Projects</h1>
                    <li>(2022) 얼굴인식을 이용한 학생 출석 관리 프로그램</li>
                </section>
            </div>
        </div>
    )
}

export default App
