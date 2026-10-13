// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import {
  getUserIds,
  getTodayString,
  calculateRevisionDates,
} from "./common.mjs";

import { getData, addData } from "./storage.mjs";

const select = document.querySelector("#user-select");
const agenda = document.querySelector("#agenda");
const dateInput = document.querySelector("#date");
const form = document.querySelector("#topic-form");
const topicInput = document.querySelector("#topic");
const formMessage = document.querySelector("#form-message");

const state = {
  selectedUserId: "",
};

window.onload = function () {
  populateSelect();
  addTodaysDate();
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
  const upcomingItems = data.filter((item) => {
    return item.date >= getTodayString();
  });
  if (upcomingItems.length === 0) {
    const paragraph = document.createElement("p");
    paragraph.textContent =
      "No upcoming revisions. All revision dates are in the past.";
    agenda.appendChild(paragraph);
    return;
  }
  console.log(upcomingItems);
}

select.addEventListener("change", () => {
  state.selectedUserId = select.value;
  renderAgenda();
});

function addTodaysDate() {
  dateInput.value = getTodayString();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";
  if (state.selectedUserId === "") {
    formMessage.textContent = "Please select a user first.";
    return;
  }
  const topic = topicInput.value.trim();
  if (topic === "") {
    formMessage.textContent = "Please enter a topic";
    return;
  }
  const date = dateInput.value;
  const revisionDates = calculateRevisionDates(date);
  const agendaItems = revisionDates.map((revisionDate) => {
    return { topic: topic, date: revisionDate };
  });
  addData(state.selectedUserId, agendaItems);
  topicInput.value = "";
  renderAgenda();
});
