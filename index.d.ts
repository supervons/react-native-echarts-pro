declare function RNEChartsPro(props: {
  option: object;
  height?: number;
  width?: number;
  ref?:object;
  fontUrls?: string;
  themeName?: string;
  extension?: object;
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
