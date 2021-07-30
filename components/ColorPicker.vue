<template>
  <div>
    <input
      id="head"
      v-model="color"
      class="rounded-full w-6 border-none"
      type="color"
      :style="{background: color}"
      @change="changeColor"
    >
  </div>
</template>

<script>
export default {
  data () {
    return {
      color: '#e66465'
    }
  },
  methods: {
    changeColor () {
      this.$emit('on-color-change', this.color)
    }
  }
}
</script>
<style>
input[type="color"]::-webkit-color-swatch {
  border: none;
}
</style>
