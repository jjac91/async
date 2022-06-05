let baseURL = "http://numbersapi.com";
let favNum = 69;

async function getFact() {
  let res = await axios.get(`${baseURL}/${favNum}/?json`);
  console.log(res);
}

let nums = [7, 13, 263];
async function manyFact() {
  let res = await axios.get(`${baseURL}/${nums}/?json`);
  console.log(res);
}

async function get4Facts() {
  let facts = await Promise.all([
    axios.get(`${baseURL}/${favNum}/?json`),
    axios.get(`${baseURL}/${favNum}/?json`),
    axios.get(`${baseURL}/${favNum}/?json`),
    axios.get(`${baseURL}/${favNum}/?json`),
  ]);
  facts.forEach((fact) => {
    const para = document.createElement("p");
    para.innerHTML = `${fact.data.text}`;

    document.body.appendChild(para);
  });
}

async function drawCard() {
  let response = await axios.get(`http://deckofcardsapi.com/api/deck/new/draw`);
  console.log(
    `${response.data.cards[0].value} of ${response.data.cards[0].suit}`
  );
}

async function draw2Cards() {
  let response = await axios.get(`http://deckofcardsapi.com/api/deck/new/draw`);
  let deck_id = response.data.deck_id;
  console.log(
    `${response.data.cards[0].value} of ${response.data.cards[0].suit}`
  );
  let response2 = await axios.get(
    `http://deckofcardsapi.com/api/deck/${deck_id}/draw`
  );
  console.log(
    `${response2.data.cards[0].value} of ${response2.data.cards[0].suit}`
  );
}

async function setup() {
  let response = await axios.get(
    `http://deckofcardsapi.com/api/deck/new/shuffle/`
  );
  let deck_id = response.data.deck_id;
  const cardArea = document.getElementById("card_slot");
  const btn = document.querySelector("button");
  btn.addEventListener("click", async function () {
    let response = await axios.get(
      `http://deckofcardsapi.com/api/deck/${deck_id}/draw`
    );
    let card = response.data.cards[0].image;
    img = document.createElement("img");
    img.setAttribute("src", `${card}`);
    cardArea.appendChild(img);
    if (response.data.remaining == 0) {
      btn.remove();
    }
  });
}
getFact();
manyFact();
get4Facts();
drawCard();
draw2Cards();
setup();