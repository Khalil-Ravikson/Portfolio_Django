// O CSS é carregado diretamente via tag <link> no template HTML (base.html)

document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DO MENU MOBILE ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    // Adicione esta checagem
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }






    // Isso precisa ser feito ANTES do Alpine ser inicializado
document.addEventListener('alpine:init', () => {
    Alpine.data('oeeChart', (data) => ({
        // Armazena os dados vindos do Django
        availability: data.availability || 0,
        performance: data.performance || 0,
        quality: data.quality || 0,
        oee: data.oee || 0,
        
        // Função que o x-init="renderChart()" irá chamar
        renderChart() {
            // $el é uma variável mágica do Alpine que aponta para o <div>
            // Nós procuramos o canvas DENTRO dele
            const ctx = this.$el.querySelector('#oee-chart-canvas').getContext('2d');
            
            // Destrói gráfico antigo se houver
            // (Importante se o usuário enviar um segundo arquivo)
            if (window.myOeeChart instanceof Chart) {
                window.myOeeChart.destroy();
            }

            // Cria o novo gráfico
            window.myOeeChart = new Chart(ctx, {
                type: 'bar', // Tipo de gráfico
                data: {
                    labels: ['Disponibilidade', 'Performance', 'Qualidade', 'OEE Total'],
                    datasets: [{
                        label: 'Eficiência (%)',
                        data: [this.availability, this.performance, this.quality, this.oee],
                        backgroundColor: [
                            'rgba(59, 130, 246, 0.7)', // Azul
                            'rgba(16, 185, 129, 0.7)', // Verde
                            'rgba(245, 158, 11, 0.7)', // Amarelo
                            'rgba(109, 40, 217, 0.7)'  // Indigo/Roxo
                        ],
                        borderColor: [
                            'rgba(59, 130, 246, 1)',
                            'rgba(16, 185, 129, 1)',
                            'rgba(245, 158, 11, 1)',
                            'rgba(109, 40, 217, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100, // OEE é de 0 a 100
                            ticks: { color: '#94a3b8' } // Cor dos ticks (slate-400)
                        },
                        x: {
                            ticks: { color: '#94a3b8' }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false // Esconde a legenda, já que só temos 1 dataset
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: true
                }
            });
        }
    }));
});


    // --- DADOS E LÓGICA DAS TECNOLOGIAS (ATUALIZADO) ---
    // NOTA: É recomendado usar Font Awesome ou ícones Lucide para ícones reais, 
    // mas mantive a estrutura SVG que você forneceu.
    
    const technologies = [
        // Destaques
        { name: 'Python', filename: 'python-svgrepo-com.svg' },
        { name: 'TensorFlow', filename: 'tensorflow-svgrepo-com.svg' },
        { name: 'Django', filename: 'django-icon-svgrepo-com.svg' },
        { name: 'Docker', filename: 'docker-svgrepo-com.svg' },
        { name: 'AutoCAD', filename: 'autocad-svgrepo-com.svg' },
        { name: 'Excel', filename: 'excel2-svgrepo-com.svg' },
        { name: 'n8n', filename: 'n8n-color.svg' },
        { name: 'Git', filename: 'git-svgrepo-com.svg' },
        { name: 'Scikit-learn', filename: 'scikit-learn.svg' },
        // Adicione outras tecnologias aqui se tiver os ficheiros SVG
        // { name: 'JavaScript', filename: 'javascript.svg' }, 
        // { name: 'SQL', filename: 'sql.svg' }, 
    ];

    function renderTechnologies() {
        const container = document.querySelector('#technologies .grid');
        if (container) {
            container.innerHTML = technologies.map(tech => `
                <div class="text-center transition-transform hover:scale-110 hover:text-white flex flex-col items-center">
                    <div class="w-12 h-12 mb-2 flex items-center justify-center">
                        <!-- A imagem é carregada a partir da sua pasta static -->
                        <img src="/static/images/icons/${tech.filename}" alt="${tech.name} icon" class="tech-icon">
                    </div>
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
                        headers: { 
                            'Content-Type': 'application/json',
                            'X-CSRFToken': getCookie('csrftoken') // Adicione esta linha
                        },
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


    function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
});
