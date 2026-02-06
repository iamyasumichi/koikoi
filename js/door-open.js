window.addEventListener('scroll', () => {
  const wrapper = document.querySelector('.section-wrapper');
  const leftSide = document.querySelector('.left');
  const rightSide = document.querySelector('.right');
  const slidingText = document.querySelector('.sliding-text');

  const rect = wrapper.getBoundingClientRect();
  const scrollTop = -rect.top;
  const wrapperHeight = rect.height - window.innerHeight;

  let progress = scrollTop / wrapperHeight;
  progress = Math.max(0, Math.min(1, progress));

  // --- 1. 文字の動きの計算を修正 ---
  // progressが 0.3 〜 0.4 くらいの時に、動きを「停滞」させる計算を入れます
  const textProgressRaw = Math.max(0, Math.min(1, progress / 0.6));
  
  // 【ここがポイント】
  // そのまま使うのではなく、特定の範囲（例: 0.5付近）で変化を鈍くする
  let textProgress;
  if (textProgressRaw < 0.2) {
    // 前半：通常通り進む（少し早め）
    textProgress = textProgressRaw * 2.5; 
  } else if (textProgressRaw < 0.8) {
    // 中盤：0.5（真ん中）で固定して止める
    textProgress = 0.5; 
  } else {
    // 後半：再び動き出す
    textProgress = 0.5 + (textProgressRaw - 0.8) * 2.5;
  }

  // Y軸の移動（0.5の時に 0 になるように計算）
  const yPos = (textProgress * 80) - 40; 
  slidingText.style.transform = `translateY(${yPos}vh)`;
  
  // 透明度も 0.5 付近でしっかり見えるように
  slidingText.style.opacity = Math.sin(textProgress * Math.PI);

  // --- 2. 門の動き（変更なし、またはお好みで調整） ---
  let gateProgress = (progress - 0.4) / 0.6; 
  gateProgress = Math.max(0, Math.min(1, gateProgress));

  leftSide.style.transform = `translateX(-${gateProgress * 100}%)`;
  rightSide.style.transform = `translateX(${gateProgress * 100}%)`;
});