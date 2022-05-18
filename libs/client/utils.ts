const cls = (...classNames: string[]): string => classNames.join(" ");
const cfImageApi = (hash: string, vaiant: string = "public"): string => {
  return hash.length < 10
    ? "/tree.jpg"
    : `https://imagedelivery.net/QiWuyrvCeOnHYrH0LRUbDg/${hash}/${vaiant}`;
};
const jsonSP = (json: any) => JSON.parse(JSON.stringify(json));
export { cls, cfImageApi, jsonSP };
