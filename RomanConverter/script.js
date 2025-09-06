const input = document.getElementById("number");
const btn = document.getElementById("convert-btn");
const output = document.getElementById("output");

function checkInvalid(num){
  if(isNaN(num)){
    output.innerText = "Please enter a valid number";
    return true;
  }else if(num < 1){
    output.innerText ="Please enter a number greater than or equal to 1";
    return true;
  }else if(num >= 4000){
    output.innerText = "Please enter a number less than or equal to 3999";
    return true;
  }
  return false;
}

function convert(){
  let num = parseInt(input.value);
  if(checkInvalid(num)){
    return;
  }
  const inputs = [];
  const result = [];
  while(num > 0){
    if(num >= 1000){
      num-= 1000;
      result.push("M");
    }else if(num >= 900){
      num-= 900;
      result.push("CM");
    }else if(num >= 500){
      num-= 500;
      result.push("D");
    }else if(num >= 400){
      num-= 400;
      result.push("CD");
    }else if(num >= 100){
      num-= 100;
      result.push("C");
    }else if(num >= 90){
      num-= 90;
      result.push("XC");
    }else if(num >= 50){
      num-= 50;
      result.push("L");
    }else if(num >= 40){
      num-= 40;
      result.push("XL");
    }else if(num >= 10){
      num-= 10;
      result.push("X");
    }else if(num >= 9){
      num-= 9;
      result.push("IX");
    }else if(num >= 5){
      num-= 5;
      result.push("V");
    }else if(num >= 4){
      num-= 4;
      result.push("IV");
    }else{
      num-= 1;
      result.push("I");
    }
    inputs.push(num);
  }
  output.innerText = result.join("");
}
btn.addEventListener("click",convert);
