const startupScreen = document.getElementById('startupScreen');
const startupButton = document.getElementById('startupButton');
const stage = document.getElementById('stage');
const logo = document.querySelector('.logo');
const mainMenu = document.getElementById('mainMenu');
const startupDateTime = document.getElementById('startupDateTime');
const menuTime = document.getElementById('menuTime');
const workButton = document.getElementById('workButton');
const workDropdown = document.getElementById('workDropdown');
const aboutButton = document.getElementById('aboutButton');
const aboutDropdown = document.getElementById('aboutDropdown');
const contactButton = document.getElementById('contactButton');
const contactDropdown = document.getElementById('contactDropdown');
const menuButtons = [aboutButton, workButton, contactButton];
const dropdowns = [aboutDropdown, workDropdown, contactDropdown];

// Function to format date/time
function formatDateTime() {
  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleString('en-US', { month: 'short' });
  const year = now.getFullYear();
  const time = now.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  return `${day} ${month} ${year}, ${time}`;
}

function formatTime() {
  const now = new Date();
  return now.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

// Set initial date and time
startupDateTime.textContent = formatDateTime();
menuTime.textContent = formatDateTime();

// Update menu time every second
setInterval(() => {
  menuTime.textContent = formatDateTime();
}, 1000);

// Handle startup screen OK button click
startupButton.addEventListener('click', () => {
  // Play startup sound
  const audio = new Audio('startup.mp3');
  audio.play().catch(e => console.log('Audio play failed:', e));

  startupScreen.classList.add('fade-out');
  // After text fades out, wait 1 second then start intro
  setTimeout(() => {
    startupScreen.classList.add('intro-ready');
    // Also force hide with display for immediate effect
    startupScreen.style.display = 'none';

    // Show logo and start its animation sequence
    logo.style.visibility = 'visible';
    logo.style.display = 'block';
    logo.style.zIndex = '2';

    // Force gif to restart by briefly changing src
    const originalSrc = logo.src;
    logo.src = '';
    logo.src = originalSrc;

    // Hide logo after 3 seconds and show main menu
    setTimeout(() => {
      logo.style.visibility = 'hidden';
      // Show main menu after logo disappears
      setTimeout(() => {
        mainMenu.classList.add('show');
        menuTime.classList.add('show');
      }, 500);
    }, 3000);
  }, 1000);
});

// Fade out logo on click (existing functionality)
window.addEventListener('click', (e) => {
  // Only trigger if startup screen is already hidden and click is not on startup elements
  if (startupScreen.classList.contains('fade-out') && !startupScreen.contains(e.target)) {
    stage.classList.add('fade-out');
    // Optional: add callback here after fade to load menu
    // setTimeout(() => { ... }, 1000);
  }
}, { once: false });

// Function to clear all active states
function clearActiveStates() {
  menuButtons.forEach(button => {
    button.classList.remove('active');
  });
  dropdowns.forEach(dropdown => {
    dropdown.classList.remove('show');
  });

  // Remove centering classes on mobile too
  mainMenu.classList.remove('center-about', 'center-work', 'center-contact');
}

// Function to position dropdown relative to a button (desktop only)
function positionDropdown(button, dropdown) {
  if (dropdown.classList.contains('show') && window.innerWidth > 768) {
    const buttonRect = button.getBoundingClientRect();
    const iconRect = button.querySelector('.menu-icon').getBoundingClientRect();

    // Position dropdown directly under the button icon
    dropdown.style.top = `${iconRect.bottom + 28}px`;
    dropdown.style.left = `${iconRect.left}px`;
  }
}

// Function to position all visible dropdowns
function positionAllDropdowns() {
  positionDropdown(aboutButton, aboutDropdown);
  positionDropdown(workButton, workDropdown);
  positionDropdown(contactButton, contactDropdown);
}

// Handle menu button clicks
menuButtons.forEach(button => {
  button.addEventListener('click', () => {
    playClickSound(); // Play click sound for menu buttons
    const wasActive = button.classList.contains('active');

    // If this button wasn't active, make it active
    if (!wasActive) {
      if (window.innerWidth <= 768) {
        // Mobile: hide dropdown first, then slide icons
        dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
        menuButtons.forEach(btn => btn.classList.remove('active'));

        // Start icon slide after brief delay for fade-out
        setTimeout(() => {
          mainMenu.classList.remove('center-about', 'center-work', 'center-contact');
          button.classList.add('active');

          if (button === aboutButton) {
            mainMenu.classList.add('center-about');
          } else if (button === workButton) {
            mainMenu.classList.add('center-work');
          } else if (button === contactButton) {
            mainMenu.classList.add('center-contact');
          }
        }, 50);

        // Wait for menu slide to complete before showing dropdown
        setTimeout(() => {
          if (button === aboutButton) {
            aboutDropdown.classList.add('show');
          } else if (button === workButton) {
            workDropdown.classList.add('show');
          } else if (button === contactButton) {
            contactDropdown.classList.add('show');
          }
        }, 300);
      } else {
        // Desktop - clear and show immediately
        clearActiveStates();
        button.classList.add('active');

        if (button === aboutButton) {
          aboutDropdown.classList.add('show');
          positionDropdown(aboutButton, aboutDropdown);
        } else if (button === workButton) {
          workDropdown.classList.add('show');
          positionDropdown(workButton, workDropdown);
        } else if (button === contactButton) {
          contactDropdown.classList.add('show');
          positionDropdown(contactButton, contactDropdown);
        }
      }
    } else {
      // If clicking the same button, just clear states
      clearActiveStates();
    }
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  const isClickingMenuButton = menuButtons.some(button => button.contains(e.target));
  const isClickingDropdown = dropdowns.some(dropdown => dropdown.contains(e.target));

  if (!isClickingMenuButton && !isClickingDropdown) {
    clearActiveStates();
  }
});

// Reposition dropdowns on window resize
window.addEventListener('resize', positionAllDropdowns);

// Handle folder item clicks
document.getElementById('project1').addEventListener('click', () => {
  playClickSound();
  window.open('https://www.matteblackdept.com/', '_blank');
});

document.getElementById('project2').addEventListener('click', () => {
  playClickSound();
  window.open('https://www.minuarchive.com/coming-soon', '_blank');
});

document.getElementById('project3').addEventListener('click', () => {
  playClickSound();
  window.open('https://x.com/klyra', '_blank');
});

document.getElementById('social').addEventListener('click', () => {
  playClickSound();
  window.open('https://www.instagram.com/ryansimarchive/?hl=en', '_blank');
});

document.getElementById('resume').addEventListener('click', () => {
  playClickSound();
  window.open('https://x.com/ryansimarchive', '_blank');
});

document.getElementById('email').addEventListener('click', () => {
  playClickSound();
  window.location.href = 'mailto:ryan@matteblackdept.com';
});

// Preload click audio for mobile performance
const clickAudio = new Audio('click.mp3');
clickAudio.preload = 'auto';

// Function to play click sound
function playClickSound() {
  clickAudio.currentTime = 0; // Reset to start for rapid clicks
  clickAudio.play().catch(e => console.log('Click audio play failed:', e));
}

// Touch/swipe handling for mobile
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;
  const minSwipeDistance = 50;

  // Only handle horizontal swipes that are primarily horizontal
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
    // Only handle swipes on mobile and when menu is visible
    if (window.innerWidth <= 768 && mainMenu.classList.contains('show')) {
      const currentActive = document.querySelector('.menu-button.active');

      if (deltaX > 0) {
        // Swipe right - go to previous item
        if (currentActive === workButton) {
          aboutButton.click();
        } else if (currentActive === contactButton) {
          workButton.click();
        }
      } else {
        // Swipe left - go to next item
        if (currentActive === aboutButton) {
          workButton.click();
        } else if (currentActive === workButton) {
          contactButton.click();
        }
      }
    }
  }
}