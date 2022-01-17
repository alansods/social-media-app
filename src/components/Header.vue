<template>
  <header id="header">
    <router-link to="/">Social Media App</router-link>
    <router-link tag="button" to="/dashboard">Minha Conta</router-link>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
#header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60px;
  background: #202225;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

#header a {
  text-decoration: none;
  font-size: 30px;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
}

button {
  cursor: pointer;
  border: 0;
  color: #fff;
  background: transparent;
  padding: 5px 15px;
  outline: none;
  font-weight: bold;
}

</style>
