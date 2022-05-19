const cls = (...classNames: string[]): string => classNames.join(" ");
const cfImageApi = (hash: string, vaiant: string = "public"): string => {
  return hash.length < 10
    ? "/tree.jpg"
    : `https://imagedelivery.net/QiWuyrvCeOnHYrH0LRUbDg/${hash}/${vaiant}`;
};
const jsonSP = (json: any) => JSON.parse(JSON.stringify(json));
const delaying = (sec: number) =>
  new Promise((resolve) => setTimeout(resolve, sec * 1000));
export { cls, cfImageApi, jsonSP, delaying };
