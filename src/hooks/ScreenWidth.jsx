import React from 'react'

const ScreenWidth = () => {
    let [width, Setwidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => {
            Setwidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    })
    return width;
}
    export default ScreenWidth