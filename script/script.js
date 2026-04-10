document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const audioSource = document.getElementById('audioSource');
    const playPauseBtn = document.getElementById('playPause');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const progressBar = document.getElementById('progressBar');
    const playPauseIcon = playPauseBtn.querySelector('img');
    const songTitle = document.getElementById('songTitle');
    const songArtwork = document.getElementById('songArtwork');

    let isPlaying = false;

    // Список треков
    const playlist = [
        {
            title: "Купер",
            src: "src/audio/SQWOZ BAB - Купер.mp3",
            artwork: "src/img/anel1.jpg"
        },
        {
            title: "Connected",
            src: "src/audio/Stray Kids - Connected (Bang Chan).mp3",
            artwork: "src/img/anel5.jpg"
        },
        {
            title: "Drive",
            src: "src/audio/Stray Kids - Drive (Bang Chan, Lee Know).mp3",
            artwork: "src/img/anel4.jpg"
        },
        {
            title: "i hate to admit",
            src: "src/audio/Stray Kids - i hate to admit (Bang Chan).mp3",
            artwork: "src/img/anel3.jpg"
        },
        {
            title: "Miroh",
            src: "src/audio/Stray Kids - Miroh.mp3",
            artwork: "src/img/anel6.jpg"
        },
        {
            title: "Как я люблю тебя",
            src: "src/audio/Клава Кока - Как я люблю тебя.mp3",
            artwork: "src/img/anel.jpg"
        },
        {
            title: "Railway",
            src: "src/audio/Stray Kids - Railway (Bang Chan).mp3",
            artwork: "src/img/anel2.jpg"
        }
    ];
    let currentTrackIndex = 0;

    // Функция для загрузки трека
    function loadTrack(index) {
        audioSource.src = playlist[index].src;
        songTitle.textContent = playlist[index].title;
        songArtwork.src = playlist[index].artwork;
        audio.load(); // Перезагружаем аудио
        progressBar.value = 0; // Сбрасываем прогресс
        if (isPlaying) {
            audio.play();
        }
    }

    // Воспроизведение/Пауза
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playPauseIcon.src = 'src/img/play-icon.png';
        } else {
            audio.play();
            playPauseIcon.src = 'src/img/pause-icon.png';
        }
        isPlaying = !isPlaying;
    });

    // Предыдущий трек
    prevBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length; // Циклический переход
        loadTrack(currentTrackIndex);
    });

    // Следующий трек
    nextBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length; // Циклический переход
        loadTrack(currentTrackIndex);
    });

    // Обновление прогресс-бара
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
    });

    // Интерактивный ползунок
    progressBar.addEventListener('click', (e) => {
        const progressWidth = progressBar.offsetWidth;
        const clickPosition = e.offsetX;
        const newProgress = (clickPosition / progressWidth) * 100;
        const newTime = (newProgress / 100) * audio.duration;
        audio.currentTime = newTime;
        progressBar.value = newProgress;
    });

    // Автоматическое переключение на следующий трек по окончании
    audio.addEventListener('ended', () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
    });
});
