// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile en cliquant sur un lien
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navigation smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation de la barre de navigation au scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animation des éléments au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer tous les éléments avec la classe fade-in
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});

// Animation des barres de compétences
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Déclencher l'animation des compétences quand la section est visible
const skillsSection = document.querySelector('#competences');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

// Animation des statistiques
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;
        
        const updateStat = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current) + (stat.textContent.includes('%') ? '%' : '+');
                requestAnimationFrame(updateStat);
            } else {
                stat.textContent = stat.textContent.replace('+', '') + (stat.textContent.includes('%') ? '' : '+');
            }
        };
        
        updateStat();
    });
}

// Déclencher l'animation des stats quand la section est visible
const aboutSection = document.querySelector('#apropos');
if (aboutSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(aboutSection);
}

// Effet de parallaxe pour les éléments flottants
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Animation des cartes de projet au hover
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Gestion du formulaire de contact
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Animation de soumission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simuler l'envoi
        setTimeout(() => {
            submitBtn.textContent = 'Message envoyé !';
            submitBtn.style.background = '#28a745';
            
            // Reset du formulaire
            this.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// Animation des tags de compétences
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#667eea';
        this.style.color = 'white';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#f0f0f0';
        this.style.color = '#666';
    });
});

// Effet de typewriter pour le titre principal
function typewriterEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Animation des liens sociaux
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Effet de particules en arrière-plan (optionnel)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Initialiser les particules
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Ajouter la classe fade-in aux éléments
    const elementsToAnimate = document.querySelectorAll('.about-content, .project-card, .skill-category, .contact-content');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
    });
});

// Animation du scroll indicator
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }
});

// Effet de révélation progressive des éléments
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Animation des boutons au hover
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Effet de parallaxe pour le titre principal
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        const rate = scrolled * -0.5;
        heroTitle.style.transform = `translateY(${rate}px)`;
    }
});

// Animation des statistiques avec compteur
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.textContent.includes('%') ? '%' : '+');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
        }
    }
    
    updateCounter();
}

// Espace de Travail Modal
const workspaceModal = document.getElementById('workspace-modal');
const addButton = document.querySelector('.add-button');
const closeWorkspace = document.querySelector('.close-workspace');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const addItemBtns = document.querySelectorAll('.add-item-btn');

// Ouvrir l'espace de travail
if (addButton) {
    addButton.addEventListener('click', () => {
        // Animation du bouton
        addButton.style.transform = 'scale(0.9)';
        setTimeout(() => {
            addButton.style.transform = 'scale(1)';
        }, 150);
        
        // Ouvrir le modal
        workspaceModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêcher le scroll
    });
}

// Fermer l'espace de travail
if (closeWorkspace) {
    closeWorkspace.addEventListener('click', () => {
        workspaceModal.classList.remove('active');
        document.body.style.overflow = ''; // Réactiver le scroll
    });
}

// Fermer en cliquant à l'extérieur
workspaceModal.addEventListener('click', (e) => {
    if (e.target === workspaceModal) {
        workspaceModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Fermer avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && workspaceModal.classList.contains('active')) {
        workspaceModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Gestion des onglets
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Retirer la classe active de tous les onglets
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Ajouter la classe active à l'onglet cliqué
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Ajouter des items
addItemBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-type');
        openFileSelector(type);
    });
});

// Fonction pour ouvrir le sélecteur de fichiers
function openFileSelector(type) {
    const fileInput = document.getElementById(`${type}-file-input`);
    if (fileInput) {
        fileInput.click();
    }
}

// Gestion des fichiers sélectionnés
document.getElementById('photo-file-input').addEventListener('change', (e) => {
    handleFileSelection(e, 'photo');
});

document.getElementById('ecommerce-file-input').addEventListener('change', (e) => {
    handleFileSelection(e, 'ecommerce');
});

document.getElementById('code-file-input').addEventListener('change', (e) => {
    handleFileSelection(e, 'code');
});

// Fonction pour gérer la sélection de fichiers
function handleFileSelection(event, type) {
    const file = event.target.files[0];
    if (file) {
        addFileItem(file, type);
        // Reset l'input pour permettre de sélectionner le même fichier
        event.target.value = '';
    }
}

