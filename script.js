/* =========================================================
   JIYA TOURS & TRAVELS
   Booking & WhatsApp Script
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     CONFIGURATION
     ======================================================= */

  const WHATSAPP_NUMBER = "919801483637";


  /* =======================================================
     CITY DATA
     ======================================================= */

  const cities = {

    "Jharkhand": [
      "Ranchi",
      "Jamshedpur",
      "Dhanbad",
      "Bokaro",
      "Deoghar",
      "Hazaribagh",
      "Giridih",
      "Dumka",
      "Ramgarh",
      "Chaibasa",
      "Gumla",
      "Simdega",
      "Medininagar",
      "Latehar",
      "Netarhat",
      "Other City"
    ],

    "Bihar": [
      "Patna",
      "Gaya",
      "Bodh Gaya",
      "Rajgir",
      "Nalanda",
      "Vaishali",
      "Muzaffarpur",
      "Bhagalpur",
      "Darbhanga",
      "Purnia",
      "Other City"
    ],

    "West Bengal": [
      "Kolkata",
      "Durgapur",
      "Asansol",
      "Siliguri",
      "Darjeeling",
      "Digha",
      "Kharagpur",
      "Howrah",
      "Other City"
    ],

    "Odisha": [
      "Bhubaneswar",
      "Puri",
      "Konark",
      "Cuttack",
      "Rourkela",
      "Sambalpur",
      "Chilika",
      "Balasore",
      "Other City"
    ],

    "Chhattisgarh": [
      "Raipur",
      "Bilaspur",
      "Durg",
      "Bhilai",
      "Jagdalpur",
      "Korba",
      "Other City"
    ],

    "Uttar Pradesh": [
      "Varanasi",
      "Prayagraj",
      "Ayodhya",
      "Gorakhpur",
      "Lucknow",
      "Kanpur",
      "Noida",
      "Agra",
      "Other City"
    ],

    "Madhya Pradesh": [
      "Bhopal",
      "Indore",
      "Jabalpur",
      "Gwalior",
      "Ujjain",
      "Other City"
    ],

    "Assam": [
      "Guwahati",
      "Dibrugarh",
      "Silchar",
      "Jorhat",
      "Other City"
    ],

    "Sikkim": [
      "Gangtok",
      "Namchi",
      "Pelling",
      "Other City"
    ],

    "Delhi NCR": [
      "New Delhi",
      "Delhi",
      "Gurugram",
      "Noida",
      "Ghaziabad",
      "Faridabad",
      "Other City"
    ],

    "Maharashtra": [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik",
      "Aurangabad",
      "Other City"
    ],

    "Other State": [
      "Other City"
    ]

  };


  /* =======================================================
     ELEMENTS
     ======================================================= */

  const form = document.getElementById("bookingForm");

  const pickupState = document.getElementById("pickupState");
  const pickupCity = document.getElementById("pickupCity");
  const pickup = document.getElementById("pickup");

  const dropState = document.getElementById("dropState");
  const dropCity = document.getElementById("dropCity");
  const drop = document.getElementById("drop");

  const tripType = document.getElementById("tripType");

  const date = document.getElementById("date");
  const time = document.getElementById("time");

  const cab = document.getElementById("cab");
  const passengers = document.getElementById("passengers");

  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const notes = document.getElementById("notes");

  const currentYear = document.getElementById("currentYear");


  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =======================================================
     MINIMUM DATE = TODAY
     ======================================================= */

  if (date) {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    const todayString = `${year}-${month}-${day}`;

    date.min = todayString;
  }


  /* =======================================================
     LOAD CITIES
     ======================================================= */

  function loadCities(stateSelect, citySelect) {

    if (!stateSelect || !citySelect) {
      return;
    }

    const selectedState = stateSelect.value;

    citySelect.innerHTML = "";

    const defaultOption = document.createElement("option");

    defaultOption.value = "";

    defaultOption.textContent = "Select city";

    citySelect.appendChild(defaultOption);


    if (!selectedState || !cities[selectedState]) {
      return;
    }


    cities[selectedState].forEach(function (city) {

      const option = document.createElement("option");

      option.value = city;

      option.textContent = city;

      citySelect.appendChild(option);

    });

  }


  /* =======================================================
     PICKUP STATE CHANGE
     ======================================================= */

  if (pickupState) {

    pickupState.addEventListener("change", function () {

      loadCities(pickupState, pickupCity);

    });

  }


  /* =======================================================
     DESTINATION STATE CHANGE
     ======================================================= */

  if (dropState) {

    dropState.addEventListener("change", function () {

      loadCities(dropState, dropCity);

    });

  }


  /* =======================================================
     JOURNEY TYPE TABS
     ======================================================= */

  const tripTabs = document.querySelectorAll(".trip-tab");

  tripTabs.forEach(function (tab) {

    tab.addEventListener("click", function () {

      tripTabs.forEach(function (item) {

        item.classList.remove("active");

      });

      tab.classList.add("active");

      const selectedTrip = tab.getAttribute("data-trip");

      if (tripType) {

        tripType.value = selectedTrip;

      }

    });

  });


  /* =======================================================
     PHONE NUMBER VALIDATION
     ======================================================= */

  if (phone) {

    phone.addEventListener("input", function () {

      phone.value = phone.value.replace(/\D/g, "");

      if (phone.value.length > 10) {

        phone.value = phone.value.substring(0, 10);

      }

    });

  }


  /* =======================================================
     FORMAT DATE
     ======================================================= */

  function formatDate(dateValue) {

    if (!dateValue) {
      return "Not specified";
    }

    const parts = dateValue.split("-");

    if (parts.length !== 3) {
      return dateValue;
    }

    return `${parts[2]}/${parts[1]}/${parts[0]}`;

  }


  /* =======================================================
     FORMAT TIME
     ======================================================= */

  function formatTime(timeValue) {

    if (!timeValue) {
      return "Not specified";
    }

    const parts = timeValue.split(":");

    if (parts.length < 2) {
      return timeValue;
    }

    let hours = parseInt(parts[0], 10);

    const minutes = parts[1];

    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    if (hours === 0) {
      hours = 12;
    }

    return `${hours}:${minutes} ${period}`;

  }


  /* =======================================================
     CLEAN TEXT
     ======================================================= */

  function cleanText(value) {

    if (!value) {
      return "Not specified";
    }

    return value.trim();

  }


  /* =======================================================
     GET CITY VALUE
     ======================================================= */

  function getCityValue(cityElement) {

    if (!cityElement || !cityElement.value) {
      return "Not specified";
    }

    return cityElement.value;

  }


  /* =======================================================
     FORM SUBMISSION
     ======================================================= */

  if (form) {

    form.addEventListener("submit", function (event) {

      event.preventDefault();


      /* ---------------------------------------------------
         GET VALUES
         --------------------------------------------------- */

      const selectedTrip = cleanText(tripType.value);

      const selectedPickupState = cleanText(pickupState.value);

      const selectedPickupCity = getCityValue(pickupCity);

      const selectedPickup = cleanText(pickup.value);

      const selectedDropState = cleanText(dropState.value);

      const selectedDropCity = getCityValue(dropCity);

      const selectedDrop = cleanText(drop.value);

      const selectedDate = formatDate(date.value);

      const selectedTime = formatTime(time.value);

      const selectedCab = cleanText(cab.value);

      const selectedPassengers = cleanText(passengers.value);

      const customerName = cleanText(name.value);

      const customerPhone = cleanText(phone.value);

      const specialRequirement = cleanText(notes.value);


      /* ---------------------------------------------------
         VALIDATE PHONE
         --------------------------------------------------- */

      if (!/^[0-9]{10}$/.test(customerPhone)) {

        alert("Please enter a valid 10 digit mobile number.");

        phone.focus();

        return;

      }


      /* ---------------------------------------------------
         VALIDATE NAME
         --------------------------------------------------- */

      if (customerName.length < 2) {

        alert("Please enter your name.");

        name.focus();

        return;

      }


      /* ---------------------------------------------------
         CREATE WHATSAPP MESSAGE
         --------------------------------------------------- */

      const message =

`🚕 *NEW CAB BOOKING ENQUIRY*

*Jiya Tours & Travels*

━━━━━━━━━━━━━━━━━━

📌 *Journey Type*
${selectedTrip}

📍 *PICKUP DETAILS*
State: ${selectedPickupState}
City: ${selectedPickupCity}
Location: ${selectedPickup}

📍 *DESTINATION DETAILS*
State: ${selectedDropState}
City: ${selectedDropCity}
Location: ${selectedDrop}

━━━━━━━━━━━━━━━━━━

📅 *Journey Date*
${selectedDate}

⏰ *Pickup Time*
${selectedTime}

🚗 *Preferred Cab*
${selectedCab}

👥 *Passengers*
${selectedPassengers}

━━━━━━━━━━━━━━━━━━

👤 *CUSTOMER DETAILS*

Name: ${customerName}

Mobile: ${customerPhone}

📝 *Special Requirement*
${specialRequirement}

━━━━━━━━━━━━━━━━━━

Please share the best available fare for this journey.

Thank you,
Jiya Tours & Travels`;


      /* ---------------------------------------------------
         ENCODE MESSAGE
         --------------------------------------------------- */

      const encodedMessage = encodeURIComponent(message);


      /* ---------------------------------------------------
         CREATE WHATSAPP URL
         --------------------------------------------------- */

      const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;


      /* ---------------------------------------------------
         OPEN WHATSAPP
         --------------------------------------------------- */

      window.open(whatsappURL, "_blank");

    });

  }


  /* =======================================================
     SMOOTH SCROLL FOR INTERNAL LINKS
     ======================================================= */

  const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  internalLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

      const targetID = link.getAttribute("href");

      if (!targetID || targetID === "#") {
        return;
      }

      const targetElement = document.querySelector(targetID);

      if (!targetElement) {
        return;
      }

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =======================================================
     AUTO FOCUS BEHAVIOUR
     ======================================================= */

  if (pickupState) {

    pickupState.addEventListener("change", function () {

      if (pickupCity) {
        pickupCity.focus();
      }

    });

  }


  if (dropState) {

    dropState.addEventListener("change", function () {

      if (dropCity) {
        dropCity.focus();
      }

    });

  }


  /* =======================================================
     PREVENT PAST DATE
     ======================================================= */

  if (date) {

    date.addEventListener("change", function () {

      const selectedDate = new Date(date.value);

      const today = new Date();

      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {

        alert("Please select today or a future date.");

        date.value = "";

      }

    });

  }

});
