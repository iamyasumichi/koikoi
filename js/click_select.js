function showDetail(index) {
  // 1. 全ての詳細を一旦非表示にする
  const details = document.querySelectorAll('.select-detail');
  details.forEach(d => d.classList.remove('active'));

  // 2. 全ての花札画像から active クラスを外す
  const imgs = document.querySelectorAll('.hanafuda-img');
  imgs.forEach(i => i.classList.remove('active'));

  // 3. クリックされた番号（index）の要素にだけ active をつける
  details[index].classList.add('active');
  imgs[index].classList.add('active');
}