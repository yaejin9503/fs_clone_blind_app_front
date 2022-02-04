<template>
  <div>
    <BoardCard v-for="(item, index) in data" :data="item" :isLoading="isLoading" :key="index"/> 
  </div>
</template>

<script>
import BoardCard from "../components/Board/BoardCard.vue"
import axios from 'axios'

export default {
  name: 'IndexPage',
   data(){
    return{
      data: [],
      isLoading: true
    }
  },
  created() {
    this.init()
  },
  methods: {
      async init(){ 
            const { data } = await axios.get('http://localhost:3000/main'); 
            this.data = data; 
            this.isLoading = false
        }
  },
  components: {
    BoardCard, 
  },
  
}
</script>
