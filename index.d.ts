declare function RNEChartsPro(props: {
  option: object;
  height?: number;
  width?: number;
  ref?:object;
  fontFamilies?: Array<object>;
  themeName?: string;
  extension?: object;
  customMapData?: object;
  webViewSettings?: any;
  backgroundColor?: string;
  formatterVariable?: object;
  eventActions?:object;
  enableParseStringFunction?:boolean;
  legendSelectChanged?(result: string);
  onDataZoom?(result: string);
  onPress?(result: string);
}): JSX.Element;

export default RNEChartsPro;
