<template>
    <div class="modal-outside" v-if="modal.signup.show">
        <div id="signup" v-click-outside="onClickOutside">
            <div class="head">
                <h5>회원가입</h5>
                <a @click.prevent="$store.commit('modal/SET_LOGIN_MODAL_CLOSE')" class="close-btn">
                    X   
                </a>    
            </div>
            <div class="row-email">
                <label for="input-email">email</label>
                <div>
                    <input type="email" key="input-email" v-model="input.email" @blur="checkEmail"/>@ 
                    <select v-model="selected" v-if="selected !== 'etc'" @blur="checkEmail"> 
                        <option disabled value="">선택하세요.</option>
                        <option value="naver.com">naver.com</option>
                        <option value="daum.net">daum.net</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="etc">기타</option>
                    </select>
                    <input v-else type="text" v-model="input.etcEmail"/>    
                </div>
                <span class="alert" v-if="alert.email">{{alertmsg.email}}</span>
            </div>
            <div class="row">   
                <label for="input-password">password</label>
                <input type="password" key="input-password" v-model="input.password" maxlength="20"/>
                 <span class="alert" v-if="alert.password">{{alertmsg.password}}</span>
            </div>
            <div class="row">
                <label for="input-password-comfirm">password 확인</label>
                <input type="password" key="input-password-comfirm" maxlength="20" v-model="input.passwordConfirm"/> 
                <span class="alert" v-if="alert.passwordConfirm">{{alertmsg.passwordConfirm}}</span>
            </div>
            <div class="row">
                <label for="input-nickname">닉네임</label>
                <input type="text" key="input-nickname" maxlength="15" v-model="input.nickName"/>
                 <!-- <span class="alert">{{alertmsg.nickname}}</span> -->
            </div>
            <div class="row">
                <button class='signup-btn' @click="saveUser"> 가입하기 </button>
            </div>
        </div>  
    </div>
</template>
<script>
import { mapState } from "vuex";
import vClickOutside from 'v-click-outside'
import axios from "axios"

export default {
    computed: { ...mapState(["modal"])},
     directives: {
        clickOutside: vClickOutside.directive
    },
    data(){
        return{ 
            input: { 
                email: null, 
                password: null, 
                passwordConfirm: null, 
                nickName: null, 
                etcEmail: null,
            },
            selected: '', 
            alert: { 
                email: false, 
                password: false, 
                passwordConfirm: false, 
            },
            alertmsg: { 
                email: null, 
                password: null, 
                passwordConfrim: null, 
            }
        }
    }, 
    methods: {
        onClickOutside(){ 
            this.$store.commit("modal/SET_LOGIN_MODAL_CLOSE"); 
        },
        async checkEmail(){ 

            if(!this.input.email || !this.selected) { 
                this.alert.email = true; 
                this.alertmsg.email= '이메일 형식에 맞지 않습니다.'
            }else{ 
                const result = await axios.get('http://localhost:3000/user/duplicheck', { 
                    params: {
                        email :this.input.email, 
                        domain : this.selected
                    }
                })
                if(result.data.emailCount === 1){ 
                    this.alert.email = true;    
                    this.alertmsg.email = '중복된 이메일 입니다.'
                    return; 
                }
                this.alert.email = false; 
            }
        },
        checkPassword(){ 
           // 정규 표현식을 이용한 password 제어
        }, 
        async saveUser(){ 
            const {email, password, nickName} = this.input; 

            if(this.alert.email || this.alert.password || this.alert.passwordConfirm){ 
                alert('입력값을 확인해주세요.')
                return
            }
            const result = await axios.post('http://localhost:3000/user/signup', { 
                email: email + '@' + this.selected,
                password:password, 
                nickname: nickName,
            })
            const { data }= result; 
            if(data){ 
                alert("가입이 완료되었습니다!"); 
                this.input.email = '';
                this.input.password = '';
                this.input.passwordConfirm = '';
                this.input.nickName = '';
                this.$store.commit('modal/SET_LOGIN_MODAL_CLOSE')
            }
        }
    }, 
}       
</script>
<style scoped>
    #signup{ 
        width: 400px;
        background-color: #ffffff;
        padding: 20px 10px;
    }
    input{ 
        display: block;
    }
    .alert{ 
        color: red;
        font-size: 0.8em;
    }
    .row-email{ 
        margin: 20px 0;
    }
    .row-email label{ 
        display: block;
        margin-bottom: 5px;
        font-size: 14px;
    }
    .row-email div{ 
        width: 100%;
        display: flex;
        align-items: center;
    }
    .row-email input, .row-email select{ 
        width: 50%;
        padding: 12px;
        box-sizing: border-box;
    }
    .signup-btn{ 
        width: 100%;
        box-sizing: border-box;
        padding: 15px 0px;
        cursor: pointer;
    }

</style>