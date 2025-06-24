const loadingElement = document.getElementById('loading');
const cepInput = document.getElementById('cepInput');
const searchBtn = document.getElementById('searchBtn');
const errorMessage = document.getElementById('errorMessage');
const resultCard = document.getElementById('resultCard');

const resultFields = {
    cep: document.getElementById('cepResult'),
    logradouro: document.getElementById('logradouro'),
    complemento: document.getElementById('complemento'),
    bairro: document.getElementById('bairro'),
    localidade: document.getElementById('localidade'),
    uf: document.getElementById('uf'),
    ibge: document.getElementById('ibge'),
    gia: document.getElementById('gia'),
    ddd: document.getElementById('ddd'),
    siafi: document.getElementById('siafi')
};

function showLoading() {
    loadingElement.style.display = 'block';
    resultCard.style.display = 'none';
    errorMessage.textContent = '';
}

function hideLoading() {
    loadingElement.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    resultCard.style.display = 'none';
}

function formatCEP(cep) {
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
}

async function fetchCEP(cep) {
    showLoading();
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) throw new Error('Erro ao consultar CEP');
        
        const data = await response.json();
        if (data.erro) throw new Error('CEP não encontrado');
        
        return data;
    } catch (error) {
        throw error;
    } finally {
        hideLoading();
    }
}

function displayResult(data) {
    for (const [field, element] of Object.entries(resultFields)) {
        element.textContent = data[field] || 'Não informado';
    }
    resultCard.style.display = 'block';
}

function handleSearch() {
    const cep = cepInput.value.trim();
    
    if (!cep || cep.length !== 8 || !/^\d+$/.test(cep)) {
        showError('Por favor, digite um CEP válido com 8 dígitos');
        return;
    }

    fetchCEP(cep)
        .then(data => {
            displayResult(data);
            errorMessage.textContent = '';
        })
        .catch(error => {
            showError(error.message);
        });
}

cepInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
});

cepInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

searchBtn.addEventListener('click', handleSearch);