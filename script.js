const blurOverlay = document.querySelector('.blur-overlay');

document.querySelectorAll('.card-wrapper').forEach((wrapper, index) => {
  const card = wrapper.querySelector('.card');
  const video  = wrapper.querySelector('.vid');
  const muteBtn = wrapper.querySelector('.mute-btn');
  const iconSound = muteBtn.querySelector('.icon-sound');
  const iconMute  = muteBtn.querySelector('.icon-mute');

  let leaveTimeout;

  // ── Hover: expand and play ──────────────────────────────────────────────────
  wrapper.addEventListener('mouseenter', () => {
    clearTimeout(leaveTimeout);
    
    // If it's already expanded, don't restart animation
    if (card.classList.contains('expanded')) return;

    // 1. Get original position
    const rect = wrapper.getBoundingClientRect();
    
    // Set card to fixed at original position
    card.style.position = 'fixed';
    card.style.top = rect.top + 'px';
    card.style.left = rect.left + 'px';
    card.style.width = rect.width + 'px';
    card.style.height = rect.height + 'px';
    card.style.margin = '0';
    
    // Force reflow so it transitions from this state
    card.offsetHeight;
    
    // Play video
    video.play().catch(() => {});
    card.classList.add('expanded');
    blurOverlay.classList.add('active');

    // Determine natural aspect ratio
    let vidW = video.videoWidth || 16;
    let vidH = video.videoHeight || 9;

    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    
    let maxVisualW = viewportW * 0.8;
    let maxVisualH = viewportH * 0.8;
    
    // For Card 2 and 3 (index 1 and 2), visual width/height are swapped due to 90deg rotation
    if (index === 1 || index === 2) {
      let temp = maxVisualW;
      maxVisualW = maxVisualH;
      maxVisualH = temp;
    }
    
    let targetW = maxVisualW;
    let targetH = targetW * (vidH / vidW);
    
    if (targetH > maxVisualH) {
      targetH = maxVisualH;
      targetW = targetH * (vidW / vidH);
    }
    
    const targetTop = (viewportH - targetH) / 2;
    const targetLeft = (viewportW - targetW) / 2;
    
    card.style.top = targetTop + 'px';
    card.style.left = targetLeft + 'px';
    card.style.width = targetW + 'px';
    card.style.height = targetH + 'px';

    // Apply rotation for Card 2 and 3
    if (index === 1 || index === 2) {
      card.classList.add('rotate-left');
    }
  });

  wrapper.addEventListener('mouseleave', () => {
    // Animate back to original position
    const rect = wrapper.getBoundingClientRect();
    
    card.style.top = rect.top + 'px';
    card.style.left = rect.left + 'px';
    card.style.width = rect.width + 'px';
    card.style.height = rect.height + 'px';
    
    card.classList.remove('rotate-left');
    card.classList.remove('expanded');
    blurOverlay.classList.remove('active');
    
    video.pause();
    video.currentTime = 0;
    
    // Wait for transition to finish, then reset position
    leaveTimeout = setTimeout(() => {
      if (!card.classList.contains('expanded')) {
        card.style.position = 'absolute';
        card.style.top = '0';
        card.style.left = '0';
        card.style.width = '100%';
        card.style.height = '100%';
      }
    }, 500); // 500ms matches CSS transition
  });

  // ── Mute toggle ─────────────────────────────────────────────────────────
  muteBtn.addEventListener('click', e => {
    e.stopPropagation();
    video.muted = !video.muted;
    iconSound.style.display = video.muted ? 'none'  : 'block';
    iconMute.style.display  = video.muted ? 'block' : 'none';
    muteBtn.setAttribute('aria-label', video.muted ? 'Unmute' : 'Mute');
  });
});
