<template>
  <BaseLayout>
    <div v-if="pending" class="space-y-6">
      <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded-3xl animate-pulse"></div>
      <div v-for="i in 5" :key="i" class="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p class="text-red-500 mb-4">Gagal memuat tafsir. Silakan coba lagi.</p>
      <NuxtLink to="/" class="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"> Kembali ke Beranda </NuxtLink>
    </div>

    <div v-else-if="tafsirData">
      <!-- Header -->
      <div class="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-800 dark:to-teal-800 py-12 px-8 rounded-3xl mb-8 shadow-2xl">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0); background-size: 32px 32px"></div>
        <div class="relative z-10">
          <!-- Breadcrumb -->
          <div class="mb-6 flex items-center gap-3">
            <NuxtLink to="/" class="inline-flex items-center px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Beranda
            </NuxtLink>
            <svg class="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <NuxtLink :to="`/surat/${route.params.nomor}`" class="inline-flex items-center px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"> Surah </NuxtLink>
          </div>

          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur rounded-2xl mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>

            <h1 class="text-4xl font-bold text-white mb-2">Tafsir</h1>
            <h2 class="text-3xl font-bold text-emerald-100 mb-2 font-arabic">{{ tafsirData.nama }}</h2>
            <p class="text-2xl text-emerald-50 mb-4">{{ tafsirData.namaLatin }}</p>
            <p class="text-lg text-emerald-100">{{ tafsirData.arti }}</p>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 shadow-lg">
        <div class="prose prose-emerald dark:prose-invert max-w-none">
          <h3 class="text-xl font-bold mb-4 text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tentang Surah
          </h3>
          <div v-html="tafsirData.deskripsi" class="text-gray-700 dark:text-gray-300"></div>
        </div>
      </div>

      <!-- Quick Navigation -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
        <div class="flex items-center gap-4 mb-4">
          <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Navigasi Cepat</h3>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="ayat in tafsirData.tafsir"
            :key="ayat.ayat"
            @click="scrollToAyat(ayat.ayat)"
            class="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/40 font-medium rounded-lg transition-colors text-sm"
          >
            Ayat {{ ayat.ayat }}
          </button>
        </div>
      </div>

      <!-- Tafsir List -->
      <div class="space-y-8">
        <div v-for="tafsir in tafsirData.tafsir" :key="tafsir.ayat" :id="`ayat-${tafsir.ayat}`" class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg scroll-mt-24">
          <!-- Header -->
          <div class="flex items-center gap-4 mb-6 pb-4 border-b-2 border-emerald-100 dark:border-emerald-900">
            <div class="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl text-white font-bold text-xl shadow-lg">
              {{ tafsir.ayat }}
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">Ayat {{ tafsir.ayat }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Tafsir Kementerian Agama RI</p>
            </div>
          </div>

          <!-- Tafsir Content -->
          <div class="prose prose-emerald dark:prose-invert max-w-none">
            <div class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {{ tafsir.teks }}
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex items-center justify-between mt-12 gap-4 flex-wrap">
        <NuxtLink
          v-if="tafsirData.suratSebelumnya"
          :to="`/tafsir/${tafsirData.suratSebelumnya.nomor}`"
          class="inline-flex items-center px-6 py-3 border-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 font-medium rounded-lg transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="hidden sm:inline">{{ tafsirData.suratSebelumnya.namaLatin }}</span>
          <span class="sm:hidden">Sebelumnya</span>
        </NuxtLink>
        <button v-else disabled class="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 font-medium rounded-lg cursor-not-allowed">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Tidak ada
        </button>

        <div class="flex gap-2 flex-wrap justify-center">
          <NuxtLink
            :to="`/surat/${route.params.nomor}`"
            class="inline-flex items-center px-6 py-3 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 hover:bg-teal-200 dark:hover:bg-teal-900/40 font-medium rounded-lg transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Baca Surah
          </NuxtLink>
          <NuxtLink to="/" class="inline-flex items-center px-6 py-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/40 font-medium rounded-lg transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Beranda
          </NuxtLink>
        </div>

        <NuxtLink
          v-if="tafsirData.suratSelanjutnya"
          :to="`/tafsir/${tafsirData.suratSelanjutnya.nomor}`"
          class="inline-flex items-center px-6 py-3 border-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 font-medium rounded-lg transition-colors"
        >
          <span class="hidden sm:inline">{{ tafsirData.suratSelanjutnya.namaLatin }}</span>
          <span class="sm:hidden">Selanjutnya</span>
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </NuxtLink>
        <button v-else disabled class="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 font-medium rounded-lg cursor-not-allowed">
          Tidak ada
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      <!-- Back to Top Button -->
      <div class="fixed bottom-8 right-8">
        <button @click="scrollToTop" class="p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "@/components/layout/base-layout.vue"

const route = useRoute()

const { data: response, pending, error } = await useFetch(`/api/v2/tafsir/${route.params.nomor}`)

const tafsirData = computed(() => response.value?.data)

const scrollToAyat = (ayat: number) => {
  const element = document.getElementById(`ayat-${ayat}`)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

useHead({
  title: computed(() => (tafsirData.value ? `Tafsir ${tafsirData.value.namaLatin} - ${tafsirData.value.arti}` : "Memuat...")),
  meta: [
    {
      name: "description",
      content: computed(() =>
        tafsirData.value ? `Tafsir lengkap Surah ${tafsirData.value.namaLatin} (${tafsirData.value.arti}) dari Kementerian Agama RI. ${tafsirData.value.jumlahAyat} ayat, diturunkan di ${tafsirData.value.tempatTurun}.` : ""
      ),
    },
  ],
})
</script>

<style scoped>
.font-arabic {
  font-family: "Traditional Arabic", "Arabic Typesetting", "Scheherazade", serif;
}
</style>
