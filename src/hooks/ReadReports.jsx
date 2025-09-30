
const loadTranslation = async (key, dataName) => {
  try {
    //public\errorsDE.json
    const response = await fetch(`public/${dataName}.json`);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    if(data[key] == null){
      return key;
    }
    return data[key];
  } catch (error) {
    console.error(error);
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
          await parseReports(item, array, index, tempTexts, true);
          tempTexts = "";
        }
      } else {
        //if array contains values
        const translatedKey = await loadTranslation(key, "reportTypeDE");
        texts += `${translatedKey}: ${value}`;
        array.push({ header: "", text: texts });
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
