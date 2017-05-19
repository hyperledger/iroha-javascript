export function request (client: any, func: string, args: Array<any>) {
  return new Promise((resolve, reject) => {
    client[func](...args, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

export function assertHelper (code: string, message: string, value: string, confirm = undefined): (data: any) => void {
  return (data: any) => {
    expect(data.code).toEqual(code);
    expect(data.message).toEqual(message);
    expect(data.value).toEqual(value);
    if (confirm) {
      expect(data.confirm).toEqual(confirm);
    }
  };
};

export function assertHelperData (data: any): (data: any) => void {
  return (data: any) => {
    expect(data).toEqual(data);
  };
};

export default request;
