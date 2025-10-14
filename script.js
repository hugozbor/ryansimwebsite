const siteLoadingScreen = document.getElementById('siteLoadingScreen');
const siteLoadingBar = document.getElementById('siteLoadingBar');
const siteLoadingPercentage = document.getElementById('siteLoadingPercentage');

let siteProgress = 0;
const siteLoadingInterval = setInterval(() => {
  const increment = Math.floor(Math.random() * 8) + 2;
  siteProgress = Math.min(siteProgress + increment, 95);

  siteLoadingBar.style.width = siteProgress + '%';
  siteLoadingPercentage.textContent = siteProgress + '%';

  if (siteProgress >= 95) {
    clearInterval(siteLoadingInterval);
  }
}, 100);

window.addEventListener('load', () => {
  document.body.classList.add('loaded');

  siteProgress = 100;
  siteLoadingBar.style.width = '100%';
  siteLoadingPercentage.textContent = '100%';

  setTimeout(() => {
    siteLoadingScreen.classList.add('hidden');
  }, 500);
});

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
const browserModal = document.getElementById('browserModal');
const browserClose = document.getElementById('browserClose');
const menuButtons = [aboutButton, workButton, gamesButton, galleryButton, contactButton];
const dropdowns = [aboutDropdown, workDropdown, gamesDropdown, contactDropdown];

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

startupDateTime.textContent = formatDateTime();
menuTime.textContent = formatDateTime();

let timeIntervalId = setInterval(() => {
  menuTime.textContent = formatDateTime();
}, 1000);

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearInterval(timeIntervalId);
  } else {
    menuTime.textContent = formatDateTime();
    timeIntervalId = setInterval(() => {
      menuTime.textContent = formatDateTime();
    }, 1000);
  }
});

startupButton.addEventListener('click', () => {
  const audio = new Audio('startup.mp3');
  audio.play().catch(e => console.log('audio play failed:', e));

  startupScreen.classList.add('fade-out');
  setTimeout(() => {
    startupScreen.classList.add('intro-ready');
    startupScreen.style.display = 'none';

    logo.style.visibility = 'visible';
    logo.style.display = 'block';
    logo.style.zIndex = '2';

    const originalSrc = logo.src;
    logo.src = '';
    logo.src = originalSrc;

    setTimeout(() => {
      logo.style.visibility = 'hidden';
      setTimeout(() => {
        mainMenu.classList.add('show');
        menuTime.classList.add('show');
      }, 500);
    }, 3000);
  }, 1000);
});

window.addEventListener('click', (e) => {
  if (startupScreen.classList.contains('fade-out') && !startupScreen.contains(e.target)) {
    stage.classList.add('fade-out');
  }
}, { once: false });

function clearActiveStates() {
  menuButtons.forEach(button => {
    button.classList.remove('active');
  });
  dropdowns.forEach(dropdown => {
    dropdown.classList.remove('show');
  });

  mainMenu.classList.remove('center-about', 'center-work', 'center-games', 'center-gallery', 'center-contact');
}

function positionDropdown(button, dropdown) {
  if (dropdown.classList.contains('show') && window.innerWidth > 768) {
    const iconRect = button.querySelector('.menu-icon').getBoundingClientRect();

    dropdown.style.top = `${iconRect.bottom + 68}px`;
    dropdown.style.left = `${iconRect.left + iconRect.width/2}px`;
    dropdown.style.transform = 'translateX(-50%)';
  }
}

function positionAllDropdowns() {
  positionDropdown(aboutButton, aboutDropdown);
  positionDropdown(workButton, workDropdown);
  positionDropdown(gamesButton, gamesDropdown);
  positionDropdown(contactButton, contactDropdown);
}

