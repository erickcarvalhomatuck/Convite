document.addEventListener('DOMContentLoaded', function() {
    const waxSeal = document.getElementById('wax-seal');
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const invitationContainer = document.getElementById('invitation-container');
    const interactionHint = document.getElementById('interaction-hint');
    const closeButton = document.getElementById('close-button');
    const overlay = document.getElementById('overlay');
    
    let isOpened = false;
    let isAnimating = false;
    
    // Função para centralizar perfeitamente o convite
    function centerInvitation() {
        const invitation = document.getElementById('invitation-container');
        if (invitation) {
            // Força a centralização usando position fixed e transform
            invitation.style.position = 'fixed';
            invitation.style.top = '50%';
            invitation.style.left = '50%';
            invitation.style.transform = 'translate(-50%, -50%) scale(1.1)';
            invitation.style.zIndex = '30';
        }
    }
    
    // Função para abrir o envelope com animação aprimorada
    function openEnvelope() {
        if (isOpened || isAnimating) return;
        
        isAnimating = true;
        
        // Vibração no mobile se disponível
        if (navigator.vibrate) {
            navigator.vibrate([120, 60, 120]);
        }
        
        // Efeito de quebra do lacre aprimorado
        waxSeal.style.animation = 'seal-break 1s cubic-bezier(0.23, 1, 0.32, 1) forwards';
        
        // Cria efeito de partículas douradas aprimorado
        createEnhancedGoldenParticles();
        
        // Após a quebra do lacre, abre o envelope
        setTimeout(() => {
            envelopeWrapper.classList.add('opened');
            isOpened = true;
            
            // Garante a centralização perfeita após a animação
            setTimeout(() => {
                centerInvitation();
                isAnimating = false;
            }, 800);
        }, 500);
        
        // Som de papel (simulado com vibração adicional)
        setTimeout(() => {
            if (navigator.vibrate) {
                navigator.vibrate([30, 20, 30]);
            }
        }, 1000);
        
        // Mostra notificação elegante
        setTimeout(() => {
            showElegantNotification('Convite aberto! Clique fora para fechar', 4000);
        }, 1500);
    }
    
    // Função para fechar o envelope com animação suave
    function closeEnvelope() {
        if (!isOpened || isAnimating) return;
        
        isAnimating = true;
        
        // Vibração sutil
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Remove a classe de abertura
        envelopeWrapper.classList.remove('opened');
        
        // Restaura o lacre após a animação
        setTimeout(() => {
            waxSeal.style.animation = '';
            waxSeal.style.opacity = '1';
            waxSeal.style.transform = 'translateX(-50%) scale(1)';
            isOpened = false;
            isAnimating = false;
        }, 1400);
    }
    
    // Função para criar efeito de partículas douradas aprimorado
    function createEnhancedGoldenParticles() {
        const particleCount = 20;
        const sealRect = waxSeal.getBoundingClientRect();
        const containerRect = document.querySelector('.fullscreen-container').getBoundingClientRect();
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'golden-particle';
            
            // Posição inicial no lacre
            const startX = sealRect.left + sealRect.width / 2 - containerRect.left;
            const startY = sealRect.top + sealRect.height / 2 - containerRect.top;
            
            const size = 4 + Math.random() * 6;
            particle.style.cssText = `
                position: absolute;
                left: ${startX}px;
                top: ${startY}px;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, #ffd700, #daa520);
                border-radius: 50%;
                pointer-events: none;
                z-index: 25;
                opacity: 1;
                box-shadow: 0 0 ${size * 2}px rgba(255, 215, 0, 0.6);
            `;
            
            document.querySelector('.fullscreen-container').appendChild(particle);
            
            // Animação da partícula aprimorada
            const angle = (i / particleCount) * 2 * Math.PI + (Math.random() - 0.5) * 0.5;
            const distance = 80 + Math.random() * 60;
            const duration = 1500 + Math.random() * 1000;
            
            const targetX = startX + Math.cos(angle) * distance;
            const targetY = startY + Math.sin(angle) * distance - Math.random() * 40;
            
            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translate(${(targetX - startX) * 0.7}px, ${(targetY - startY) * 0.7}px) scale(1.2) rotate(180deg)`,
                    opacity: 0.8,
                    offset: 0.5
                },
                {
                    transform: `translate(${targetX - startX}px, ${targetY - startY}px) scale(0) rotate(360deg)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }
    
    // Event listeners aprimorados
    waxSeal.addEventListener('click', function(e) {
        e.stopPropagation();
        openEnvelope();
    });
    
    closeButton.addEventListener('click', function(e) {
        e.stopPropagation();
        closeEnvelope();
    });
    
    // Clique no overlay (fora do envelope) para fechar
    overlay.addEventListener('click', function() {
        closeEnvelope();
    });
    
    // Clique no convite não deve fechar o envelope
    invitationContainer.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Clique no envelope não deve fechar
    envelopeWrapper.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Suporte a toque aprimorado para dispositivos móveis
    waxSeal.addEventListener('touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!isOpened && !isAnimating) {
            this.style.transform = 'translateX(-50%) scale(1.08)';
            this.style.filter = 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))';
        }
    });
    
    waxSeal.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!isOpened && !isAnimating) {
            this.style.transform = 'translateX(-50%) scale(1)';
            this.style.filter = 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5))';
            openEnvelope();
        }
    });
    
    // Efeito hover aprimorado para desktop
    waxSeal.addEventListener('mouseenter', function() {
        if (!isOpened && !isAnimating) {
            this.style.transform = 'translateX(-50%) scale(1.12)';
            this.style.filter = 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 25px rgba(255, 215, 0, 0.3))';
        }
    });
    
    waxSeal.addEventListener('mouseleave', function() {
        if (!isOpened && !isAnimating) {
            this.style.transform = 'translateX(-50%) scale(1)';
            this.style.filter = 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5))';
        }
    });
    
    // Prevenção de seleção de texto e drag
    [waxSeal, closeButton, interactionHint, overlay, invitationContainer].forEach(element => {
        element.addEventListener('selectstart', function(e) {
            e.preventDefault();
        });
        
        element.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });
    });
    
    // Função para mostrar notificações elegantes aprimoradas
    function showElegantNotification(message, duration = 3000) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 25px;
            left: 50%;
            transform: translateX(-50%) translateY(-20px);
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(40, 40, 40, 0.9));
            color: white;
            padding: 18px 30px;
            border-radius: 35px;
            font-size: 0.95rem;
            font-weight: 300;
            letter-spacing: 0.5px;
            z-index: 1000;
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        // Mostra a notificação
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);
        
        // Remove a notificação
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, duration);
    }
    
    // Detecção de orientação aprimorada para dispositivos móveis
    function handleOrientationChange() {
        setTimeout(() => {
            // Força um reflow para ajustar o layout
            document.body.style.height = window.innerHeight + 'px';
            
            // Recentra o convite se estiver aberto
            if (isOpened) {
                centerInvitation();
            }
            
            setTimeout(() => {
                document.body.style.height = '100vh';
            }, 150);
        }, 100);
    }
    
    // Event listeners para orientação
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
    
    // Prevenção de zoom em dispositivos móveis
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('gesturechange', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('gestureend', function(e) {
        e.preventDefault();
    });
    
    // Prevenção de scroll bounce no iOS
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    // Ajuste inicial da altura para dispositivos móveis
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    
    // Efeito de loading inicial aprimorado
    window.addEventListener('load', function() {
        document.querySelector('.fullscreen-container').style.opacity = '1';
        
        // Animação de entrada para o lacre
        setTimeout(() => {
            if (!isOpened) {
                waxSeal.style.animation = 'subtle-pulse 3s ease-in-out infinite';
            }
        }, 1500);
        
        // Mostra dica inicial
        setTimeout(() => {
            showElegantNotification('Toque no lacre dourado para abrir o convite', 5000);
        }, 2000);
    });
    
    // Função para detectar se é um dispositivo móvel
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Ajustes específicos para dispositivos móveis
    if (isMobileDevice()) {
        document.body.classList.add('mobile-device');
        
        // Prevenção de zoom duplo toque
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // Ajuste específico para centralização em mobile
        function ensureMobileCentering() {
            if (isOpened) {
                const invitation = document.getElementById('invitation-container');
                if (invitation) {
                    invitation.style.position = 'fixed';
                    invitation.style.top = '50%';
                    invitation.style.left = '50%';
                    invitation.style.transform = 'translate(-50%, -50%) scale(1.05)';
                }
            }
        }
        
        // Aplica centralização específica para mobile
        setInterval(ensureMobileCentering, 100);
    }
    
    // Tecla ESC para fechar o envelope
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isOpened && !isAnimating) {
            closeEnvelope();
        }
    });
    
    // Função para garantir centralização contínua
    function ensureContinuousCentering() {
        if (isOpened && !isAnimating) {
            centerInvitation();
        }
    }
    
    // Verifica centralização a cada 200ms quando aberto
    setInterval(ensureContinuousCentering, 200);
    
    // Debug: log para verificar se o script está funcionando
    console.log('Convite digital aprimorado carregado com sucesso!');
    console.log('Funcionalidades: centralização perfeita, estética refinada, interatividade aprimorada');
});

