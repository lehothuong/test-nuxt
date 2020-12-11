export default () => {
  function initFreshChat() {
    window.fcWidget.init({
      token: "a1ac8b4d-0126-413a-83d4-e2a291f6cf15",
      host: "https://wchat.freshchat.com",
      locale: "vi"
    });
  }
  function initialize(i, t) {
    var e;
    i.getElementById(t)
      ? initFreshChat()
      : (((e = i.createElement("script")).id = t),
        (e.async = !0),
        (e.src = "https://wchat.freshchat.com/js/widget.js"),
        (e.onload = initFreshChat),
        i.head.appendChild(e));
  }
  function initiateCall() {
    initialize(document, "freshchat-js-sdk");
  }
  window.addEventListener
    ? window.addEventListener("load", initiateCall, !1)
    : window.attachEvent("load", initiateCall, !1);
};
