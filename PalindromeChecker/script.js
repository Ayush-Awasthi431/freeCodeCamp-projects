
const textInput = document.getElementById("text-input");
const btn = document.getElementById("check-btn");
const result = document.getElementById("result");
function emptyChecker(input){
  if(input === ""){
    alert("Please input a value");
    return true;
  }
}
function render(input){
  const regex = /[^a-z0-9]/g;
//  const input = textInput.value;
  return input.replace(regex,"");
}
function check(){
  const input = textInput.value.toLowerCase();
  const str = render(input);
  if(emptyChecker(str)){
    return;
  }
  const arr = str.split("");
  let end = arr.length-1;
  let i = 0;
  while(i < end){
    if(arr[end] !== arr[i]){
      return false;
    }
    i++; end--;
  }
  return true;
}
function final(){
  const ans = check();
  if(ans){
    result.innerText = `${textInput.value} is a palindrome`;
  }else if(ans === undefined){
    return;
  }else{
    result.innerText = `${textInput.value} is not a palindrome`;
  }
}
btn.addEventListener("click",final);
