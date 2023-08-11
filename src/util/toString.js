export default function toString(obj) {
  let result = JSON.stringify(obj, function (key, val) {
    if (typeof val === "function") {
      let newVal = `~--demo--~${val}~--demo--~`;
      // Simplify code by removing line breaks between codes
      newVal = newVal.replace(/\n/g, "");
      /* When the function such as "formatter" injects into the renderChart.js and as a string,
       * '\n' in the string variable of formatter function will be converted to '\\n',
       * this replace function will replace it back to '\n' for line feed.
       */
      newVal = newVal.replace(/\\n/g, "\n");
      return newVal;
    }
    return val;
  });

  do {
    result = result
      .replace('"~--demo--~', "")
      .replace('~--demo--~"', "");
  } while (result.indexOf("~--demo--~") >= 0);
  // 添加此行把unicode转为中文（否则formatter函数中含有中文在release版本中显示不出来）
  result = unescape(result.replace(/\\u/g, "%u"));
  return result;
}
export function stringIfy(obj) {
  return JSON.stringify(obj, function (key, value) {
    let fnBody;
    if (value instanceof Function || typeof value == "function") {
      fnBody = value.toString();
      if (fnBody.length < 8 || fnBody.substring(0, 8) !== "function") {
        //this is ES6 Arrow Function
        return "_NuFrRa_" + fnBody;
      }
      return fnBody;
    }
    if (value instanceof RegExp) {
      return "_PxEgEr_" + value;
    }
    return value;
  });
}
