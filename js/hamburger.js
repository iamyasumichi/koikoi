const trigger = document.querySelector('.menu-trigger');
const menu = document.querySelector('.side-menu');
const overlay = document.querySelector('.overlay');

trigger.addEventListener('click', () => {
  // クラスの付け外し
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
  
  // ボタン自体のアニメーション（三本線を×にする場合など）
  trigger.classList.toggle('open');
});

// 背景をクリックしても閉じるようにする
overlay.addEventListener('click', () => {
  menu.classList.remove('active');
  overlay.classList.remove('active');
});