// Fonction pour ajouter un item avec un vrai fichier
function addFileItem(file, type) {
    const gridId = `${type}-grid`;
    const grid = document.getElementById(gridId);
    
    if (!grid) return;
    
    const itemCard = document.createElement('div');
    itemCard.className = `item-card ${type}-item`;
    
    // Obtenir l'extension du fichier
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const fileName = file.name;
    const fileSize = formatFileSize(file.size);
    
    // Déterminer l'icône selon le type de fichier
    let icon = getFileIcon(fileExtension, type);
    
    itemCard.innerHTML = `
        <div class="item-preview">
            <i class="${icon}"></i>
        </div>
        <div class="item-info">
            <h4>${fileName}</h4>
            <p>${fileSize} • ${fileExtension.toUpperCase()}</p>
        </div>
        <div class="item-actions">
            <button class="action-btn download-btn" title="Télécharger">
                <i class="fas fa-download"></i>
            </button>
            <button class="action-btn delete-btn" title="Supprimer">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    // Animation d'apparition
    itemCard.style.opacity = '0';
    itemCard.style.transform = 'translateY(20px)';
    
    grid.appendChild(itemCard);
    
    // Animation
    setTimeout(() => {
        itemCard.style.transition = 'all 0.3s ease';
        itemCard.style.opacity = '1';
        itemCard.style.transform = 'translateY(0)';
    }, 10);
    
    // Gestion des actions
    const downloadBtn = itemCard.querySelector('.download-btn');
    const deleteBtn = itemCard.querySelector('.delete-btn');
    
    // Télécharger le fichier
    downloadBtn.addEventListener('click', () => {
        downloadFile(file);
    });
    
    // Supprimer l'item
    deleteBtn.addEventListener('click', () => {
        if (confirm('Voulez-vous supprimer ce fichier ?')) {
            itemCard.style.opacity = '0';
            itemCard.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                grid.removeChild(itemCard);
            }, 300);
        }
    });
    
    // Double-clic pour ouvrir le fichier (si c'est une image)
    if (type === 'photo' && file.type.startsWith('image/')) {
        itemCard.addEventListener('dblclick', () => {
            openImagePreview(file);
        });
        itemCard.title = 'Double-cliquez pour prévisualiser';
    }
}

// Fonction pour obtenir l'icône selon l'extension et le type
function getFileIcon(extension, type) {
    const iconMap = {
        // Images
        'jpg': 'fas fa-image',
        'jpeg': 'fas fa-image',
        'png': 'fas fa-image',
        'gif': 'fas fa-image',
        'svg': 'fas fa-image',
        'webp': 'fas fa-image',
        
        // Documents
        'pdf': 'fas fa-file-pdf',
        'doc': 'fas fa-file-word',
        'docx': 'fas fa-file-word',
        'txt': 'fas fa-file-alt',
        
        // Code
        'js': 'fab fa-js-square',
        'ts': 'fas fa-code',
        'jsx': 'fab fa-react',
        'tsx': 'fab fa-react',
        'html': 'fab fa-html5',
        'css': 'fab fa-css3-alt',
        'py': 'fab fa-python',
        'java': 'fab fa-java',
        'cpp': 'fas fa-code',
        'c': 'fas fa-code',
        'php': 'fab fa-php',
        'rb': 'fas fa-gem',
        'go': 'fas fa-code',
        'rs': 'fas fa-code',
        'swift': 'fas fa-code',
        'kt': 'fas fa-code',
        
        // Archives
        'zip': 'fas fa-file-archive',
        'rar': 'fas fa-file-archive',
        '7z': 'fas fa-file-archive'
    };
    
    return iconMap[extension] || 'fas fa-file';
}

// Fonction pour formater la taille du fichier
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Fonction pour télécharger un fichier
function downloadFile(file) {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Fonction pour prévisualiser une image
function openImagePreview(file) {
    const url = URL.createObjectURL(file);
    
    // Créer un modal de prévisualisation
    const modal = document.createElement('div');
    modal.className = 'image-preview-modal';
    modal.innerHTML = `
        <div class="image-preview-content">
            <button class="close-preview">&times;</button>
            <img src="${url}" alt="${file.name}">
            <p>${file.name}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Fermer la prévisualisation
    const closeBtn = modal.querySelector('.close-preview');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        URL.revokeObjectURL(url);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            URL.revokeObjectURL(url);
        }
    });
}

// Initialiser les animations au chargement de la page
window.addEventListener('load', () => {
    // Ajouter des délais pour les animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

