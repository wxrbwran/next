import http from '../http';

export default {
  // 获取系统子管理员列表
  root(data) {
    return http.get('sub/root', data || {});
  },
  // 子管理员获取所属一级机构及未分配机构
  rootOrganization(data) {
    return http.get('sub/rootOrganization', data || {});
  },
};
