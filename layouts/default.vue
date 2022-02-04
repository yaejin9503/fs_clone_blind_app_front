<template>
    <div class="container">
        <GNB />
        <Nuxt />   
    </div>
</template>
<script>
import axios from 'axios'; 

export default {
    created(){ 
        this.init(); 
    },
    methods: { 
        async init(){ 
            if(process.browser){
                const token = localStorage.getItem('token'); 
                if(!token) return; 

                const { data } = await axios.get('http://localhost:3000/user/token', {
                    headers: { 
                        Authorization  : `Bearer ${token}`                     
                    }
                }); 

                if(!data.email) return; 

                this.$store.commit("user/SET_USER", { 
                    email: data.email, 
                    nickname : data.nickname, 
                    token: token
                })
            }
        }
    }
}
</script>
<style>
    .container{ 
        width:100%;
        max-width: 480px;
        margin: 0px auto;
    }
</style>