const observerOptions = {
  root: null, // ビューポート（画面）を基準にする
  rootMargin: '0px',
  threshold: 0.2 // 要素が20%見えたら実行
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // 画面内に入ったら
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // 一度表示されたら監視をやめる（何度もふわっとさせたい場合は下の一行を消す）
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// 対象のセレクタをすべて指定して監視を開始
const targets = document.querySelectorAll('.earth-text-first, .earth-text-second, .earth-text-third, .intro-second, .last-second');
targets.forEach(target => {
  observer.observe(target);
});