menuButtons.forEach(button => {
  button.addEventListener('click', () => {
    playClickSound();
    const wasActive = button.classList.contains('active');

    if (!wasActive) {
      if (window.innerWidth <= 768) {
        dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
        menuButtons.forEach(btn => btn.classList.remove('active'));

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
      clearActiveStates();
    }
  });
});

document.addEventListener('click', (e) => {
  const isClickingMenuButton = menuButtons.some(button => button.contains(e.target));
  const isClickingDropdown = dropdowns.some(dropdown => dropdown.contains(e.target));

  if (!isClickingMenuButton && !isClickingDropdown) {
    clearActiveStates();
  }
});

window.addEventListener('resize', positionAllDropdowns);

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

document.getElementById('bio').addEventListener('click', () => {
  playClickSound();
  showBrowserModal();
});

document.getElementById('assassinsCreed').addEventListener('click', () => {
  playClickSound();
  showDiscScreen('(My favourite line: "Nothing is true. Everything is permitted")');
});

document.getElementById('nba2k16').addEventListener('click', () => {
  playClickSound();
  showDiscScreen('(This was my favourite game tho)');
});

function showDiscScreen(message) {
  clearActiveStates();

  const discMessage = document.querySelector('.disc-message');
  discMessage.innerHTML = `Please insert disc<br>${message}`;

  mainMenu.style.display = 'none';
  menuTime.style.display = 'none';
  stage.style.display = 'none';

  discScreen.style.display = 'flex';
  setTimeout(() => {
    discScreen.classList.add('show');
  }, 10);
}

function goBackToMenu() {
  playClickSound();

  discScreen.classList.remove('show');

  setTimeout(() => {
    discScreen.style.display = 'none';
    mainMenu.style.display = 'flex';
    menuTime.style.display = 'block';
    stage.style.display = 'block';
    clearActiveStates();
  }, 500);
}

goBackButton.addEventListener('click', goBackToMenu);

function showBrowserModal() {
  clearActiveStates();

  mainMenu.style.display = 'none';
  menuTime.style.display = 'none';
  stage.style.display = 'none';

  browserModal.style.display = 'flex';
  setTimeout(() => {
    browserModal.classList.add('show');
  }, 10);
}

function closeBrowserModal() {
  playClickSound();

  browserModal.classList.remove('show');

  setTimeout(() => {
    browserModal.style.display = 'none';
    mainMenu.style.display = 'flex';
    menuTime.style.display = 'block';
    stage.style.display = 'block';
  }, 300);
}

browserClose.addEventListener('click', closeBrowserModal);

browserModal.addEventListener('click', (e) => {
  if (e.target === browserModal) {
    closeBrowserModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (browserModal.classList.contains('show') && e.key === 'Escape') {
    closeBrowserModal();
  }
});

let galleryImages = [];
let currentImageIndex = 0;

async function loadGalleryImages() {
  const mediaExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4'];
  const media = [];

  for (let i = 1; i <= 10; i++) {
    for (const ext of mediaExtensions) {
      const mediaPath = `gallery/${i}.${ext}`;
      try {
        if (ext === 'mp4') {
          const video = document.createElement('video');
          await new Promise((resolve, reject) => {
            video.onloadedmetadata = resolve;
            video.onerror = reject;
            video.src = mediaPath;
          });
          media.push({ path: mediaPath, type: 'video' });
        } else {
          const img = new Image();
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = mediaPath;
          });
          media.push({ path: mediaPath, type: 'image' });
        }
        break;
      } catch (e) {
        continue;
      }
    }
  }

  return media;
}

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

async function showGallery() {
  if (window.innerWidth > 768 || !galleryButton.classList.contains('active')) {
    clearActiveStates();
  }

  mainMenu.style.display = 'none';
  menuTime.style.display = 'none';
  stage.style.display = 'none';

  galleryScreen.style.display = 'flex';

  galleryLoading.style.display = 'flex';
  galleryGrid.style.display = 'none';

  setTimeout(() => {
    galleryScreen.classList.add('show');
  }, 10);

  if (galleryImages.length === 0) {
    try {
      galleryImages = await loadGalleryImages();
      renderGallery(galleryImages);

      galleryLoading.style.display = 'none';
      galleryGrid.style.display = 'grid';
    } catch (e) {
      console.log('could not load gallery images:', e);

      galleryLoading.style.display = 'none';
      galleryGrid.style.display = 'block';
      galleryGrid.innerHTML = '<p style="color: #fff; text-align: center; padding: 2rem;">no images found in gallery/ directory</p>';
    }
  } else {
    setTimeout(() => {
      galleryLoading.style.display = 'none';
      galleryGrid.style.display = 'grid';
    }, 500);
  }
}

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

