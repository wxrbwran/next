/**
 * Created by wuxiaoran on 2019/2/20.
 */
import React from 'react';
import { Button } from 'antd';

export const cancelBtn = option => (
  <Button
    onClick={option.onCancel}
    disabled={option.disabled}
  >
    { option.cancelText || '退出' }
  </Button>
);

export const okBtn = option => (
  <Button
    className="finish"
    disabled={option.disabled}
    onClick={option.onOk}
  >
    {option.okText || '完成' }
  </Button>
);

export const btnRender = option => (
  <div className="common__btn">
    { !option.noCancel && cancelBtn(option) }
    { !option.noOk && okBtn(option) }
  </div>
);

export const modalBtns = (option) => (
  <div className="del--gov-btn">
    <Button
      onClick={option.onCancel}
      className="cancel"
    >{ option.cancelText || '退出' }</Button>
    <Button
      type='primary'
      onClick={option.onOk}
    >{option.okText || '删除' }</Button>
  </div>
);
