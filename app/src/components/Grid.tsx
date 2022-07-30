type propsType = {
    isDark: boolean;
}

function Grid(props: propsType, { children }: IntrinsicAttributes & propsType) {
    let sectionClass = 'light'
    if (props.isDark) sectionClass = 'dark'
    return (
        <section className={sectionClass}>
            {children}
        </section>
    )
}

export default Grid