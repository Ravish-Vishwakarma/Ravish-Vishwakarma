document.addEventListener('DOMContentLoaded', () => {
    // Modal Elements
    const activityCards = document.querySelectorAll('.activity-card');
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalMetaContent = document.getElementById('modal-meta-content');
    const closeButton = document.querySelector('.close-button');

    // Search Bar Elements
    const searchBar = document.getElementById('search-bar');

    if (!modal || !modalTitle || !modalDescription || !modalMetaContent || !closeButton) {
        console.error('Modal elements not found!');
        return;
    }

    // Modal Logic
    const openModal = (card) => {
        const title = card.dataset.title || 'No Title';
        const contentElement = card.querySelector('.modal-card-content');
        const descriptionHTML = contentElement ? contentElement.innerHTML : '<p>No description available.</p>';
        const lang = card.dataset.lang || '';
        const langColor = card.dataset.langColor || '#8b949e';
        const date = card.dataset.date || '';

        modalTitle.textContent = title;
        modalDescription.innerHTML = descriptionHTML;

        modalMetaContent.innerHTML = `
            <span class="lang-indicator" style="background-color: ${langColor};"></span>
            <span>${lang}</span>
            <span>${date}</span>
        `;

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    };

    activityCards.forEach(card => {
        card.addEventListener('click', () => openModal(card));
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openModal(card);
            }
        });
    });

    closeButton.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Search Logic
    if (searchBar) {
        searchBar.addEventListener('input', () => {
            const searchTerm = searchBar.value.toLowerCase();
            activityCards.forEach(card => {
                const title = card.dataset.title?.toLowerCase() || '';
                const isVisible = title.includes(searchTerm);
                // Use .style.display to hide/show cards
                card.style.display = isVisible ? 'block' : 'none';
            });
        });
    }
});