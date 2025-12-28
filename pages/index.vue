<template>
  <BaseLayout>
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-800 dark:to-teal-800 py-16 px-6 rounded-3xl mb-8 shadow-2xl">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0); background-size: 32px 32px"></div>
      <div class="relative z-10 max-w-4xl mx-auto text-center">
        <h1 class="text-5xl font-bold text-white mb-4">Al-Qur'an Digital</h1>
        <p class="text-xl text-emerald-100 mb-8">Baca, Dengarkan, dan Pahami Al-Qur'an dengan Mudah</p>

        <!-- Search Box -->
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari surah..."
              class="w-full pl-12 pr-6 py-4 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-lg text-lg"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
            <svg class="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">114</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Total Surah</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-xl">
            <svg class="w-8 h-8 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">6,236</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Total Ayat</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl">
            <svg class="w-8 h-8 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
          <div>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">30</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Total Juz</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Surah List -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p class="text-red-500">Gagal memuat data. Silakan coba lagi.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink
        v-for="surah in filteredSurah"
        :key="surah.nomor"
        :to="`/surat/${surah.nomor}`"
        class="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-emerald-500"
      >
        <div class="flex items-start gap-4">
          <!-- Nomor Badge -->
          <div class="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl text-white font-bold text-lg shadow-lg">
            {{ surah.nomor }}
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between mb-2">
              <div>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {{ surah.namaLatin }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ surah.arti }}</p>
              </div>
              <p class="text-2xl font-arabic text-emerald-600 dark:text-emerald-400">{{ surah.nama }}</p>
            </div>

            <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span class="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"> {{ surah.jumlahAyat }} Ayat </span>
              <span class="inline-flex items-center px-2.5 py-1 rounded-md bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400">
                {{ surah.tempatTurun }}
              </span>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Empty State -->
    <div v-if="!pending && !error && filteredSurah.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <p class="text-gray-500 dark:text-gray-400">Tidak ada surah yang ditemukan.</p>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "@/components/layout/base-layout.vue"

const searchQuery = ref("")

const { data: response, pending, error } = await useFetch("/api/v2/surat")

const surahList = computed(() => response.value?.data || [])

const filteredSurah = computed(() => {
  if (!searchQuery.value) return surahList.value

  const query = searchQuery.value.toLowerCase()
  return surahList.value.filter((surah: any) => surah.namaLatin.toLowerCase().includes(query) || surah.arti.toLowerCase().includes(query) || surah.nama.includes(query) || surah.nomor.toString().includes(query))
})

useHead({
  title: "Al-Qur'an Digital - Baca dan Pahami Al-Qur'an",
  meta: [{ name: "description", content: "Baca, dengarkan, dan pahami Al-Qur'an dengan mudah. Dilengkapi dengan terjemahan dan tafsir dalam bahasa Indonesia." }],
})
</script>

<style scoped>
.font-arabic {
  font-family: "Traditional Arabic", "Arabic Typesetting", "Scheherazade", serif;
}
</style>
