"use client";

// Romantic Audio Manager
// Plays the classical, romantic Canon in D masterpiece starting from custom second
// Smooth volume fade-in, seamless looping, and rock-solid timestamp seeking

class RomanticAudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private targetVolume: number = 1.0;
  private fadeInterval: NodeJS.Timeout | null = null;
  private startTimeSeconds: number = 60;
  private hasSeekedToStart: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.initAudio();
    }
  }

  private initAudio() {
    if (this.audio) return;
    this.audio = new Audio("/music/romantic.mp3");
    this.audio.loop = false;
    this.audio.preload = "auto";
    this.audio.volume = 0;

    const enforceSeek = () => {
      if (this.audio && !this.hasSeekedToStart) {
        try {
          this.audio.currentTime = this.startTimeSeconds;
          if (Math.abs(this.audio.currentTime - this.startTimeSeconds) < 1.5) {
            this.hasSeekedToStart = true;
          }
        } catch {
          // Retry on subsequent events
        }
      }
    };

    // Attempt seek when metadata is loaded
    this.audio.addEventListener("loadedmetadata", enforceSeek);

    // Attempt seek when browser can play through/buffered enough
    this.audio.addEventListener("canplay", enforceSeek);

    // Safety net: If browser starts playing from 0s before buffering 60s,
    // force jump to second 60 on the very first playback tick
    this.audio.addEventListener("timeupdate", () => {
      if (!this.hasSeekedToStart && this.audio) {
        if (this.audio.currentTime < this.startTimeSeconds - 0.5) {
          try {
            this.audio.currentTime = this.startTimeSeconds;
            this.hasSeekedToStart = true;
          } catch {
            // Keep trying until buffer is ready
          }
        } else {
          this.hasSeekedToStart = true;
        }
      }
    });

    // When song ends, loop back to the configured start time
    this.audio.addEventListener("ended", () => {
      if (this.audio) {
        this.audio.currentTime = this.startTimeSeconds;
        this.audio.play().catch(() => {});
      }
    });

    this.audio.addEventListener("pause", () => {
      this.isPlaying = false;
    });

    this.audio.addEventListener("playing", () => {
      this.isPlaying = true;
      if (this.audio && this.audio.currentTime < this.startTimeSeconds - 0.5) {
        try {
          this.audio.currentTime = this.startTimeSeconds;
          this.hasSeekedToStart = true;
        } catch {}
      }
    });
  }

  private getClampedVolume(): number {
    return Math.max(0, Math.min(1, this.targetVolume));
  }

  private fadeIn(durationMs: number = 1200) {
    if (!this.audio) return;
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    const safeTarget = this.getClampedVolume();
    const stepTime = 50;
    const steps = durationMs / stepTime;
    const volumeStep = safeTarget / Math.max(1, steps);

    this.audio.volume = 0;
    this.fadeInterval = setInterval(() => {
      if (!this.audio) {
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        return;
      }
      if (this.audio.volume + volumeStep < safeTarget) {
        this.audio.volume = Math.min(1, this.audio.volume + volumeStep);
      } else {
        this.audio.volume = safeTarget;
        if (this.fadeInterval) clearInterval(this.fadeInterval);
      }
    }, stepTime);
  }

  public setStartTime(seconds: number): void {
    this.startTimeSeconds = Math.max(0, seconds);
    this.hasSeekedToStart = false;
    if (this.audio) {
      try {
        this.audio.currentTime = this.startTimeSeconds;
      } catch {}
    }
  }

  public async play(): Promise<boolean> {
    this.initAudio();
    if (!this.audio) return false;

    try {
      this.audio.currentTime = this.startTimeSeconds;
    } catch {}

    try {
      await this.audio.play();
      this.isPlaying = true;

      // Ensure seek right after play starts
      if (this.audio.currentTime < this.startTimeSeconds - 0.5) {
        try {
          this.audio.currentTime = this.startTimeSeconds;
          this.hasSeekedToStart = true;
        } catch {}
      }

      this.fadeIn(1200);
      return true;
    } catch {
      this.isPlaying = false;
      return false;
    }
  }

  public pause(): void {
    if (!this.audio) return;
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    this.audio.pause();
    this.isPlaying = false;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public setVolume(vol: number): void {
    this.targetVolume = Math.max(0, Math.min(1, vol));
    if (this.audio && this.isPlaying) {
      this.audio.volume = this.targetVolume;
    }
  }

  public setupAutoplay(): void {
    if (typeof window === "undefined") return;

    this.play().then((success) => {
      if (!success) {
        // Fallback: If browser policy blocks autoplay with zero interaction,
        // trigger playback on the earliest possible user action
        const events = [
          "pointerdown",
          "pointerup",
          "touchstart",
          "touchend",
          "mousedown",
          "click",
          "keydown",
          "wheel",
          "scroll",
          "focus"
        ];

        const onFirstInteraction = () => {
          this.play().then((ok) => {
            if (ok) {
              events.forEach((evt) => {
                window.removeEventListener(evt, onFirstInteraction);
                document.removeEventListener(evt, onFirstInteraction);
              });
            }
          });
        };

        events.forEach((evt) => {
          window.addEventListener(evt, onFirstInteraction, { passive: true });
          document.addEventListener(evt, onFirstInteraction, { passive: true });
        });
      }
    });
  }
}

export const romanticAudio = typeof window !== "undefined" ? new RomanticAudioManager() : null;
