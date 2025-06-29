/*let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matches = 0;
let turns = 0;

const memoryCards = [
    '🍎', '🍎',
    '🍉', '🍉',
    '🥕', '🥕',
    '🍊', '🍊',
    '🍓', '🍓',
    '🍐', '🍐',
    '🍒', '🍒',
    '🍌', '🍌'
];

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', function () {
        mainNav.classList.toggle('active');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            mainNav.classList.remove('active');
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Mood Check
    const moodOptions = document.querySelectorAll('.mood-option');
    const moodResponse = document.getElementById('mood-response');
    const responseTitle = document.getElementById('response-title');
    const responseText = document.getElementById('response-text');
    const moodType = document.getElementById('mood-type');

    const moodMessages = {
        happy: {
            title: "You're feeling happy!",
            message: "It's wonderful that you're feeling happy today! Remember to share your happiness with others.",
        },
        sad: {
            title: "You're feeling sad",
            message: "It's okay to feel sad sometimes. Would you like to talk about what's bothering you?",
        },
        angry: {
            title: "You're feeling angry",
            message: "Anger is a normal emotion. Let's take some deep breaths together and think of calming strategies.",
        },
        scared: {
            title: "You're feeling scared",
            message: "Feeling scared is natural when facing something new or uncertain. You're safe here.",
        },
        confused: {
            title: "You're feeling confused",
            message: "Confusion means you're learning! Let's try to understand this together.",
        },
    };

    moodOptions.forEach(option => {
        option.addEventListener('click', function () {
            const mood = this.getAttribute('data-mood');
            moodType.textContent = mood;
            responseTitle.textContent = moodMessages[mood].title;
            responseText.textContent = moodMessages[mood].message;
            moodResponse.classList.remove('hidden');
            setTimeout(() => {
                moodResponse.style.opacity = '1';
                moodResponse.style.height = 'auto';
                moodResponse.style.padding = '30px';
                moodResponse.style.margin = '20px auto';
            }, 10);
        });
    });

    // Memory Game
    const memoryModal = document.querySelector('#memory-modal');
    const memoryGameBtn = document.querySelector('#memory-game');
    const closeMemoryModal = memoryModal.querySelector('.close-modal');
    const memoryBoard = document.getElementById('memory-board');

    memoryGameBtn.addEventListener('click', function () {
        setupMemoryGame();
        memoryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeMemoryModal.addEventListener('click', function () {
        memoryModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    function setupMemoryGame() {
        memoryBoard.innerHTML = '';
        document.getElementById('matches').textContent = '0';
        document.getElementById('turns').textContent = '0';

        matches = 0;
        turns = 0;
        hasFlippedCard = false;
        lockBoard = false;
        firstCard = null;
        secondCard = null;

        const shuffledCards = [...memoryCards].sort(() => Math.random() - 0.5);

        shuffledCards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('memory-card');
            cardElement.setAttribute('data-value', card);
            cardElement.setAttribute('data-index', index);
            cardElement.textContent = "";
            cardElement.addEventListener('click', flipCard);
            memoryBoard.appendChild(cardElement);
        });
    }

    function flipCard() {
        if (lockBoard || this === firstCard || this.classList.contains('matched')) return;
        this.classList.add('flipped');
        this.textContent = this.getAttribute('data-value');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        turns++;
        document.getElementById('turns').textContent = turns;
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value');
        if (isMatch) {
            disableCards();
            matches++;
            document.getElementById('matches').textContent = matches;

            if (matches === memoryCards.length / 2) {
                setTimeout(() => {
                    alert(`Congratulations! You won in ${turns} turns!`);
                }, 500);
            }
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = "";
            secondCard.textContent = "";
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    // Story Builder
    const storyModal = document.getElementById('story-modal');
    const storyBuilderCard = document.getElementById('story-builder');
    const closeStoryModal = storyModal.querySelector('.close-modal');

    storyBuilderCard.querySelector('button').addEventListener('click', () => {
        storyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeStoryModal.addEventListener('click', () => {
        storyModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    document.getElementById('build-story').addEventListener('click', () => {
        const char = document.getElementById('story-character').value;
        const setting = document.getElementById('story-setting').value;
        const situation = document.getElementById('story-situation').value;
        const ending = document.getElementById('story-ending').value;

        const paragraph = `${char.charAt(0).toUpperCase() + char.slice(1)} was ${setting}. One day, ${situation}. They felt unsure at first but remembered what they were taught about safety. ${char} stayed calm, thought carefully, and made the right choice. In the end, ${ending}. Their bravery helped them stay safe and strong. This moment taught them the power of speaking up and protecting themselves.`;

        document.getElementById('story-output').innerHTML = `<p>${paragraph}</p>`;
    });

    // Floating Help
    const helpBtn = document.querySelector('.help-btn');
    helpBtn.addEventListener('click', function () {
        alert("Need help? You can always talk to a trusted adult about anything that's bothering you.");
    });

    // Animate on Scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.mood-option, .game-card, .resource-card');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll('.mood-option, .game-card, .resource-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    window.addEventListener('click', function (e) {
        if (e.target === memoryModal || e.target === storyModal) {
            memoryModal.classList.remove('active');
            storyModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});
*/


