hideAlert = () => {
  const el = document.querySelector("#overlay");
  if (el) el.parentElement.removeChild(el);
};

// type is either a 'success' or 'error
export const showAlert = (type, msg, time = 3) => {
  hideAlert();
  const markup = ` <div id="overlay">
  <div id="overlay-content" class='alert ${type}'>
    <!-- <img src="loading.gif" alt="Loading" /> -->
    <!-- Replace with your loading gif or content -->
    <p>${msg}</p>
  </div>
</div>`;

  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  setTimeout(hideAlert, time * 1000);
};
