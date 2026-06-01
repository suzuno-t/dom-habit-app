// スマホが画面を消して眠っても、時間になったら叩き起こして通知を出すお助けコード
self.addEventListener("message", function (event) {
  if (event.data && event.data.delay) {
    setTimeout(() => {
      self.registration.showNotification("【警告】サボり検知", {
        body: "おい、10秒経ったぞ！いつまでサボってんだコラ！",
        tag: "sabori-alert",
        renotify: true,
      });
    }, event.data.delay);
  }
});
