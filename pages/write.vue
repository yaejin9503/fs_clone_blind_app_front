<template>
    <div class="write-container">
        <div class="select-wrap"> 
            <select name="" id="">
                <option>기본값</option>
                <option>예시</option>
            </select>            
        </div>
        <div class="file-wrap">
            <input type="file"/>
        </div>
        <div class="title-wrap">
            <input type="text" placeholder="제목을 입력하세요">
        </div>       
        <div class="contetn-wrap">
            <textarea placeholder="내용을 입력하세요"/>
        </div>
        <div class="btn-wrap">
            <button class="ok">작성 완료</button>
            <button class="cancel" @click="moveToHome">취소</button>
        </div>       
    </div>  
</template>
<script>
export default {
    methods: {
        moveToHome(){ 
            this.$router.push({name: 'index'})
        }
    },
}
</script>
<style lang="scss">
    .select-wrap, 
    .file-wrap{ 
        width: 100%; 
        margin: 10px 0px;
        select{ 
            padding: 5px 20px 5px 0px;
        }
    }
    .write-container{ 
        margin-top: 60px;
    }
    .title-wrap{
        margin: 10px 0px;
        /* padding: 11px 0px; */
        width: 100%;
        input{ 
            padding: 5px;
            width:100% ;
        }
    }
    .contetn-wrap{ 
        width: 475px;
        textArea{
            width: 100%;
            height: 300px;
            padding: 5px;
        }
    }
    .btn-wrap{ 
        position: relative;
        margin-top: 10px;
        .ok{ 
            position: absolute;
            right: 0;
        }
        .cancel{ 
            right: 17%;
            position: absolute;
        }
    }

    


</style>