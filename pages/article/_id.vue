<template>
    <main>
        <div class="article-view-head">
            <h1>토픽 > {{article.boardTitle}}</h1>
            <h2>{{article.articleTitle}}</h2>
            <p>{{ article.createdAt }}</p>
            <div>

            </div>
        </div>
        <div class="content-main">
            {{ article.articleContent }}
        </div>
        <div class="commtent-write-wrap">
            <h5>댓글 남기기</h5>
            <div class="comment-input-wrap">
                <input type="text" v-model="commentText"/> 
                <button @click="insertComment">완료</button>
            </div>
        </div>
        <div class="comment-list-wrap" v-for="(item, index) in comments" :key="index">
            <div class="email">{{item.authorEmail}}</div>
            <div class="content">{{item.content}}</div>
            <div class="like-comment">
                <span> {{item.createdAt}}</span>
                <a class="like">
                    <i class="blind">좋아요 수</i>
                    좋아요
                </a>
                <button class="delete" v-if="item.isUser" @click="() => deleteComment(item.commentId)">삭제</button>
                <button class="edit" v-if="item.isUser">수정</button>
            </div>
        </div>
    </main>
</template>
<script>
import axios from 'axios'
import moment from 'moment'

export default {
    data(){
        return{
            param: '', 
            article: {},
            comments: [],
            commentText: ''
        }
    }, 
    created() {
        this.param = this.$route.params.id;  
        this.init();
    },
    methods: {
        async init(){ 
            const { data } = await axios.get(`http://localhost:3000/article/${this.param}`)
            let result = data.article[0];
            const userEmail = this.$store.state.user.email;  

            result.createdAt = moment(result.createdAt).format('YYYY-MM-DD'); 
            this.article = result; 

            let comments = data.comments; 
            comments = comments.map(c => { 
                c.createdAt = moment(c.createdAt).format('YYYY-MM-DD'); 
                c.isUser = false; 
                if(c.authorEmail === userEmail) c.isUser = true; 
                c.authorEmail = c.authorEmail.substr(0,1) + "*".repeat(c.authorEmail.length -2)
                return c; 
            })
            this.comments = comments;
        },
        async insertComment(){ 
            const userEmail = this.$store.state.user.email;  

            if(!this.commentText){ 
                alert('댓글을 입력해주세요.');
                return;
            } 

            const { data } = await axios.post(`http://localhost:3000/article/comment`, { 
                articleId : this.param,
                authorEmail: userEmail, 
                content : this.commentText, 
                mention : ''
            })
            let result = data[0]; 
            result.createdAt = result.createdAt.split("T")[0];
            this.comments.unshift(result); 
        },
        async deleteComment(commentId){ 
            console.log(commentId)
        }
    },
}
</script>
<style>
    .article-view-head{
        z-index: 10;
        padding: 0 0 29px;
        position: relative;
    }
    .article-view-head h1 {
        font-size: 14px;
        font-weight: 700;
        line-height: 16px;
    }
    .article-view-head h2 {
        font-size: 24px;
        line-height: 32px;
        margin-top: 15px;
        margin-bottom: 0px;
    }   
    .article-view-head p{ 
        margin-top: 3px ;
        color: rgb(202, 199, 199);
        font-size: 0.9em;
    }
    .name{ 
        font-size: 14px;
        margin-top: 16px;
        line-height: 16px;
    }
    .commtent-write-wrap h5{
        margin-bottom: 5px;
    }
    .comment-input-wrap{ 
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .comment-input-wrap input{ 
        padding: 10px;
        width: 380px;
    }
    .comment-input-wrap button{ 
        width: 70px;
    }
    .comment-list-wrap{ 
        margin-top: 10px;
    }
    .comment-list-wrap {
        margin-top: 15px;
        margin-bottom: 15px;
        border-top: 1px solid #d9d9d9;
       /* border-bottom: 1px solid #d9d9d9; */
        padding: 15px 0px;
    }

    .comment-list-wrap .email{ 
        margin-top: 9px;
        color: #94969b;
        font-size: 12px;
        line-height: 1.33em;
    }
    .comment-list-wrap .cotent{ 
        margin-top: 5px;
        font-size: 16px;
        line-height: 1.5em;
    }
    .comment-list-wrap .like-comment{ 
        position: relative;
        margin-top: 8px;
        font-size: 12px;
        color: #929397;
        margin-right: 10px;
    }
    .like-comment span{ 
        margin-right: 10px;
    }
    .like:before {
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www_kr/sp-kr.png) no-repeat;
        background-size: 600px 900px;
        background-position: -62px -600px;
    }
    .like-comment a:before{
        display: inline-block;
        width: 16px;
        height: 16px;
        margin: -1px -3px 1px 0;
        vertical-align: middle;
        content: "";
    }
    .blind {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 1px;
        font-size: 1px;
        line-height: 100px;
        white-space: nowrap;
    }

    .like-comment .delete,
    .like-comment .edit{ 
        position: absolute;
        border: 0;
        background-color: #ffffff;
        color: #929397;
        cursor: pointer;
    }
    .like-comment .delete{
        right: 0; 
    }
    .like-comment .edit{ 
        right: 34px
    }
    

</style>