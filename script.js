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
const gamesButton = document.getElementById('gamesButton');
const gamesDropdown = document.getElementById('gamesDropdown');
const galleryButton = document.getElementById('galleryButton');
const galleryScreen = document.getElementById('galleryScreen');
const galleryGrid = document.getElementById('galleryGrid');
const galleryLoading = document.getElementById('galleryLoading');
const galleryClose = document.getElementById('galleryClose');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const discScreen = document.getElementById('discScreen');
const goBackButton = document.getElementById('goBackButton');
const menuButtons = [aboutButton, workButton, gamesButton, galleryButton, contactButton];
const dropdowns = [aboutDropdown, workDropdown, gamesDropdown, contactDropdown];

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
  mainMenu.classList.remove('center-about', 'center-work', 'center-games', 'center-gallery', 'center-contact');
}

// Function to position dropdown relative to a button (desktop only)
function positionDropdown(button, dropdown) {
  if (dropdown.classList.contains('show') && window.innerWidth > 768) {
    const buttonRect = button.getBoundingClientRect();
    const iconRect = button.querySelector('.menu-icon').getBoundingClientRect();

    // Position dropdown directly under the button icon, centered
    dropdown.style.top = `${iconRect.bottom + 68}px`;
    dropdown.style.left = `${iconRect.left + iconRect.width/2}px`;
    dropdown.style.transform = 'translateX(-50%)';
  }
}

// Function to position all visible dropdowns
function positionAllDropdowns() {
  positionDropdown(aboutButton, aboutDropdown);
  positionDropdown(workButton, workDropdown);
  positionDropdown(gamesButton, gamesDropdown);
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
          mainMenu.classList.remove('center-about', 'center-work', 'center-games', 'center-gallery', 'center-contact');
          button.classList.add('active');

          if (button === aboutButton) {
            mainMenu.classList.add('center-about');
          } else if (button === workButton) {
            mainMenu.classList.add('center-work');
          } else if (button === gamesButton) {
            mainMenu.classList.add('center-games');
          } else if (button === galleryButton) {
            mainMenu.classList.add('center-gallery');
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
          } else if (button === gamesButton) {
            gamesDropdown.classList.add('show');
          } else if (button === galleryButton) {
            showGallery();
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
        } else if (button === gamesButton) {
          gamesDropdown.classList.add('show');
          positionDropdown(gamesButton, gamesDropdown);
        } else if (button === galleryButton) {
          showGallery();
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

// Handle game clicks
document.getElementById('assassinsCreed').addEventListener('click', () => {
  playClickSound();
  showDiscScreen('(My favourite line: "Nothing is true. Everything is permitted")');
});

document.getElementById('nba2k16').addEventListener('click', () => {
  playClickSound();
  showDiscScreen('(This was my favourite game tho)');
});

// Function to show disc insertion screen
function showDiscScreen(message) {
  // Clear active states first
  clearActiveStates();

  // Update the disc message
  const discMessage = document.querySelector('.disc-message');
  discMessage.innerHTML = `Please insert disc<br>${message}`;

  // Hide everything except disc screen
  mainMenu.style.display = 'none';
  menuTime.style.display = 'none';
  stage.style.display = 'none';

  // Show disc screen with fade in
  discScreen.style.display = 'flex';
  setTimeout(() => {
    discScreen.classList.add('show');
  }, 10);
}

// Function to go back to menu
function goBackToMenu() {
  playClickSound();

  // Hide disc screen with fade out
  discScreen.classList.remove('show');

  // After fade out animation completes, show menu again
  setTimeout(() => {
    discScreen.style.display = 'none';
    mainMenu.style.display = 'flex';
    menuTime.style.display = 'block';
    stage.style.display = 'block';
    clearActiveStates();
  }, 500);
}

// Handle go back button click
goBackButton.addEventListener('click', goBackToMenu);

// Gallery functionality
let galleryImages = [];
let currentImageIndex = 0;

// Function to load gallery images from gallery/ directory
async function loadGalleryImages() {
  // Common image and video extensions
  const mediaExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4'];
  const media = [];

  // Try to load media with common naming patterns
  for (let i = 1; i <= 50; i++) {
    for (const ext of mediaExtensions) {
      const mediaPath = `gallery/${i}.${ext}`;
      try {
        if (ext === 'mp4') {
          // Test if video exists by trying to load it
          const video = document.createElement('video');
          await new Promise((resolve, reject) => {
            video.onloadedmetadata = resolve;
            video.onerror = reject;
            video.src = mediaPath;
          });
          media.push({ path: mediaPath, type: 'video' });
        } else {
          // Test if image exists by trying to load it
          const img = new Image();
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = mediaPath;
          });
          media.push({ path: mediaPath, type: 'image' });
        }
        break; // Found this numbered media, move to next number
      } catch (e) {
        // Media doesn't exist, try next extension
        continue;
      }
    }
  }

  return media;
}

