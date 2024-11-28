document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Modal functionality
    const modal = document.getElementById('contactModal');
    const solicitudBtns = document.querySelectorAll('[id^="solicitar"]');
    const closeModal = document.getElementById('closeModal');
    const contactForm = document.getElementById('contactForm');

    solicitudBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Gracias por su interés. Nos pondremos en contacto pronto.');
            modal.classList.add('hidden');
            contactForm.reset();
        });
    }

    // Features section functionality
    const moduleContent = {
        'mod-pacientes': {
            title: 'Sistema de Gestión de Pacientes',
            features: [
                'Historiales médicos digitales',
                'Seguimiento de tratamientos',
                'Gestión de citas'
            ],
            description: 'Sistema integral para la gestión eficiente de información de pacientes, permitiendo un seguimiento detallado de historiales médicos y tratamientos.',
            images: ['/api/placeholder/400/300', '/api/placeholder/400/300']
        },
        'mod-diagnostico': {
            title: 'Diagnóstico Asistido por IA',
            features: [
                'Detección de anomalías',
                'Diagnóstico rápido',
                'Detección de patologías'
            ],
            description: 'Sistema de IA avanzado para el análisis de radiografías de tórax, facilitando diagnósticos precisos y rápidos.',
            images: ['/api/placeholder/400/300', '/api/placeholder/400/300']
        },
        'mod-doctores': {
            title: 'Sistema de Gestión de Doctores',
            features: [
                'Gestión de horarios',
                'Asignación de pacientes',
                'Registro de diagnósticos'
            ],
            description: 'Herramientas completas para que los médicos gestionen su práctica de manera eficiente.',
            images: ['/api/placeholder/400/300', '/api/placeholder/400/300']
        }
    };

    function updateModuleContent(moduleId) {
        const content = moduleContent[moduleId];
        const moduleDiv = document.getElementById('module-content');
        
        if (moduleDiv) {
            moduleDiv.innerHTML = `
                <div>
                    <h3 class="text-2xl font-bold mb-4">${content.title}</h3>
                    <ul class="space-y-2 mb-4">
                        ${content.features.map(feature => 
                            `<li class="flex items-center">
                                <span class="text-blue-500 mr-2">•</span>
                                ${feature}
                            </li>`
                        ).join('')}
                    </ul>
                    <p class="text-gray-600">${content.description}</p>
                </div>
                <div class="space-y-4">
                    ${content.images.map(img => 
                        `<img src="${img}" class="rounded-lg shadow-md w-full" alt="Feature illustration"/>`
                    ).join('')}
                </div>
            `;
        }
    }

    // Event listeners para los botones de módulo
    document.querySelectorAll('.module-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.module-btn').forEach(b => {
                b.classList.remove('active', 'bg-blue-600', 'text-white');
            });
            
            btn.classList.add('active', 'bg-blue-600', 'text-white');
            updateModuleContent(btn.id);
        });
    });

    // Mostrar primer módulo por defecto
    const firstModuleBtn = document.getElementById('mod-pacientes');
    if (firstModuleBtn) {
        firstModuleBtn.click();
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Media query for mobile menu
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    function handleScreenChange(e) {
        if (e.matches && mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    }
    mediaQuery.addListener(handleScreenChange);
});