<template>
  123
</template>

<script>
import { markRaw, ref, reactive, onMounted } from "vue";
export default {
  setup() {
    const source=ref("")
    const fas=()=>{
      source.value="";
    }
    return {source,fas}
  },
}
</script>