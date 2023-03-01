const longpress = {
  inserted: function (el, binding) {
    if (typeof binding.value !== 'function') {
      throw 'callback must be a function';
    }
    let timer = null
    const duration = binding.arg * 1 || 1000
    const start = (e) => {
      if (e.type === 'click' || e.button !== 0) {
        return;
      }
      if (!timer) {
        timer = setTimeout(() => {
          binding.value()
        }, duration)
      }
    };
    const cancel = () => {
      clearTimeout(timer)
      timer = null
    };
    el.addEventListener('mousedown', start);
    el.addEventListener('touchstart', start);
    el.addEventListener('click', cancel);
    el.addEventListener('mouseout', cancel);
    el.addEventListener('touchend', cancel);
    el.addEventListener('touchcancel', cancel);
  }
}

export default longpress;