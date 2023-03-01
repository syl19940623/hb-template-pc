const throttle = {
  inserted: function (el, binding) {
    if (typeof binding.value !== 'function') {
      throw 'callback must be a function';
    }
    let timer = null
    const delay = binding.arg * 1 || 1000
    el.addEventListener('click', () => {
      if (timer) {
        clearTimeout(timer)
      }
      if (!el.disabled) {
        el.disabled = true
        binding.value()
        timer = setTimeout(() => {
          el.disabled = false;
        }, delay)
      }
    })
  }
}

export default throttle;