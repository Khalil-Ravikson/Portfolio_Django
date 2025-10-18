// O CSS é carregado diretamente via tag <link> no template HTML (base.html)

document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DO MENU MOBILE ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });


    // --- DADOS E LÓGICA DAS TECNOLOGIAS (ATUALIZADO) ---
    // NOTA: É recomendado usar Font Awesome ou ícones Lucide para ícones reais, 
    // mas mantive a estrutura SVG que você forneceu.
    const technologies = [
        // Destaques
        { name: 'Python', icon: '<svg class="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-2.29 14.71a.75.75 0 01-1.06-1.06L11.88 12 8.65 8.77a.75.75 0 011.06-1.06L13 10.88l3.23-3.17a.75.75 0 111.06 1.06L14.12 12l3.23 3.17a.75.75 0 01-1.06 1.06L13 13.12l-3.29 3.59z"/></svg>' }, 
        { name: 'TensorFlow', icon: '<svg class="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm-1 16H8a1 1 0 01-1-1v-4a1 1 0 011-1h3v6zm5-10h-3V6h3a1 1 0 011 1v4a1 1 0 01-1 1z"/></svg>' }, 
        { name: 'Django', icon: '<svg class="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-2 16h4V6h-4v12z"/></svg>' }, 
        { name: 'Docker', icon: '<svg class="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm3 15h-6v-2h6v2zm-6-4h6v-2h-6v2zm6-4H9V7h6v2z"/></svg>' }, 
        { name: 'AutoCAD', icon: '<svg class="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zm0 11.5L4.5 10.25l7.5-3.75 7.5 3.75L12 13.5zM2 17l10 5 10-5-10-5-10 5z"/></svg>' },
        { name: 'Excel', icon: '<svg class="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M21.17 3.25a2 2 0 00-2-2H4.83a2 2 0 00-2 2v17.5a2 2 0 002 2h14.34a2 2 0 002-2V3.25zm-14.9 15.5l3.54-3.54-3.54-3.54h2.83l2.12 2.12 2.12-2.12h2.83l-3.54 3.54 3.54 3.54h-2.83l-2.12-2.12-2.12 2.12H6.27z"/></svg>' },
        { name: 'n8n', icon: '<svg class="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-2.29 14.71a.75.75 0 01-1.06-1.06L11.88 12 8.65 8.77a.75.75 0 011.06-1.06L13 10.88l3.23-3.17a.75.75 0 111.06 1.06L14.12 12l3.23 3.17a.75.75 0 01-1.06 1.06L13 13.12l-3.29 3.59z"/></svg>' },
        { name: 'JavaScript', icon: '<svg class="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm3 15h-2.5v-2h-1.5v2H9v-6h6v6z"/></svg>' }, 

        // Outras Tecnologias
        { name: 'PyTorch', icon: '<svg class="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"/></svg>' }, 
        { name: 'Scikit-learn', icon: '<svg class="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"/></svg>' }, 
        { name: 'Git', icon: '<svg class="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-4h2v4zm0-6h-2V7h2v4z"/></svg>' }, 
        { name: 'SQL', icon: '<svg class="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-2 16h4v-2h-4v2zm0-4h4v-2h-4v2zm0-4h4V6h-4v2z"/></svg>' }, 
    ];

    function renderTechnologies() {
        const container = document.querySelector('#technologies .grid');
        if (container) {
            container.innerHTML = technologies.map(tech => `
                <div class="text-center transition-transform hover:scale-110 hover:text-white flex flex-col items-center">
                    <div class="w-12 h-12 mb-2 flex items-center justify-center">${tech.icon}</div>
                    <span>${tech.name}</span>
                </div>
            `).join('');
        }
    }
    renderTechnologies();


    // --- LÓGICA DO MODAL DE PROJETOS ---
    const modal = document.getElementById('project-modal');
    const modalOverlay = document.getElementById('project-modal-overlay');
    const modalContent = document.getElementById('project-modal-content');
    const projectCards = document.querySelectorAll('[data-title]');

    function openModal(projectData) {
        if (!modalContent) return;

        const technologiesHtml = projectData.technologies.split(',')
            .map(tech => `<span class="project-card-tag">${tech.trim()}</span>`).join('');

        modalContent.innerHTML = `
            <div class="p-4 border-b border-slate-700 flex justify-between items-center sticky top-0 z-10 glass-effect">
                <h2 id="modal-title" class="text-2xl font-bold text-white">${projectData.title}</h2>
                <button id="modal-close-btn" class="text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
            </div>
            <div class="p-6 md:p-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="md:col-span-2">
                        <img id="modal-main-image" src="${projectData.imageUrl}" alt="Imagem principal do projeto" class="w-full rounded-lg mb-4">
                        <div id="modal-long-description" class="text-slate-300 space-y-4 mt-8">
                             <h4 class="text-lg font-bold text-white mb-2">Descrição Completa</h4>
                             <p>${projectData.description.replace(/\n/g, '<br>')}</p>
                        </div>
                    </div>
                    <div class="md:col-span-1">
                        <h3 class="text-xl font-bold text-white mb-4">Tecnologias</h3>
                        <div id="modal-tags" class="flex flex-wrap gap-2 mb-6">${technologiesHtml}</div>
                        
                        <h3 class="text-xl font-bold text-white mt-6 mb-4">Links</h3>
                        <div class="space-y-3">
                            ${projectData.projectUrl ? `<a href="${projectData.projectUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center btn-secondary w-full justify-center py-2 px-4 rounded-lg">Ver Online</a>` : ''}
                            ${projectData.githubUrl ? `<a href="${projectData.githubUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center btn-secondary w-full justify-center py-2 px-4 rounded-lg">Código Fonte</a>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('modal-close-btn').addEventListener('click', closeModal);
        document.body.classList.add('modal-open');
        modal.classList.remove('hidden');

    }

    function closeModal() {
        document.body.classList.remove('modal-open');
        modal.classList.add('hidden');
    }
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardElement = card;
            const projectData = {
                title: cardElement.dataset.title,
                description: cardElement.dataset.description,
                technologies: cardElement.dataset.technologies,
                projectUrl: cardElement.dataset.projectUrl,
                githubUrl: cardElement.dataset.githubUrl,
                imageUrl: cardElement.dataset.imageUrl,
                category: cardElement.dataset.category,
            };
            openModal(projectData);
        });
    });

    modalOverlay.addEventListener('click', closeModal);
    
    const canvas = document.getElementById('digit-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const predictBtn = document.getElementById('predict-btn');
        const clearBtn = document.getElementById('clear-btn');
        const predictionResult = document.getElementById('prediction-result');
        let drawing = false;

        if (ctx) {
            // Define o fundo inicial como preto
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const startDrawing = (e) => { drawing = true; draw(e); };
            const stopDrawing = () => { drawing = false; ctx.beginPath(); };
            
            const draw = (e) => {
                if (!drawing) return;
                e.preventDefault(); 
                
                const rect = canvas.getBoundingClientRect();
                const x = (e instanceof MouseEvent ? e.clientX : e.touches[0].clientX) - rect.left;
                const y = (e instanceof MouseEvent ? e.clientY : e.touches[0].clientY) - rect.top;

                // AUMENTÁMOS A ESPESSURA DO TRAÇO
                ctx.lineWidth = 28;      
                ctx.lineCap = 'round';   
                ctx.strokeStyle = 'white';

                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x, y);
            };
            
            const clearCanvas = () => {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                if(predictionResult) predictionResult.textContent = '-';
            };

            const predictDigit = async () => {
                if(predictionResult) predictionResult.textContent = '...';

                // --- LÓGICA DE PRÉ-PROCESSAMENTO INTELIGENTE ---
                
                // 1. Encontrar a "caixa" (bounding box) que contém o desenho
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
                
                for (let y = 0; y < canvas.height; y++) {
                    for (let x = 0; x < canvas.width; x++) {
                        // Verificamos o canal alpha (transparência) para encontrar pixels desenhados
                        const alpha = data[(y * canvas.width + x) * 4 + 3]; 
                        if (alpha > 0) { // Se o pixel não for transparente (foi desenhado)
                            minX = Math.min(minX, x);
                            minY = Math.min(minY, y);
                            maxX = Math.max(maxX, x);
                            maxY = Math.max(maxY, y);
                        }
                    }
                }

                // Se maxX for 0, significa que nada foi desenhado (canvas está vazio)
                if (maxX === 0) { 
                    if(predictionResult) predictionResult.textContent = '-';
                    return; // Não faz nada se o canvas estiver vazio
                }

                // 2. Calcular as dimensões do desenho e criar um canvas temporário
                const digitWidth = maxX - minX;
                const digitHeight = maxY - minY;
                const largerSide = Math.max(digitWidth, digitHeight);
                // Adicionamos um 'padding' para garantir que o dígito não toque as bordas
                // O padding deve ser proporcional à espessura da linha para melhores resultados
                const padding = ctx.lineWidth; // Usar a espessura da linha como padding
                
                const tempCanvas = document.createElement('canvas');
                // O tamanho do canvas temporário é o lado maior do dígito + padding em ambos os lados
                tempCanvas.width = largerSide + padding * 2;
                tempCanvas.height = largerSide + padding * 2;
                const tempCtx = tempCanvas.getContext('2d');

                // 3. Desenhar a imagem recortada e CENTRALIZADA no novo canvas temporário
                // O fundo do canvas temporário é preto, igual ao treino
                tempCtx.fillStyle = "black";
                tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
                
                tempCtx.drawImage(
                    canvas, 
                    minX, minY,                 // Coordenadas e tamanho do recorte no canvas original
                    digitWidth, digitHeight,    
                    (tempCanvas.width - digitWidth) / 2, // Coordenada X para centralizar no canvas temp
                    (tempCanvas.height - digitHeight) / 2, // Coordenada Y para centralizar no canvas temp
                    digitWidth, digitHeight     // Tamanho do desenho no canvas temp
                );

                // 4. Obter a imagem do *novo* canvas temporário como Base64
                // Esta é a imagem que será enviada para o Django
                const imageDataUrl = tempCanvas.toDataURL('image/png');

                // --- FIM DA LÓGICA DE PRÉ-PROCESSAMENTO ---


                try {
                    // 5. Enviar a imagem pré-processada para o nosso endpoint Django
                    const response = await fetch('/predict-digit/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ image: imageDataUrl })
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || `Erro ${response.status}`);
                    }

                    const data = await response.json();

                    if(predictionResult) {
                        predictionResult.textContent = data.prediction.toString();
                    }

                } catch (error) {
                    console.error("Erro na previsão:", error);
                    if(predictionResult) {
                        predictionResult.textContent = 'Erro';
                    }
                }
            };

            // Adiciona os event listeners aos elementos
            canvas.addEventListener('mousedown', startDrawing);
            canvas.addEventListener('mouseup', stopDrawing);
            canvas.addEventListener('mouseleave', stopDrawing);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('touchstart', startDrawing, { passive: false });
            canvas.addEventListener('touchend', stopDrawing);
            canvas.addEventListener('touchmove', draw, { passive: false });
            predictBtn.addEventListener('click', predictDigit);
            clearBtn.addEventListener('click', clearCanvas);
        }
    }
});
