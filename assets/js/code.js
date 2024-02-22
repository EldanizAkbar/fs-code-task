// Constants for staff, services and time
const staffs = [
  {
    id: 1,
    name: "Alex Rosetta",
    email: "alexyrosetta@gmail.com",
    image: "assets/img/staff-1.png",
  },
  {
    id: 2,
    name: "Maria July",
    email: "mariajuly@gmail.com",
    image: "assets/img/staff-2.png",
  },
];

const services = [
  {
    id: 1,
    name: "Oral hygiene",
    image: "assets/img/service-1.png",
    duration: "1 hour",
    price: 50.0,
  },
  {
    id: 2,
    name: "Implants",
    image: "assets/img/service-2.png",
    duration: "1 hour 30 minutes",
    price: 120.0,
  },
];

const dates = ["2024-02-04", "2024-02-05", "2024-02-06", "2024-02-07"];

const time = [
  {
    start_time: "09:00",
    end_time: "10:00",
  },
  {
    start_time: "10:00",
    end_time: "11:00",
  },
  {
    start_time: "11:00",
    end_time: "12:00",
  },
];

// DOM elements
const steps = document.querySelectorAll(".step");
const contentHeader = document.querySelector(".header-container h1");
const backButton = document.getElementById("button1");
const nextButton = document.getElementById("button2");
const staffSection = document.getElementById("staffContainer");
const serviceContainer = document.getElementById("serviceContainer");
const dataContainer = document.getElementById("dataContainer");
const timesDiv = document.getElementById("times");
const confirmationContainer = document.getElementById("confirmationContainer");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const currentMonthYear = document.getElementById("currentMonthYear");
const datesContainer = document.getElementById("dates");

// Variables for current step and selected staff, service, time
var currentStep = 1;
var selectedStaff = null;
var selectedService = null;
var selectedTime = null;

