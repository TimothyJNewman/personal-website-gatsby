import React, { useEffect, useState } from 'react';
// import Plot from "react-plotly.js";
import CoverImage from '../../../components/cover-image';
import Layout from '../../../components/layout';
import LayoutSingleColumn from '../../../components/layout-single-column';
import { create, all, norm } from 'mathjs'
import { MDXProvider } from '@mdx-js/react';

const config = {}
const math = create(all, config)

const seo = {
  title: 'Plotly.js Smith Charts',
  isArticle: false,
  summary: "This article covers an attempt to test the plotly.js javascript library for the plotting smith charts.",
  keywords: "Radio-frequency, RF, smith chart"
};

// Using plotly only on the client side
// Based on https://www.gatsbyjs.com/docs/using-client-side-only-packages/
const PlotLazy = React.lazy(() =>
  import("react-plotly.js")
)

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

// Start of list of impedance modelling fns
const impedanceIdealInductor = (freq, miscArgs) => {
  // Todo add check to make sure miscArg exists
  const inductance = miscArgs.inductance
  return math.complex(0, 2 * math.pi * freq * inductance);
}

const impedanceIdealCapacitor = (freq, miscArgs) => {
  // Todo add check to make sure miscArg exists
  const capacitance = miscArgs.capacitance
  return math.complex(0, -1 / (2 * math.pi * freq * capacitance));
}

const impedanceSeriesRLC = (freq, miscArgs) => {
  // Todo add check to make sure miscArg exists
  const {resistance, capacitance, inductance} = miscArgs
  return math.add(math.complex(0, 2 * math.pi * freq * inductance), math.complex(0, -1 / (2 * math.pi * freq * capacitance)), resistance);
}

const impedanceTransLine = (freq, miscArgs) => {
  // Todo add check to make sure miscArg exists
  const { vp, z0, zl, tLineLength } = miscArgs
  return math.multiply(z0,
    math.divide(
      math.add(zl, math.multiply(z0, math.tan(2 * math.pi * freq * tLineLength / vp), math.i)),
      math.add(z0, math.multiply(zl, math.tan(2 * math.pi * freq * tLineLength / vp), math.i))
    ))
  // return math.complex(0, 2 * math.pi * freq * inductance);
}
// End of list of impedance modelling fns

const getImpedance = (impedanceFunctionAndArgs, normaliseImpedance = 1) => {
  const returnImpedance = []
  impedanceFunctionAndArgs.forEach(({ impedanceFunction, miscArgs, freq }) => {
    const realArray = [];
    const imagArray = [];
    freq.forEach(freq_n => {
      const { re: real, im: imag } = impedanceFunction(freq_n, miscArgs)
      realArray.push(real / normaliseImpedance)
      imagArray.push(imag / normaliseImpedance)
    })
    returnImpedance.push({
      realArray: realArray,
      imagArray: imagArray
    })
  });
  return returnImpedance
}

