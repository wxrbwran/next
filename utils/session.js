export const updateSession = (res) => {
  localStorage.setItem('uid', res.uid);
  localStorage.setItem('access_token', res.access_token);
  localStorage.setItem('refresh_token', res.refresh_token);
};

export const clearSession = () => {
  localStorage.removeItem('uid');
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};
