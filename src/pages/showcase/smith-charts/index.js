import React, { useEffect } from 'react';
import Plot from "react-plotly.js";
import CoverImage from '../../../components/cover-image';
import Layout from '../../../components/layout';
import LayoutSingleColumn from '../../../components/layout-single-column';
import { create, all } from 'mathjs'

const config = {}
const math = create(all, config)

const SmithCharts = () => {
  const startFreq = 1
  const endFreq = 1e9
  const numPts = 100
  const startRealImpedance = 0;
  const startImagImpedance = 0
  const z0 = 50
  const zl = 80
  const inductance = 6e-6
  const vp = 1e7
  const tLineLength = 1e-9

  const getFrequencyArray = (startFreq, endFreq, numPts, isLog = false) => {
    const freq = []
    const logStart = Math.log10(startFreq);
    const logEnd = Math.log10(endFreq);

    if (isLog) {
      for (let i = 0; i < numPts; i++) {
        const logValue = logStart + (i * (logEnd - logStart)) / (numPts - 1);
        freq.push(Math.pow(10, logValue));
      }
    } else {
      for (let i = 0; i < numPts; i++) {
        const value = startFreq + (i * (endFreq - startFreq)) / (numPts - 1);
        freq.push(value);
      }
    }
    return freq;
  }

  const freq = getFrequencyArray(startFreq, endFreq, numPts, true)

  const impedanceInductor = freq.map(x => math.complex(0, startImagImpedance + 2 * Math.PI * x * inductance));
  // const impedanceTransmissionLine = freq.map(x => z0 * (z0 + math.i * z0 * math.tan(2 * math.pi * x * tLineLength / vp)) / (z0 + math.i * z0 * math.tan(2 * math.pi * x * tLineLength / vp)));

  const impedanceTransmissionLine = freq.map(x => math.divide(math.multiply(z0, math.complex(zl, z0 * math.tan(2 * math.pi * x * tLineLength / vp))), math.complex(z0, zl * math.tan(2 * math.pi * x * tLineLength / vp))));

  const realNormalisedImpedanceInductor = impedanceInductor.map(x => x.re / z0);
  const imagNormalisedImpedanceInductor = impedanceInductor.map(x => x.im / z0);
  const realNormalisedImpedanceTransmissionLine = impedanceTransmissionLine.map(x => x.re / z0);
  const imagNormalisedImpedanceTransmissionLine = impedanceTransmissionLine.map(x => x.im / z0);
  console.log(impedanceTransmissionLine)
  console.log(math.i * 1)

  const traceScattersmithInductor = {
    type: 'scattersmith',
    real: realNormalisedImpedanceInductor,
    imag: imagNormalisedImpedanceInductor,
    mode: 'markers+lines',
    marker: { size: 8, color: 'blue' },
    name: 'Inductor Trace'
  };

  const traceScattersmithTransmissionLine = {
    type: 'scattersmith',
    real: realNormalisedImpedanceTransmissionLine,
    imag: imagNormalisedImpedanceTransmissionLine,
    mode: 'markers+lines',
    marker: { size: 8, color: 'red' },
    name: 'Transmission Line Trace'
  };

  const layoutScattersmith = {
    title: 'Smith Chart – Plotly Scattersmith',
    showlegend: false,
    width: 600,
    height: 600,
    // smith: {
    //   realaxis: { tickvals: [0, 0.5, 1, 2, 5, 10] },
    //   imaginaryaxis: { tickvals: [-5, -2, 2, 5] }
    // },
    title: {
      text: 'Smith chart of Impedance',
      x: 0.5, // Center the title
      xanchor: 'center'
    },
  };

  const traceCartesian = {
    type: 'scatter',
    y: imagNormalisedImpedanceInductor,
    x: realNormalisedImpedanceInductor,
    mode: 'markers+lines',
    marker: { size: 8, color: 'blue' },
    name: 'Test_trace',
  };

  const layoutCartesian = {
    title: 'Cartesian Scatter – Plotly Scatter',
    // showlegend: false,
    width: 600,
    height: 600,
    xaxis: {
      title: {
        text: 'Real Normalised Impedance',
      },
      range: [0, 1],
    },
    yaxis: {
      title: {
        text: 'Imaginary Normalised Impedance',
      },
      range: [0, 1],
    },
    title: {
      text: 'Cartesian plot of Impedance',
      x: 0.5, // Center the title
      xanchor: 'center'
    },
  };

  return (
    <Layout>
      <LayoutSingleColumn>
        <section className="mx-auto lg:w-[54rem] px-2 text-left w-full">
          <CoverImage title="Testing Plotly.js for creating Smith Charts" />
          <Plot data={[traceScattersmithInductor, traceScattersmithTransmissionLine]} layout={layoutScattersmith} config={{ responsive: true }} />
          <Plot data={[traceCartesian]} layout={layoutCartesian} config={{ responsive: true }} />
        </section>
      </LayoutSingleColumn>
    </Layout>
  );
}

export default SmithCharts;