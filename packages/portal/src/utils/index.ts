export const generateUUID = () => {
  let timestamp = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (timestamp + Math.random() * 16) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    },
  );
  return uuid;
};

export const imgFileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const openDesignerWin = (id: string) => {
  window.open(`${window.location.origin}/designer/?id=${id}`);
};

export const getUrlParams = (url: string, key?: string) => {
  const paramsRegex = /[?&]+([^=&]+)=([^&]*)/gi;
  let params = {} as any;
  let match;
  while ((match = paramsRegex.exec(url))) {
    params[match[1]] = match[2];
  }
  if (key) {
    return params[key];
  } else {
    return params;
  }
};
