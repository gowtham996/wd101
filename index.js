const formElement = document.getElementById("user-form");
const dobInput = document.getElementById("dob");
const currentDate = new Date().toISOString().slice(4, 10);
const currentYear = new Date().getFullYear();

// Calculate the minimum date (55 years ago from the current date)
const minDate = new Date();
minDate.setFullYear(currentYear - 55);

// Calculate the maximum date (18 years ago from the current date)
const maxDate = new Date();
maxDate.setFullYear(currentYear - 18);

// Format the minimum and maximum dates
const minDateFormatted = minDate.toISOString().slice(0, 10);
const maxDateFormatted = maxDate.toISOString().slice(0, 10);

// Set the minimum and maximum values for the date of birth input
dobInput.min = minDateFormatted;
dobInput.max = maxDateFormatted;

const getStoredEntries = () => {
  let storedData = localStorage.getItem("user-entries");
  return storedData ? JSON.parse(storedData) : [];
};

let userEntries = getStoredEntries();

const renderEntries = () => {
  const tableRows = userEntries
    .map((entry) => {
      const { name, email, password, dob, acceptTerms } = entry;
      return `<tr>
                <td>${name}</td>
                <td>${email}</td>
                <td>${password}</td>
                <td>${dob}</td>
                <td>${acceptTerms}</td>
              </tr>`;
    })
    .join("\n");

  const tableHTML = `<table border="1">
                    <tr>
                      <th>Name</th>
                      <th>Email Address</th>
                      <th>Password</th>
                      <th>Dob</th>
                      <th>Accepted terms?</th>
                    </tr>
                    ${tableRows}
                </table>`;

  let detailsElement = document.getElementById("show_the_date");
  detailsElement.innerHTML = tableHTML;
};

const saveFormData = (event) => {
  event.preventDefault();
  const nameInput = document.getElementById("name").value;
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;
  const dobInputValue = document.getElementById("dob").value;
  const acceptTermsInput = document.getElementById("tick_mark").checked;

  const formData = {
    name: nameInput,
    email: emailInput,
    password: passwordInput,
    dob: dobInputValue,
    acceptTerms: acceptTermsInput,
  };

  userEntries.push(formData);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  renderEntries();
};

formElement.addEventListener("submit", saveFormData);
renderEntries();
