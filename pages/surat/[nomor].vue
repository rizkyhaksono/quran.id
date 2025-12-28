<template>
  <BaseLayout>
    <div v-if="pending" class="space-y-6">
      <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded-3xl animate-pulse"></div>
      <div v-for="i in 5" :key="i" class="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p class="text-red-500 mb-4">Gagal memuat surah. Silakan coba lagi.</p>
      <NuxtLink to="/" class="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"> Kembali ke Beranda </NuxtLink>
    </div>

    <div v-else-if="surah">
      <!-- Header -->
      <div class="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-800 dark:to-teal-800 py-12 px-8 rounded-3xl mb-8 shadow-2xl">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0); background-size: 32px 32px"></div>
        <div class="relative z-10">
          <!-- Breadcrumb -->
          <div class="mb-6">
            <NuxtLink to="/" class="inline-flex items-center px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali
            </NuxtLink>
          </div>

          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur rounded-2xl mb-4">
              <span class="text-2xl font-bold text-white">{{ surah.nomor }}</span>
            </div>

            <h1 class="text-5xl font-bold text-white mb-2 font-arabic">{{ surah.nama }}</h1>
            <h2 class="text-3xl font-bold text-emerald-100 mb-4">{{ surah.namaLatin }}</h2>
            <p class="text-xl text-emerald-50 mb-6">{{ surah.arti }}</p>

            <div class="flex items-center justify-center gap-4 flex-wrap">
              <div class="inline-flex items-center px-4 py-2 bg-white text-emerald-700 font-medium rounded-lg shadow-lg">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {{ surah.jumlahAyat }} Ayat
              </div>
              <div class="inline-flex items-center px-4 py-2 bg-white text-emerald-700 font-medium rounded-lg shadow-lg">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ surah.tempatTurun }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 shadow-lg">
        <div class="prose prose-emerald dark:prose-invert max-w-none">
          <h3 class="text-xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Tentang Surah</h3>
          <div v-html="surah.deskripsi" class="text-gray-700 dark:text-gray-300"></div>
        </div>
      </div>

      <!-- Audio Player -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
        <div class="flex items-center gap-4 mb-4">
          <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Dengarkan Surah</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select v-model="selectedQari" class="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option :value="null" disabled>Pilih Qari</option>
            <option v-for="qari in qariOptions" :key="qari.value" :value="qari">
              {{ qari.label }}
            </option>
          </select>
        </div>

        <div v-if="selectedQari" class="mt-4">
          <audio ref="audioPlayer" controls class="w-full" :src="surah.audioFull[selectedQari.value]">Browser Anda tidak mendukung audio player.</audio>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-4 mb-8 flex-wrap">
        <NuxtLink :to="`/tafsir/${route.params.nomor}`" class="flex-1 min-w-[200px] inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          Lihat Tafsir
        </NuxtLink>
        <button
          @click="isArabicOnly = !isArabicOnly"
          class="inline-flex items-center px-6 py-3 border-2 border-teal-600 dark:border-teal-500 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 font-medium rounded-lg transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="isArabicOnly" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          {{ isArabicOnly ? "Tampilkan Terjemahan" : "Arab Saja" }}
        </button>
      </div>

      <!-- Ayat List -->
      <div class="space-y-6">
        <div v-for="ayat in surah.ayat" :key="ayat.nomorAyat" class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <!-- Ayat Number Badge -->
          <div class="flex items-start gap-6 mb-6">
            <div class="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl text-white font-bold shadow-lg">
              {{ ayat.nomorAyat }}
            </div>

            <!-- Audio Control -->
            <div class="flex-1 flex justify-end">
              <button @click="playAyat(ayat)" class="p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Arabic Text -->
          <div class="mb-6 text-right">
            <p class="text-4xl leading-loose font-arabic text-gray-900 dark:text-white">
              {{ ayat.teksArab }}
            </p>
          </div>

          <div v-if="!isArabicOnly" class="space-y-4">
            <!-- Latin Text -->
            <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Transliterasi:</p>
              <p class="text-base text-gray-700 dark:text-gray-300 italic">
                {{ ayat.teksLatin }}
              </p>
            </div>

            <!-- Indonesian Translation -->
            <div class="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border-l-4 border-emerald-500">
              <p class="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Terjemahan:</p>
              <p class="text-base text-gray-900 dark:text-white">
                {{ ayat.teksIndonesia }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex items-center justify-between mt-12 gap-4 flex-wrap">
        <NuxtLink
          v-if="surah.suratSebelumnya"
          :to="`/surat/${surah.suratSebelumnya.nomor}`"
          class="inline-flex items-center px-6 py-3 border-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 font-medium rounded-lg transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="hidden sm:inline">{{ surah.suratSebelumnya.namaLatin }}</span>
          <span class="sm:hidden">Sebelumnya</span>
        </NuxtLink>
        <button v-else disabled class="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 font-medium rounded-lg cursor-not-allowed">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Tidak ada
        </button>

        <NuxtLink to="/" class="inline-flex items-center px-6 py-3 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 hover:bg-teal-200 dark:hover:bg-teal-900/40 font-medium rounded-lg transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Beranda
        </NuxtLink>

        <NuxtLink
          v-if="surah.suratSelanjutnya"
          :to="`/surat/${surah.suratSelanjutnya.nomor}`"
          class="inline-flex items-center px-6 py-3 border-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 font-medium rounded-lg transition-colors"
        >
          <span class="hidden sm:inline">{{ surah.suratSelanjutnya.namaLatin }}</span>
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
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "@/components/layout/base-layout.vue"

const route = useRoute()
const isArabicOnly = ref(false)
const selectedQari = ref<any>(null)
const audioPlayer = ref<HTMLAudioElement | null>(null)

const { data: response, pending, error } = await useFetch(`/api/v2/surat/${route.params.nomor}`)

const surah = computed(() => response.value?.data)

const qariOptions = [
  { value: "01", label: "Abdullah Al-Juhany" },
  { value: "02", label: "Abdul-Muhsin Al-Qasim" },
  { value: "03", label: "Abdurrahman as-Sudais" },
  { value: "04", label: "Ibrahim Al-Dossari" },
  { value: "05", label: "Misyari Rasyid Al-Afasi" },
  { value: "06", label: "Yasser Al-Dosari" },
]

// Set default qari
selectedQari.value = qariOptions[2] // Abdurrahman as-Sudais

const playAyat = (ayat: any) => {
  if (selectedQari.value && ayat.audio) {
    const audio = new Audio(ayat.audio[selectedQari.value.value])
    audio.play()
  }
}

useHead({
  title: computed(() => (surah.value ? `${surah.value.namaLatin} - ${surah.value.arti}` : "Memuat...")),
  meta: [
    {
      name: "description",
      content: computed(() => (surah.value ? `Baca Surah ${surah.value.namaLatin} (${surah.value.arti}) lengkap dengan terjemahan dan audio. ${surah.value.jumlahAyat} ayat, diturunkan di ${surah.value.tempatTurun}.` : "")),
    },
  ],
})
</script>

<style scoped>
.font-arabic {
  font-family: "Traditional Arabic", "Arabic Typesetting", "Scheherazade", serif;
}
</style>
