const preview = (e) => {
  e.preventDefault();
  const button =
    e.target.nodeName === "I" ? e.target.closest("button") : e.target;
  const data = button.dataset;
  const container = document.getElementById("mediaContainer");

  const widget = getWidget(data);

  container.innerHTML = widget;
  return;
};

const getWidget = (data = {}) => {
  let widget = "";
  switch (data.fileType) {
    case "video":
      widget = `<video controls class="col-12"><source src="/${data.filePath}" type="${data.fileMimeType}"></video>`;
      break;
    case "image":
      widget = `<img alt="Image" class="img-fluid" src="/${data.filePath}" srcset="/${data.fileMimeType}">`;
      break;
    case "audio":
      widget = `<audio controls><source src="/${data.filePath}" type="${data.mimeType}"/></audio>`;
      break;

    default:
      break;
  }

  return widget;
};
