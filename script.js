let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Палка"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const history = document.querySelector("#history");
const weapons = [
  { name: "Палка", power: 5 },
  { name: "Кинжал", power: 30 },
  { name: "Дубина", power: 50 },
  { name: "Меч", power: 100 },
];
const monsters = [
  {
    name: "Слизь",
    level: 2,
    health: 15,
  },
  {
    name: "Клыкастый монстр",
    level: 8,
    health: 60,
  },
  {
    name: "Дракон",
    level: 20,
    health: 300,
  },
];
const locations = [
  {
    name: "Городская площадь",
    "button text": [
      "Посетить лавку",
      "Отправиться в пещеру",
      "Схватка с Драконом",
    ],
    "button functions": [goStore, goCave, fightDragon],
    text: 'Вы на городской площади. Вы видите вывеску "Лавка".',
  },
  {
    name: "Лавка",
    "button text": [
      "Купить 10 здоровья(10 золотых)",
      "Купить оружие(30 золотых)",
      "Вернуться на площадь",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Вы находитесь в лавке.",
  },
  {
    name: "Пещера",
    "button text": [
      "Сразиться со слизью",
      "Сразиться с клыкастым монстром",
      "Вернуться на городскую площадь",
    ],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Вы вошли в пещеру. Вы видите монстров.",
  },
  {
    name: "Битва",
    "button text": ["Атака", "Увернуться", "Сбежать"],
    "button functions": [attack, dodge, goTown],
    text: "Вы сражаетесь с монстром.",
    color: "yellow",
  },
  {
    name: "Смерть монстра",
    "button text": [
      "Вернуться на городскую площадь",
      "Вернуться на городскую площадь",
      "Пасхалка",
    ],
    "button functions": [goTown, goTown, easterEgg],
    text: 'Монстр кричит "Ааххрг!" и умирает. Вы Получили опыт и немного золота.',
    color: "lime",
  },
  {
    name: "Проигрыш",
    "button text": ["ПОВТОР?", "ПОВТОР?", "ПОВТОР?"],
    "button functions": [restart, restart, restart],
    text: "Вы умерли. &#x2620;",
    color: "red",
  },
  {
    name: "Победа",
    "button text": ["ПОВТОР?", "ПОВТОР?", "ПОВТОР?"],
    "button functions": [restart, restart, restart],
    text: "Вы одолели Дракона! ВЫ ПОБЕДИЛИ! &#x1F389;",
    color: "lime",
  },
  {
    name: "Пасхалка",
    "button text": ["2", "8", "Вернуться на городскую площадь."],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Вы нашли секретную игру. Выберите номер выше. Десять чисел определяться случайно. Если среди них будет Ваше число, Вы выиграли!",
    color: "magenta",
  },
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function updateHistory(text, color) {
  history.innerHTML += `<br><span style='color:${color}'>${text}</span>`;
  history.scrollTop = history.scrollHeight;
}

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
  updateHistory(location.text, location.color);
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "У Вас нет достаточно золота чтобы купить здоровье";
    updateHistory(text.innerText, "red");
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Теперь у Вас " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " В Вашем инвентаре есть: " + inventory;
      updateHistory(text.innerText, "lime");
    } else {
      text.innerText = "У Вас нет достаточно золота чтобы купить оружие.";
      updateHistory(text.innerText, "red");
    }
  } else {
    text.innerText = "У Вас уже есть самое мощное оружие!";
    updateHistory(text.innerText, "yellow");
    button2.innerText = "Продать оружие за 15 золотых";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Вы продали " + currentWeapon + ".";
    text.innerText += " В Вашем инвентаре есть: " + inventory;
    updateHistory(text.innerText);
  } else {
    text.innerText = "Не продавайте Ваше единственное оружие!";
    updateHistory(text.innerText, "red");
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "" + monsters[fighting].name + " Атакует.";
  text.innerText +=
    " Вы атаковали монстра используя " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  updateHistory(text.innerText, "yellow");
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " Вы промахнулись.";
    updateHistory(text.innerText, "red");
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " Ваш " + inventory.pop() + " сломался.";
    updateHistory(text.innerText, "red");
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  text.innerText = "Вы увернулись от атаки: " + monsters[fighting].name;
  updateHistory(text.innerText, "lime");
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["Палка"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Вы выбрали " + guess + ". Вот случайные числа:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  updateHistory(text.innerText);
  if (numbers.includes(guess)) {
    text.innerText += "Верно! Вот Ваши 20 золотых!";
    updateHistory(text.innerText, "lime");
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Не верно! Вы потеряли 10 здоровья";
    updateHistory(text.innerText, "red");
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
