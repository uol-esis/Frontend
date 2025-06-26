
export const parseReports = (data, array, number = 0, texts, isArray) => {
  if (typeof data !== 'object' || data === null) {
    return;
  }

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      let tempTexts = "";
      //if array contains objects
      if( value.length > 0 && typeof value[0] === 'object' ){
        value.forEach((item, index) => {
          tempTexts += (key+ " " + index + ": ");
          parseReports(item, array, index, tempTexts, true);
          tempTexts = "";
        });
      }else{
        //if array contains values
        texts = key + ": " + value;
        array.push({header:"", text: texts});
      }
    } else if (typeof value === 'object' && value !== null) {
      parseReports(value, array, number, texts, false);
    }else {
    //handle single key value pairs
      if (!value) return;
      if (key === "reportType") {
        array.push({ header: "Fehlerart: " + value, text: "" });
      } else {
          if(isArray){
            texts += (" " + key + ": " + value);
          }else{
            texts = "";
            texts += (" " + key + ": " + value);
            array.push({header:"", text: texts});
          }
        }
    }
  });
  // add all elements of an array in one row
  if(isArray) array.push({header:"", text: texts});
};