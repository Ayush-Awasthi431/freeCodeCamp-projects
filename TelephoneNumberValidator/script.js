const check = document.getElementById("check-btn");
const clear = document.getElementById("clear-btn");
const input = document.getElementById("user-input");
const result = document.getElementById("results-div");

function isEmpty(){
  return input.value.trim() === "";
}

clear.onclick = () => {
  result.textContent = "";
  input.value = "";
}

function isValid(){
  if(isEmpty()){
    alert("Please provide a phone number");
    return;
  }
  const regex = /^(?:^|1\s?)(?:[0-9]{3}|\([0-9]{3}\))(?:\s?|-?)[0-9]{3}(?:\s?|-?)[0-9]{4}$/;
  const div = document.createElement("div");
  if(regex.test(input.value)){
    div.classList.add("valid");
    div.textContent = `Valid US number: ${input.value}`;
  }else{
    div.classList.add("invalid");
    div.textContent = `Invalid US number: ${input.value}`;
  }
  result.appendChild(div);
}

check.addEventListener("click", isValid);
