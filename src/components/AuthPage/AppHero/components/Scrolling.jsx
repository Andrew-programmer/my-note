import React, {useState} from 'react';
import {useSpring, animated, config} from "react-spring";

const style = {
    animatedDivContainer: `relative w-full h-[50px] overflow-hidden text-3xl lg:text-5xl font-bold`,
    div: `w-full lg:h-[60px] h-[50px] text-center inline-block`
}

function Scrolling() {
    const [flip, set] = useState(false)

    const words = ['Fast', 'Comfort', 'Safety', 'Beauty']

    const val = window.innerWidth > 1024 ? 65: 50;


    const {scroll} = useSpring({
        scroll: (words.length - 1) * val,
        from: { scroll: 0 },
        reset: true,
        reverse: flip,
        delay: 800,
        config: config.molasses,
        onRest: () => set(!flip),
    })

    return (
        <animated.div
            // style={{
            //     position: 'relative',
            //     width: '100%',
            //     height: 50,
            //     overflow: 'hidden',
            //     fontSize: '2em',
            //     fontWeight: 'bold',
            //     color: 'white'
            // }}
            className={style.animatedDivContainer}
            scrollTop={scroll}
        >
            {words.map((word, i) => (
                <div
                    key={`${word}_${i}`}
                    className={style.div}
                >
                    {word}
                </div>
            ))}
        </animated.div>
    )
}
export default Scrolling;