function openLightbox(mediaIndex) {
  currentImageIndex = mediaIndex;
  const mediaItem = galleryImages[currentImageIndex];

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

function closeLightbox() {
  playClickSound();

  lightbox.classList.remove('show');

  setTimeout(() => {
    lightbox.style.display = 'none';
  }, 300);
}

function showPrevImage() {
  playClickSound();
  currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1;
  openLightbox(currentImageIndex);
}

function showNextImage() {
  playClickSound();
  currentImageIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0;
  openLightbox(currentImageIndex);
}

galleryClose.addEventListener('click', closeGallery);
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

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

  // Arrow key navigation for menu on desktop
  if (window.innerWidth > 768 && mainMenu.classList.contains('show')) {
    const currentActive = document.querySelector('.menu-button.active');
    const activeDropdown = dropdowns.find(dropdown => dropdown.classList.contains('show'));

    // Down arrow - navigate through dropdown items
    if (e.key === 'ArrowDown' && activeDropdown) {
      e.preventDefault();
      const items = Array.from(activeDropdown.querySelectorAll('.dropdown-item'));
      const currentSelected = activeDropdown.querySelector('.dropdown-item.keyboard-selected');

      if (!currentSelected) {
        // Select first item
        items[0]?.classList.add('keyboard-selected');
        playClickSound();
      } else {
        // Move to next item
        const currentIndex = items.indexOf(currentSelected);
        const nextIndex = (currentIndex + 1) % items.length;
        currentSelected.classList.remove('keyboard-selected');
        items[nextIndex]?.classList.add('keyboard-selected');
        playClickSound();
      }
      return;
    }

    // Up arrow - navigate backwards through dropdown items
    if (e.key === 'ArrowUp' && activeDropdown) {
      e.preventDefault();
      const items = Array.from(activeDropdown.querySelectorAll('.dropdown-item'));
      const currentSelected = activeDropdown.querySelector('.dropdown-item.keyboard-selected');

      if (!currentSelected) {
        // Select last item
        items[items.length - 1]?.classList.add('keyboard-selected');
        playClickSound();
      } else {
        // Move to previous item
        const currentIndex = items.indexOf(currentSelected);
        const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        currentSelected.classList.remove('keyboard-selected');
        items[prevIndex]?.classList.add('keyboard-selected');
        playClickSound();
      }
      return;
    }

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      // Clear any dropdown selections when navigating horizontally
      dropdowns.forEach(dropdown => {
        dropdown.querySelectorAll('.dropdown-item').forEach(item => {
          item.classList.remove('keyboard-selected');
        });
      });

      // If nothing is selected, start at Games
      if (!currentActive) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          gamesButton.click();
        }
        return;
      }

      let nextButton = null;

      if (e.key === 'ArrowLeft') {
        if (currentActive === workButton) {
          nextButton = aboutButton;
        } else if (currentActive === gamesButton) {
          nextButton = workButton;
        } else if (currentActive === galleryButton) {
          nextButton = gamesButton;
        } else if (currentActive === contactButton) {
          nextButton = galleryButton;
        }
      } else if (e.key === 'ArrowRight') {
        if (currentActive === aboutButton) {
          nextButton = workButton;
        } else if (currentActive === workButton) {
          nextButton = gamesButton;
        } else if (currentActive === gamesButton) {
          nextButton = galleryButton;
        } else if (currentActive === galleryButton) {
          nextButton = contactButton;
        }
      }

      // Handle gallery button specially - only highlight, don't open
      if (nextButton === galleryButton) {
        clearActiveStates();
        galleryButton.classList.add('active');
        playClickSound();
      } else if (nextButton) {
        nextButton.click();
      }
    } else if (e.key === 'Enter') {
      // Check if a dropdown item is selected
      if (activeDropdown) {
        const selectedItem = activeDropdown.querySelector('.dropdown-item.keyboard-selected');
        if (selectedItem) {
          selectedItem.click();
          return;
        }
      }

      // Enter key opens gallery if it's highlighted
      if (currentActive === galleryButton) {
        showGallery();
      }
    }
  }
});

let clickAudio;

function initAudio() {
  if (!clickAudio) {
    clickAudio = new Audio('click.mp3');
    clickAudio.preload = 'auto';
  }
}

document.addEventListener('touchstart', initAudio, { once: true, passive: true });
document.addEventListener('click', initAudio, { once: true });

