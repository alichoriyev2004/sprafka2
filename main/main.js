const select = document.getElementById('lang');
select.addEventListener('change', function() {
  const selectedOption = select.options[select.selectedIndex];
  const flagUrl = selectedOption.dataset.flag;
  select.style.backgroundImage = `url(${flagUrl})`;
});
 const correctCode = "1234"; // <-- bu yerda to‘g‘ri kodni yoz
  const inputs = document.querySelectorAll("#otpInputs input");
  const errorMsg = document.getElementById("errorMsg");
  const successMsg = document.getElementById("successMsg");
  const otpContainer = document.getElementById("otpInputs");

  // Avtomatik keyingi inputga o‘tish
  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
      checkCode();
    });

    // Orqaga o‘tish (backspace)
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });

  function checkCode() {
    let enteredCode = "";
    inputs.forEach(i => enteredCode += i.value);
    
    if (enteredCode.length === 4) {
      if (enteredCode === correctCode) {
        errorMsg.textContent = "";
        otpContainer.classList.remove("error");
        
        // PDF ochish
        setTimeout(() => {
          window.open("yourfile.pdf", "_blank"); // <-- bu yerda PDF fayl nomini yoz
        }, 800);
      } else {
        otpContainer.classList.add("error");
        errorMsg.textContent = "Incorrect document number";
        successMsg.textContent = "";
        inputs.forEach(i => i.value = "");
        inputs[0].focus();
      }
    }
  }