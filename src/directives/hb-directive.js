import permission from './permission';
import draggable from './draggable';
import debounce from './debounce';
import throttle from './throttle';
import longpress from './longpress';
import clickoutside from "./clickoutside";

const directiveObj = {
  permission,
  draggable,
  debounce,
  throttle,
  longpress,
  clickoutside
}

export default {
  install (Vue) {
    Object.keys(directiveObj).forEach(key => {
      Vue.directive(key, directiveObj[key])
    })
  }
}