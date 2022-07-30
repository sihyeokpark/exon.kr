type propsType = {
    isDark: boolean;
}

function Grid(props: propsType) {
    let sectionClass = 'light'
    if (props.isDark) sectionClass = 'dark'
    return (
        <section className={sectionClass}>
            <h1>ㅎㅇ</h1>
            <h1>ㅎㅇ</h1>
            <h1>ㅎㅇ</h1>
            <h1>ㅎㅇ</h1>
            <h1>ㅎㅇ</h1>
            <h1>ㅎㅇ</h1>
        </section>
    )
}

export default Grid