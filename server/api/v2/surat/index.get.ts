export default defineEventHandler(async () => {
  try {
    const response = await $fetch('https://equran.id/api/v2/surat');
    return response;
  } catch (error) {
    console.error('Error fetching surah list:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch surah list'
    });
  }
});
