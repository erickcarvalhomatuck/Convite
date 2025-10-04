document.addEventListener('DOMContentLoaded', function() {
    const waxSeal = document.getElementById('wax-seal');
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const invitationContainer = document.getElementById('invitation-container');
    const interactionHint = document.getElementById('interaction-hint');
    const closeButton = document.getElementById('close-button');
    const overlay = document.getElementById('overlay');
    const backgroundMusic = document.getElementById('background-music');
    
    let isOpened = false;
    let isAnimating = false;
    let musicStarted = false;
    
    // Função para criar efeito de confetes realistas - CORRIGIDA
    function createRealisticConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.querySelector('.fullscreen-container').appendChild(confettiContainer);
        
        const confettiCount = 150;
        const colors = [
            '#FFD700', '#DAA520', '#FFED4E', '#B8860B', '#FFA500',
            '#FFE135', '#F0E68C', '#EEE8AA', '#F5DEB3', '#FFDEAD'
        ];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const isCircle = Math.random() > 0.6;
            const isTriangle = Math.random() > 0.8;
            
            // Define a classe base e a classe de forma
            confetti.className = 'confetti';
            if (isTriangle) {
                confetti.classList.add('confetti-triangle');
                confetti.style.borderBottomColor = color;
            } else if (isCircle) {
                confetti.classList.add('confetti-circle');
                confetti.style.background = `linear-gradient(45deg, ${color}, ${color}dd)`;
            } else {
                confetti.classList.add('confetti-rectangle');
                confetti.style.background = `linear-gradient(45deg, ${color}, ${color}dd)`;
            }
            
            // Configurações aleatórias para cada confete
            const startX = Math.random() * 100; // Posição horizontal aleatória
            const startY = -20 - Math.random() * 30; // Começa acima da tela
            const duration = 3000 + Math.random() * 2000; // 3-5 segundos
            const delay = Math.random() * 1000; // Delay aleatório
            const swingDistance = (Math.random() - 0.5) * 200; // Movimento lateral
            const rotation = Math.random() * 720; // Rotação total
            
            // Aplica estilos diretamente
            confetti.style.cssText = `
                position: absolute;
                left: ${startX}vw;
                top: ${startY}px;
                opacity: 0;
                animation: confetti-fall ${duration}ms linear ${delay}ms forwards;
                --swing-distance: ${swingDistance}px;
                --rotation: ${rotation}deg;
                z-index: 35;
            `;
            
            confettiContainer.appendChild(confetti);
            
            // Remove o confete após a animação
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, duration + delay + 1000);
        }
        
        // Remove o container após todos os confetes terminarem
        setTimeout(() => {
            if (confettiContainer.parentNode) {
                confettiContainer.remove();
            }
        }, 8000);
    }
    
    // Função alternativa mais simples para confetes - SE A PRIMEIRA NÃO FUNCIONAR
    function createSimpleConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.querySelector('.fullscreen-container').appendChild(confettiContainer);
        
        const confettiCount = 100;
        const colors = ['#FFD700', '#DAA520', '#FFED4E', '#B8860B', '#FFA500'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = 8 + Math.random() * 8;
            const isCircle = Math.random() > 0.5;
            
            confetti.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: ${isCircle ? '50%' : '2px'};
                left: ${Math.random() * 100}vw;
                top: -30px;
                opacity: 0.9;
                z-index: 35;
            `;
            
            confettiContainer.appendChild(confetti);
            
            // Animação usando Web Animations API
            const animation = confetti.animate([
                { 
                    transform: 'translateY(0) rotate(0deg)',
                    opacity: 1
                },
                { 
                    transform: `translateY(calc(100vh + 50px)) rotate(${360 + Math.random() * 360}deg)`,
                    opacity: 0
                }
            ], {
                duration: 2000 + Math.random() * 3000,
                delay: Math.random() * 1000,
                easing: 'cubic-bezier(0.3, 0.1, 0.3, 1)'
            });
            
            animation.onfinish = () => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            };
        }
        
        setTimeout(() => {
            if (confettiContainer.parentNode) {
                confettiContainer.remove();
            }
        }, 6000);
    }
    
    // Função para iniciar a música
    function startBackgroundMusic() {
        if (!musicStarted) {
            backgroundMusic.volume = 0.7;
            backgroundMusic.play().then(() => {
                musicStarted = true;
                console.log('Música de fundo iniciada');
            }).catch(error => {
                console.log('Autoplay bloqueado, aguardando interação do usuário:', error);
                showElegantNotification('Toque em qualquer lugar para iniciar a música', 5000);
            });
        }
    }
    
    // Função para centralizar perfeitamente o convite
    function centerInvitation() {
        const invitation = document.getElementById('invitation-container');
        if (invitation) {
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
        
        // Tenta iniciar a música se ainda não foi iniciada
        if (!musicStarted) {
            startBackgroundMusic();
        }
        
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
            
            // Cria efeito de confetes - TENTA AMBAS AS VERSÕES
            try {
                createRealisticConfetti();
            } catch (error) {
                console.log('Usando confetes simples devido a erro:', error);
                createSimpleConfetti();
            }
            
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
                background: radial-gradient(circle, #8b4513, #a0522d);
                border-radius: 50%;
                pointer-events: none;
                z-index: 25;
                opacity: 1;
                box-shadow: 0 0 ${size * 2}px rgba(139, 69, 19, 0.6);
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
        startBackgroundMusic();
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
            this.style.filter = 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 20px rgba(139, 69, 19, 0.4))';
        }
    });
    
    waxSeal.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!isOpened && !isAnimating) {
            this.style.transform = 'translateX(-50%) scale(1)';
            this.style.filter = 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5))';
            startBackgroundMusic();
            openEnvelope();
        }
    });
    
    // Efeito hover aprimorado para desktop
    waxSeal.addEventListener('mouseenter', function() {
        if (!isOpened && !isAnimating) {
            this.style.transform = 'translateX(-50%) scale(1.12)';
            this.style.filter = 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 25px rgba(139, 69, 19, 0.3))';
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
            document.body.style.height = window.innerHeight + 'px';
            
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
        
        // Tenta iniciar a música automaticamente
        setTimeout(() => {
            startBackgroundMusic();
        }, 1000);
        
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
    
    setInterval(ensureContinuousCentering, 200);
    
    // Permite que qualquer interação do usuário inicie a música
    document.addEventListener('click', function() {
        if (!musicStarted) {
            startBackgroundMusic();
        }
    });
    
    document.addEventListener('touchstart', function() {
        if (!musicStarted) {
            startBackgroundMusic();
        }
    });
    
    console.log('Convite digital carregado com sucesso! Confetes implementados.');
});
