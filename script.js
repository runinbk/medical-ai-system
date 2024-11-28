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
            title: 'Historial Clínico Electrónico',
            features: [
                'Gestión Centralizada de Información',
                'Acceso en Tiempo Real',
                'Personalización y Seguimiento'
            ],
            description1: 'Permite almacenar y acceder a la información médica de los pacientes de manera segura y organizada. Desde antecedentes médicos, alergias, hasta tratamientos previos, todo está disponible en un único lugar para facilitar la toma de decisiones.  ',
            description2: 'Los médicos pueden consultar los historiales clínicos desde cualquier dispositivo autorizado, eliminando la necesidad de depender de documentos físicos o procesos manuales. Esto asegura una atención más eficiente.',
            description3: '',
            images: ['./img/SDG-1.png', './img/SDG-2.png']
        },
        'mod-diagnostico': {
            title: 'Diagnóstico Asistido por IA',
            features: [
                'Análisis Automatizado de Radiografías',
                'Resultados en Tiempo Récord',
                'Asistencia para Decisiones Clínicas'
            ],
            description1: 'Utilizando modelos avanzados de aprendizaje profundo, el sistema analiza radiografías de tórax para detectar anomalías como tumores, infecciones y otras patologías con alta precisión.',
            description2: 'Ofrece diagnósticos rápidos en cuestión de segundos, ayudando a priorizar pacientes críticos y reduciendo los tiempos de espera.',
            description3: 'Funciona como un apoyo para el personal médico, sugiriendo posibles diagnósticos basados en patrones detectados, pero dejando siempre la decisión final en manos del especialista.',
            images: ['./img/ia-diagnostico-1-0.jpg', './img/ia-diagnostico-2-0.jpg']
        },
        'mod-doctores': {
            title: 'Sistema Gestor de Documentos',
            features: [
                'Digitalización de Documentos Médicos',
                'Búsqueda y Organización Eficiente',
                'Seguridad y Cumplimiento'
            ],
            description1: 'Todos los registros, desde recetas hasta informes de laboratorio, son almacenados digitalmente en un sistema seguro y accesible. Esto elimina la dependencia de archivos físicos y reduce el riesgo de pérdida de información.',
            description2: 'Incluye un motor de búsqueda avanzado que permite localizar documentos específicos en segundos mediante palabras clave, fechas o categorías.',
            description3: 'arantiza la protección de los datos sensibles de los pacientes mediante cifrado, permisos personalizados y cumplimiento con normativas internacionales.',
            images: ['./img/HCE-1-0.jpg', './img/HCE-2.png']
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
                    <p class="text-gray-600">${content.description1}</p>
                    </br>
                    <p class="text-gray-600">${content.description2}</p>
                    </br>
                    <p class="text-gray-600">${content.description3}</p>
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