// Memory Game Variables
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matches = 0;
let turns = 0;

// Game Assets
const memoryCards = [
    '🍎', '🍎', '🍉', '🍉', '🥕', '🥕', '🍊', '🍊',
    '🍓', '🍓', '🍐', '🍐', '🍒', '🍒', '🍌', '🍌'
];

document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // 1. MOBILE NAVIGATION
    // ======================
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.setAttribute('aria-expanded', mainNav.classList.contains('active'));
    });

    // ======================
    // 2. SMOOTH SCROLLING
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            mainNav.classList.remove('active');
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // ======================
    // 3. MOOD METER
    // ======================
    const moodOptions = document.querySelectorAll('.mood-option');
    const moodResponse = document.getElementById('mood-response');
    
    const moodMessages = {
        happy: {
            title: "You're feeling happy!",
            message: "It's wonderful that you're feeling happy today! Remember to share your happiness with others.",
            color: "#48BB78"
        },
        sad: {
            title: "You're feeling sad",
            message: "It's okay to feel sad sometimes. Would you like to talk about what's bothering you?",
            color: "#4299E1"
        },
        angry: {
            title: "You're feeling angry",
            message: "Anger is a normal emotion. Let's take some deep breaths together and think of calming strategies.",
            color: "#F56565"
        },
        scared: {
            title: "You're feeling scared",
            message: "Feeling scared is natural when facing something new or uncertain. You're safe here.",
            color: "#9F7AEA"
        },
        confused: {
            title: "You're feeling confused",
            message: "Confusion means you're learning! Let's try to understand this together.",
            color: "#ED8936"
        }
    };
    
    moodOptions.forEach(option => {
        option.addEventListener('click', function() {
            const mood = this.getAttribute('data-mood');
            const response = moodMessages[mood];
            
            // Update response display
            document.getElementById('response-title').textContent = response.title;
            document.getElementById('response-text').textContent = response.message;
            document.getElementById('mood-type').textContent = mood;
            
            // Visual feedback
            moodResponse.style.display = 'block';
            moodResponse.style.backgroundColor = response.color + '20';
            moodResponse.classList.remove('hidden');
            
            // Animate appearance
            setTimeout(() => {
                moodResponse.style.opacity = '1';
                moodResponse.style.height = 'auto';
                moodResponse.style.padding = '30px';
                moodResponse.style.margin = '20px auto';
            }, 10);
        });
    });

    // Journal button functionality
    document.getElementById('journal-btn')?.addEventListener('click', function() {
        const journalEntry = prompt("Write about your feelings here. Remember, this is just for you!");
        if (journalEntry) {
            alert("Your thoughts are important. Consider sharing them with a trusted adult.");
        }
    });

    // ======================
    // 4. MEMORY GAME
    // ======================
    const memoryModal = document.getElementById('memory-modal');
    const memoryGameBtn = document.getElementById('memory-game');
    const memoryBoard = document.getElementById('memory-board');
    
    memoryGameBtn.addEventListener('click', function() {
        setupMemoryGame();
        memoryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    function setupMemoryGame() {
        memoryBoard.innerHTML = '';
        document.getElementById('matches').textContent = '0';
        document.getElementById('turns').textContent = '0';
        
        // Reset game state
        matches = 0;
        turns = 0;
        hasFlippedCard = false;
        lockBoard = false;
        [firstCard, secondCard] = [null, null];
        
        // Shuffle and create cards
        const shuffledCards = [...memoryCards].sort(() => Math.random() - 0.5);
        
        shuffledCards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('memory-card');
            cardElement.setAttribute('data-value', card);
            cardElement.setAttribute('data-index', index);
            cardElement.setAttribute('aria-label', `Card ${index + 1}`);
            cardElement.addEventListener('click', flipCard);
            memoryBoard.appendChild(cardElement);
        });
    }
    
    function flipCard() {
        if (lockBoard || this === firstCard || this.classList.contains('matched')) return;
        
        // Flip animation
        this.classList.add('flipped');
        this.textContent = this.getAttribute('data-value');
        
        if (!hasFlippedCard) {
            // First card flip
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        
        // Second card flip
        secondCard = this;
        turns++;
        document.getElementById('turns').textContent = turns;
        
        checkForMatch();
    }
    
    function checkForMatch() {
        const isMatch = firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value');
        
        if (isMatch) {
            disableCards();
            matches++;
            document.getElementById('matches').textContent = matches;
            
            // Check for win
            if (matches === memoryCards.length / 2) {
                setTimeout(() => {
                    alert(`Congratulations! You matched all pairs in ${turns} turns!`);
                }, 500);
            }
        } else {
            unflipCards();
        }
    }
    
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
    }
    
    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }
    
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    // ======================
    // 5. STORY BUILDER
    // ======================
    const storyModal = document.getElementById('story-modal');
    const storyBuilderBtn = document.getElementById('story-builder')?.querySelector('button');
    const buildStoryBtn = document.getElementById('build-story');
    const storyOutput = document.getElementById('story-output');
    
    storyBuilderBtn?.addEventListener('click', function() {
        storyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    buildStoryBtn?.addEventListener('click', function() {
        const character = document.getElementById('story-character').value;
        const setting = document.getElementById('story-setting').value;
        const situation = document.getElementById('story-situation').value;
        const ending = document.getElementById('story-ending').value;
        
        const story = `
            <p>${character.charAt(0).toUpperCase() + character.slice(1)} was ${setting}.</p>
            <p>One day, ${situation}.</p>
            <p>They remembered their safety training and ${ending}.</p>
            <p class="moral"><strong>The lesson:</strong> Always trust your feelings and talk to trusted adults!</p>
        `;
        
        storyOutput.innerHTML = story;
        
        // Optional: Add text-to-speech
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(story.replace(/<[^>]*>/g, ''));
            utterance.rate = 0.9;
            speechSynthesis.speak(utterance);
        }
    });

    // ======================
    // 6. MODAL CONTROLS
    // ======================
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // ======================
    // 7. FLOATING HELP BUTTON
    // ======================
    document.querySelector('.help-btn')?.addEventListener('click', function() {
        const helpMessages = [
            "You can always talk to a trusted adult if you need help.",
            "Remember: Your feelings are important and valid.",
            "If something doesn't feel right, tell someone you trust.",
            "You're never alone - there are people who want to help you."
        ];
        alert(helpMessages[Math.floor(Math.random() * helpMessages.length)]);
    });

    // ======================
    // 8. SCROLL ANIMATIONS
    // ======================
    const animateOnScroll = function() {
        document.querySelectorAll('.mood-option, .game-card, .resource-card').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize animations
    document.querySelectorAll('.mood-option, .game-card, .resource-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // ======================
    // 9. ACCESSIBILITY IMPROVEMENTS
    // ======================
    // Add keyboard navigation for memory game
    document.addEventListener('keydown', function(e) {
        if (memoryModal.classList.contains('active') && e.key === 'Escape') {
            memoryModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Focus trap for modals
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (focusable.length === 0) return;

                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        last.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === last) {
                        first.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    });
});