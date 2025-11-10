class AudioManager {
  private bgMusic: HTMLAudioElement | null = null;
  private initialized = false;

  init() {
    if (this.initialized) return;

    this.bgMusic = new Audio('/sounds/bg-music.mp3');
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.3;

    this.checkSettings();

    window.addEventListener('settingsChanged', () => {
      this.checkSettings();
    });

    document.addEventListener('click', () => {
      if (!this.initialized) {
        this.initialized = true;
        this.checkSettings();
      }
    }, { once: true });
  }

  private checkSettings() {
    const musicEnabled = localStorage.getItem('musicEnabled');
    const shouldPlay = musicEnabled === null || JSON.parse(musicEnabled);

    if (shouldPlay && this.bgMusic) {
      this.bgMusic.play().catch(() => {});
    } else if (this.bgMusic) {
      this.bgMusic.pause();
    }
  }

  cleanup() {
    if (this.bgMusic) {
      this.bgMusic.pause();
      this.bgMusic = null;
    }
  }
}

export const audioManager = new AudioManager();
