// Define a data de início do namoro (Ano, Mês - 1, Dia)
// Nota: Em JavaScript, os meses começam do 0 (Janeiro é 0, Abril é 3)
const dataInicio = new Date(2025, 3, 6, 0, 0, 0);

// =============== FUNCIONALIDADE DE MENU MOBILE ===============

function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

// =============== LOGIN SCREEN ===============
async function hashPassword(pass) {
    const enc = new TextEncoder();
    const data = enc.encode(pass);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function scrollToSection(event) {
    event.preventDefault();
    
    const href = event.target.getAttribute('href');
    const section = document.querySelector(href);
    
    if (section) {
        // Fechar menu
        toggleMenu();
        
        // Scroll suave para a seção
        setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }
}

// Fechar menu ao clicar fora
document.addEventListener('click', function(event) {
    const menu = document.getElementById('mobile-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (menu && menuToggle) {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            if (menu.classList.contains('active')) {
                toggleMenu();
            }
        }
    }
});

// Fechar menu ao pressionar ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const menu = document.getElementById('mobile-menu');
        if (menu && menu.classList.contains('active')) {
            toggleMenu();
        }
    }
});

// =============== FUNCIONALIDADE DE TELAS FULLSCREEN ===============

function mostrarGaleriaFullscreen(event) {
    event.preventDefault();
    toggleMenu();
    const galeriaFullscreen = document.getElementById('galeria-fullscreen');
    const appContainer = document.querySelector('.app-container');
    
    galeriaFullscreen.classList.add('active');
    appContainer.style.display = 'none';
    
    // Sincronizar fotos na galeria fullscreen
    renderizarGaleriaFullscreen();
}

function mostrarMensagemFullscreen(event) {
    event.preventDefault();
    toggleMenu();
    const mensagemFullscreen = document.getElementById('mensagem-fullscreen');
    const appContainer = document.querySelector('.app-container');
    
    mensagemFullscreen.classList.add('active');
    appContainer.style.display = 'none';
}

function mostrarDesejosFullscreen(event) {
    event.preventDefault();
    toggleMenu();
    const desejosFullscreen = document.getElementById('desejos-fullscreen');
    const appContainer = document.querySelector('.app-container');
    
    desejosFullscreen.classList.add('active');
    appContainer.style.display = 'none';
    renderizarDesejos();
    atualizarBarraDesejos();
}

const desejosVida = [
    { icon: '💍', title: 'Casar com você', description: 'Um sim eterno, nosso amor celebrado em cada detalhe.', image: '💒' },
    { icon: '✈️', title: 'Viajar o mundo juntos', description: 'Passagens, mapas e destinos para guardar memórias a dois.', image: '🌍' },
    { icon: '🏡', title: 'Ter nossa casa dos sonhos', description: 'Um lar aconchegante, cheio de afeto, luz e plantas.', image: '🏡' },
    { icon: '👶', title: 'Construir nossa família', description: 'Momentos doces e doçura no futuro de coração cheio.', image: '👼' },
    { icon: '📸', title: 'Registrar momentos especiais', description: 'Fotos, risos e lembranças para sempre no álbum do amor.', image: '📷' },
    { icon: '🌅', title: 'Envelhecer ao seu lado', description: 'A cada pôr do sol, nosso amor mais sereno e presente.', image: '🌇' },
    { icon: '🎓', title: 'Conquistar nossos sonhos profissionais', description: 'Realizações construídas com cumplicidade e apoio mútuo.', image: '📜' },
    { icon: '🐶', title: 'Ter um pet juntos', description: 'Um patinha a mais para encher nossa casa de alegria.', image: '🐾' }
];

