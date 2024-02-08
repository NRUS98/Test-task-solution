import {
  DateTimeNumericAxis,
  FastLineRenderableSeries,
  FastMountainRenderableSeries,
  NumberRange,
  NumericAxis,
  SciChartJSLightTheme,
  SciChartSurface,
  XyDataSeries
} from "scichart";

const AMOUNT_AXIS_ID = "mountainAxis";

const getAmountYAxisRange = (data) => {
  const maxAmount = Math.max(...data.map(({amount}) => amount));
  return new NumberRange(0, maxAmount * 2);
};

const getPriceChartSeries = (data, wasmContext) => {
  return new FastLineRenderableSeries(wasmContext, {
    stroke: "#000000",
    dataSeries: new XyDataSeries(wasmContext, {
      yValues: data.map(({price}) => price),
      xValues: data.map(({dt}) => dt)
    })
  });
};

const getAmountChartSeries = (data, wasmContext) => {
  const color = "rgba(8,140,245, 1)";
  return new FastMountainRenderableSeries(wasmContext, {
    stroke: color,
    fill: color,
    dataSeries: new XyDataSeries(wasmContext, {
      yValues: data.map(({amount}) => amount),
      xValues: data.map(({dt}) => dt)
    }),
    yAxisId: AMOUNT_AXIS_ID
  });
};

export const initSciChart = async (data) => {
  SciChartSurface.UseCommunityLicense();

  const {sciChartSurface, wasmContext} = await SciChartSurface.create("scichart-root", {
    theme: new SciChartJSLightTheme(),
    title: "Test task solution",
    titleStyle: {fontSize: 22}
  });

  sciChartSurface.xAxes.add(new DateTimeNumericAxis(wasmContext, {autoTicks: true}));
  sciChartSurface.yAxes.add(new NumericAxis(wasmContext));
  sciChartSurface.yAxes.add(new NumericAxis(
    wasmContext,
    {
      isVisible: false,
      id: AMOUNT_AXIS_ID,
      visibleRange: getAmountYAxisRange(data)
    }));

  sciChartSurface.renderableSeries.add(getPriceChartSeries(data, wasmContext));
  sciChartSurface.renderableSeries.add(getAmountChartSeries(data, wasmContext));

  return sciChartSurface;
};