// Event listener for control actions
document.addEventListener("DOMContentLoaded", function () {
  // Update content based on the current step
  function updateContent() {
    switch (currentStep) {
      case 1:
        contentHeader.textContent = "Select staff";
        backButton.style.display = "none";
        staffSection.style.display = "block";
        serviceContainer.style.display = "none";
        dataContainer.style.display = "none";
        confirmationContainer.style.display = "none";
        break;
      case 2:
        contentHeader.textContent = "Select service";
        backButton.style.display = "inline-block";
        staffSection.style.display = "none";
        serviceContainer.style.display = "block";
        dataContainer.style.display = "none";
        confirmationContainer.style.display = "none";
        break;
      case 3:
        contentHeader.textContent = "Select date & time";
        nextButton.textContent = "NEXT";
        serviceContainer.style.display = "none";
        staffSection.style.display = "none";
        dataContainer.style.display = "flex";
        confirmationContainer.style.display = "none";
        break;
      case 4:
        contentHeader.textContent = "Confirm details";
        nextButton.textContent = "CONFIRM BOOKING";
        serviceContainer.style.display = "none";
        staffSection.style.display = "none";
        dataContainer.style.display = "none";
        confirmationContainer.style.display = "flex";

        const staffName = document.getElementById("staffName");
        const serviceName = document.getElementById("serviceName");
        const dateAndTime = document.getElementById("dateAndtime");
        const price = document.getElementById("price");

        if (selectedStaff && selectedService && selectedTime) {
          staffName.textContent = " " + selectedStaff.name;
          serviceName.textContent = " " + selectedService.name;
          dateAndTime.textContent = ` ${chosenDate.textContent} / ${selectedTime.start_time}-${selectedTime.end_time}`;

          const totalPrice = selectedService.price;
          price.textContent = ` $${totalPrice}`;
        }

        break;
    }
  }

  // Create staff elements dynamically
  function createStaff() {
    staffSection.innerHTML = "";
    staffs.forEach((staff) => {
      const staffElement = document.createElement("div");
      staffElement.classList.add("staff");
      staffElement.innerHTML = `
        <div> <img src="${staff.image}" alt="${staff.name}"></div>
        <div> 
        <h3>${staff.name}</h3>
        <p>${staff.email}</p>
        </div>          
          `;

      staffElement.addEventListener("click", function () {
        if (!staffElement.classList.contains("active-staff")) {
          const fName = document.getElementById("fname");
          fName.value = "";
          const lName = document.getElementById("lname");
          lName.value = "";
          const email = document.getElementById("email");
          email.value = "";
          const phone = document.getElementById("phone");
          phone.value = "";
          selectedService = null;
          selectedTime = null;
          const activeDate = document.querySelector(".active-date");
          if (activeDate) {
            activeDate.classList.remove("active-date");
          }
          const timeSlot = document.querySelectorAll(".time-slot");
          timeSlot.forEach((time) => {
            time.style.display = "none";
          });
          const choseDate = document.getElementById("chosenDate");
          choseDate.textContent = "Select date";
          const selectedServiceElements = document.querySelectorAll(
            ".service.active-service"
          );
          selectedServiceElements.forEach((s) => {
            s.classList.remove("active-service");
          });
        }
        selectedStaff = staff;
        const selectedStaffElements = document.querySelectorAll(
          ".staff.active-staff"
        );
        selectedStaffElements.forEach((s) => {
          s.classList.remove("active-staff");
        });
        staffElement.classList.add("active-staff");

        const message = document.querySelector(".message");
        if (message) {
          message.remove();
        }

        currentStep = 2;
        updateContent();
        updateStepClasses();
      });

      staffSection.appendChild(staffElement);
    });
  }

  // Create service elements dynamically
  function createService() {
    serviceContainer.innerHTML = "";
    services.forEach((service) => {
      const serviceElement = document.createElement("div");
      serviceElement.classList.add("service");
      serviceElement.innerHTML = `
        <div> <img src="${service.image}" alt="${service.name}"></div>
        <div class="service-name"> 
        <h3>${service.name}</h3>
        <p>${service.duration}</p>
        </div> 
        <div>
        <p class="price">${service.price}$</p>
        </div>         
          `;

      serviceElement.addEventListener("click", function () {
        if (!serviceElement.classList.contains("active-service")) {
          const fName = document.getElementById("fname");
          fName.value = "";
          const lName = document.getElementById("lname");
          lName.value = "";
          const email = document.getElementById("email");
          email.value = "";
          const phone = document.getElementById("phone");
          phone.value = "";
          selectedTime = null;
          const activeDate = document.querySelector(".active-date");
          if (activeDate) {
            activeDate.classList.remove("active-date");
          }
          const timeSlot = document.querySelectorAll(".time-slot");
          timeSlot.forEach((time) => {
            time.style.display = "none";
          });
          const choseDate = document.getElementById("chosenDate");
          choseDate.textContent = "Select date";
        }
        selectedService = service;
        const selectedServiceElements = document.querySelectorAll(
          ".service.active-service"
        );
        selectedServiceElements.forEach((s) => {
          s.classList.remove("active-service");
        });
        serviceElement.classList.add("active-service");

        const message = document.querySelector(".message");
        if (message) {
          message.remove();
        }
        currentStep = 3;
        updateContent();
        updateStepClasses();
      });

      serviceContainer.appendChild(serviceElement);
    });
  }

  // Create time slots dynamically
  function createTimes() {
    timesDiv.innerHTML = "";
    time.forEach((time) => {
      const timeSlot = document.createElement("div");
      timeSlot.classList.add("time-slot");
      timeSlot.innerHTML = `
        <p> ${time.start_time} </p>
        <p>${time.end_time}</p>
        `;

      timeSlot.addEventListener("click", function () {
        const fName = document.getElementById("fname");
        fName.value = "";
        const lName = document.getElementById("lname");
        lName.value = "";
        const email = document.getElementById("email");
        email.value = "";
        const phone = document.getElementById("phone");
        phone.value = "";
        selectedTime = time;
        const selectedTimeElements = document.querySelectorAll(
          ".time-slot.active-time"
        );
        selectedTimeElements.forEach((s) => {
          s.classList.remove("active-time");
        });
        timeSlot.classList.add("active-time");
        const message = document.querySelector(".message");
        if (message) {
          message.remove();
        }
        currentStep = 4;
        updateContent();
        updateStepClasses();
      });
      timesDiv.appendChild(timeSlot);
    });
  }

  // Event listener for next button
  nextButton.addEventListener("click", function () {
    if (currentStep === 1) {
      if (!selectedStaff) {
        displayErrorMessage("SELECT STAFF", staffSection);
        return;
      }
    } else if (currentStep === 2) {
      if (!selectedService) {
        displayErrorMessage("SELECT SERVICE", serviceContainer);
        return;
      }
    } else if (currentStep === 3) {
      if (!selectedTime) {
        displayErrorMessage("SELECT DATE & TIME", timesDiv);
        return;
      }
    } else if (currentStep === 4) {
      confirmBooking();
    }

    currentStep++;
    if (currentStep > steps.length) {
      currentStep = steps.length;
    }
    updateContent();
    updateStepClasses();
  });

  // Event listener for back button
  backButton.addEventListener("click", function () {
    const message = document.querySelector(".message");
    if (message) {
      message.remove();
    }
    currentStep--;
    if (currentStep < 1) {
      currentStep = 1;
    }
    updateContent();
    updateStepClasses();
  });

  // Display error message for incomplete selections
  function displayErrorMessage(messageText, container) {
    let message = document.createElement("div");
    message.classList.add("message");
    let icon = document.createElement("i");
    icon.classList.add("fas", "fa-exclamation-circle");
    let span = document.createElement("span");
    span.textContent = "  " + messageText;
    message.appendChild(icon);
    message.appendChild(span);
    container.appendChild(message);
  }

  // Confirm booking details
  function confirmBooking() {
    const firstName = document.getElementById("fname").value;
    const lastName = document.getElementById("lname").value;
    const email = document.getElementById("email").value;

    const chosenDate = document.getElementById("chosenDate");

    if (!firstName || !lastName || !email) {
      createWarningMessage("Please, fill in all required fields!", false);
      return;
    }

    createWarningMessage("Confirmation successfully completed!", true);

    if (selectedStaff && selectedService && selectedTime) {
      const bookingInfo = {
        staff_id: selectedStaff.id,
        service_id: selectedService.id,
        date: chosenDate.textContent,
        time: selectedTime.start_time,
        customer: {
          name: firstName,
          surname: lastName,
          email: email,
          phone: document.getElementById("phone").value,
        },
      };

      console.log("Booking Confirmed:", bookingInfo);
      currentStep = 0;
      selectedStaff = null;
      selectedService = null;
      selectedTime = null;

      const activeDate = document.querySelector(".active-date");
      if (activeDate) {
        activeDate.classList.remove("active-date");
      }

      const timeSlot = document.querySelectorAll(".time-slot");
      timeSlot.forEach((time) => {
        time.style.display = "none";
      });

      chosenDate.textContent = "Select date";

      const selectedStaffElements = document.querySelectorAll(
        ".staff.active-staff"
      );
      selectedStaffElements.forEach((s) => {
        s.classList.remove("active-staff");
      });

      const selectedServiceElements = document.querySelectorAll(
        ".service.active-service"
      );
      selectedServiceElements.forEach((s) => {
        s.classList.remove("active-service");
      });
      nextButton.textContent = "NEXT";

      updateContent();
      updateStepClasses();
    }
  }

  // Create warning or confirmation message
  function createWarningMessage(messageText, isSuccess) {
    const warningMessage = document.createElement("div");
    warningMessage.classList.add("warning-message");

    warningMessage.innerHTML = `
        <span class="confirm-message">${messageText}!</span>
        <i class="close-btn fas fa-times"></i>
      `;

    if (isSuccess) {
      const confirmMessage = warningMessage.querySelector(".confirm-message");
      confirmMessage.classList.add("success");
    } else {
      const confirmMessage = warningMessage.querySelector(".confirm-message");
      confirmMessage.classList.add("error");
    }

    const closeButton = warningMessage.querySelector(".close-btn");
    closeButton.addEventListener("click", () => {
      document.body.removeChild(overlay);
      document.body.removeChild(warningMessage);
    });
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
    document.body.appendChild(warningMessage);
  }

  // Reset time slot after changing date
  const dateButtons = document.querySelectorAll(".date-button");
  dateButtons.forEach((button) => {
    if (button.classList.contains("highlight")) {
        button.addEventListener("click", () => {
          selectedTime = null;
        });
    }
  });

  // Update step classes for progress indicators
  function updateStepClasses() {
    steps.forEach((step, index) => {
      const stepNumber = step.querySelector("span");
      if (index < currentStep - 1) {
        step.classList.add("done");
        step.classList.remove("active");
        stepNumber.innerHTML = "&#10003;";
      } else if (index === currentStep - 1) {
        step.classList.add("active");
        step.classList.remove("done");
        stepNumber.textContent = index + 1;
      } else {
        step.classList.remove("active");
        step.classList.remove("done");
        stepNumber.textContent = index + 1;
      }
    });
  }

  // Initial content update and element creation
  updateContent();
  createStaff();
  createService();
  createTimes();
});

