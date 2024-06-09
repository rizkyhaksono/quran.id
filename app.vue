<template>
  <div class="hello">
    <h1 class="text-blue-500">Fetch data:</h1>
    <p v-if="surat">{{ surat }}</p>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
  data() {
    return {
      surat: null,
    }
  },
  methods: {
    fetchData() {
      fetch("https://equran.id/api/v2/surat", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          this.surat = data
        })
    },
  },
  mounted() {
    this.fetchData()
  },
}
</script>
