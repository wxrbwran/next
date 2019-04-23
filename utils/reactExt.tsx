import * as React from 'react';
import { message, notification } from 'antd';

/**
 * 扩展组件/store类以方便调用
 * 集成api, 公用组件
 */
export class ComponentExt<P = {}, S = {}> extends React.Component<P, S> {
  readonly $message = message;
  readonly $notification = notification;
}

export class StoreExt {
  readonly $message = message;
  readonly $notification = notification;
}
