import { createRef, useEffect, useRef, useState } from 'react';
// import Matter, { Vector } from 'matter-js';
import BeakerCanvas from './components/BeakerCanvas';
import GraphCanvas from './components/GraphCanvas';
import BarChartCanvas from './components/BarChartCanvas';
import './App.css';
import BeakerShape from './components/BeakerShape';
import BeakerTicks from './components/BeakerTicks';
import BeakerBottomShape from './components/BeakerBottomShape';
import PanelShape from './components/PanelShape';
import Chamber from './components/Chamber';
import { BeakerSettings } from './components/BeakerSettings';
import ConcentrationPlotView from './components/ConcentrationPlotView';
import { ReactionRateChartLayoutSettings, TimeChartLayoutSettings } from './components/ReactionRateChartLayoutSettings';
import { ReactionOrder, ReactionSettings, ReactionType } from './components/Constants';
import { ZeroOrderConcentration } from './components/ConcentrationEquation';
import EnergyProfileChart from './components/EnergyProfileChart';
import { EnergyRateChartSettings } from './components/EnergyRateChartSettings';
import { EnergyProfileChatInput } from './components/EnergyProfileChartInput';

function App() {
  const [time, setTime] = useState<number>(0);
  const [c2, setC2] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(false);
  const boxRef = createRef<HTMLDivElement>();
  const canvasRef = createRef<HTMLCanvasElement>();

  const onParticleCountUpdated = () => {
  }

  const activeGases: any = [
    // {
    //   id: 5,
    //   particleSize: 10,
    //   color: 0x0050ff,
    //   name: 'Water',
    //   symbol: <>H<sub>2</sub>O</>,
    //   svgSymbol: <>H<tspan baselineShift="sub">2</tspan>O</>,
    //   mass: 18.015280
    // },
    {
      id: 3,
      particleSize: 6,
      color: 0x00d0f0,
      name: 'Oxygen',
      symbol: <>O<sub>2</sub></>,
      svgSymbol: <>O<tspan baselineShift="sub">2</tspan></>,
      mass: 1
    },
    {
      id: 9,
      particleSize: 6,
      color: 0xff0000,
      name: 'Hydrogen',
      symbol: <>H<sub>2</sub></>,
      svgSymbol: <>H<tspan baselineShift="sub">2</tspan></>,
      mass: 1
    },
  ];
  const gasProportions: any = [15, 15];
  const isPlaying = true;
  const allowEscape = false;
  const escapeSpeed = 1500;
  const temperature = 0.1;
  const concentration = 0.4;

  const width = 300;
  const height = 300;
  const settings = new BeakerSettings(width, true);
  const concentrationA = new ZeroOrderConcentration()
  concentrationA.init4Params(0, 0.8, 10, 0.2)
  const concentrationB = new ZeroOrderConcentration()
  concentrationB.init4Params(0, 0.2, 10, 0.8)
  enum Catalyst {
    A = 1,
    B,
    C,
  } 
  return <EnergyProfileChart 
    width={250}
    height={250}
    settings={new EnergyRateChartSettings(250)}
    showTemperature={true}
    highlightTop={true}
    highlightBottom={true}
    moleculeHightlightColor='white'
    order={2}
    chartInput={new EnergyProfileChatInput(ReactionOrder.Second, 400, Catalyst.A)}
  />

  return (
    <>
      {/* <div style={{ margin: 20, position: 'relative' }}>
        <Chamber
          width={width}
          height={height}
          activeGases={activeGases}
          gasProportions={gasProportions}
          isPlaying={isPlaying}
          allowEscape={allowEscape}
          escapeSpeed={escapeSpeed}
          temperature={temperature}
          onParticleCountUpdated={onParticleCountUpdated}
        />
        <BeakerShape width={width} height={height} settings={settings} />
        <div
          style={{
            position: 'absolute',
            top: height * (1 - concentration),
            left: settings.lipRadius + 3
          }}
        >
          <BeakerBottomShape
            width={settings.innerBeakerWidth}
            height={height}
            cornerRadius={settings.outerBottomCornerRadius}
            concentration={concentration}
          />
        </div>
      </div> */}
      <div style={{ margin: 20, position: 'relative' }}>        
        <ConcentrationPlotView
          width={width}
          height={height}
          settings={
            new ReactionRateChartLayoutSettings(
              width,
              ReactionSettings.Axis.minC,
              ReactionSettings.Axis.maxC,
              ReactionSettings.Axis.minT,
              ReactionSettings.Axis.maxT,
              true,
            )
          }
          concentrationA={concentrationA}
          concentrationB={concentrationB}
          initialTime={0}
          currentTime={10}
          finalTime={10}
          canSetCurrentTime={true}
          highlightChart={false}
          highlightLhsCurve={true}
          highlightRhsCurve={false}
          display={
            {
              reactant: {
                name: ReactionType.reactantName.A,
                color: ReactionType.reactantColor.A,
              }, 
              product: {
                name: ReactionType.productName.A,
                color: ReactionType.productColor.A,
              }
            }
          }
          includeAxis={true}
        />
      </div>
      {/* <div
        ref={boxRef}
        style={{
          width: 300,
          height: 300,
          margin: '0 auto',
        }}
      >
        <canvas ref={canvasRef} />
      </div> */}
      {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 60 }}> */}
      {/* <BeakerCanvas 
          height={270} 
          width={250} 
          c2={c2} 
          c1={c2} 
          t2={3.2} 
          t1={16} 
        />
        <div style={{ position: 'relative', height: '200px', display: 'flex', flexDirection: 'row' }}>
          <input type="range" name="c2" value={c2} onChange={(e) => setC2(parseInt(e.target.value))} style={{ transform: 'rotate(270deg)', position: 'absolute', left: -113, bottom: 86, width: 200 }} />
          <input type="range" name="time" value={time} onChange={(e) => setTime(parseInt(e.target.value))} style={{ position: 'absolute', bottom: -20, left: 0, width: 200 }} />
          <GraphCanvas 
            play={play} 
            c2={0.8} 
            c1={0.5} 
            t2={3.2} 
            t1={16} 
            height={212} 
            width={212} 
          />
          <div style={{ width: '20px' }}></div>
          <BarChartCanvas 
            play={play} 
            c2={0.8} 
            c1={0.5} 
            t2={3.2} 
            t1={16} 
            height={212} 
            width={212} 
          />
        </div> */}
      {/* <BeakerShape
          lipHeight={20}
          lipWidthLeft={10}
          lipWidthRight={20}
          leftCornerRadius={80}
          rightCornerRadius={160}
          bottomGap={60}
          rightGap={50}
        />
        <BeakerTicks
          numTicks={13}
          rightGap={100}
          bottomGap={20}
          topGap={20}
          minorWidth={100}
          majorWidth={200}
        />
        <BeakerBottomShape
          cornerRadius={50}
        /> */}
      {/* <PanelShape
          tabWidth={100}
          tabHeight={130}
          cornerRadius={20}
        /> */}
      {/* </div> */}
      {/* <button onClick={() => setPlay(play => !play)}>Play</button> */}
    </>
  );
}

export default App;
