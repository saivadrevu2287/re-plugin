// Add a button to the page for each supplied color
function constructOptions() {
  chrome.storage.sync.get("configurationFields", (data) => {
    const fields = data.configurationFields;
    // Reacts to a button click by marking the selected button and saving
    // the selection
    const handleEdit = (element, field) => (event) => {
      const value = parseInt(event.target.value);

      const isNegative = value < 0;
      const isTooBig = field.type === "percent" && value > 100;
      if ( isNegative || isTooBig )  {
        const replacement = isNegative ? 0 : 100;
        field.value = replacement;
        element.value = replacement;
      } else {
        field.value = field.type === "percent" ? value / 100 : value;
      }

      chrome.storage.sync.set({configurationFields: fields});
    }

    Object.keys(fields).forEach(key => {
      const element = document.getElementById(`${key}-input`);
      element.value = fields[key].type === "percent" ? fields[key].value * 100 : fields[key].value;
      element.addEventListener("input", handleEdit(element, fields[key]));
    })
  });
}

// Initialize the page by constructing the color options
constructOptions();
