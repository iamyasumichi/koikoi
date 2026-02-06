const wrap = document.querySelector(".wrap");

//表示したい画像名のリストを作成（0101〜1202まで）
const cardNames = [
    "0101", "0102", "0201", "0202", "0301", "0302", "0401", "0402",
    "0501", "0502", "0601", "0602", "0701", "0702", "0801", "0802",
    "0901", "0902", "1001", "1002", "1101", "1102", "1201", "1202"
];

//JSで div.card を自動生成して wrap に入れる
cardNames.forEach(num => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    // 背景画像としてパスを指定
    cardDiv.style.backgroundImage = `url('./img/Default_small/${num}.png')`;
    cardDiv.setAttribute('aria-hidden', 'true'); // 装飾であることを明示
    wrap.appendChild(cardDiv);
});

const cards = Array.from(document.querySelectorAll(".card"));

const { width: winW, height: winH } = wrap.getBoundingClientRect();
const count = cards.length;

// カードがどれだけ内に配置されるか
const INNER_MARGIN = 0;
const w = winW - INNER_MARGIN * 2;
const h = winH - INNER_MARGIN * 2;
const perimeter = (w + h) * 2;
const step = perimeter / count;

const positions = Array.from({ length: count }, (_, i) => i);
for (let i = positions.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [positions[i], positions[j]] = [positions[j], positions[i]];
}

const animOrders = Array.from({ length: count }, (_, i) => i);
for (let i = animOrders.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [animOrders[i], animOrders[j]] = [animOrders[j], animOrders[i]];
}

cards.forEach((card, i) => {
  const posIndex = positions[i];
  const animOrder = animOrders[i];
  const distance = step * posIndex;

  let x, y, baseAngle;

  if (distance < w) {
    x = INNER_MARGIN + distance;
    y = INNER_MARGIN;
    baseAngle = 0;
  } else if (distance < w + h) {
    x = INNER_MARGIN + w;
    y = INNER_MARGIN + (distance - w);
    baseAngle = Math.PI / 2;
  } else if (distance < w * 2 + h) {
    x = INNER_MARGIN + w - (distance - (w + h));
    y = INNER_MARGIN + h;
    baseAngle = Math.PI;
  } else {
    x = INNER_MARGIN;
    y = INNER_MARGIN + h - (distance - (w * 2 + h));
    baseAngle = -Math.PI / 2;
  }

//   カードの位置の差の大きさを変える（上下）
  const distOffset = (Math.random() - 0.5) * 80;
  const offsetX = Math.cos(baseAngle - Math.PI / 2) * distOffset;
  const offsetY = Math.sin(baseAngle - Math.PI / 2) * distOffset;
//   カードの角度のランダム性の大きさを変える
  const rotOffset = (Math.random() - 0.5) * (80 * Math.PI / 180);

  const zIndex = animOrder;
  const delayOrder = (count - 1) - animOrder;

  card.style.left = `${x + offsetX}px`;
  card.style.top = `${y + offsetY}px`;
  card.style.transform = `translate(-50%, -50%) rotate(${rotOffset}rad)`;

//   カードが配られるスピード
  card.style.transitionDelay = `${animOrder * 0.05}s`;
  card.style.zIndex = animOrder;
});

window.addEventListener('resize', () => location.reload());