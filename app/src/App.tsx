import './css/App.css'

function App() {
    return (
        <div>
            <div className='container'>
                <section>
                    <p className='name'>SIHYEOK PARK</p>
                    <h1 className='title'>Best Code for Better Life</h1>
                    <p className='name'>박시혁</p>
                </section>
                <section className='contents'>
                    <p className='name'>교육/상</p>
                    <h1 className='title'>Education / Awards</h1>
                    <li>중앙기독중학교 14기 <sup>2020~2022</sup>
                        <li>학생자치회 미디어부장 <sup>2022</sup></li>
                    </li>
                    <li>제 4회 한국코드페어 해커톤 중등부 <strong>대상(1등)</strong> <sup>2022.12.28</sup>
                        <li><strong>손안대고코딩풀기(박시혁, 고원규, 김승수) 팀</strong> 출전</li>
                    </li>
                    <li>한국디지털미디어고등학교 <strong>해킹방어과 22기</strong> <sup>2023~</sup></li>
                </section>
                <section className='contents'>
                    <p className='name'>프로젝트</p>
                    <h1 className='title'>Projects</h1>
                    <li>얼굴인식을 이용한 학생 출석 관리 프로그램 <sup>2022.3~2022.10</sup></li>
                </section>
            </div>
        </div>
    )
}

export default App
