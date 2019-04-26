import http from '../http';

export default {
  // 登录
  bar(data): Promise<any> {
    return http.get('chart/bar', data || {});
  },
  // 总览
  overview(data): Promise<any> {
    return http.get('chart/overview', data || {});
  },
  // 左侧菜单
  sider(data): Promise<any> {
    return http.get('chart/sider', data || {});
  },
  // 医疗数据
  medicalbar(data): Promise<any> {
    return http.get('chart/medicalbar', data || {});
  },
};
