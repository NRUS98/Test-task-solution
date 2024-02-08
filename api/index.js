export const getData = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_DATASET_API_URL}?type=trades&dt_from=2010-01-01&limit=10000`, {
      headers: {
        'Authorization': `Basic ${process.env.VUE_APP_DATASET_API_TOKEN}`,
      }
    });
    return await response.json();
  } catch (e) {
    console.error('Error fetching data:', e);
  }
};
