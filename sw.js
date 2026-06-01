// 裏で時間を数えて、スマホの画面に通知を強制ポップアップさせるコード
self.addEventListener("message", function (event) {
  if (event.data && event.data.delay) {
    setTimeout(() => {
      const batouMessages = [
        "おい、10秒経ったぞ！いつまでサボってんだコラ！",
        "やる気あんの？あんたの習慣化なんてその程度なんだね。",
        "はいサボったー。一生そのままダラダラ過ごせば？",
      ];
      const randomIndex = Math.floor(Math.random() * batouMessages.length);

      // スマホに通知をドカンと表示する！
      self.registration.showNotification("【警告】サボり検知", {
        body: batouMessages[randomIndex],
        tag: "sabori-alert",
        renotify: true,
        requireInteraction: true, // ユーザーが触るまで消えないモード
      });
    }, event.data.delay);
  }
});
