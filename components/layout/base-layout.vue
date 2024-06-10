<template>
  <NavbarLayout />
  <slot></slot>
  <FooterLayout />
</template>

<script>
  import NavbarLayout from './navbar-layout.vue';
  import FooterLayout from "./footer-layout.vue";

  export default {
    components: {
      NavbarLayout,
      FooterLayout,
    },
};
</script>