<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ドM習慣アプリ・音楽プレイヤー版</title>
    <style>
        body { font-family: sans-serif; text-align: center; padding-top: 50px; background: #121212; color: white; }
        button { padding: 15px 30px; font-size: 18px; cursor: pointer; border: none; border-radius: 5px; margin: 10px; }
        .btn-start { background: #dc3545; color: white; }
    </style>
</head>
<body>

    <h1>ドM習慣アプリ（音楽プレイヤー作戦）</h1>
    
    <button id="start-btn" class="btn-start">⏱️ 10秒ミッション開始（スリープOK）</button>

    <p id="status-text">ボタンを押して、すぐ画面を消してみて！</p>

    <script>
        const startBtn = document.getElementById('start-btn');
        const statusText = document.getElementById('status-text');

        // スマホに怒られないための罵倒関数
        function playVoice() {
            const batouMessages = [
                "おい、10秒経ったぞ！いつまでサボってんだコラ！",
                "やる気あんの？あんたの習慣化なんてその程度なんだね。",
                "はいサボったー。一生そのままダラダラ過ごせば？"
            ];
            const randomIndex = Math.floor(Math.random() * batouMessages.length);
            
            const speech = new SpeechSynthesisUtterance();
            speech.text = batouMessages[randomIndex];
            speech.lang = 'ja-JP';
            speech.rate = 1.1;
            window.speechSynthesis.speak(speech);
        }

        startBtn.addEventListener('click', () => {
            statusText.innerText = "音楽プレイヤーモード起動！画面を消して待て！";

            // Web Audio API という、スマホの「本物の音楽機能」を起動するよ（不正扱いされない！）
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            
            // 10秒間の「無音」の音楽データをその場で作る
            const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 10, audioCtx.sampleRate);
            const source = audioCtx.createBufferSource();
            source.buffer = buffer;
            source.connect(audioCtx.destination);

            // 10秒後に音楽が終わったら、自動的に罵倒を発射する！
            source.onended = () => {
                playVoice();
                statusText.innerText = "サボり検知！";
            };

            // 音楽スタート！
            source.start();
        });
    </script>

</body>
</html>