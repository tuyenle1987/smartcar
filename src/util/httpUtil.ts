export const httpPost = async(url, body={}, httpService) => {
  const { data, status } = await httpService.axiosRef.post(url, {
    responseType: 'JSON',
    ...body,
  });

  if (status !== 200) {
    throw 'There was an issue with getting data from mm!';
  }

  if (!data.data) {
    throw 'Missing data!';
  }

  return data.data;
};
