/**
 * Created by wuxiaoran on 2019/2/19.
 */
import React from 'react';

export const itemRender = (current, type, originalElement) => {
  if (type === 'prev') {
    return <a>上一页</a>;
  } if (type === 'next') {
    return <a>下一页</a>;
  }
  return originalElement;
};

export const pageRender = (pagination) => {
  return (Object.assign({}, pagination, {
    showQuickJumper: true,
    itemRender,
    hideOnSinglePage: true,
  }));
};
