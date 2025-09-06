const input = document.getElementById("search-input");
const btn = document.getElementById("search-button");
const spinner = document.getElementById("spinner");

btn.addEventListener("click", async () => {
  spinner.style.display = "block"; 
  await result();
  spinner.style.display = "none";  
});

async function result(){
  const search = input.value.trim().toLowerCase();
  if(!search) return alert("Please enter a creature name or ID");
  const data = await getData(search);
  if(data) showData(data);
}

async function getData(name) {
  try {
    const res = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${name}`);
    if (!res.ok) throw new Error("Fetch failed");
    const val = await res.json();
    return val;
  } catch (err) {
    alert("Creature not found");
  }
}

function showData(val){
  const article = document.querySelector("article");
  
  document.getElementById("creature-name").textContent = val.name;
  document.getElementById("creature-id").textContent = `ID: ${val.id}`;
  document.getElementById("weight").textContent = `Weight: ${val.weight}`;
  document.getElementById("height").textContent = `Height: ${val.height}`;
  
  const typesContainer = document.getElementById("types");
  typesContainer.innerHTML = ""; 
  val.types.forEach((t, index) => {
    const typeEl = document.createElement("p");
    typeEl.textContent = t.name;
    typeEl.style.setProperty('--i', index);
    typesContainer.appendChild(typeEl);
  });
  
  const ids = ["hp","attack","defense","special-attack","special-defense","speed"];
  ids.forEach((id, ind) => {
  const td = document.getElementById(id);
  td.classList.add("stat"); 
  td.textContent = val.stats[ind].base_stat;
  td.classList.add("show"); 
});


  article.classList.remove("show");
  void article.offsetWidth; 
  article.classList.add("show");
}
