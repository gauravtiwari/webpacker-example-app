<template>
  <div id="app" style="text-align: center">
    <img src="../counter/images/clock.png" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
module.exports = {
  data: function () {
    return {
      message: "Hello Vue!"
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