function renderizarDesejos() {
    const grid = document.getElementById('desejos-grid');
    if (!grid) return;
    grid.innerHTML = '';

    desejosVida.forEach((desejo, index) => {
        const card = document.createElement('article');
        card.className = 'polaroid-card';
        card.style.setProperty('--tilt', `${Math.random() * 9 - 4.5}deg`);
        card.innerHTML = `
            <div class="polaroid-tape"></div>
            <div class="polaroid-image">
                <span class="polaroid-emoji">${desejo.image}</span>
            </div>
            <div class="polaroid-details">
                <span class="card-icon">${desejo.icon}</span>
                <h3 class="card-title">${desejo.title}</h3>
                <p class="card-desc">${desejo.description}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

function atualizarBarraDesejos() {
    const content = document.querySelector('#desejos-fullscreen .fullscreen-content');
    const thumb = document.querySelector('#desejos-fullscreen .desejos-scrollbar-thumb');
    if (!content || !thumb) return;

    const maxScroll = content.scrollHeight - content.clientHeight;
    const percentual = maxScroll > 0 ? (content.scrollTop / maxScroll) * 100 : 0;
    thumb.style.width = percentual + '%';
}

function setupDesejosScrollBar() {
    const content = document.querySelector('#desejos-fullscreen .fullscreen-content');
    if (!content) return;
    content.addEventListener('scroll', atualizarBarraDesejos);
    content.addEventListener('touchmove', atualizarBarraDesejos);
}

function voltarParaApp() {
    const galeriaFullscreen = document.getElementById('galeria-fullscreen');
    const mensagemFullscreen = document.getElementById('mensagem-fullscreen');
    const playlistFullscreen = document.getElementById('playlist-fullscreen');
    const desejosFullscreen = document.getElementById('desejos-fullscreen');
    const quizFullscreen = document.getElementById('quiz-fullscreen');
    const fatosFullscreen = document.getElementById('fatos-fullscreen');
    const appContainer = document.querySelector('.app-container');
    
    galeriaFullscreen.classList.remove('active');
    mensagemFullscreen.classList.remove('active');
    playlistFullscreen.classList.remove('active');
    if (quizFullscreen) quizFullscreen.classList.remove('active');
    if (fatosFullscreen) fatosFullscreen.classList.remove('active');
    if (desejosFullscreen) desejosFullscreen.classList.remove('active');
    appContainer.style.display = 'flex';
    
    // Fechar menu ao voltar
    const menu = document.getElementById('mobile-menu');
    if (menu.classList.contains('active')) {
        toggleMenu();
    }
}

// =============== QUIZ DO CASAL ===============
const quizQuestions = [
    { q: 'Qual é o nome carinhoso favorito dela?', options: ['Lindinha','Meu Sol','Princesa','Amorzinho'], a: 2 },
    { q: 'Qual foi a nossa primeira música?', options: ['Girassol','Medo Bobo','Quando Bate Aquela Saudade','Bem'], a: 1 },
    { q: 'Onde foi nosso primeiro encontro?', options: ['Cinema','Parque','Café','Praia'], a: 2 },
    { q: 'Qual é a comida favorita dele?', options: ['Pizza','Sushi','Churrasco','Lasanha'], a: 0 },
    { q: 'Qual animal representa a nossa relação?', options: ['Cachorro','Gato','Panda','Golfinho'], a: 3 },
    { q: 'Qual é a nossa cor favorita em comum?', options: ['Rosa','Azul','Verde','Roxo'], a: 0 },
    { q: 'Qual é o destino dos nossos sonhos?', options: ['Itália','Japão','Maldivas','Noruega'], a: 2 },
    { q: 'Qual apelido só nós usamos?', options: ['Bebê','Amor','Carinho','Meu Mundo'], a: 1 }
];

let quizIndex = 0;
let quizScore = 0;

function mostrarQuizFullscreen(event) {
    if (event) { event.preventDefault(); toggleMenu(); }
    const quizFullscreen = document.getElementById('quiz-fullscreen');
    const appContainer = document.querySelector('.app-container');
    if (!quizFullscreen || !appContainer) return;
    quizFullscreen.classList.add('active');
    appContainer.style.display = 'none';
    iniciarQuiz();
}

function iniciarQuiz() {
    quizIndex = 0;
    quizScore = 0;
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';
    renderizarPergunta();
}

function renderizarPergunta() {
    const content = document.getElementById('quiz-content');
    const counter = document.getElementById('quiz-counter');
    const fill = document.getElementById('quiz-progress-fill');
    if (!content || !counter || !fill) return;

    const total = quizQuestions.length;
    const item = quizQuestions[quizIndex];
    counter.textContent = `${quizIndex + 1}/${total}`;
    fill.style.width = `${((quizIndex) / total) * 100}%`;

    let html = `<div class="quiz-question"><h3>${item.q}</h3><div class="quiz-options">`;
    item.options.forEach((opt, i) => {
        html += `<button class="quiz-option" onclick="responderQuiz(${i})">${opt}</button>`;
    });
    html += '</div></div>';
    content.innerHTML = html;
}

function responderQuiz(choice) {
    const item = quizQuestions[quizIndex];
    if (choice === item.a) quizScore++;
    quizIndex++;
    if (quizIndex >= quizQuestions.length) {
        mostrarResultadoQuiz();
    } else {
        renderizarPergunta();
    }
}

function mostrarResultadoQuiz() {
    const content = document.getElementById('quiz-content');
    const result = document.getElementById('quiz-result');
    const scoreEl = document.getElementById('score-display');
    const fill = document.getElementById('quiz-progress-fill');
    if (!result || !scoreEl) return;
    content.style.display = 'none';
    result.style.display = 'block';
    scoreEl.textContent = `${quizScore} de ${quizQuestions.length} acertos`;
    fill.style.width = '100%';
}

function reiniciarQuiz() {
    iniciarQuiz();
}

// =============== FATOS SOBRE NÓS ===============
const fatosList = [
    { title: 'Nossa cor favorita', value: 'Rosa' },
    { title: 'Animal favorito', value: 'Golfinho' },
    { title: 'Comida favorita', value: 'Pizza' },
    { title: 'Nome carinhoso', value: 'Amorzinho' },
    { title: 'Primeira música', value: 'Medo Bobo' },
    { title: 'Destino dos sonhos', value: 'Maldivas' }
];

function mostrarFatosFullscreen(event) {
    if (event) { event.preventDefault(); toggleMenu(); }
    const fatosFullscreen = document.getElementById('fatos-fullscreen');
    const appContainer = document.querySelector('.app-container');
    if (!fatosFullscreen || !appContainer) return;
    fatosFullscreen.classList.add('active');
    appContainer.style.display = 'none';
    renderizarFatos();
}

function renderizarFatos() {
    const grid = document.getElementById('fatos-grid');
    if (!grid) return;
    grid.innerHTML = '';
    fatosList.forEach(f => {
        const card = document.createElement('div');
        card.className = 'fato-card';
        card.innerHTML = `<div class="fato-title">${f.title}</div><div class="fato-value">${f.value}</div>`;
        grid.appendChild(card);
    });
}

function renderizarGaleriaFullscreen() {
    const galleryGridFull = document.getElementById('gallery-grid-full');
    galleryGridFull.innerHTML = '';
    
    // Criar 20 cards
    for (let i = 0; i < 20; i++) {
        const fotoIndex = i;
        const foto = fotos[i];
        
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card-full';
        
        if (foto) {
            // Card com foto
            photoCard.innerHTML = `
                <img src="${foto.data}" alt="Foto ${i + 1}" onclick="abrirModalFoto(${i})">
                <button class="delete-btn" onclick="deletarFoto(${foto.id})">✕</button>
            `;
        } else {
            // Card vazio com botão de adicionar
            photoCard.className = 'photo-card-full empty';
            photoCard.innerHTML = '+';
            photoCard.onclick = () => {
                // Criar um input file temporário
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.multiple = true;
                
                input.onchange = function(event) {
                    const arquivos = Array.from(event.target.files);
                    
                    arquivos.forEach(arquivo => {
                        if (!arquivo.type.startsWith('image/')) {
                            alert('Apenas arquivos de imagem são permitidos!');
                            return;
                        }
                        
                        if (fotos.length >= 20) {
                            alert('Limite de 20 fotos atingido!');
                            return;
                        }
                        
                        const reader = new FileReader();
                        
                        reader.onload = function(e) {
                            fotos.push({
                                id: Date.now() + Math.random(),
                                data: e.target.result,
                                data_adicionada: new Date().toLocaleDateString('pt-BR')
                            });
                            
                            localStorage.setItem('galeriafoto', JSON.stringify(fotos));
                            renderizarGaleria();
                            renderizarGaleriaFullscreen();
                            renderizarSlideshow();
                        };
                        
                        reader.readAsDataURL(arquivo);
                    });
                };
                
                input.click();
            };
        }
        
        galleryGridFull.appendChild(photoCard);
    }
}

// Sincronizar upload de fotos entre os inputs
// Removido - agora cada card vazio adiciona foto individualmente

function atualizarContador() {
    const agora = new Date();
    const diferencaConstante = agora - dataInicio;

    // Conversões matemáticas para tempo
    const dias = Math.floor(diferencaConstante / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencaConstante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencaConstante % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencaConstante % (1000 * 60)) / 1000);

    // Insere os dados nas caixas de texto colocando um "0" na frente se for menor que 10
    document.getElementById("days").innerText = String(dias).padStart(2, '0');
    document.getElementById("hours").innerText = String(horas).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutos).padStart(2, '0');
    document.getElementById("seconds").innerText = String(segundos).padStart(2, '0');
}

// Inicia a função assim que a página abre
atualizarContador();

// Faz a função rodar a cada 1 segundo (1000 milissegundos)
setInterval(atualizarContador, 1000);

// =============== FUNCIONALIDADE DE GALERIA ===============

// Array para armazenar as fotos (usando localStorage para persistência)
let fotos = [];
const storageFotos = localStorage.getItem('galeriafoto');

try {
    fotos = storageFotos ? JSON.parse(storageFotos) : [];
    if (!Array.isArray(fotos)) {
        fotos = [];
    }
} catch (err) {
    fotos = [];
}

// Elementos do DOM
const photoUpload = null;
const galleryGrid = null;

// Carregar imagens predefinidas da pasta images se a galeria estiver vazia
function carregarImagensPredefinidas() {
    if (fotos.length > 0) return; // Se já tem fotos, não carregar
    
    const imagensDisponiveis = [
        'no.jpg', 'no1.jpg', 'no2.jpg', 'no3.jpg', 'no4.jpg', 'no5.jpg',
        'no6.jpg', 'n07.jpg', 'no8.jpg', 'no9.png', 'no10.jpg', 'no11.jpg',
        'no12.jpg', 'no13.jpg', 'no14.jpg', 'no15.jpg', 'no16.jpg', 'no17.jpg',
        'no18.jpg', 'no19.jpg'
    ];
    
    fotos = imagensDisponiveis.map(nomeImagem => ({
        id: Date.now() + Math.random(),
        data: `images/${nomeImagem}`,
        data_adicionada: new Date().toLocaleDateString('pt-BR')
    }));
    
    localStorage.setItem('galeriafoto', JSON.stringify(fotos));
    renderizarGaleria();
    renderizarGaleriaFullscreen();
    renderizarSlideshow();
}

function inicializarGaleria() {
    if (fotos.length === 0) {
        carregarImagensPredefinidas();
    } else {
        renderizarGaleria();
        renderizarGaleriaFullscreen();
        renderizarSlideshow();
    }
}

let slideshowIndex = 0;
let slideshowPlaying = true;
let slideshowInterval = null;

inicializarGaleria();

// Quando o usuário seleciona fotos
if (photoUpload) {
    photoUpload.addEventListener('change', function(event) {
        const arquivos = Array.from(event.target.files);
        
        arquivos.forEach(arquivo => {
            // Verifica se é uma imagem
            if (!arquivo.type.startsWith('image/')) {
                alert('Apenas arquivos de imagem são permitidos!');
                return;
            }
            
            // Cria um FileReader para converter a imagem para base64
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Adiciona a foto ao array
                fotos.push({
                    id: Date.now(),
                    data: e.target.result,
                    data_adicionada: new Date().toLocaleDateString('pt-BR')
                });
                
                // Salva as fotos no localStorage
                localStorage.setItem('galeriafoto', JSON.stringify(fotos));
                
                // Atualiza a visualização da galeria e slideshow
                renderizarGaleria();
            };
            
            reader.readAsDataURL(arquivo);
        });
        
        // Limpa o input para permitir selecionar os mesmos arquivos novamente se necessário
        photoUpload.value = '';
    });
}

// Função para renderizar a galeria
function renderizarGaleria() {
    if (galleryGrid) {
        galleryGrid.innerHTML = '';
        
        if (fotos.length === 0) {
            galleryGrid.innerHTML = '<div class="photo-card empty-card">Nenhuma foto ainda. Clique em adicionar fotos para começar.</div>';
        } else {
            fotos.forEach((foto, index) => {
                const photoCard = document.createElement('div');
                photoCard.className = 'photo-card';
                photoCard.innerHTML = '<img src="' + foto.data + '" alt="Foto" onclick="abrirModalFoto(' + index + ')" style="cursor: pointer;"><button class="delete-btn" onclick="deletarFoto(' + foto.id + ')">✕</button>';
                galleryGrid.appendChild(photoCard);
            });
        }
    }
    
    renderizarSlideshow();
}

// Função para deletar uma foto
function deletarFoto(id) {
    if (confirm('Tem certeza que deseja deletar esta foto?')) {
        fotos = fotos.filter(foto => foto.id !== id);
        localStorage.setItem('galeriafoto', JSON.stringify(fotos));
        renderizarGaleria();
    }
}

// =============== FUNCIONALIDADE DE SLIDESHOW ===============

function renderizarSlideshow() {
    const slideshowDiv = document.getElementById('slideshow');
    const indicatorsDiv = document.getElementById('slide-indicators');
    const counterSpan = document.getElementById('slide-counter');
    
    if (!slideshowDiv || !indicatorsDiv || !counterSpan) return;
    if (fotos.length > 0 && slideshowIndex >= fotos.length) {
        slideshowIndex = 0;
    }
    
    console.log('Renderizando slideshow com', fotos.length, 'fotos');
    
    // Limpar slides anteriores
    slideshowDiv.innerHTML = '';
    indicatorsDiv.innerHTML = '';
    
    if (fotos.length === 0) {
        // Mostrar slide vazio
        const emptySlide = document.createElement('div');
        emptySlide.className = 'slide fade active';
        emptySlide.innerHTML = `
            <div style="text-align: center; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                <p style="color: #ccc; font-size: 1rem;">Nenhuma foto na galeria<br>Adicione suas fotos para começar!</p>
            </div>
        `;
        slideshowDiv.appendChild(emptySlide);
        counterSpan.textContent = '0 / 0';
    } else {
        // Criar slides
        fotos.forEach((foto, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide fade';
            if (index === 0) slide.classList.add('active');
            
            slide.innerHTML = `
                <img src="${foto.data}" alt="Foto ${index + 1}">
                <div class="slide-info">${foto.data_adicionada}</div>
            `;
            slideshowDiv.appendChild(slide);
            
            // Criar indicador
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.onclick = () => mostrarSlide(index);
            indicatorsDiv.appendChild(indicator);
        });
        
        counterSpan.textContent = `${slideshowIndex + 1} / ${fotos.length}`;
        iniciarSlideshow();
    }
}

function mudaSlide(n) {
    if (fotos.length === 0) return;
    
    slideshowIndex = (slideshowIndex + n + fotos.length) % fotos.length;
    mostrarSlide(slideshowIndex);
    
    // Reiniciar o intervalo ao clicar nos controles
    if (slideshowPlaying) {
        clearInterval(slideshowInterval);
        iniciarSlideshow();
    }
}

function mostrarSlide(n) {
    if (fotos.length === 0) return;
    
    slideshowIndex = (n + fotos.length) % fotos.length;
    
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const counterSpan = document.getElementById('slide-counter');
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    if (slides[slideshowIndex]) {
        slides[slideshowIndex].classList.add('active');
    }
    if (indicators[slideshowIndex]) {
        indicators[slideshowIndex].classList.add('active');
    }
    
    counterSpan.textContent = `${slideshowIndex + 1} / ${fotos.length}`;
}

function iniciarSlideshow() {
    if (!slideshowPlaying || fotos.length === 0) return;
    
    clearInterval(slideshowInterval);
    slideshowInterval = setInterval(() => {
        slideshowIndex = (slideshowIndex + 1) % fotos.length;
        mostrarSlide(slideshowIndex);
    }, 2000); // Mudar de foto a cada 2 segundos
}

function togglePlayPause() {
    const btn = document.getElementById('play-pause-btn');
    
    if (fotos.length === 0) return;
    
    slideshowPlaying = !slideshowPlaying;
    
    if (slideshowPlaying) {
        btn.textContent = '⏸';
        iniciarSlideshow();
    } else {
        btn.textContent = '▶';
        clearInterval(slideshowInterval);
    }
}

// =============== FUNCIONALIDADE DE MODAL DE FOTOS ===============

let fotoAtualIndex = 0;
const photoModal = document.getElementById('photo-modal');
const modalPhoto = document.getElementById('modal-photo');
const photoCounter = document.getElementById('photo-counter');
const photoDate = document.getElementById('photo-date');

// Função para abrir o modal com uma foto específica
function abrirModalFoto(index) {
    if (fotos.length === 0) return;
    
    fotoAtualIndex = index;
    const foto = fotos[index];
    
    modalPhoto.src = foto.data;
    photoCounter.textContent = (index + 1) + ' / ' + fotos.length;
    photoDate.textContent = 'Adicionada em: ' + foto.data_adicionada;
    
    photoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Função para fechar o modal
function fecharModalFoto() {
    photoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Função para ir para a próxima foto
function proximaFoto() {
    if (fotos.length === 0) return;
    fotoAtualIndex = (fotoAtualIndex + 1) % fotos.length;
    abrirModalFoto(fotoAtualIndex);
}

// Função para ir para a foto anterior
function fotoAnterior() {
    if (fotos.length === 0) return;
    fotoAtualIndex = (fotoAtualIndex - 1 + fotos.length) % fotos.length;
    abrirModalFoto(fotoAtualIndex);
}

// Fechar modal ao clicar fora da imagem
photoModal.addEventListener('click', function(event) {
    if (event.target === photoModal) {
        fecharModalFoto();
    }
});

// Navegação com teclado
document.addEventListener('keydown', function(event) {
    if (!photoModal.classList.contains('active')) return;
    
    if (event.key === 'ArrowRight') proximaFoto();
    if (event.key === 'ArrowLeft') fotoAnterior();
    if (event.key === 'Escape') fecharModalFoto();
});

// =============== EFEITO DE DIGITAÇÃO (TYPEWRITER) ===============

function efetoDigitacao(elemento, texto, velocidade = 40) {
    elemento.innerHTML = '';
    let indice = 0;
    
    function digitar() {
        if (indice < texto.length) {
            const caracter = texto[indice];
            if (caracter === '\n') {
                elemento.innerHTML += '<br>';
            } else {
                elemento.textContent += caracter;
            }
            indice++;
            setTimeout(digitar, velocidade);
        }
    }
    
    digitar();
}

// Função para mostrar mensagem com efeito de digitação
function mostrarMensagemFullscreen(event) {
    if (event) {
        event.preventDefault();
        toggleMenu();
    }
    const mensagemFullscreen = document.getElementById('mensagem-fullscreen');
    const appContainer = document.querySelector('.app-container');
    
    mensagemFullscreen.classList.add('active');
    appContainer.style.display = 'none';
    
    // Texto gigante e emocionante
    const textoMensagem = `Amo você!

Emanuela, preciso que você saiba que cada dia ao seu lado é um privilégio indescritível. Você é o amor da minha vida, a razão do meu sorriso todos os dias, a respiração que me mantém vivo.

É uma gratidão imensa ter você em minha vida. Quando acordo, a primeira coisa que penso é em você. Quando vejo algo bonito, quero compartilhar com você. Quando tenho medo, você é meu conforto. Quando tenho alegria, você é minha razão.

Você me completa de formas que nunca achei que seria possível. Sua risada toca meu coração de um jeito que nenhuma outra coisa consegue. Seus olhos me fazem esquecer do mundo inteiro. Seu abraço é o lugar mais seguro do universo.

Prometemos um ao outro que seríamos companheiros, e cada dia me vejo mais apaixonado por você. Você é meu melhor amigo, meu amor, meu tudo. Sonho com nosso futuro, com cada momento que vamos construir juntos.

Obrigado por confiar em mim, por me escolher, por estar comigo nos momentos fáceis e nos difíceis. Você é a pessoa mais especial, mais bela, mais incrível que já conheci.

Te amo com toda a força do meu coração, Emanuela. Você é meu amor eterno, meu forever, minha vida.

❤️ 💕 ❤️`;

    const elementoTexto = document.getElementById('typing-text');
    efetoDigitacao(elementoTexto, textoMensagem, 35);
}

// =============== FUNCIONALIDADE DE PLAYLIST ===============

// Lista de músicas românticas
const playlistMusicas = [
    { title: "Bem", artist: "Para você", duration: "3:45", src: "musicabem.mp3", cover: "🎼" },
    { title: "Quando Bate Aquela Saudade", artist: "Saudade", duration: "3:52", src: "musicasaudade.mp3", cover: "🎶" },
    { title: "Tempo Perdido", artist: "Tempo Perdido", duration: "3:45", src: "musicatempo.mp3", cover: "🌹" },
    { title: "Medo Bobo", artist: "Medo Bobo", duration: "3:45", src: "musicamedo.mp3", cover: "❤️" },
    { title: "Girassol", artist: "Girassol", duration: "3:52", src: "musicagirassol.mp3", cover: "🌻" },
    { title: "Dizeres", artist: "Dizeres", duration: "4:10", src: "musicadizeres.mp3", cover: "💌" },
    { title: "Aonde Quer Que Eu Vá", artist: "Aonde Quer Que Eu Vá", duration: "3:38", src: "musicaaonde.mp3", cover: "✈️" },
    { title: "Um Amor Puro", artist: "Um Amor Puro", duration: "3:50", src: "musicapuro.mp3", cover: "✨" },
    { title: "Onde Anda Você", artist: "Onde Anda Você", duration: "3:42", src: "musicavoce.mp3", cover: "🌙" },
    { title: "Flor de Tangerina", artist: "Flor de Tangerina", duration: "3:47", src: "musicaflor.mp3", cover: "🍊" },
    { title: "Céu Azul", artist: "Céu Azul", duration: "3:58", src: "musicaceu.mp3", cover: "☁️" },
    { title: "Como Tudo Deve Ser", artist: "Como Tudo Deve Ser", duration: "4:12", src: "musicaser.mp3", cover: "🎵" },
    { title: "Oração", artist: "Oração", duration: "3:35", src: "musicaoracao.mp3", cover: "🙏" }
];

let playlistAtualIndex = 0;
let playlistPlaying = false;
const audioPlayer = document.getElementById('audio-player');

function inicializarPlaylist() {
    renderizarPlaylist();
    carregarMusica(0);
}

function renderizarPlaylist() {
    const playlistList = document.getElementById('playlist-list');
    playlistList.innerHTML = '';
    
    playlistMusicas.forEach((musica, index) => {
        const item = document.createElement('div');
        item.className = 'playlist-item' + (index === playlistAtualIndex ? ' active' : '');
        item.innerHTML = `
            <div class="playlist-item-name">${musica.title}</div>
            <div class="playlist-item-duration">${musica.duration}</div>
        `;
        item.onclick = () => carregarMusica(index);
        playlistList.appendChild(item);
    });
}

function carregarMusica(index) {
    playlistAtualIndex = index;
    const musica = playlistMusicas[index];
    
    document.getElementById('song-title').textContent = musica.title;
    document.getElementById('artist-name').textContent = musica.artist;
    document.getElementById('album-art').textContent = musica.cover || '♪';
    
    renderizarPlaylist();
    
    // Carregar arquivo de áudio
    audioPlayer.src = musica.src;
}

function setVolume(value) {
    if (!audioPlayer) return;
    audioPlayer.volume = Math.min(Math.max(value / 100, 0), 1);
}

function createConfettiPiece(color, left) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.setProperty('--x', `${Math.random() * 40 - 20}px`);
    piece.style.left = `${left}%`;
    piece.style.background = color;
    piece.style.animation = `confetti-fall ${2 + Math.random() * 1.5}s ease-in forwards`;
    piece.style.opacity = '0.9';
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    return piece;
}

function createHeartPiece(left) {
    const heart = document.createElement('div');
    heart.className = 'heart-piece';
    heart.style.setProperty('--x', `${Math.random() * 24 - 12}px`);
    heart.style.left = `${left}%`;
    heart.textContent = ['❤️','💖','💗','💕'][Math.floor(Math.random() * 4)];
    heart.style.animation = `heart-float ${2 + Math.random() * 1.5}s ease-out forwards`;
    return heart;
}

function animateLoginConfetti() {
    const container = document.getElementById('login-confetti');
    if (!container) return;
    const colors = ['#ff6b9d', '#ffc4dd', '#ff8ec2', '#ffd1e6', '#ffb5d7'];
    const pieces = [];
    
    for (let i = 0; i < 16; i++) {
        const left = Math.random() * 95;
        const piece = createConfettiPiece(colors[Math.floor(Math.random() * colors.length)], left);
        container.appendChild(piece);
        pieces.push(piece);
    }
    for (let i = 0; i < 10; i++) {
        const left = Math.random() * 95;
        const heart = createHeartPiece(left);
        container.appendChild(heart);
        pieces.push(heart);
    }
    
    setTimeout(() => {
        pieces.forEach(el => el.remove());
    }, 2600);
}

function showAppForUser() {
    const appContainer = document.querySelector('.app-container');
    const loginScreen = document.getElementById('login-screen');
    if (loginScreen) {
        loginScreen.classList.add('fade-out');
    }
    if (appContainer) {
        appContainer.style.display = 'flex';
        appContainer.classList.add('fade-in');
    }

    setTimeout(() => {
        if (loginScreen) {
            loginScreen.style.display = 'none';
            loginScreen.classList.remove('fade-out');
        }
        if (appContainer) {
            appContainer.classList.remove('fade-in');
        }
    }, 520);
}

function showLoginScreen() {
    const appContainer = document.querySelector('.app-container');
    const loginScreen = document.getElementById('login-screen');
    if (loginScreen) loginScreen.style.display = 'flex';
    if (appContainer) appContainer.style.display = 'none';
}

async function handleLoginSubmit(username, password) {
    const stored = localStorage.getItem('bb_user');
    const storedHash = localStorage.getItem('bb_pass');
    const msgBox = document.getElementById('login-msg');

    if (username !== stored) {
        if (msgBox) { msgBox.textContent = 'Usuário incorreto.'; msgBox.style.display = 'block'; }
        return;
    }

    const hash = await hashPassword(password);
    if (hash === storedHash) {
        localStorage.setItem('bb_logged', '1');
        animateLoginConfetti();
        setTimeout(showAppForUser, 900);
    } else {
        if (msgBox) { msgBox.textContent = 'Senha incorreta.'; msgBox.style.display = 'block'; }
    }
}

async function initializeLogin() {
    const form = document.getElementById('login-form');
    const msgBox = document.getElementById('login-msg');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('login-name');
        const passInput = document.getElementById('login-pass');
        const username = nameInput ? nameInput.value.trim() : '';
        const password = passInput ? passInput.value : '';
        if (!username || !password) {
            if (msgBox) { msgBox.textContent = 'Preencha usuário e senha.'; msgBox.style.display = 'block'; }
            return;
        }
        await handleLoginSubmit(username, password);
    });
}

function setupVolumeControl() {
    const volumeInput = document.getElementById('volume-input');
    if (!volumeInput) return;
    setVolume(volumeInput.value);
    volumeInput.addEventListener('input', (e) => {
        setVolume(e.target.value);
    });
}

async function appReady() {
    await initializeLogin();
    setupVolumeControl();
    setupDesejosScrollBar();
}

// DOMContentLoaded listener below

document.addEventListener('DOMContentLoaded', async () => {
    // Ensure default single account exists (username: bbzinha, password: 0604)
    const defaultUser = 'bbzinha';
    const defaultPass = '0604';
    if (!localStorage.getItem('bb_user') || !localStorage.getItem('bb_pass')) {
        const defHash = await hashPassword(defaultPass);
        localStorage.setItem('bb_user', defaultUser);
        localStorage.setItem('bb_pass', defHash);
    }

    // Sempre mostrar tela de login ao abrir a página.
    showLoginScreen();
    await appReady();
});

function proximaPlaylist() {
    playlistAtualIndex = (playlistAtualIndex + 1) % playlistMusicas.length;
    carregarMusica(playlistAtualIndex);
    if (playlistPlaying) {
        audioPlayer.play();
    }
}

function playlistAnterior() {
    playlistAtualIndex = (playlistAtualIndex - 1 + playlistMusicas.length) % playlistMusicas.length;
    carregarMusica(playlistAtualIndex);
    if (playlistPlaying) {
        audioPlayer.play();
    }
}

function togglePlayPausePlaylist() {
    const playBtn = document.getElementById('play-btn');
    playlistPlaying = !playlistPlaying;
    
    if (playlistPlaying) {
        playBtn.textContent = '⏸';
        audioPlayer.play();
    } else {
        playBtn.textContent = '▶';
        audioPlayer.pause();
    }
}

function mostrarPlaylistFullscreen(event) {
    if (event) {
        event.preventDefault();
        toggleMenu();
    }
    const playlistFullscreen = document.getElementById('playlist-fullscreen');
    const appContainer = document.querySelector('.app-container');
    
    playlistFullscreen.classList.add('active');
    appContainer.style.display = 'none';
    
    inicializarPlaylist();
}

// Atualizar progresso da música
if (audioPlayer) {
    audioPlayer.addEventListener('timeupdate', () => {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
        document.getElementById('progress').style.width = progress + '%';
        document.getElementById('current-time').textContent = formatarTempo(audioPlayer.currentTime);
        document.getElementById('duration-time').textContent = formatarTempo(audioPlayer.duration);
    });
    
    audioPlayer.addEventListener('ended', () => {
        proximaPlaylist();
    });
    
    document.getElementById('progress-input').addEventListener('change', (e) => {
        audioPlayer.currentTime = (e.target.value / 100) * audioPlayer.duration;
    });
}

function formatarTempo(tempo) {
    if (isNaN(tempo)) return '0:00';
    const minutos = Math.floor(tempo / 60);
    const segundos = Math.floor(tempo % 60);
    return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
}