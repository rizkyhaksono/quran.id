export default defineEventHandler(async (event) => {
  const nomor = getRouterParam(event, 'nomor');

  if (!nomor) {
    throw createError({
      statusCode: 400,
      message: 'Surah number is required'
    });
  }

  const response = await $fetch(`https://equran.id/api/v2/tafsir/${nomor}`).catch(() => {
    throw createError({
      statusCode: 404,
      message: 'Tafsir not found'
    });
  });
  return response;
});