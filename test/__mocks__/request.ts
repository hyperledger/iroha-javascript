export const request = (procedure: Function, args: Array<any>) => {
  return new Promise((resolve, reject) => {
    procedure(args[0], (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};
export default request;
