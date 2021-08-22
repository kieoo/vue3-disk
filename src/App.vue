<template>
  <div id="app">
    <div id="nav">
      <div class="title">
        <img src="@/assets/disk.svg" style="margin-top: -10px; height: 45px; "/>
        <router-link class="title-t"  to="/">MTest-Disk</router-link>
      </div>
    </div>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 0px;
}
#nav {
  padding: 10px;
}
#nav a {
  font-weight: bold;
  color: #465546;
  font-size: large;
}

.title {
  display: inline-flex;
  position: relative;
}

.title-t{
  display: inline;
  margin: 10px;
  left: 100%;
  transform: translate(10%, 10%);
}
</style>
