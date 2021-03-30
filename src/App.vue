<template>
  <v-app>
    <BlankLayout>
      <router-view></router-view>
    </BlankLayout>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import router from "./router/index.js";
import BlankLayout from "./layouts/BlankLayout";
export default {
  name: "App",
  router,
  components: {
    BlankLayout,
  },

  data: () => ({
    //
  }),
};
</script>
<style >
a {
  text-decoration: none !important;
}
.router-link-active {
  text-decoration: none !important;
}
.router-link-exact-active {
  text-decoration: none !important;
}
</style>