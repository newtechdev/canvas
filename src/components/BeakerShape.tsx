import React from 'react';
import { BeakerSettings } from './BeakerSettings';

type BeakerShapeProps = {
    height: string | number | undefined,
    width: string | number | undefined,
    settings: BeakerSettings
}

const BeakerShape = (props: BeakerShapeProps) => {
    const {
        height,
        width,
        settings,
    } = props;
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const drawBeaker = (
        ctx: CanvasRenderingContext2D,
        lipHeight: number,
        lipWidthLeft: number,
        lipWidthRight: number,
        leftCornerRadius: number,
        rightCornerRadius: number,
        bottomGap: number,
        rightGap: number,
        fillColor: string,
    ) => {
        const { height: rectHeight, width: rectWidth } = ctx.canvas;
        const rect = {
            width: rectWidth,
            height: rectHeight
        }
        ctx.beginPath();

        // Left lip curve
        ctx.arc(
            lipHeight + 1,
            lipHeight + 1,
            lipHeight - 1,
            270 * (Math.PI / 180),
            90 * (Math.PI / 180),
            true,
        );

        // Left lip
        ctx.lineTo(
            lipHeight + lipWidthLeft,
            lipHeight * 2,
        );

        // Left edge
        ctx.lineTo(
            lipHeight + lipWidthLeft,
            rect.height - leftCornerRadius - bottomGap,
        );

        // Bottom left curve
        ctx.quadraticCurveTo(
            lipHeight + lipWidthLeft,
            rect.height - bottomGap,
            lipHeight + lipWidthLeft + leftCornerRadius,
            rect.height - bottomGap,
        );

        // Bottom edge
        ctx.lineTo(
            rect.width - lipHeight - lipWidthRight - rightCornerRadius - rightGap,
            rect.height - bottomGap,
        );

        // Bottom right curve
        ctx.quadraticCurveTo(
            rect.width - lipHeight - lipWidthRight - rightGap,
            rect.height - bottomGap,
            rect.width - lipHeight - lipWidthRight - rightGap,
            rect.height - rightCornerRadius - bottomGap,
        );

        // Right edge
        ctx.lineTo(
            rect.width - lipHeight - lipWidthRight - rightGap,
            lipHeight * 2,
        );

        // Right lip
        ctx.lineTo(
            rect.width - lipHeight - rightGap,
            lipHeight * 2,
        );

        // Right lip curve
        ctx.arc(
            rect.width - lipHeight - rightGap,
            lipHeight + 1,
            lipHeight - 1,
            90 * (Math.PI / 180),
            270 * (Math.PI / 180),
            true,
        );

        ctx.closePath();
        if (fillColor === 'black') {
            ctx.lineWidth = 3;
            ctx.stroke();
        } else {
            ctx.fillStyle = fillColor;
            ctx.fill();
        }
    }

    const drawBeakerTicks = (
        ctx: CanvasRenderingContext2D,
        numTicks: number,
        rightGap: number,
        bottomGap: number,
        topGap: number,
        minorWidth: number,
        majorWidth: number,
    ) => {
        const { height: rectHeight, width: rectWidth } = ctx.canvas;
        const rect = {
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

        ctx.lineWidth = 1;
        ctx.stroke();
    }

    React.useEffect(() => {
        const ctx = canvas?.current?.getContext('2d');
        if (ctx) {
            console.log({ settings })
            drawBeaker(
                ctx,
                settings.lipRadius,
                settings.lipWidthLeft,
                settings.lipWidthLeft,
                settings.outerBottomCornerRadius,
                settings.outerBottomCornerRadius,
                0,
                0,
                'rgb(217,217,217)',
            );

            drawBeaker(
                ctx,
                settings.lipRadius,
                settings.lipWidthLeft,
                settings.mediumBeakerRightLipWidth,
                settings.innerLeftBottomCornerRadius,
                settings.mediumBeakerRightCornerRadius,
                settings.innerBeakersBottomGap,
                settings.mediumBeakerRightGap,
                'rgb(236,236,236)',
            );

            drawBeaker(
                ctx,
                settings.lipRadius,
                settings.lipWidthLeft,
                settings.smallBeakerRightLipWidth,
                settings.innerLeftBottomCornerRadius,
                settings.smallBeakerRightCornerRadius,
                settings.innerBeakersBottomGap,
                settings.smallBeakerRightGap,
                'white',
            );

            drawBeaker(
                ctx,
                settings.lipRadius,
                settings.lipWidthLeft,
                settings.lipWidthLeft,
                settings.outerBottomCornerRadius,
                settings.outerBottomCornerRadius,
                0,
                0,
                'black',
            );

            drawBeakerTicks(
                ctx,
                settings.numTicks,
                settings.ticksRightGap,
                settings.ticksBottomGap,
                settings.ticksTopGap,
                settings.ticksMinorWidth,
                settings.ticksMajorWidth,
            );
        }
    })
    return (
        <canvas ref={canvas} height={height} width={width} />
    );
};
export default BeakerShape;