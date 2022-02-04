<template>
    <div v-if="modal.login.show" class="modal-outside">
        <div id="login-modal">
            <div v-if="!modal.login.directLogin">
                <div class="head">
                    <h5>블라인드 OTP 안전 인증</h5>
                    <a @click.prevent="$store.commit('modal/SET_LOGIN_MODAL_CLOSE')" class="close-btn">
                        X   
                    </a>
                </div>
                <div class="content">
                    <p>175-B5785</p>
                    <a @click.prevent="$store.commit('modal/SET_LOGIN_MODAL_DIRECT_LOGIN')"> 로그인 하러 가기</a>
                </div>
            </div>
            <div v-else>
                <div class="head">
                    <h5>로그인</h5>
                    <a @click.prevent="$store.commit('modal/SET_LOGIN_MODAL_CLOSE')" class="close-btn">
                        X   
                    </a>
                </div> 
                <div class="content">
                    <div class="row">
                        <label for="user-email">이메일</label> 
                        <input id="user-email" type="email" v-model="email"/>
                    </div>
                    <div class="row">
                        <label for="user-password">비밀번호</label> 
                        <input id="user-password" type="password" v-model="password"/>
                    </div>
                    <button class="login-btn" @click="login">이메일로 로그인</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios"; 

export default {
    data(){ 
        return{ 
            email: null, 
            password: null 
        }
    },
    computed: { ...mapState(["modal"])},
    methods:{ 
        async login(){ 
            const { data } = await axios.post('http://localhost:3000/user/signin',{ 
                email : this.email,
                password: this.password
            })
            
            if(data.error){ 
                return; 
            }
            // console.log(data.result)
            this.$store.commit("user/SET_USER", 
            { 
                email : data.result.email, 
                nickname: data.result.nickname, 
                token: data.token
            })
            this.$store.commit("modal/SET_LOGIN_MODAL_CLOSE")
        }
    }   
}
</script>
<style>
    #login-modal{ 
        width: 400px;
        height: max-content;
        background-color: #ffffff;
        padding: 20px 10px;
    }
    .head{
        display: flex;
        justify-content: space-between;
    }
    .head h5{ 
        margin: 0;
    }
    .head a{ 
        margin-top: -4px;   
        cursor: pointer;
    }
    .content{ 
        width: 100%;
    }
    .content p{ 
        margin-top: 20px;
        text-align: center;
        background-color: #258de9;
        padding: 20px 0px;
        color: #ffffff;
    }

    .content a{ 
        font-size: 0.75em;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .login-btn{ 
        display: flex;
        justify-content: center;
        align-items: center;        
        background-color: #258de9;
        border: none;
        color: white;
        font-weight: 400;
        width: 100%;
        height: 64px;
        font-size: 16px;
        cursor: pointer;
    }

</style>