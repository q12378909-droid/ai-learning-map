(() => {
  const query = document.querySelector('#query');
  const group = document.querySelector('#group');
  const cards = [...document.querySelectorAll('.entry')];
  const text = cards.map(card => card.textContent.toLocaleLowerCase());
  function filter() {
    const words = query.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    cards.forEach((card, index) => {
      card.hidden = Boolean(group.value && card.dataset.group !== group.value) || !words.every(word => text[index].includes(word));
      if (!card.hidden) visible++;
    });
    document.querySelector('#count').textContent = `顯示 ${visible} / ${cards.length} 組`;
    document.querySelector('#empty').hidden = visible !== 0;
  }
  query.addEventListener('input', filter);
  group.addEventListener('change', filter);
  document.querySelector('#reset').addEventListener('click', () => {
    query.value = ''; group.value = ''; filter(); query.focus();
  });
  filter();
})();
