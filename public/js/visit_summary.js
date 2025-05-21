//expand form sections
const inputSectionLabels = document.querySelectorAll(".section_label_div");
inputSectionLabels.forEach((section) => {
  section.addEventListener("click", () => {
    const content = section.nextElementSibling;
    if (content && content.classList.contains("section_inputs_div")) {
      content.classList.toggle("flex");
    }
  });
});

//get form information
const form = document.getElementById("visitSummary_form");
const submitButton = document.getElementById("submit_button");
const inputs = document.querySelectorAll("input, textarea");
inputs.forEach((input) => {
  const inputType = input.type;
  input.addEventListener("click", () => {
    console.log(input.type);
    if (inputType === "checkbox" || inputType === "radio") {
      submitButton.disabled = false;
      submitButton.classList.remove("inactive_button");
      submitButton.classList.add("active_button");
    }
  });

  input.addEventListener("input", () => {
    console.log(input.type);
    if (inputType === "text" || inputType === "textarea") {
      if (input.value.trim().length > 0) {
        submitButton.disabled = false;
        submitButton.classList.remove("inactive_button");
        submitButton.classList.add("active_button");
      } else if (input.value.trim().length === 0 && !input.value) {
        //need to fix this
        submitButton.disabled = true;
        submitButton.classList.remove("active_button");
        submitButton.classList.add("inactive_button");
      }
    }
  });

  // input.addEventListener("input", () => {
  //   if (input.length > 0) {
  //     submitButton.disabled = false;
  //     submitButton.classList.remove("inactive_button");
  //     submitButton.classList.add("active_button");
  //   } else {
  //     submitButton.disabled = true;
  //     submitButton.classList.remove("active_button");
  //     submitButton.classList.add("inactive_button");
  //   }
  // });
});
