export default defineEventHandler(async (event) => {
  const nomor = getRouterParam(event, 'nomor');

  if (!nomor) {
    throw createError({
      statusCode: 400,
      message: 'Surah number is required'
    });
  }

  try {
    const response = await $fetch(`https://equran.id/api/v2/surat/${nomor}`);
    return response;
  } catch (error) {
    console.error('Error fetching surah:', error);
    throw createError({
      statusCode: 404,
      message: 'Surah not found'
    });
  }
});