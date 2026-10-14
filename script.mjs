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
    select.appendChild(option);
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
  upcomingItems.sort((a, b) => a.date.localeCompare(b.date));
  const orderedList = document.createElement("ol");
  agenda.appendChild(orderedList);
  upcomingItems.forEach((item) => {
    const listElement = document.createElement("li");
    listElement.textContent = `${item.date}: ${item.topic}`;
    orderedList.appendChild(listElement);
  });
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
    formMessage.textContent = "Please enter a topic.";
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
