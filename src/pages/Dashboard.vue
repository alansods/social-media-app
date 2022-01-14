<template>
  <div id="dashboard">
    <h1>Dashboard</h1>
    <button @click="logOut">Sair</button>
  </div>
</template>

<script>
import firebase from '@/services/firebaseConnection'

export default {
  name: "Login",
  data(){
    return{

    }
  },
  methods:{
    async logOut(){
      const confirm = window.confirm('Você realmente deseja sair?');
      if(confirm){
        firebase.auth().signOut()
        .then(async ()=> {
          await localStorage.removeItem('SocialApp');
          this.$router.push('/login');
        })
      }else{
        return;
      }
    }
  }

}
</script>

<style>

</style>