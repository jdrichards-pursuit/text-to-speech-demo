import { useState } from 'react';

export default function SimpleSpeechDemo() {
  const [text, setText] = useState('');
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const synth = window.speechSynthesis;

  const speak = (e) => {
    e.preventDefault();
    
    if (synth.speaking) {
      console.error('Already speaking');
      return;
    }

    if (text !== '') {
      const utterThis = new SpeechSynthesisUtterance(text);
      const voices = synth.getVoices();
      
      utterThis.voice = voices[7];
      utterThis.pitch = pitch;
      utterThis.rate = rate;

      utterThis.onend = () => console.log('Speech finished');
      utterThis.onerror = (event) => console.error('Speech error:', event);

      synth.speak(utterThis);
      setText('');
    }
  };

  return (
    <div className='container'>
      <h1>Text to Speech</h1>
      <h2>Enter the text you want to speak and adjust the pitch and rate.</h2>
      <form onSubmit={speak} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div>
      <textarea
          rows="10"
          cols="50"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to speak..."
        />
        </div>
        <div >
          <label>
            Pitch:
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(Number(e.target.value))}
            />
          </label>
          <span>{pitch}</span>
        </div>
        <div>
          <label>
            Rate:
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </label>
          <span>{rate}</span>
        </div>
        <button type="submit">
          Speak
        </button>
      </form>
      <div>
        <a href="https://github.com/mdn/dom-examples/blob/main/web-speech-api/speak-easy-synthesis/script.js">View JS source on GitHub</a>
      </div>
    </div>
  );
}