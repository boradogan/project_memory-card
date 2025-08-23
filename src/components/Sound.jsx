import { useState, useRef, useEffect } from 'react';
import SoundTrack from '../assets/audio/soundtrack.mp3';

export function MusicController() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef(null);

  useEffect(() => {

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]); 

  function togglePlayPause() {
    setIsPlaying(!isPlaying);
  }

  return (
    <div>
      <audio ref={audioRef} src={SoundTrack} loop />
      
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause music' : 'Play music'}
      </button>
    </div>
  );
}