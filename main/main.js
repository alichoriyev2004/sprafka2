 const select = document.getElementById('lang');

  // Funksiya: tanlangan flagni select foniga o‘rnatish
  function updateFlag() {
    const selectedOption = select.options[select.selectedIndex];
    const flagUrl = selectedOption.getAttribute('data-flag');
    select.style.backgroundImage = `url(${flagUrl})`;
  }

  // Boshlanishida avtomatik ishlaydi
  updateFlag();

  // Tanlov o‘zgarganda yangilansin
  select.addEventListener('change', updateFlag);
 const correctCode = "4148"; // <-- bu yerda to‘g‘ri kodni yoz
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
          window.open("pdf/касаллик варакаси Самандар.pdf", "_blank"); // <-- bu yerda PDF fayl nomini yoz
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
  
  const translations = {
  uz: {
    title: "Hujjatni ko'rish uchun PIN - kodni kiriting",
    btn: "Ochish"
  },
  ru: {
    title: "Введите PIN-код для просмотра документа",
    btn: "Открыть"
  },
  en: {
    title: "Enter PIN to view document",
    btn: "Open"
  }
};

const langSelect = document.getElementById("lang");
const elements = {
  title: document.getElementById("title"),
  btn: document.getElementById("btn")
};

function setLanguage(lang) {
  const t = translations[lang];
  elements.title.innerHTML = t.title;
  elements.btn.innerHTML = t.btn;
  localStorage.setItem("lang", lang);
}

// Boshlang‘ich tilni yuklash
const savedLang = localStorage.getItem("lang") || "uz";
langSelect.value = savedLang;
setLanguage(savedLang);

// Tanlanganda o‘zgartirish
langSelect.addEventListener("change", (e) => {
  setLanguage(e.target.value);
});