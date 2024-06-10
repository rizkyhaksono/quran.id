<template>
  <BaseLayout>
    <div>
      <h1 class="text-xl font-bold text-muted">Fetch data:</h1>
      <!-- <div class="text-muted/90">{{ (quran as any).data.map((e: any) => e.namaLatin) }}</div> -->
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import BaseLayout from "@/components/layout/base-layout.vue";

  const { data: quran } = await useFetch("https://equran.id/api/v2/surat");
</script>