function playClickSound() {
  if (window.innerWidth <= 768) {
    return;
  }

  if (!clickAudio) {
    initAudio();
  }
  clickAudio.currentTime = 0;
  clickAudio.play().catch(e => console.log('click audio play failed:', e));
}

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;
  const minSwipeDistance = 50;

  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
    if (window.innerWidth <= 768 && mainMenu.classList.contains('show')) {
      const currentActive = document.querySelector('.menu-button.active');

      if (deltaX > 0) {
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

// Wikipedia page functionality
function initWikipediaPage() {
  const wikiSearch = document.getElementById('wikiSearch');
  const wikiArticle = document.querySelector('.wiki-article');
  const wikiTocLinks = document.querySelectorAll('.wiki-toc-link');
  const wikiEditLinks = document.querySelectorAll('.wiki-edit');
  const wikiSections = document.querySelectorAll('.wiki-section');

  // Prevent form submission and blur on Enter
  const wikiSearchForm = document.querySelector('.wiki-topbar__search');
  if (wikiSearchForm) {
    wikiSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (wikiSearch) {
        wikiSearch.blur();
      }
    });
  }

  // Search functionality
  if (wikiSearch && wikiArticle) {
    wikiSearch.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();

      if (!searchTerm) {
        // Clear all highlights
        const marks = wikiArticle.querySelectorAll('mark');
        marks.forEach(mark => {
          const parent = mark.parentNode;
          parent.replaceChild(document.createTextNode(mark.textContent), mark);
          parent.normalize();
        });
        return;
      }

      // Clear previous highlights
      const marks = wikiArticle.querySelectorAll('mark');
      marks.forEach(mark => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      });

      // Highlight new matches
      const walker = document.createTreeWalker(
        wikiArticle,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            if (node.parentElement.tagName === 'MARK' ||
                node.parentElement.tagName === 'SCRIPT' ||
                node.parentElement.tagName === 'STYLE') {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      const nodesToHighlight = [];
      while (walker.nextNode()) {
        const node = walker.currentNode;
        const text = node.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          nodesToHighlight.push(node);
        }
      }

      nodesToHighlight.forEach(node => {
        const text = node.textContent;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const parts = text.split(regex);

        if (parts.length > 1) {
          const fragment = document.createDocumentFragment();
          parts.forEach(part => {
            if (part.toLowerCase() === searchTerm) {
              const mark = document.createElement('mark');
              mark.textContent = part;
              fragment.appendChild(mark);
            } else if (part) {
              fragment.appendChild(document.createTextNode(part));
            }
          });
          node.parentNode.replaceChild(fragment, node);
        }
      });
    });
  }

  // TOC active link tracking
  if (wikiTocLinks.length > 0 && wikiSections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            wikiTocLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      { threshold: 0.5, rootMargin: '-100px 0px -50% 0px' }
    );

    wikiSections.forEach(section => observer.observe(section));

    // Smooth scroll for TOC links
    wikiTocLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // Edit button flash effect
  if (wikiEditLinks.length > 0) {
    wikiEditLinks.forEach(editLink => {
      editLink.addEventListener('click', (e) => {
        e.preventDefault();
        const section = editLink.closest('.wiki-section');
        if (section) {
          section.classList.add('flash');
          setTimeout(() => section.classList.remove('flash'), 800);
        }
      });
    });
  }
}

// Wikipedia image lightbox functionality
function initWikiImageLightbox() {
  const wikiLightbox = document.getElementById('wikiLightbox');
  const wikiLightboxImage = document.getElementById('wikiLightboxImage');
  const wikiLightboxCaption = document.getElementById('wikiLightboxCaption');
  const wikiLightboxClose = document.getElementById('wikiLightboxClose');
  const wikiImages = document.querySelectorAll('.wiki-figure img, .wiki-infobox__img img');

  if (!wikiLightbox) return;

  // Add click handlers to all wiki images
  wikiImages.forEach(img => {
    img.addEventListener('click', (e) => {
      e.preventDefault();
      const caption = img.closest('.wiki-figure')?.querySelector('figcaption')?.textContent ||
                      img.alt || '';

      wikiLightboxImage.src = img.src;
      wikiLightboxImage.alt = img.alt;
      wikiLightboxCaption.textContent = caption;

      wikiLightbox.style.display = 'flex';
      setTimeout(() => {
        wikiLightbox.classList.add('show');
      }, 10);
    });
  });

  // Close lightbox
  function closeWikiLightbox() {
    wikiLightbox.classList.remove('show');
    setTimeout(() => {
      wikiLightbox.style.display = 'none';
    }, 300);
  }

  wikiLightboxClose.addEventListener('click', closeWikiLightbox);

  wikiLightbox.addEventListener('click', (e) => {
    if (e.target === wikiLightbox) {
      closeWikiLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (wikiLightbox.classList.contains('show') && e.key === 'Escape') {
      closeWikiLightbox();
    }
  });
}

// Back to top functionality
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      const browserContent = document.querySelector('.browser-content');
      if (browserContent) {
        browserContent.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

// Initialize Wikipedia page when browser modal is shown
const originalShowBrowserModal = showBrowserModal;
showBrowserModal = function() {
  originalShowBrowserModal();
  setTimeout(() => {
    initWikipediaPage();
    initWikiImageLightbox();
    initBackToTop();
  }, 100);
};
