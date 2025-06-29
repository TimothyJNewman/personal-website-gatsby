import React, { useEffect } from 'react';
import Plot from "react-plotly.js";
import CoverImage from '../../../components/cover-image';
import Layout from '../../../components/layout';
import LayoutSingleColumn from '../../../components/layout-single-column';

const SmithCharts = () => {
  const real = [0.5, 1, 2, 3];
  const imag = [0.5, 1, 2, 3];
  const freq = Array.from(Array(10).keys())

  const trace_scattersmith = {
    type: 'scattersmith',
    real,
    imag,
    mode: 'markers+lines',
    marker: { size: 8, color: 'blue' },
    name: 'Test_trace'
  };

  const layout_scattersmith = {
    title: 'Smith Chart – Plotly Scattersmith',
    showlegend: false,
    width: 600,
    height: 600,
    smith: {
      realaxis: { tickvals: [0, 0.5, 1, 2, 5, 10] },
      imaginaryaxis: { tickvals: [-5, -2, 2, 5] }
    },
  };

  const trace_cartesian = {
    type: 'scatter',
    y: real,
    x: imag,
    mode: 'markers+lines',
    marker: { size: 8, color: 'blue' },
    name: 'Test_trace'
  };

  const layout_cartesian = {
    title: 'Cartesian Scatter – Plotly Scatter',
    showlegend: false,
    width: 600,
    height: 600,
  };

  return (
    <Layout>
      <LayoutSingleColumn>
        <section className="mx-auto lg:w-[54rem] px-2 text-left w-full">
          <CoverImage title="Testing Plotly.js for creating Smith Charts" />
          <Plot data={[trace_scattersmith]} layout={layout_scattersmith} config={{ responsive: true }} />
          <Plot data={[trace_cartesian]} layout={layout_cartesian} config={{ responsive: true }} />
        </section>
      </LayoutSingleColumn>
    </Layout>
  );
}

export default SmithCharts;