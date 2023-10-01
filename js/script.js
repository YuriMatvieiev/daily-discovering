const radioGroups = [
  document.querySelectorAll('input[name="age"]'),
  document.querySelectorAll('input[name="income"]'),
  document.querySelectorAll('input[name="clarify_income"]'),
  document.querySelectorAll('input[name="medicaid"]'),
];
const callBox = document.querySelector(".form__question-box-call");
const progressBar = document.querySelector(".form__progress-bar");

const backBtns = document.querySelectorAll(".back-btn");

let currentStep = 0;

function updateProgressBar(step) {
  const totalSteps = radioGroups.length;
  let percentage = (step / (totalSteps - 1)) * 100;
  percentage = Math.min(100, percentage);
  if (step === 3) {
    percentage = 75;
  } else if (step === 4) {
    percentage = 100;
  }
  progressBar.style.width = `${percentage}%`;
}

function updateStep(step) {
  document.querySelector(`[step="${currentStep}"]`).style.display = "none";
  currentStep = step;
  document.querySelector(`[step="${currentStep}"]`).style.display = "block";
  updateProgressBar(currentStep);
}

const selectedValues = {
  age: "",
  income: "",
  clarify_income: "",
  medicaid: "",
};

function handleRadioChange(event, nextStep) {
  if (event.target.checked) {
    const name = event.target.getAttribute("name");
    const value = event.target.value;
    selectedValues[name] = value;
    updateStep(nextStep);
  }
}

radioGroups[0].forEach((radio, index) => {
  radio.addEventListener("change", () => {
    if (index === 0 || index === 1) {
      handleRadioChange(event, 1);
    }
  });
});

radioGroups[1].forEach((radio, index) => {
  radio.addEventListener("change", () => {
    if (index === 0) {
      handleRadioChange(event, 4);
    } else if (index === 1) {
      handleRadioChange(event, 2);
    }
  });
});

radioGroups[2].forEach((radio) => {
  radio.addEventListener("change", () => {
    if (
      radio.value === "$4-6k/month" ||
      radio.value === "$6-8k/month" ||
      radio.value === "$8k+"
    ) {
      if (currentStep === 2) {
        handleRadioChange(event, 3);
      }
    }
  });
});

radioGroups[3].forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "no") {
      handleRadioChange(event, 4);
    } else if (radio.value === "Yes") {
      handleRadioChange(event, 4);
      document.querySelector(".form__question-box-call-1").style.display =
        "none";
    }
    console.log("Selected values at all steps:", selectedValues);
  });
});

backBtns.forEach((backBtn) => {
  backBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      updateStep(currentStep - 1);
      radioGroups.forEach((group) => {
        group.forEach((radio) => {
          radio.checked = false;
          document.querySelector(".form__question-box-call-1").style.display =
            "block";
        });
      });
    }
  });
});
