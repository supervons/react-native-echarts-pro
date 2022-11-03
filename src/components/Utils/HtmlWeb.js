/**
 * This is Echarts container HTML page, the main <div> render Echarts.
 * 这是 Echarts 容器 HTML 页面，由页面 main 节点挂载 Echarts。
 */
import echarts from "../Echarts/echarts.min"; // echarts.min文件引入
import { Theme } from "../Echarts/theme/index"; // 主题文件引入
const HtmlWeb = function (fontFamiliesObject) {
  return `<!DOCTYPE html>
  <html>
    <head>
    <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon">
    <title>echarts</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <style type="text/css">
      html,body {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
      }
      #main {
        height: 100%;
      }
      ${fontFamiliesObject.fontFamilyString}
    </style>
    <script>${echarts}</script>
    <script>${Theme}</script>
    </head>
    <body>
      ${fontFamiliesObject.fontTypeString}
      <div id="main" ></div>
    <body>
  <html>`;
};
export default HtmlWeb;