// Function to render gallery grid
function renderGallery(media) {
  galleryGrid.innerHTML = '';

  media.forEach((mediaItem, index) => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';

    if (mediaItem.type === 'video') {
      const video = document.createElement('video');
      video.src = mediaItem.path;
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;
      video.loading = 'lazy';

      galleryItem.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = mediaItem.path;
      img.alt = `Gallery image ${index + 1}`;
      img.loading = 'lazy';
      galleryItem.appendChild(img);
    }

    galleryItem.addEventListener('click', () => {
      playClickSound();
      openLightbox(index);
    });

    galleryGrid.appendChild(galleryItem);
  });
}

// Function to show gallery
async function showGallery() {
  // Only clear active states on desktop, or if not currently animating on mobile
  if (window.innerWidth > 768 || !galleryButton.classList.contains('active')) {
    clearActiveStates();
  }

  // Hide main elements
  mainMenu.style.display = 'none';
  menuTime.style.display = 'none';
  stage.style.display = 'none';

  // Show gallery screen
  galleryScreen.style.display = 'flex';

  // Always show loading text first
  galleryLoading.style.display = 'flex';
  galleryGrid.style.display = 'none';

  setTimeout(() => {
    galleryScreen.classList.add('show');
  }, 10);

  // Load images if not loaded yet
  if (galleryImages.length === 0) {
    try {
      galleryImages = await loadGalleryImages();
      renderGallery(galleryImages);

      // Hide loading text and show grid
      galleryLoading.style.display = 'none';
      galleryGrid.style.display = 'grid';
    } catch (e) {
      console.log('Could not load gallery images:', e);

      // Hide loading text and show error message
      galleryLoading.style.display = 'none';
      galleryGrid.style.display = 'block';
      galleryGrid.innerHTML = '<p style="color: #fff; text-align: center; padding: 2rem;">No images found in gallery/ directory</p>';
    }
  } else {
    // Images already loaded, but still show loading briefly for UX
    setTimeout(() => {
      galleryLoading.style.display = 'none';
      galleryGrid.style.display = 'grid';
    }, 500);
  }
}

// Function to close gallery
function closeGallery() {
  playClickSound();

  galleryScreen.classList.remove('show');

  setTimeout(() => {
    galleryScreen.style.display = 'none';
    mainMenu.style.display = 'flex';
    menuTime.style.display = 'block';
    stage.style.display = 'block';
  }, 500);
}

// Function to open lightbox
function openLightbox(mediaIndex) {
  currentImageIndex = mediaIndex;
  const mediaItem = galleryImages[currentImageIndex];

  // Remove existing content
  const existingMedia = lightbox.querySelector('.lightbox-image, .lightbox-video');
  if (existingMedia) {
    existingMedia.remove();
  }

  if (mediaItem.type === 'video') {
    const video = document.createElement('video');
    video.className = 'lightbox-video';
    video.src = mediaItem.path;
    video.controls = true;
    video.autoplay = true;
    video.loop = true;
    video.style.maxWidth = '100%';
    video.style.maxHeight = '100%';
    video.style.borderRadius = '8px';

    const lightboxContent = lightbox.querySelector('.lightbox-content');
    lightboxContent.insertBefore(video, lightboxContent.querySelector('.lightbox-next'));
  } else {
    const img = document.createElement('img');
    img.className = 'lightbox-image';
    img.src = mediaItem.path;
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.objectFit = 'contain';
    img.style.borderRadius = '8px';

    const lightboxContent = lightbox.querySelector('.lightbox-content');
    lightboxContent.insertBefore(img, lightboxContent.querySelector('.lightbox-next'));
  }

  lightbox.style.display = 'flex';

  setTimeout(() => {
    lightbox.classList.add('show');
  }, 10);
}

// Function to close lightbox
function closeLightbox() {
  playClickSound();

  lightbox.classList.remove('show');

  setTimeout(() => {
    lightbox.style.display = 'none';
  }, 300);
}

// Function to show previous image
function showPrevImage() {
  playClickSound();
  currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1;
  openLightbox(currentImageIndex);
}

// Function to show next image
function showNextImage() {
  playClickSound();
  currentImageIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0;
  openLightbox(currentImageIndex);
}

// Event listeners for gallery
galleryClose.addEventListener('click', closeGallery);
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

// Close lightbox when clicking on background
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  if (lightbox.classList.contains('show')) {
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        showPrevImage();
        break;
      case 'ArrowRight':
        showNextImage();
        break;
    }
  }

  if (galleryScreen.classList.contains('show')) {
    if (e.key === 'Escape') {
      closeGallery();
    }
  }
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
        } else if (currentActive === gamesButton) {
          workButton.click();
        } else if (currentActive === galleryButton) {
          gamesButton.click();
        } else if (currentActive === contactButton) {
          galleryButton.click();
        }
      } else {
        // Swipe left - go to next item
        if (currentActive === aboutButton) {
          workButton.click();
        } else if (currentActive === workButton) {
          gamesButton.click();
        } else if (currentActive === gamesButton) {
          galleryButton.click();
        } else if (currentActive === galleryButton) {
          contactButton.click();
        }
      }
    }
  }
}