let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
let mess;
let worth = [0.01,0.05,0.1,0.25,1,5,10,20,100];

window.onload = function () {
  const btn = document.getElementById("purchase-btn");
  const input = document.getElementById("cash");
  const box = document.getElementById("change-due");
  const drawerBox = document.getElementById("cash-drawer"); 

  btn.addEventListener("click", result);

  function result() {
    const resultArr = calculate(parseFloat(input.value));
    showMessage(resultArr);
    updateDrawer();
  }

  function calculate(num) {
    let rem = num - price; 
    if(rem < 0){
      mess = "alert";
      return;
    }
    if(rem === 0){
      mess = "noChange"
    }
    const change = [];

    for (let i = cid.length - 1; i >= 0; i--) {
      let noteValue = worth[i];
      let noteName = cid[i][0];
      let noteTotal = cid[i][1]; 
      let noteCount = noteTotal / noteValue;

      if (noteValue <= rem && noteCount > 0) {
        let needed = Math.floor(rem / noteValue);
        let count = Math.min(needed, noteCount);
        if (count > 0) {
          let amount = count * noteValue;

          change.push([noteName, amount]);
          cid[i][1] -= amount;
          rem = (rem - amount).toFixed(2);
          rem = parseFloat(rem); 
        }
      }
    }
    if(rem > 0){
      mess = "insufficient";
      return;
    }
    return change;
  }

  function total(){
    return cid.reduce((sum,cur)=> sum+cur[1],0);
  }

  function showMessage(arr){
    if(!mess){
      let content = ``;
      if(total() === 0){
        content = `Status: CLOSED`;
        arr.forEach(val => {
          content += ` ${val[0]}: $${val[1].toFixed(2)}`;
        })
      }
      else{
        content = `<p>Status: OPEN</p>`;
        arr.forEach(val => {
          content += ` ${val[0]}: $${val[1].toFixed(2)}`;
        })
      }
      box.innerHTML = content;
    }
    else if(mess === "alert"){
      alert("Customer does not have enough money to purchase the item");
    }
    else if(mess === "noChange"){
      let content = "<p>No change due - customer paid with exact cash</p>"
      box.innerHTML = content;
    }
    else{
      let content = "<p>Status: INSUFFICIENT_FUNDS</p>";
      box.innerHTML = content;
    }
    mess = null;
  }

  function updateDrawer(){
    let content = '';
    cid.forEach(val => {
      content += `${val[0]}: $${val[1].toFixed(2)}<br>`;
    });
    content += `<strong>Total: $${total().toFixed(2)}</strong>`;
    drawerBox.innerHTML = content;
  }

  updateDrawer();
};
