const form = document.getElementById("loan-form");

form.addEventListener("submit", function (e) {
  // Hide results
  document.getElementById("results").style.display = "none";
  // Show loader
  document.getElementById("loading").style.display = "block";
  setTimeout(calculateLoan, 2000);
  e.preventDefault();
});

function calculateLoan() {
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");

  const monthyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalinterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments); //Math.pow computes powers
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    // Fill in the output fields, rounding to 2 decimal places
    monthyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalinterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    // Show results
    document.getElementById("results").style.display = "block";
    // Hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    showAlert("Please fill out the required fields");
  }
}

function showAlert(error) {
  // Hide results
  document.getElementById("results").style.display = "none";
  // Hide loader
  document.getElementById("loading").style.display = "none";
  const link = document.createElement("div");
  link.className = "alert alert-danger";
  link.appendChild(document.createTextNode(error));
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  card.insertBefore(link, heading);
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
}
