const debounce = {
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
      timer = setTimeout(() => {
        binding.value()
      }, delay)
    })
  }
}

export default debounce;