<template>
  <div class="container">
    <Diagram ref="editorRef"/>
  </div>
</template>

<script>
import Diagram from './components/Diagram.vue'
import Vue from 'vue'

export default {
  name: 'App',
  components: {
    Diagram
  },
  mounted(){
    Vue.prototype.$editorRef=this.$refs.$editorRef
    console.log(this,'editoref',this.$refs.editorRef)
  },
  data:()=>{
    return {
      editorRef:null
    }
  }
}
</script>

<style>
html, body {
  height: 100%;
}
body {
  padding: 0;
  margin: 0;
}
</style>
<style scoped>
.container {
  background-color: #f8f9fa;
  height: 100%;
}
</style>
