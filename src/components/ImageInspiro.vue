<template>
  <div>
    <img :src="inspiroImgSrc" width="400px" />
  </div>
</template>

<script>
export default {
  name: "Test",
  created() {},
  data() {
    return {};
  },
  props: {
    "inspiroImgSrc": String,
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>