<template>
  <Layout>
    <router-view></router-view>
    <base-loading></base-loading>

  </Layout>
</template>

<script>
import Layout from './layouts/default.vue';
import BaseLoading from "./components/BaseLoading.vue";

export default {
  components: {
    Layout,
    BaseLoading,
  },
}
</script>