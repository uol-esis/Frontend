import dataString from "../language/reportTypeDE.json?raw";

const loadTranslation = async (key, dataName) => {
  const jsonObj = JSON.parse(dataString)
  if(!jsonObj[key]){
    return key;
  }else{
    return jsonObj[key];
  }
  
};

export const parseReports = async (data, array, number = 0, texts = "", isArray = false) => {
  if (typeof data !== 'object' || data === null) {
    return;
  }

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      let tempTexts = "";
      //if array contains object
      if (value.length > 0 && typeof value[0] === 'object') {
        for (const [index, item] of value.entries()) {
          const translatedKey = await loadTranslation(key, "reportTypeDE");
          tempTexts += `${translatedKey} ${index}: `;
          //console.log("item " + JSON.stringify(item));
          await parseReports(item, array, index, tempTexts, true);
          tempTexts = "";
        }
      } else {
       //if array contains primitive values (e.g. columnIndex: [1])
        const translatedKey = await loadTranslation(key, "reportTypeDE");
        texts += `${translatedKey}: ${value}`;

        if (!isArray) {
          array.push({ header: "", text: texts });
          texts = "";
        }
      }

    } else if (typeof value === 'object' && value !== null) {
      await parseReports(value, array, number, texts, false);

    } else {
      //handle single key value pairs
      if (!value) continue;

      if (key === "reportType") {
        const translatedKey = await loadTranslation(value, "reportTypeDE");
        array.push({ header: "Fehlerart: " + translatedKey, text: "" });
      } else {
        const translatedKey = await loadTranslation(key, "reportTypeDE");

        if (isArray) {
          texts += ` ${translatedKey}: ${value}`;
        } else {
          texts = ` ${translatedKey}: ${value}`;
          array.push({ header: "", text: texts });
          texts = "";
        }
        
      }
    }
  }
  if (isArray) {
   array.push({ header: "", text: texts });
  }
};
