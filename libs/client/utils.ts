const cls = (...classNames: string[]): string => classNames.join(" ");
const cfImageApi = (hash: string, vaiant: string = "public"): string => {
  return `https://imagedelivery.net/QiWuyrvCeOnHYrH0LRUbDg/${hash}/${vaiant}`;
};
export { cls, cfImageApi };
