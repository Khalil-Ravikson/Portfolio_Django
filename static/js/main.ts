// Importa o nosso ficheiro de estilos para que o Vite o processe
// Importa o nosso ficheiro de estilos para que o Vite o processe
import '../css/styles.css';

document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DO MENU MOBILE ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton?.addEventListener('click', () => {
        mobileMenu?.classList.toggle('hidden');
    });


    // --- DADOS E LÓGICA DAS TECNOLOGIAS (ATUALIZADO) ---
    const technologies = [
        // Destaques
        { name: 'Python', icon: '<svg class="tech-icon" ...></svg>' }, // Ícone SVG aqui
        { name: 'TensorFlow', icon: '<svg class="tech-icon" ...></svg>' }, // Ícone SVG aqui
        { name: 'Django', icon: '<svg class="tech-icon" ...></svg>' }, // Ícone SVG aqui
        { name: 'Docker', icon: '<svg class="tech-icon" ...></svg>' }, // Ícone SVG aqui
        { name: 'AutoCAD', icon: '<svg class="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zm0 11.5L4.5 10.25l7.5-3.75 7.5 3.75L12 13.5zM2 17l10 5 10-5-10-5-10 5z"/></svg>' },
        { name: 'Excel', icon: '<svg class="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M21.17 3.25a2 2 0 00-2-2H4.83a2 2 0 00-2 2v17.5a2 2 0 002 2h14.34a2 2 0 002-2V3.25zm-14.9 15.5l3.54-3.54-3.54-3.54h2.83l2.12 2.12 2.12-2.12h2.83l-3.54 3.54 3.54 3.54h-2.83l-2.12-2.12-2.12 2.12H6.27z"/></svg>' },
        { name: 'n8n', icon: '<svg class="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-2.29 14.71a.75.75 0 01-1.06-1.06L11.88 12 8.65 8.77a.75.75 0 011.06-1.06L13 10.88l3.23-3.17a.75.75 0 111.06 1.06L14.12 12l3.23 3.17a.75.75 0 01-1.06 1.06L13 13.12l-3.29 3.59z"/></svg>' },
        { name: 'JavaScript', icon: '<svg class="tech-icon" ...></svg>' }, // Ícone SVG aqui

        // Outras Tecnologias
        { name: 'PyTorch', icon: '<svg class="tech-icon" ...></svg>' }, // Ícone SVG aqui
        { name: 'Scikit-learn', icon: '<svg class="tech-icon" ...></svg>' }, // Ícone SVG aqui
        { name: 'Git', icon: '<svg class="tech-icon" ...></svg>' }, // Ícone SVG aqui
        { name: 'SQL', icon: '<svg class="tech-icon" ...></svg>' }, // Ícone SVG aqui
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
    const modal = document.getElementById('project-modal') as HTMLElement;
    const modalOverlay = document.getElementById('project-modal-overlay');
    const modalContent = document.getElementById('project-modal-content');
    const projectCards = document.querySelectorAll('[data-title]');

    function openModal(projectData: any) {
        if (!modalContent) return;

        const technologiesHtml = projectData.technologies.split(',')
            .map((tech: string) => `<span class="project-card-tag">${tech.trim()}</span>`).join('');

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

        document.body.classList.add('modal-open');
        modal.classList.remove('hidden');

        document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
    }

    function closeModal() {
        document.body.classList.remove('modal-open');
        modal.classList.add('hidden');
    }
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardElement = card as HTMLElement;
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

    modalOverlay?.addEventListener('click', closeModal);
    
const canvas = document.getElementById('digit-canvas') as HTMLCanvasElement;
    if (canvas) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true }); // willReadFrequently melhora a performance
        const predictBtn = document.getElementById('predict-btn');
        const clearBtn = document.getElementById('clear-btn');
        const predictionResult = document.getElementById('prediction-result');
        let drawing = false;

        if (ctx) {
            // Define o fundo inicial como preto
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const startDrawing = (e: MouseEvent | TouchEvent) => { drawing = true; draw(e); };
            const stopDrawing = () => { drawing = false; ctx.beginPath(); };
            
            const draw = (e: MouseEvent | TouchEvent) => {
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

            // Função ASSÍNCRONA para chamar a nossa API Django
            const predictDigit = async () => {
                if(predictionResult) predictionResult.textContent = '...';

                // --- NOVA LÓGICA DE PRÉ-PROCESSAMENTO INTELIGENTE ---
                
                // 1. Encontrar a "caixa" (bounding box) que contém o desenho
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
                
                for (let y = 0; y < canvas.height; y++) {
                    for (let x = 0; x < canvas.width; x++) {
                        const alpha = data[(y * canvas.width + x) * 4 + 3];
                        if (alpha > 0) { // Se o pixel não for transparente
                            minX = Math.min(minX, x);
                            minY = Math.min(minY, y);
                            maxX = Math.max(maxX, x);
                            maxY = Math.max(maxY, y);
                        }
                    }
                }

                if (maxX === 0) { // Se o canvas estiver vazio
                    if(predictionResult) predictionResult.textContent = '-';
                    return;
                }

                // 2. Criar um novo canvas temporário para centralizar a imagem
                const digitWidth = maxX - minX;
                const digitHeight = maxY - minY;
                const largerSide = Math.max(digitWidth, digitHeight);
                const padding = 40; // Espaçamento extra para o dígito "respirar"
                
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = largerSide + padding * 2;
                tempCanvas.height = largerSide + padding * 2;
                const tempCtx = tempCanvas.getContext('2d')!;

                // 3. Desenhar a imagem recortada e centralizada no novo canvas
                tempCtx.drawImage(
                    canvas, 
                    minX, minY, digitWidth, digitHeight, // Recorta o dígito do canvas original
                    (largerSide - digitWidth) / 2 + padding, (largerSide - digitHeight) / 2 + padding, // Centraliza no novo canvas
                    digitWidth, digitHeight
                );

                // 4. Obter a imagem do *novo* canvas temporário
                const imageDataUrl = tempCanvas.toDataURL('image/png');

                // --- FIM DA NOVA LÓGICA ---


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
            predictBtn?.addEventListener('click', predictDigit);
            clearBtn?.addEventListener('click', clearCanvas);
        }
    }
});