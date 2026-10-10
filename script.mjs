// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./common.mjs";
import { getData } from "./storage.mjs";
const select = document.querySelector("#user-select");
const agenda = document.querySelector("#agenda");

const state = {
  selectedUserId: "",
};

window.onload = function () {
  populateSelect();
};

function populateSelect() {
  const users = getUserIds();
  users.forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    select.append(option);
  });
}

function renderAgenda() {
  agenda.textContent = "";
  if (state.selectedUserId === "") {
    return;
  }
  const data = getData(state.selectedUserId);

  if (data === null || data.length === 0) {
    const paragraph = document.createElement("p");
    paragraph.textContent = "This user has no agenda yet.";
    agenda.appendChild(paragraph);
    return;
  }
}

select.addEventListener("change", () => {
  state.selectedUserId = select.value;
  renderAgenda();
});
