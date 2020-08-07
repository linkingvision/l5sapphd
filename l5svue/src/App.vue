<template>
  <div id="app">
     <ion-app>
          <ion-vue-router />
     </ion-app>
    <!-- <router-view/> -->
  </div>
</template>

<script>

export default {
  name: 'App',
  // components: {
  //    'tabbar':Tabbars,
  // },
  data(){
    return{

    }
  },
  mounted() {
      window.addEventListener('unload',this.saveState)
  },
  methods: {
    saveState(){
      localStorage.setItem("state",JSON.stringify(this.$store.state))
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
