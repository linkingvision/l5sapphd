<template>
  <div class="onetoone">
       <ion-button color="primary" @click="showLoading">测试</ion-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
 methods: {
    async showLoading() {
      const loading = await this.$ionic.loadingController.create({
        spinner: 'hide',
        duration: 2000,
        message: 'Please wait...',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });
      loading.present();
    }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
