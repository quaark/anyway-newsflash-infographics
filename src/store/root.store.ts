// https://mobx.js.org/best/store.html#combining-multiple-stores
import {action, observable} from 'mobx';
import {INewFlash} from '../models/NewFlash';
import {initService} from '../services/init.service';

export default class RootStore {
  [key: string]: any;  // Declaring an index signature
  
  appInitialized = false;
  
  @observable graphsData: any = {};
  @observable newsFlashCollection: Array<INewFlash> = [];
  
  constructor() {
    // init app data
    initService()
      .then((initData) => {
        this.safeInitialization('newsFlashCollection', initData.newsFlashCollection);
        // additional Initialization steps can be added here
        this.appInitialized = true;
      });
  }
  
  // prop is a property on RootStore to be initialized, like: this.suggestions
  safeInitialization(prop: string, valueToCheck: Array<any>) {
    if (Array.isArray(valueToCheck)) {
      this[prop] = valueToCheck;
    } else {
      console.warn(`Property [${prop}] was not initialized. Invalid value (${valueToCheck})`);
    }
  }
  
  @action
  selectNewsFlash(id: number): void {
    // steps:
    // 1 - get data from data.service
    // 2 - save data to graphsData
    // on main content Component  - use useObserver on return, example
    //
    // import {useObserver} from 'mobx-react-lite';
    //
    // return useObserver(() => (
    //     <div>Some content with {graphsData}</div>
    // );
    
  }
}


