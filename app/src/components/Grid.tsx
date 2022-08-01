type propsType = {
    isDark: boolean
    children?: any
}

function Grid(props: propsType) {
    let sectionClass = 'light'
    if (props.isDark) sectionClass = 'dark'
    return (
        <section className={sectionClass}>
            {props.children}
        </section>
    )
}

export default Grid