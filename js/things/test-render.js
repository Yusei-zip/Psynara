export class TestRender {
    constructor(rootId) {
        this.rootElement = document.getElementById(rootId);
    }

    clear() {
        if (this.rootElement) {
            this.rootElement.innerHTML = '';
        }
    }

    renderList(tests, onSelect) {
        this.clear();
        
        const title = document.createElement('h2');
        title.className = 'text-center mb-4';
        title.textContent = 'Selecciona un test para comenzar';
        this.rootElement.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'tests-grid fade-in appear';

        tests.forEach(test => {
            const card = document.createElement('div');
            card.className = 'test-card';

            const h3 = document.createElement('h3');
            h3.textContent = test.title;

            const dur = document.createElement('div');
            dur.className = 'test-duration';
            dur.innerHTML = `<i class="far fa-clock"></i> Tiempo estimado: ${test.duration}`;

            const desc = document.createElement('p');
            desc.textContent = test.description;

            const btn = document.createElement('button');
            btn.className = 'btn btn-primary';
            btn.textContent = 'Iniciar Test';
            btn.style.width = '100%';
            btn.onclick = () => onSelect(test.id);

            card.appendChild(h3);
            card.appendChild(dur);
            card.appendChild(desc);
            card.appendChild(btn);

            grid.appendChild(card);
        });

        this.rootElement.appendChild(grid);
    }

    renderQuestionView(testTitle, question, progress, selectedValue, onOptionSelect, onNext, onBack) {
        this.clear();

        const container = document.createElement('div');
        container.className = 'test-container fade-in appear';

        // Header
        const header = document.createElement('div');
        header.className = 'test-header';
        
        const backBtn = document.createElement('button');
        backBtn.className = 'btn-back';
        backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Salir';
        backBtn.onclick = onBack;

        const title = document.createElement('h2');
        title.textContent = testTitle;
        title.style.fontSize = '1.5rem';

        header.appendChild(backBtn);
        header.appendChild(title);
        container.appendChild(header);

        // Progress
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.width = `${progress.percentage}%`;
        progressContainer.appendChild(progressBar);
        
        const progressText = document.createElement('p');
        progressText.style.textAlign = 'right';
        progressText.style.fontSize = '0.9rem';
        progressText.style.color = '#777';
        progressText.textContent = `Pregunta ${progress.current} de ${progress.total}`;

        container.appendChild(progressContainer);
        container.appendChild(progressText);

        // Question
        const qBlock = document.createElement('div');
        qBlock.className = 'question-block';
        
        const qText = document.createElement('div');
        qText.className = 'question-text';
        qText.textContent = question.text;
        qBlock.appendChild(qText);

        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'options-grid';

        question.options.forEach(opt => {
            const optBtn = document.createElement('button');
            optBtn.className = 'option-btn';
            if (selectedValue === opt.value) {
                optBtn.classList.add('selected');
            }
            optBtn.textContent = opt.text;
            optBtn.onclick = () => {
                // Remove selected class from all siblings
                Array.from(optionsGrid.children).forEach(c => c.classList.remove('selected'));
                optBtn.classList.add('selected');
                onOptionSelect(opt.value);
            };
            optionsGrid.appendChild(optBtn);
        });

        qBlock.appendChild(optionsGrid);
        container.appendChild(qBlock);

        // Footer actions
        const footer = document.createElement('div');
        footer.style.display = 'flex';
        footer.style.justifyContent = 'flex-end';
        footer.style.marginTop = '2rem';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn-primary';
        nextBtn.textContent = progress.current === progress.total ? 'Ver Resultados' : 'Siguiente';
        // Only enable next if something is selected
        nextBtn.disabled = selectedValue === null;
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
        nextBtn.style.cursor = nextBtn.disabled ? 'not-allowed' : 'pointer';

        // Add visual feedback when option selected
        if (selectedValue === null) {
            optionsGrid.addEventListener('click', (e) => {
                if(e.target.classList.contains('option-btn')) {
                    nextBtn.disabled = false;
                    nextBtn.style.opacity = '1';
                    nextBtn.style.cursor = 'pointer';
                }
            });
        }

        nextBtn.onclick = () => {
            if (!nextBtn.disabled) onNext();
        };

        footer.appendChild(nextBtn);
        container.appendChild(footer);

        this.rootElement.appendChild(container);
    }

    renderResult(testTitle, resultData, onRestart, onBackToList) {
        this.clear();

        const container = document.createElement('div');
        container.className = 'test-container fade-in appear';

        // Header
        const header = document.createElement('div');
        header.className = 'test-header';
        
        const title = document.createElement('h2');
        title.textContent = `Resultados: ${testTitle}`;
        title.style.margin = '0 auto';

        header.appendChild(title);
        container.appendChild(header);

        // Result Content
        const resContainer = document.createElement('div');
        resContainer.className = 'result-container';

        const resTitle = document.createElement('h2');
        resTitle.textContent = resultData.title;
        resContainer.appendChild(resTitle);

        const resScore = document.createElement('div');
        resScore.className = 'result-score';
        // Optional: you can show the raw score if desired, e.g., `${resultData.score} pts`
        resScore.innerHTML = '<i class="fas fa-clipboard-check" style="color: var(--sage-green);"></i>';
        resContainer.appendChild(resScore);

        const resDesc = document.createElement('p');
        resDesc.className = 'result-description';
        resDesc.textContent = resultData.description;
        resContainer.appendChild(resDesc);

        // WhatsApp Share Section
        const shareContainer = document.createElement('div');
        shareContainer.className = 'share-container';
        
        const shareLabel = document.createElement('label');
        shareLabel.textContent = 'Para recibir una devolución personalizada, ingresa tu nombre y envía tus resultados:';
        shareLabel.htmlFor = 'userNameShare';
        
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = 'userNameShare';
        nameInput.placeholder = 'Tu nombre...';
        nameInput.className = 'share-input';

        const errorSpan = document.createElement('div');
        errorSpan.className = 'share-error';
        errorSpan.textContent = 'Por favor, ingresa tu nombre para enviar los resultados.';

        const wpButton = document.createElement('button');
        wpButton.className = 'btn whatsapp-share-btn';
        wpButton.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar resultados por WhatsApp';
        
        // Feedback Message Container
        const feedbackContainer = document.createElement('div');
        feedbackContainer.className = 'share-feedback fade-in';
        feedbackContainer.style.display = 'none';
        
        const feedbackText = document.createElement('p');
        feedbackText.innerHTML = '<i class="fas fa-check-circle" style="color: var(--sage-green);"></i> Tu mensaje se abrió en WhatsApp. Solo debes enviarlo para completar el contacto.';
        feedbackText.style.marginTop = '1.5rem';
        feedbackText.style.fontWeight = '500';
        feedbackText.style.color = 'var(--text-strong)';
        feedbackText.style.fontSize = '0.95rem';

        const resetBtn = document.createElement('button');
        resetBtn.textContent = 'Editar nombre o volver a generar mensaje';
        resetBtn.style.marginTop = '0.5rem';
        resetBtn.style.fontSize = '0.9rem';
        resetBtn.style.color = 'var(--dusty-rose)';
        resetBtn.style.background = 'none';
        resetBtn.style.border = 'none';
        resetBtn.style.cursor = 'pointer';
        resetBtn.style.textDecoration = 'underline';
        resetBtn.style.padding = '0';

        feedbackContainer.appendChild(feedbackText);
        feedbackContainer.appendChild(resetBtn);
        
        wpButton.onclick = () => {
            const userName = nameInput.value.trim();
            if (!userName) {
                errorSpan.style.display = 'block';
                nameInput.focus();
                return;
            }
            errorSpan.style.display = 'none';
            
            const message = `Hola, mi nombre es ${userName}.\nAcabo de realizar el ${testTitle} en tu sitio web.\nMi resultado fue: ${resultData.title}.\nPuntaje obtenido: ${resultData.score}.\n\nMe gustaría recibir más información o agendar una sesión.`;
            
            const encodedMessage = encodeURIComponent(message);
            const phoneNumber = '595995679432';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');

            // Visual state change
            wpButton.innerHTML = '<i class="fas fa-check"></i> Listo para enviar';
            wpButton.classList.add('btn-success', 'pop-anim');
            wpButton.disabled = true;
            nameInput.disabled = true;
            
            feedbackContainer.style.display = 'block';
            // Slight delay to allow display:block to apply before adding appear class for transition
            setTimeout(() => feedbackContainer.classList.add('appear'), 10);
        };

        resetBtn.onclick = () => {
            wpButton.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar resultados por WhatsApp';
            wpButton.classList.remove('btn-success', 'pop-anim');
            wpButton.disabled = false;
            nameInput.disabled = false;
            nameInput.focus();
            
            feedbackContainer.classList.remove('appear');
            setTimeout(() => {
                feedbackContainer.style.display = 'none';
            }, 800); // Matches the fade-in transition duration (0.8s)
        };

        shareContainer.appendChild(shareLabel);
        shareContainer.appendChild(nameInput);
        shareContainer.appendChild(errorSpan);
        shareContainer.appendChild(wpButton);
        shareContainer.appendChild(feedbackContainer);
        resContainer.appendChild(shareContainer);

        // Actions
        const actions = document.createElement('div');
        actions.className = 'result-actions';

        const btnAgenda = document.createElement('a');
        btnAgenda.href = '#contacto';
        btnAgenda.className = 'btn btn-outline';
        btnAgenda.textContent = 'Volver al formulario web';
        
        const btnList = document.createElement('button');
        btnList.className = 'btn btn-outline';
        btnList.textContent = 'Ver otros tests';
        btnList.onclick = onBackToList;

        const btnDownload = document.createElement('button');
        btnDownload.className = 'btn btn-primary';
        btnDownload.innerHTML = '<i class="fas fa-download"></i> Descargar resultado';
        btnDownload.onclick = async () => {
            if (typeof html2canvas === 'undefined') {
                alert('La librería de captura no está cargada.');
                return;
            }

            // Create a hidden, off-screen printable container
            const printDiv = document.createElement('div');
            printDiv.style.position = 'absolute';
            printDiv.style.left = '-9999px';
            printDiv.style.top = '0';
            printDiv.style.width = '600px';
            printDiv.style.padding = '40px';
            printDiv.style.background = '#fdf6ec'; // Force light theme background (Beige arena)
            printDiv.style.color = '#402A30'; // Force light theme text (Ciruela oscuro)
            printDiv.style.fontFamily = 'Inter, sans-serif';
            printDiv.style.borderRadius = '15px';
            printDiv.style.boxSizing = 'border-box';
            
            const userName = nameInput.value.trim() || 'Anónimo';
            const dateStr = new Date().toLocaleDateString();

            printDiv.innerHTML = `
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="font-size: 24px; font-weight: 700; color: #733F4D; margin-bottom: 5px;">Psic. Francisca Gonzalez</h1>
                    <p style="font-size: 14px; color: #919962;">Resultados de Autoevaluación</p>
                </div>
                <hr style="border: 0; border-top: 1px solid #e0d5c1; margin-bottom: 20px;">
                <div style="margin-bottom: 20px;">
                    <p style="margin-bottom: 5px;"><strong>Paciente / Usuario:</strong> ${userName}</p>
                    <p style="margin-bottom: 5px;"><strong>Test:</strong> ${testTitle}</p>
                    <p style="margin-bottom: 5px;"><strong>Fecha:</strong> ${dateStr}</p>
                </div>
                <div style="background: #ffffff; padding: 20px; border-radius: 10px; border-left: 5px solid #D9665B; margin-bottom: 20px;">
                    <h2 style="font-size: 20px; color: #D9665B; margin-bottom: 10px;">${resultData.title}</h2>
                    <p style="font-size: 16px; margin-bottom: 10px;"><strong>Puntaje Obtenido:</strong> ${resultData.score}</p>
                    <p style="font-size: 15px; line-height: 1.6;">${resultData.description}</p>
                </div>
                <div style="background: rgba(145, 153, 98, 0.15); padding: 15px; border-radius: 8px; font-size: 13px; color: #402A30;">
                    <strong>Nota Importante:</strong> Este resultado es puramente orientativo y tiene el propósito de ayudarte a identificar posibles áreas de atención. No constituye un diagnóstico médico ni psicológico profesional.
                </div>
            `;

            document.body.appendChild(printDiv);

            try {
                const originalText = btnDownload.innerHTML;
                btnDownload.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando...';
                btnDownload.disabled = true;

                const canvas = await html2canvas(printDiv, {
                    scale: 2, 
                    useCORS: true,
                    backgroundColor: '#fdf6ec'
                });

                const link = document.createElement('a');
                link.download = `Resultado_${testTitle.replace(/\s+/g, '_')}_${dateStr.replace(/\//g, '-')}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
                
                btnDownload.innerHTML = originalText;
                btnDownload.disabled = false;
            } catch (err) {
                console.error("Error al generar la imagen", err);
                alert("Hubo un error al generar la imagen. Inténtalo de nuevo.");
                btnDownload.innerHTML = '<i class="fas fa-download"></i> Descargar resultado';
                btnDownload.disabled = false;
            } finally {
                document.body.removeChild(printDiv);
            }
        };

        actions.appendChild(btnDownload);
        actions.appendChild(btnAgenda);
        actions.appendChild(btnList);
        resContainer.appendChild(actions);

        container.appendChild(resContainer);
        this.rootElement.appendChild(container);
    }
}
