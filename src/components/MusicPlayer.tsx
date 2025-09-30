import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, ChevronUp, ChevronDown, SkipForward, SkipBack, AlertCircle } from 'lucide-react';

// Simple ambient tone generator using Web Audio API
const createAmbientTone = (frequency: number, duration: number = 1) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
  
  return audioContext;
};

// Fallback music tracks - using royalty-free sources
const musicTracks = [
 'https://cdn.discordapp.com/attachments/906064406482411550/1422192910887293010/DELTARUNE_-_File_Select.mp3?ex=68dbc7dd&is=68da765d&hm=e1d4a292c36c1153d1a653b2c6152f454620df72c32c2f63efcf31ff07a7b3cf&',
  'https://cdn.discordapp.com/attachments/906064406482411550/1420444456078938182/63._The_Third_Sanctuary_DELTARUNE_Chapter_34_Soundtrack_-_Toby_Fox.mp3?ex=68db5a3c&is=68da08bc&hm=6c79537a04d95eb80e598114d1fb43b938e1627e66a79de4878c0249cb82c641&'
];

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.3); // Lower default volume
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [useWebAudio, setUseWebAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Setup audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setHasError(false);
    };
    const handlePause = () => setIsPlaying(false);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);
      setHasError(true);
      console.error('Audio loading error - switching to Web Audio fallback');
      // Switch to Web Audio API fallback
      setUseWebAudio(true);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Handle initial user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasInteracted(true);
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keypress', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keypress', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const playWebAudioTone = () => {
    try {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      // Play a gentle ambient tone
      const frequencies = [220, 330, 440, 550]; // Different ambient frequencies
      audioContextRef.current = createAmbientTone(frequencies[currentTrackIndex % frequencies.length], 10);
      setIsPlaying(true);
      setHasError(false);
      
      // Stop after 10 seconds and move to next
      setTimeout(() => {
        setIsPlaying(false);
        handleTrackEnd();
      }, 10000);
    } catch (error) {
      console.error('Web Audio API error:', error);
      setHasError(true);
    }
  };

  const playMusic = async () => {
    if (!hasInteracted) return;

    if (useWebAudio) {
      playWebAudioTone();
      return;
    }

    if (audioRef.current) {
      try {
        setIsLoading(true);
        setHasError(false);
        await audioRef.current.play();
      } catch (error) {
        console.log('Play prevented:', error);
        setIsLoading(false);
        setIsPlaying(false);
        setHasError(true);
        // Fallback to Web Audio
        setUseWebAudio(true);
        playWebAudioTone();
      }
    }
  };

  const pauseMusic = () => {
    if (useWebAudio && audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
      setIsPlaying(false);
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const togglePlayPause = async () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    
    if (isPlaying) {
      pauseMusic();
    } else {
      await playMusic();
    }
  };

  const handleTrackEnd = () => {
    const nextIndex = (currentTrackIndex + 1) % musicTracks.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(false);
    setHasError(false);
    // Auto-play next track if was playing
    if (isPlaying && hasInteracted) {
      setTimeout(() => playMusic(), 100);
    }
  };

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % musicTracks.length;
    setCurrentTrackIndex(nextIndex);
    setHasError(false);
    if (isPlaying && hasInteracted) {
      pauseMusic();
      setTimeout(() => playMusic(), 100);
    }
  };

  const prevTrack = () => {
    const prevIndex = currentTrackIndex === 0 ? musicTracks.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setHasError(false);
    if (isPlaying && hasInteracted) {
      pauseMusic();
      setTimeout(() => playMusic(), 100);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <div className="deltarune-card music-player-fixed overflow-hidden transition-all duration-300 ease-in-out shadow-lg">
      {!useWebAudio && (
        <audio
          ref={audioRef}
          src={musicTracks[currentTrackIndex]}
          onEnded={handleTrackEnd}
          loop={false}
          preload="metadata"
        />
      )}
      
      {/* Header with Music Icon and Expand/Collapse */}
      <div className="flex items-center justify-between p-3 bg-black/30">
        <div className="flex items-center gap-2">
          <Music size={16} className={hasError ? "text-red-400" : "text-blue-400"} />
          
          {hasError && !useWebAudio && (
            <AlertCircle size={12} className="text-red-400" title="Audio Error - Using fallback" />
          )}
          
          <div className="flex items-center gap-1">
            <button
              onClick={prevTrack}
              className="flex items-center justify-center w-6 h-6 bg-gray-600 hover:bg-gray-700 rounded-full transition-colors"
              title="Previous Track"
            >
              <SkipBack size={10} className="text-white" />
            </button>
            
            <button
              onClick={togglePlayPause}
              className="flex items-center justify-center w-7 h-7 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors disabled:opacity-50"
              title={isLoading ? 'Loading...' : isPlaying ? 'Pause' : 'Play'}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : isPlaying ? (
                <Pause size={12} className="text-white" />
              ) : (
                <Play size={12} className="text-white ml-0.5" />
              )}
            </button>
            
            <button
              onClick={nextTrack}
              className="flex items-center justify-center w-6 h-6 bg-gray-600 hover:bg-gray-700 rounded-full transition-colors"
              title="Next Track"
            >
              <SkipForward size={10} className="text-white" />
            </button>
          </div>
          
          {isPlaying && !hasError && (
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-blue-400 rounded animate-pulse" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-4 bg-blue-400 rounded animate-pulse" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1 h-2 bg-blue-400 rounded animate-pulse" style={{ animationDelay: '300ms' }}></div>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white hover:text-blue-300 transition-colors p-1"
          title={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>
      
      {/* Expanded Controls */}
      {isExpanded && (
        <div className="p-3 border-t border-blue-900/30 space-y-3">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="text-white hover:text-blue-300 transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(isMuted ? 0 : volume) * 100}%, #374151 ${(isMuted ? 0 : volume) * 100}%, #374151 100%)`
              }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-white text-xs pixel-font">
              Track {currentTrackIndex + 1}/{musicTracks.length}
            </span>
            <div className="text-xs text-gray-400">
              {Math.round((isMuted ? 0 : volume) * 100)}% vol
            </div>
          </div>
          
          <div className="text-xs text-gray-400 text-center">
            🎵 {useWebAudio ? 'Ambient Tones' : hasError ? 'Error - Using fallback' : 'Background Music'}
          </div>
          
          {hasError && !useWebAudio && (
            <div className="text-xs text-yellow-400 text-center">
              External audio unavailable - using generated tones
            </div>
          )}
        </div>
      )}
    </div>
  );
}