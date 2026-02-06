// すべての .nav-item に対して処理を行う
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
  // nav-item（開催地など）のリンクを取得
  const link = item.querySelector('a');
  const dropdown = item.querySelector('.dropdown');

  link.addEventListener('click', (e) => {
    // 1. リンク自体のページ移動（href）を無効化する
    e.preventDefault();
    
    // 2. 他の開いているメニューがあれば閉じる（複数のメニューがある場合）
    navItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.querySelector('.dropdown').classList.remove('active');
      }
    });

    // 3. クリックされたメニューの .active を切り替える（出したり消したり）
    dropdown.classList.toggle('active');
  });
});

// メニューの外側をクリックした時に閉じる（親切設計）
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-item')) {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
  }
});