<template>
  <div>
    <Tilt v-if="!iOS">
      <slot></slot>
    </Tilt>
    <slot v-else></slot>
  </div>
</template>

<script>
import { isIos } from "../utils";
import Tilt from "vanilla-tilt-vue";

export default {
  name: "TiltWrapper",
  computed: {
    iOS() {
      return isIos();
    },
  },
  components: {
    Tilt,
  },
};
</script>

