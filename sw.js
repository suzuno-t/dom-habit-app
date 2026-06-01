// 画面が閉じられても、裏でじっと時間を数えるお留守番コード
self.addEventListener("message", function (event) {
  if (event.data && event.data.delay) {
    // 画面が消えていても、裏で10秒カウントする
    setTimeout(() => {
      const batouMessages = [
        "おい、10秒経ったぞ！いつまでサボってんだコラ！",
        "やる気あんの？あんたの習慣化なんてその程度なんだね。",
        "はいサボったー。一生そのままダラダラ過ごせば？",
      ];
      const randomIndex = Math.floor(Math.random() * batouMessages.length);
      const message = batouMessages[randomIndex];

      // 時間になったら、眠っている表の画面を無理やり叩き起こしてメッセージを送りつける！
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            action: "voice-batou",
            message: message,
          });
        });
      });
    }, event.data.delay);
  }
});
