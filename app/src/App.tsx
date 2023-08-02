import { useState } from 'react'
import { motion } from 'framer-motion'

import './css/App.css'

import logo from './images/logo.png'
import award from './images/medal.png'
import brace1 from './images/brace1.png'
import brace2 from './images/brace2.png'
import cce from './images/project/cce.png'
import luna from './images/project/luna.png'
import goorm from './images/project/goorm.jpg'
import dimi6 from './images/project/dimi6.png'
import genetic from './images/project/genetic.gif'
import tistory from './images/contact/tistory.svg'
import codefair from './images/project/codefair.jpg'
import autoattendence from './images/project/autoattendence.jpg'

function App() {
    const [moreSection, setMoreSection] = useState(false)

    const sectionVariants = {
        initial: { opacity: 0, scale: 0.5 },
        animate: { opacity: 1, scale: 1 },
        transition: {
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01]
        }
    }

    function moreSectionClick() {
        setMoreSection(true)
        window.scrollTo({top: 0, behavior: 'smooth' })
    }

    function goGithub() {
        window.open('https://github.com/sihyeokpark', '_blank')
    }

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
                        I'm {(() => {
                        const date = new Date()
                        return ((date.getMonth()+1 === 10 && date.getDate() >= 22) ? date.getFullYear() - 2007
                            : (date.getMonth()+1 > 10) ? date.getFullYear() - 2007 : date.getFullYear() - 2007 - 1)
                        })()} yo({new Date().getFullYear() - 2007 + 1} in Korean age) developer from South Korea.
                        And I am a junior at Korea Digital Media High School.
                        I enjoy breaking challenges and thinking outside the box. 
                    </p>
                    {moreSection &&
                        <p className='white'>
                            Also interested in Full-Stack Web, Hacking and Machine Learning.
                            Among them, my favorite field is Web Development.
                        </p>
                    }
                    
                </section>
                <motion.section
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: [0, 0.71, 0.2, 1.01]
                    }}>
                    <div className='both'>
                        <div className='left'>
                            <h1>Dimi6 <sup>2023.04~</sup></h1>
                            <p>
                                <a href='https://github.com/sihyeokpark/dimi6' target='_blank'>Dimi6</a> is point system for Korea Digital Media High School first grader of class 6.
                                It is a system that provides points to the students that follow the rules in the class, and was developed through Typescript, Next 13, and MySQL.
                                It has convenient functions necessary for school life, such as an exchange where you can purchase ice cream coupons using points, bulletin boards that announce information in the class, meals, and timetables.
                            </p>
                        </div>
                        <div className='right'>
                            <img src={dimi6} alt='dimi6' className='goorm'></img>
                        </div>
                    </div>
                </motion.section>
                { moreSection &&
                    <motion.section
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease: [0, 0.71, 0.2, 1.01]
                        }}>
                        <div className='both'>
                            <div className='left'>
                                <h1>2023 CCE <sup>2023.06.10</sup></h1>
                                <p>
                                    I participated in the <a href='https://cce.cstec.kr/' target='_blank'>Cyber Conflict Exercise 2023</a> Junior Division and finished 11st with my team "If we win first place, we drop out", <a href='https://github.com/hyjun0407'>Seungchan Kim</a><sup>KDMHS 22HD</sup>, Jaeyoung Yoon<sup>KDMHS 22HD</sup>, Dohyun Lee.
                                    We solved five problems, two in the field of web, two of which were in the field of misc, and one in the field of cryptography.
                                </p>
                            </div>
                            <div className='right'>
                                <img src={cce} alt='When I was making this project.' className='goorm'></img>
                            </div>
                        </div>
                    </motion.section>
                }
                <motion.section
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: [0, 0.71, 0.2, 1.01]
                    }}>
                    <div className='both'>
                        <div className='left'>
                            <h1>LUNA <sup>2023.03~</sup></h1>
                            <p>
                                I am developer of <a href='https://luna.codes' target='_blank'>LUNA</a> 6th.<br></br>
                                LUNA is a IT social venture society of Korea Digital Media High School that tries to solve social various problems with IT and create where everyone can live together.
                            </p>
                        </div>
                        <div className='right'>
                            <img src={luna} alt='When I was making this project.' className='goorm'></img>
                        </div>
                    </div>
                </motion.section>
                <motion.section
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: [0, 0.71, 0.2, 1.01]
                    }}>
                    <div className='both'>
                        <div className='left'>
                            <h1>Goorm High School<br></br> Algorithm Camp <sup>2023.02</sup></h1>
                            <div className='award'>
                                <img src={award} height='30px'></img>
                                <span>The Goorm High School Algorithm Team Challenge <strong>Grand Prize(1st)</strong> in Gyeonggi-Do Division</span>
                            </div>
                            <p>
                                I won the <a href='https://exon001.tistory.com/5' target='_blank'>Goorm High School Algorithm Team Challenge</a> Grand Prize in Gyeonggi-Do Division with my team "Coding With Hand", Boseok Son<sup>GBSWHS 3SD</sup>, Minseo Kim<sup>KDMHS 22WP</sup>, Suyun Kim.
                                We listened to a lecture about DFS, BFS algorithm and participated in a contest.
                            </p>
                        </div>
                        <div className='right'>
                            <img src={goorm} alt='When I was making this project.' className='goorm'></img>
                        </div>
                    </div>
                </motion.section>
                <motion.section
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: [0, 0.71, 0.2, 1.01]
                    }}>
                    <div className='both'>
                        <div className='left'>
                            <h1>The 4th Korea-CodeFair <sup>2022.12</sup></h1>
                            <div className='award'>
                                <img src={award} height='30px'></img>
                                <span>The 4th Korea-CodeFair Hackathon <strong>Grand Prize(1st)</strong> in Middle School Division</span>
                            </div>
                            <p>
                                I won the 4th Korea-CodeFair Hackathon Grand Prize in Middle School Division with my team "Coding Without Hand", Wongyu Koh, Seungsoo Kim.
                                We made <a href='https://github.com/codingWithoutHand/ConvenienceStoreForVisuallyImpaired' target='_blank'>project</a> that can detect items in a convenience store and speak out the name of the item for the visually impaired.
                                this project was made with Python, Pytorch, Selenium, and pure Javascript.
                            </p>
                        </div>
                        <div className='right'>
                            <img src={codefair} alt='When I attended Codefair.' className='codefair'></img>
                        </div>
                    </div>
                </motion.section>
                <motion.section
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: [0, 0.71, 0.2, 1.01]
                    }}>
                    <div className='both'>
                        <div className='left'>
                            <h1>Auto Attendance Check <sup>2022.10</sup></h1>
                            <p>
                                I made <a href='https://github.com/EXON-Archive-Junior-High/AutoAttendance' target='_blank'>Auto Attendance Check Project</a> with PyQt and Java.
                                It is made for my school.
                                The feature of this project is that it can automatically check attendance through face recognition and exchange a message to the teacher.
                                Also have sceduler for the student that is managed by teacher.
                                It supports Windows, Android.
                            </p>
                            <p>
                                
                            </p>
                        </div>
                        <div className='right'>
                            <img src={autoattendence} alt='When I was making this project.' className='autoattendence'></img>
                        </div>
                    </div>
                </motion.section>
                {!moreSection && 
                    <section className='new'>
                        <button onClick={moreSectionClick}><span><img src={brace1} height='20px'></img></span>If you want to know me more?<span><img src={brace2} height='20px'></img></span></button>
                    </section>
                }
                {moreSection &&
                    <motion.section
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: [0, 0.71, 0.2, 1.01]
                    }}>
                        <div className='both'>
                            <div className='left'>
                                <h1>Genetic Algorithm <sup>2022.07</sup></h1>
                                <p>
                                    I implemented <a href='https://github.com/EXON-Archive-Junior-High/GeneticAlgorithm' target='_blank'>Genetic Algorithm</a> with Pure Javascript.
                                    It is for my school performance evaluation.
                                    Watched <a href='https://www.youtube.com/watch?v=Yr_nRnqeDp0' target='_blank'>this video</a> and I wanted to really learn it.
                                    So I knew that it is used in Machine Learning, it was departure point for Machine Learning to me.
                                </p>
                                <p>
                                    
                                </p>
                            </div>
                            <div className='right'>
                                <img src={genetic} alt='When I was making this project.' className='autoattendence'></img>
                            </div>
                        </div>
                    </motion.section>
                }
                {moreSection && 
                    <section className='new'>
                        <button onClick={goGithub}><span><img src={brace1} height='20px'></img></span>See my other projects<span><img src={brace2} height='20px'></img></span></button>
                    </section>
                }
                <motion.section
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: [0, 0.71, 0.2, 1.01]
                    }}>
                    <h1>Contact <sup>You can contact me</sup></h1>
                    <div className='contactList'>
                        <a className='link' href='mailto:exon.indiv@gmail.com' target='_blank'>
                            <div className='contact'>
                                <div className='plat email'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17.834 6.166a8.25 8.25 0 100 11.668.75.75 0 011.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0121.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 11-.82-6.26V8.25a.75.75 0 011.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 00-2.416-5.834zM15.75 12a3.75 3.75 0 10-7.5 0 3.75 3.75 0 007.5 0z"></path></svg>
                                </div>
                                <div className='user'>
                                    <span className='platform'>E-mail</span>
                                    <span>exon.indiv@gmail.com</span>
                                </div>
                            </div>
                        </a>
                        <a className='link' href='https://github.com/sihyeokpark' target='_blank'>
                            <div className='contact'>
                                <div className='plat github'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
                                </div>
                                <div className='user'>
                                    <span className='platform'>Github</span>
                                    <span>sihyeokpark</span>
                                </div>
                            </div>
                        </a>
                        <a className='link' href='https://www.instagram.com/exon001/' target='_blank'>
                            <div className='contact'>
                                <div className='plat instagram'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                                </div>
                                <div className='user'>
                                    <span className='platform'>Instagram</span>
                                    <span>exon001</span>
                                </div>
                            </div>
                        </a>
                        <a className='link' href='https://discord.com/users/774607106732326922' target='_blank'>
                            <div className='contact'>
                                <div className='plat discord'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path></svg>
                                </div>
                                <div className='user'>
                                    <span className='platform'>Discord</span>
                                    <span>EXON#3160</span>
                                </div>
                            </div>
                        </a>
                        <a className='link' href='https://exon001.tistory.com/' target='_blank'>
                            <div className='contact'>
                                <div className='plat tistory'>
                                    <img src={tistory} height="30px"></img>
                                </div>
                                <div className='user'>
                                    <span className='platform'>Tistory</span>
                                    <span>exon001</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </motion.section>
            </div>
        </>
    )
}

export default App
