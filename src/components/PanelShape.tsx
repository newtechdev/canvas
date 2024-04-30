import React from 'react';

type PanelShapeProps = {
    height?: string | number | undefined,
    width?: string | number | undefined,
    tabWidth: number,
    tabHeight: number,
    cornerRadius: number,
}

const PanelShape = (props: PanelShapeProps) => {
    const { 
        height = 400, 
        width = 400, 
        tabWidth, 
        tabHeight, 
        cornerRadius,
    } = props;
    const canvas = React.useRef<HTMLCanvasElement>(null);
    React.useEffect(() => {
        const ctx = canvas?.current?.getContext('2d');
        if (ctx) {
            const { height: rectHeight, width: rectWidth} = ctx.canvas;

            let panelWidth = rectWidth - tabWidth;
            let panelHeight = rectHeight - tabHeight;
            let _tabHeight = rectHeight - panelHeight;

            ctx.moveTo(0, 0);
            ctx.lineTo(
                0,
                rectHeight,
            );
            ctx.lineTo(
                panelWidth - cornerRadius,
                rectHeight,
            );

            // Bottom right
            ctx.quadraticCurveTo(
                panelWidth,
                rectHeight,
                panelWidth,
                rectHeight - cornerRadius,
            );

            ctx.lineTo(
                panelWidth,
                _tabHeight + cornerRadius,
            );

            // Tab left corner
            ctx.quadraticCurveTo(
                panelWidth,
                _tabHeight,
                panelWidth + cornerRadius,
                _tabHeight,
            );

            ctx.lineTo(
                rectWidth - cornerRadius,
                _tabHeight,
            );

            // Tab right corner
            ctx.quadraticCurveTo(                
                rectWidth,
                _tabHeight,
                rectWidth,
                _tabHeight - cornerRadius,
            )

            ctx.lineTo(
                rectWidth, 
                0,
            );
            ctx.lineTo(0, 0);
            ctx.shadowColor = "gray";
            ctx.shadowBlur = 15;
            ctx.lineWidth = 0.2
            ctx.stroke();
        }
    })
    return (
        <canvas ref={canvas} height={height} width={width} />
    );
};
export default PanelShape;