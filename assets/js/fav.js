const buttons = document.getElementsByClassName('button');

function toggleFave(button) {
  button.dataset.isFavourite = button.dataset.isFavourite == 'true' ? '' : 'true';
}

for (const b of buttons) {
  b.addEventListener('click', () => { toggleFave(b); });
}