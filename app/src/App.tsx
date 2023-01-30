import './css/App.css'

import logo from './images/logo.png'
import award from './images/medal.png'
import codefair from './images/codefair.jpg'

import discord from './images/contact/discord.svg'
import instagram from './images/contact/instagram.svg'

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
                <section className='top'>
                    <h1 className='title'>
                        <span className='light' data-text={'Hi, I\'m Sihyeok Park —'}>Hi, I'm Sihyeok Park —</span><br/>
                        <span className='light' data-text='known as EXON'>known as EXON</span>
                    </h1>
                    <p className='intro'>
                        I'm Hacker who is into Full-Stack Web, Hacking and Deeplearning.
                        Currently {(() => {
                        const date = new Date()
                        return ((date.getMonth()+1 === 10 && date.getDate() >= 22) ? date.getFullYear() - 2007
                            : (date.getMonth()+1 > 10) ? date.getFullYear() - 2007 : date.getFullYear() - 2007 - 1)
                        })()}-years-old({new Date().getFullYear() - 2007 + 1} in Korean age).
                        And I am a student at Korea Digital Media High School.
                        I enjoy breaking challenges and thinking outside the box.
                    </p>
                </section>
                <section>
                    <div className='both'>
                        <div className='left'>
                            <h1>The 4th Korea-CodeFair <sup>2022.12</sup></h1>
                            <div className='award'>
                                <img src={award} height='30px'></img>
                                <span>The 4th Korea-CodeFair Hackathon <strong>Grand Prize(1st)</strong> in Middle School Division</span>
                            </div>
                            <p>
                                I won the 4th Korea-CodeFair Hackathon Grand Prize in Middle School Division with my team "Coding Without Hand", Wonkyu Go, Seungsoo Kim.
                                We made <a href='https://github.com/codingWithoutHand/ConvenienceStoreForVisuallyImpaired' target='_blank' className='link'>project</a> that can detect items in a convenience store and speak out the name of the item for the visually impaired.
                                this project was made with Python, Pytorch, Selenium, and pure Javascript.
                            </p>
                        </div>
                        <div className='right'>
                            <img src={codefair} className='codefair'></img>
                        </div>
                    </div>
                </section>
                <section>
                    <h1>Contect <sup>You can contact me</sup></h1>
                    <p>
                        <div className='discord'>
                            <img src={discord} height='30px'></img>
                        </div>
                        <div className='instagram'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                        </div>
                    </p>
                </section>
            </div>
        </>
    )
}

export default App
