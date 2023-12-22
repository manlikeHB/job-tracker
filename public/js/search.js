import axios from "axios";
import { showAlert } from "./alerts";

const searchInput = document.querySelector("#search");

const search = async (searchInput) => {
  try {
    const response = await axios.get(
      `/api/v1/users/jobs/search-my-jobs/?input=${searchInput}`
    );

    // if there is data for the search, then render it on the page
    if (response.data.status === "success") {
      const data = response.data.jobs || response.data.job;

      // remove contents from the jobs overview page
      const contentSection = document.querySelector("#content");

      while (contentSection.firstChild) {
        contentSection.removeChild(contentSection.firstChild);
      }

      // render searched data
      data.forEach((job) => {
        const markUp = `<div class="card-overview-job">
        <div class="title line">
          <h4>Title:</h4>
          &nbsp;
          <p>${job.title ? job.title : " "}</p>
        </div>
        <div class="position line">
          <h4>Postition:</h4>
          &nbsp;
          <p>${job.position ? job.position : " "}</p>
        </div>
        <div class="company line">
          <h4>Company:</h4>
          &nbsp;
          <p>${job.company ? job.company : " "}</p>
        </div>
        <div class="location line">
          <h4>location:</h4>
          &nbsp;
          <p>${job.location ? job.location : " "}</p>
        </div>
        <div class="status line">
          <h4>status:</h4>
          &nbsp;
          <p>${job.status ? job.status : " "}</p>
        </div>
        <div class="details action-btn-two">
          <p>Details</p>
        </div>
      </div>`;

        contentSection.insertAdjacentHTML("afterbegin", markUp);
      });
    }
  } catch (err) {
    console.log(err);
    showAlert("error", "Job not found!!!");
    window.setTimeout(() => {
      location.reload();
    }, 2000);
  }
};

export default performSearch = () => {
  const searchInputValue = searchInput.value.trim();

  // Check if there is a value in input before proceeding to search
  if (searchInputValue) {
    search(searchInputValue);
    // reset search input value after search
    searchInput.value = "";
  }

  searchInput.value = "";
};
