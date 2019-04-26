import { observable, action } from 'mobx';
import { StoreExt } from '../../utils/reactExt';

export class GlobalStore extends StoreExt {
  /**
   * 展示医院筛选
   *
   * @type {boolean}
   * @memberof GlobalStore
   */
  @observable
  isShowHospitalFilter: boolean = false;

  @action
  toggleHospitalFilter = () => {
    this.isShowHospitalFilter = !this.isShowHospitalFilter;
  }
}

export default new GlobalStore();
