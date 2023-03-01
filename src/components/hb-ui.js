import HbDialog from './dialog';
import HbTable from './table';
import HbForm from './form';
import HbTree from './tree';

const componentArr = [HbDialog, HbTable, HbForm, HbTree]

const HbUI = {
  install(Vue) {
    componentArr.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}

export default HbUI;