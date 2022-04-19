import {
  IBulkPromise,
  ICreatePromise,
  IDeletePromise,
  IItem,
  IList,
  IListPromise,
  IReadPromise,
  IUpdatePromise
} from './global.interfaces';
import {
  processStandardItemResponse,
  processStandardListResponse
} from '@/services/base/base';
import {generic} from '@/services/base/global.types';
import {EnumHttpMethod} from '@/services/base/global.enums';

export const generateUuid = () => {
  let d = performance.now();
  let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16;
    if(d > 0){
      r = (d + r)%16 | 0;
      d = Math.floor(d/16);
    } else {
      r = (d2 + r)%16 | 0;
      d2 = Math.floor(d2/16);
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export interface IStubScenario {
  status: number;
  headers: Headers;

  json(): Promise<any>;
}

const generateJsonPromise = (body: any): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    resolve(body);
  });
};

export const stubScenario = (body: any, status = 200, headers: Headers = new Headers()): IStubScenario => {
  return {
    status: status,
    headers: headers,
    json: (): Promise<any> => {
      return generateJsonPromise(body);
    },
  };
};

const wrapperResolve = <T>(callbackResolve: any, resolve: any, reject: any) => {
  return <T>(value: IItem<T>) => {
    if (callbackResolve) {
      if (!callbackResolve(value)) {
        reject('failed callback');
      }
    }
    resolve(value);
  };
};

const wrapperReject = <T>(callbackReject: any, reject: any) => {
  return <T>(reason?: any) => {
    if (callbackReject) {
      callbackReject(reason);
    }
    reject(reason);
  };
};

export const baseRestItemStub = <T>(scenario: IStubScenario, callbackResolve: any, callbackReject: any, method: EnumHttpMethod, path: string, payload: generic = {}, headers = new Headers()): Promise<IItem<T>> => {
  return new Promise<IItem<T>>((resolve, reject) => {
    console.log('rest-item', method, path, payload, headers);
    processStandardItemResponse<T>(scenario, wrapperResolve(callbackResolve, resolve, reject), wrapperReject(callbackReject, reject));
  });
};
export const baseRestListStub = <T>(scenario: IStubScenario, callbackResolve: any, callbackReject: any, method: EnumHttpMethod, path: string, payload: generic = {}, headers = new Headers()): Promise<IList<T>> => {
  return new Promise<IList<T>>((resolve, reject) => {
    console.log('rest-list', method, path, payload, headers);
    processStandardItemResponse<T>(scenario, wrapperResolve(callbackResolve, resolve, reject), wrapperReject(callbackReject, reject));
  });
};

export const baseListStub = <T>(scenario: IStubScenario, entity: string): IListPromise<T> => {
  return (
    order: string,
    filters: object = {},
    pageIndex = 1,
    pageSize = 50,
  ): Promise<IList<T>> => {
    return new Promise<IList<T>>((resolve, reject) => {
      console.log('list', entity, order, filters, pageIndex, pageSize);
      processStandardListResponse<T>(scenario, resolve, reject);
    });
  };
};

export const baseCreateStub = <T>(scenario: IStubScenario, entity: string): ICreatePromise<T> => {
  return (
    document: T,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      console.log('create', entity, document);
      processStandardItemResponse<T>(scenario, resolve, reject);
    });
  };
};

export const baseReadStub = <T>(scenario: IStubScenario, entity: string): IReadPromise<T> => {
  return (
    id: string,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      console.log('read', entity, id);
      processStandardItemResponse<T>(scenario, resolve, reject);
    });
  };
};

export const baseUpdateStub = <T>(scenario: IStubScenario, entity: string): IUpdatePromise<T> => {
  return (
    id: string,
    document: T,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      console.log('update', entity, id, document);
      processStandardItemResponse<T>(scenario, resolve, reject);
    });
  };
};

export const baseDeleteStub = <T>(scenario: IStubScenario, list: T[], entity: string): IDeletePromise<T> => {
  return (
    id: string,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      console.log('delete', entity, id);
      processStandardItemResponse<T>(scenario, (value: IItem<T>) => {
        list.pop();
        resolve(value);
      }, reject);
    });
  };
};

export const baseBulkStub = (scenario: IStubScenario, entity: string): IBulkPromise => {
  return (
    action: string,
    ids: string[],
  ): Promise<IItem<generic>> => {
    return new Promise<IItem<generic>>((resolve, reject) => {
      console.log('bulk', entity, action, ids);
      processStandardItemResponse<generic>(scenario, resolve, reject);
    });
  };
};
