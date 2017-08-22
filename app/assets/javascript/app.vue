<template>
  <div id="app">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      message: "Hello world!"
    }
  }
}
</script>

<style scoped lang="sass">
p
  font-size: 4em
  text-align: center
  background-image: url('./counter/images/clock.png')
  background-repeat: no-repeat
</style>
