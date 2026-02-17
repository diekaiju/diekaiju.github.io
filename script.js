// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Add hover effect for links to expand cursor
const links = document.querySelectorAll('a, .menu-btn, .image-container');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        cursorOutline.style.borderColor = 'transparent';
    });

    link.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.borderColor = 'var(--accent-primary)';
    });
});

// Glitch Text Randomizer for Subtitle
const subtitleText = document.querySelector('.subtitle');
// Simple random character swap glitch effect could go here
// For now, let's just keep it simple

console.log("System initialized. Welcome, User.");

// GitHub Repository Fetching Logic
const projectsGrid = document.querySelector('.projects-grid');

if (projectsGrid) {
    const username = 'diekaiju';
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(repos => {
            // Clear existing static content
            projectsGrid.innerHTML = '';

            repos.forEach(repo => {
                const card = document.createElement('div');
                card.className = 'project-card';

                // Determine status color based on something arbitrary or random for the aesthetic
                // In a real app, this could be build status, valid license, etc.
                const statuses = ['online', 'warning', 'offline'];
                const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

                // Tech stack fallback
                const language = repo.language ? repo.language.toUpperCase() : 'UNKNOWN_TECH';

                card.innerHTML = `
                    <div class="card-inner">
                        <div class="card-front">
                            <h3>${repo.name.replace(/-/g, '_').toUpperCase()}</h3>
                            <p class="tech-stack">${language}</p>
                            <div class="status-indicator ${randomStatus}"></div>
                        </div>
                        <div class="card-back">
                            <p>${repo.description || 'No description available in the archives.'}</p>
                            <a href="${repo.html_url}" target="_blank" class="project-link">ACCESS_REPO</a>
                            <div class="repo-stats">
                                <span>★ ${repo.stargazers_count}</span>
                                <span>⑂ ${repo.forks_count}</span>
                            </div>
                        </div>
                    </div>
                `;

                // Add hover sound effect listener (re-applying logic)
                card.addEventListener('mouseenter', () => {
                    // Placeholder for sound effect
                });

                projectsGrid.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching repos:', error);
            projectsGrid.innerHTML = `<p class="error-msg">SYSTEM ERROR: UNABLE TO RETRIEVE ARCHIVES.</p>`;
        });
}