const SmithCharts = () => {
  const isSSR = typeof window === "undefined"

  const startFreq = 10
  const endFreq = 2e8
  const numPts = 100
  const z0 = 50

  const freq = getFrequencyArray(startFreq, endFreq, numPts, true)

  const impedanceFunctionAndArgs = [
    {
      impedanceFunction: impedanceIdealInductor,
      miscArgs: { inductance: 1e-6 },
      freq: getFrequencyArray(startFreq, endFreq, numPts, true)
    },
    {
      impedanceFunction: impedanceTransLine,
      miscArgs: { vp: 1e7, z0: 50, zl: math.complex(80, 100), tLineLength: 1e-2 },
      freq: getFrequencyArray(startFreq, endFreq, 20, false)
    },
    {
      impedanceFunction: impedanceIdealCapacitor,
      miscArgs: { capacitance: 1e-10 },
      freq: getFrequencyArray(startFreq, endFreq, numPts, true)
    },
    {
      impedanceFunction: impedanceSeriesRLC,
      miscArgs: { capacitance: 1e-10, inductance: 1e-6, resistance: 10 },
      freq: getFrequencyArray(startFreq, endFreq, 200, false)
    },
  ]
  const impedanceRealAndImag = getImpedance(impedanceFunctionAndArgs, z0)
  console.log(impedanceRealAndImag)

  const traceScattersmithInductor = {
    type: 'scattersmith',
    real: impedanceRealAndImag[0].realArray,
    imag: impedanceRealAndImag[0].imagArray,
    text: freq,
    hovertemplate: '<b>Real:</b> %{real:.3e}<br>' + '<b>Imag:</b> %{imag:.3e}<br>' + '<b>Freq</b>: %{text:.2e}',
    mode: 'markers+lines',
    marker: { size: 8, color: 'blue' },
    name: 'Inductor Trace'
  };

  const traceScattersmithTransLine = {
    type: 'scattersmith',
    real: impedanceRealAndImag[1].realArray,
    imag: impedanceRealAndImag[1].imagArray,
    text: getFrequencyArray(startFreq, endFreq, 20, false),
    hovertemplate: '<b>Real:</b> %{real:.3e}<br>' + '<b>Imag:</b> %{imag:.3e}<br>' + '<b>Freq</b>: %{text:.2e}',
    mode: 'markers+lines',
    marker: { size: 8, color: 'red' },
    name: 'Trans Line'
  };

  const traceScattersmithCapacitor = {
    type: 'scattersmith',
    real: impedanceRealAndImag[2].realArray,
    imag: impedanceRealAndImag[2].imagArray,
    text: freq,
    hovertemplate: '<b>Real:</b> %{real:.3e}<br>' + '<b>Imag:</b> %{imag:.3e}<br>' + '<b>Freq</b>: %{text:.2e}',
    mode: 'markers+lines',
    marker: { size: 8, color: 'green' },
    name: 'Capacitor'
  };

  const traceScattersmithSeriesRLC = {
    type: 'scattersmith',
    real: impedanceRealAndImag[3].realArray,
    imag: impedanceRealAndImag[3].imagArray,
    text: getFrequencyArray(startFreq, endFreq, 200, false),
    hovertemplate: '<b>Real:</b> %{real:.3e}<br>' + '<b>Imag:</b> %{imag:.3e}<br>' + '<b>Freq</b>: %{text:.2e}',
    mode: 'markers+lines',
    marker: { size: 8, color: 'orange' },
    name: 'Series LC'
  };

  const layoutScattersmith = {
    title: 'Smith Chart – Plotly Scattersmith',
    // showlegend: false,
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

  const traceCartesianInductor = {
    type: 'scatter',
    y: impedanceRealAndImag[0].imagArray,
    x: impedanceRealAndImag[0].realArray,
    mode: 'markers+lines',
    marker: { size: 8, color: 'blue' },
    name: 'Inductor Trace'
  };

  const traceCartesianTransLine = {
    type: 'scatter',
    y: impedanceRealAndImag[1].imagArray,
    x: impedanceRealAndImag[1].realArray,
    mode: 'markers+lines',
    marker: { size: 8, color: 'red' },
    name: 'Transmission Line Trace'
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
      range: [0, 10],
    },
    yaxis: {
      title: {
        text: 'Imaginary Normalised Impedance',
      },
      range: [-10, 10],
    },
    title: {
      text: 'Cartesian plot of Impedance',
      x: 0.5, // Center the title
      xanchor: 'center'
    },
  };

  return (
    <Layout seo={seo}>
      <LayoutSingleColumn>
        <section className="mx-auto lg:w-[54rem] px-2 text-left w-full">
          <CoverImage title="Plotly.js Smith Charts" />
          <MDXProvider>
            This is a series of experiments using the Plotly.js library to plot impedances.

            It is not optimised for small screens and would be best viewed on a larger screen.
          </MDXProvider>

          {!isSSR && (
            <React.Suspense fallback={<></>}>
              <>
                <PlotLazy data={[traceScattersmithInductor, traceScattersmithTransLine, traceScattersmithCapacitor, traceScattersmithSeriesRLC]} layout={layoutScattersmith} config={{ responsive: true }} />
                <PlotLazy data={[traceCartesianInductor, traceCartesianTransLine]} layout={layoutCartesian} config={{ responsive: true }} />
              </>
            </React.Suspense>
          )}

        </section>
      </LayoutSingleColumn>
    </Layout>
  );
}

export default SmithCharts;