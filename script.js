// Cria o contexto de áudio
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function tocar(frequencia) {
    // Retoma o contexto caso esteja suspenso (exigência de alguns navegadores)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    const oscilador = audioCtx.createOscillator();
    const ganho = audioCtx.createGain();

    // Configura o tipo de onda (senoidal) e a frequência da nota
    oscilador.type = 'sine'; 
    oscilador.frequency.setValueAtTime(frequencia, audioCtx.currentTime);
    
    // Configura o volume (fade-out para não dar estalo)
    ganho.gain.setValueAtTime(0.5, audioCtx.currentTime);
    ganho.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);

    // Conecta os módulos: Oscilador -> Ganho -> Saída (Auto-falantes)
    oscilador.connect(ganho);
    ganho.connect(audioCtx.destination);

    // Inicia e para o som
    oscilador.start();
    oscilador.stop(audioCtx.currentTime + 1);
}
