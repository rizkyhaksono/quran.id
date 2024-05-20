<template>
  <div class="hello">
    <h1 class="text-blue-500">Fetch data:</h1>
    <p v-if="fact">{{ fact }}</p>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
  data() {
    return {
      fact: null,
    }
  },
  methods: {
    fetchData() {
      fetch("https://equran.id/api/v2/surat", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          this.fact = data
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
  mounted() {
    this.fetchData()
  },
}
</script>

<style>
button {
  padding: 12px 32px;
  font-size: 16px;
  border-radius: 8px;
}
</style>
