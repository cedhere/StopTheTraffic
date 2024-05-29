let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");

  
}
themeButton.addEventListener("click", toggleDarkMode);


// Code for the petition signing
const signNowButton = document.getElementById("sign-now-button");

const addSignature = (person) => {

  const signatures = document.querySelector(".signatures");

  const newSignature = document.createElement("p");
  newSignature.textContent = "🖊️ " + person.name + " from " + person.hometown + " supports this, go " + person.name + "!";

  signatures.appendChild(newSignature);
  
}

// Validate forms
const validateForm = () => {

  let containsErrors = false;

  var petitionInputs = document.getElementById("sign-petition").elements;

  let person = {
    name: petitionInputs[0].value,
    hometown: petitionInputs[2].value
  };
  
  for (let i = 0; i < petitionInputs.length; i++) {
   
    if (petitionInputs[i].value.length < 2) {
      containsErrors = true;
      petitionInputs[i].classList.add('error');
    } else {
      petitionInputs[i].classList.remove('error');
    }
  }

  if (!containsErrors) {
    addSignature(person);
    toggleModal(person);
    for (let i = 0; i < petitionInputs.length; i++){
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
}

signNowButton.addEventListener('click', validateForm);

// Animation object
let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

let revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++){
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
    }
  }
}
window.addEventListener('scroll', reveal);

// Code for the modal
function toggleModal(person) {
  const modal = document.getElementById("thanks-modal");
  const modalContent = document.getElementById("thanks-modal-content");
  modal.style.display = "flex";
  modalContent.textContent = `Thank you for signing, ${person.name}! you're now part of a greater good! ${person.hometown} represent!`;

  const intervalId = setInterval(scaleImage, 500);
  
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 4000)
  
}

let scaleFactor = 1;
let modalImage = document.getElementById("modal-image");

function scaleImage() {
  if (scaleFactor === 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }
  modalImage.style.transform = `scale(${scaleFactor})`;
}