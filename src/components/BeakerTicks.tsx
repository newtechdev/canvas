import React from 'react';

type BeakerTicksProps = {
    height?: string | number | undefined,
    width?: string | number | undefined,
    numTicks: number,
    rightGap: number,
    bottomGap: number,
    topGap: number,
    minorWidth: number,
    majorWidth: number,
}

type Rect = {
    width: number,
    height: number
}

const BeakerTicks = (props: BeakerTicksProps) => {
    const { 
        height = 400, 
        width = 400, 
        numTicks, 
        rightGap, 
        bottomGap, 
        topGap, 
        minorWidth, 
        majorWidth,
    } = props;
    const canvas = React.useRef<HTMLCanvasElement>(null);
    React.useEffect(() => {
        const ctx = canvas?.current?.getContext('2d');
        if (ctx) {
            const { height: rectHeight, width: rectWidth} = ctx.canvas;
            const rect: Rect = {
                width: rectWidth,
                height: rectHeight
            }

            let dy = (rect.height - topGap - bottomGap) / (numTicks - 1)
            let rightX = rect.width - rightGap;
            for (let i = 0; i < numTicks; i++) {
                let width = (i + 1) % 5 == 0 ? majorWidth : minorWidth;
                let y = rect.height - bottomGap - (dy * i);
                ctx.moveTo(rightX, y);
                ctx.lineTo(rightX - width, y);
            }

            ctx.stroke();
        }
    })
    return (
        <canvas ref={canvas} height={height} width={width} />
    );
};
export default BeakerTicks;