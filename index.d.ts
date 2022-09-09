declare function RNEChartsPro(props: {
  option: object;
  height?: number;
  themeName?: string;
  customMapData?: object;
  webViewSettings?: any;
  backgroundColor?: string;
  formatterVariable?: object;
  eventActions?:object;
  legendSelectChanged?(result: string);
  onDataZoom?(result: string);
  onPress?(result: string);
}): JSX.Element;

export default RNEChartsPro;
