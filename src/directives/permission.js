import store from '../store';

const permission = {
  inserted: function (el, binding) {
    const btnFlag = binding.value
    const permissionList = store.state.roleBtns
    if (btnFlag && !permissionList.includes(btnFlag)) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
}

export default permission;