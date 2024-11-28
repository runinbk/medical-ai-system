document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Modal functionality
    const modal = document.getElementById('contactModal');
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeModal = document.getElementById('closeModal');
    const contactForm = document.getElementById('contactForm');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Gracias por su interés. Nuestro equipo se pondrá en contacto con usted pronto.');
        modal.style.display = 'none';
        contactForm.reset();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        });
    });

    function initMobileCarousel() {
        if (window.innerWidth < 768) {
          const moduleButtons = document.querySelectorAll('.module-btn');
          let currentIndex = 0;
       
          // Crear flechas de navegación
          const container = document.querySelector('.module-container');
          container.innerHTML = `
            <button id="prevBtn" class="nav-arrow left-2">&larr;</button>
            <div class="module-wrapper"></div>
            <button id="nextBtn" class="nav-arrow right-2">&rarr;</button>
          `;
       
          // Mover botones al wrapper
          const wrapper = container.querySelector('.module-wrapper');
          moduleButtons.forEach(btn => wrapper.appendChild(btn));
       
          // Mostrar solo el módulo actual
          function updateVisibility() {
            moduleButtons.forEach((btn, i) => {
              btn.style.display = i === currentIndex ? 'block' : 'none';
            });
            
            // Actualizar visibilidad de flechas
            document.getElementById('prevBtn').style.display = currentIndex === 0 ? 'none' : 'block';
            document.getElementById('nextBtn').style.display = 
              currentIndex === moduleButtons.length - 1 ? 'none' : 'block';
          }
       
          // Event listeners para navegación
          document.getElementById('prevBtn').addEventListener('click', () => {
            if (currentIndex > 0) {
              currentIndex--;
              updateVisibility();
            }
          });
       
          document.getElementById('nextBtn').addEventListener('click', () => {
            if (currentIndex < moduleButtons.length - 1) {
              currentIndex++;
              updateVisibility(); 
            }
          });
       
          updateVisibility();
        }
       }

    ///////////////////////////////////////////////////

//     let currentFeature = 0;
// const totalFeatures = 3;

// document.getElementById('prevFeature').addEventListener('click', () => {
//     if (currentFeature > 0) {
//         currentFeature--;
//         updateFeatureSlider();
//     }
// });

// document.getElementById('nextFeature').addEventListener('click', () => {
//     if (currentFeature < totalFeatures - 1) {
//         currentFeature++;
//         updateFeatureSlider();
//     }
// });

// function updateFeatureSlider() {
//     const track = document.querySelector('.feature-track');
//     track.style.transform = `translateX(-${currentFeature * 100}%)`;
    
//     // Actualizar visibilidad de flechas
//     document.getElementById('prevFeature').style.opacity = currentFeature === 0 ? '0.5' : '1';
//     document.getElementById('nextFeature').style.opacity = currentFeature === totalFeatures - 1 ? '0.5' : '1';
// }

    //////////////////////////////////////////////////

    function updateActiveButton(id) {
        document.querySelectorAll('.module-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(id).classList.add('active');
    }

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

    // Event listeners para los botones
    document.querySelectorAll('.module-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remover clase activa de todos los botones
            document.querySelectorAll('.module-btn').forEach(b => 
                b.classList.remove('bg-blue-600', 'text-white'));
            
            // Agregar clase activa al botón clickeado
            btn.classList.add('bg-blue-600', 'text-white');
            
            // Actualizar contenido
            updateModuleContent(btn.id);
        });
    });

    // Mostrar el primer módulo por defecto
    document.getElementById('mod-pacientes').click();

    const track = document.querySelector('.carousel-track');
    const cards = track.children;
    const cardWidth = cards[0].offsetWidth;
    let currentIndex = 0;
    const maxIndex = Math.ceil(cards.length - (window.innerWidth >= 768 ? 4 : 1));

    document.querySelector('.next').addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    document.querySelector('.prev').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    function updateCarousel() {
        const offset = -currentIndex * cardWidth;
        track.style.transform = `translateX(${offset}px)`;
        updateIndicators();
    }

    function updateIndicators() {
        document.querySelectorAll('.carousel-indicators button').forEach((btn, i) => {
            btn.classList.toggle('bg-blue-600', i === currentIndex);
            btn.classList.toggle('bg-gray-300', i !== currentIndex);
        });
    }

    function updateCarousel() {
        const isMobile = window.innerWidth < 768;
        const cardWidth = isMobile ? track.offsetWidth : track.offsetWidth / 4;
        const offset = -currentIndex * cardWidth;
        track.style.transform = `translateX(${offset}px)`;
    }
    
    // Agregar listener para resize
    window.addEventListener('resize', updateCarousel);


});