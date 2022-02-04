<template>
    <nav>
        <div class="left-side">
            <!-- <nuxt-link to="/">
                HOME
            </nuxt-link>
            <nuxt-link to="/review">
                기업 리뷰
            </nuxt-link> --> 
            <ul>
                <li><nuxt-link to="/" class="company">홈</nuxt-link></li>
                <li><nuxt-link to="/write">글작성</nuxt-link></li>
                <li>    
                    <button @click="user.email ? $store.commit('user/SET_USER_LOGOUT') : $store.commit('modal/SET_LOGIN_MODAL_OPEN')">
                    {{user.email ? "로그아웃" : "로그인"}}
                    </button>

                    <!--로그인이 되어 있지 않을 시-->
                    <button @click="$store.commit('modal/SET_SIGHUP_MODAL_OPEN')" v-if="!user.email">
                        회원가입
                    </button>

                </li>   
                <LoginModal/>
                <SignupModal/>
            </ul>
        </div>
        <!-- <div class="right-side">
           
        </div> -->
        <!-- <div v-if="gnb.company" class="company-nav"> 
            <nuxt-link to="/company/mission">미션</nuxt-link>
            <nuxt-link to="/company/core">핵심</nuxt-link>
            <nuxt-link to="/company/history">연혁</nuxt-link>
            <nuxt-link to="/company/location">위치</nuxt-link>
        </div> -->
    </nav>
</template>
<script>
import LoginModal from '../components/Modal/Login.vue'  
import WriteModal from '../components/Modal/Writing.vue'
import SignupModal from '../components/Modal/Signup.vue'
import { mapState } from "vuex";


export default {
    components: { 
        LoginModal,
        WriteModal,
        SignupModal
    },
    computed: { ...mapState(["user"]), ...mapState(["gnb"])}
}
</script>
<style scoped> 
    nav{ 
        /* display: flex;
        justify-content: space-between; */
        margin-top: 20px;
    }
    .right-side{ 
        width:20%; 
        display: flex;
        justify-content: flex-end;
    }
    .left-side a{ 
        margin-right: 10px;
    }
    ul{
        display: flex;
        justify-content: space-between;
        padding-left: 0px;
        padding-inline-start: 0px;
    }
    li{ 
        list-style: none;
    }
    .company-nav{
        width: 286px;
        background-color: aliceblue;
        padding: 10px;
    }
    .company-nav a{ 
        display: block;
    }
</style>