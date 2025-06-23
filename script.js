const container = document.getElementById('container');
const searchInput = document.getElementById('search');
let personagens = [];

function criarCard(p) {
  const card = document.createElement('div');
  card.className = 'card';

  const img = document.createElement('img');
  img.src = p.sprite;
  img.alt = p.displayName;

  const nome = document.createElement('h3');
  nome.textContent = p.displayName;

  const cita = document.createElement('p');
  cita.className = 'quote';
  if (p.quotes && p.quotes.length > 0) {
    cita.textContent = `"${p.quotes[Math.floor(Math.random() * p.quotes.length)]}"`;
  }

  card.append(img, nome, cita);
  return card;
}

function renderPersonagens(filtro = '') {
  container.innerHTML = '';
  const filtrados = personagens.filter(p =>
    p.displayName.toLowerCase().includes(filtro.toLowerCase())
  );
  if (filtrados.length === 0) {
    container.innerHTML = `<p>Nenhum personagem encontrado 😢</p>`;
  } else {
    filtrados.forEach(p => container.appendChild(criarCard(p)));
  }
}

function carregarPersonagens() {
  fetch('https://adventure-time-api.herokuapp.com/api/v1/characters')
    .then(res => res.json())
    .then(data => {
      personagens = data;
      renderPersonagens();
    })
    .catch(() => {
      container.innerHTML = `<p>Erro ao carregar personagens. Tente novamente mais tarde.</p>`;
    });
}

searchInput.addEventListener('input', (e) => {
  renderPersonagens(e.target.value);
});

carregarPersonagens();