// Array of months for calendar
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Initial month and year for calendar
let currentMonth = 1;
let currentYear = 2024;

// Render the calendar based on current month and year
renderCalendar();

// Event listener for previous month button
prevMonthBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

// Event listener for next month button
nextMonthBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

// Render the calendar based on current month and year
function renderCalendar() {
  currentMonthYear.textContent = `${months[currentMonth]} ${currentYear}`;
  datesContainer.innerHTML = "";

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const startingIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth;

  for (let i = 0; i < startingIndex; i++) {
    const emptyButton = createButton("", true);
    datesContainer.appendChild(emptyButton);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateButton = createButton(day, false);
    datesContainer.appendChild(dateButton);
  }
}

// Create a button element for a calendar day
function createButton(day, isDisabled) {
  const button = document.createElement("button");
  if (day == "") {
    button.style.opacity = "0";
  }

  if (!isDisabled) {
    button.innerHTML = `<time>${day}</time>`;
    button.addEventListener("click", () => {
      if (button.classList.contains("highlight")) {
          const selectedTimeElements = document.querySelectorAll(
            ".time-slot.active-time"
          );
          selectedTimeElements.forEach((s) => {
            s.classList.remove("active-time");
          });

        const selectedDateElements = document.querySelectorAll(
          ".highlight.active-date"
        );
        selectedDateElements.forEach((s) => {
          s.classList.remove("active-date");
        });
        button.classList.add("active-date");

        const timeSlot = document.querySelectorAll(".time-slot");
        timeSlot.forEach((time) => {
          time.style.display = "flex";
        });

        const chosenDate = document.getElementById("chosenDate");
        chosenDate.textContent = `${currentYear}-${padNumber(
          currentMonth + 1
        )}-${padNumber(day)}`;
      }
    });

    const currentDate = `${currentYear}-${padNumber(
      currentMonth + 1
    )}-${padNumber(day)}`;
    if (dates.includes(currentDate)) {
      button.classList.add("highlight");
    }
  }
  button.classList.add("date-button");
  if (isDisabled) {
    button.classList.add("disabled");
  }
  return button;
}

// Pad a number with leading zeros if necessary
function padNumber(num) {
  return num.toString().padStart(2, "0");
}
