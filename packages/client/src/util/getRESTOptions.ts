const getRESTOptions = (contentType: string) => ({
  headers: {
    "Content-Type": contentType,
  },
});

export default getRESTOptions;
