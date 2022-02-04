<template>
    <div class="topic-list">
        <div class="title-wrap">
            <h2 class="list-title">
                <i class="ico">
                    <img src="https://d2u3dcdbebyaiu.cloudfront.net/img/web/topic_logo_kr_1587367050.png" alt="">
                </i>
                {{ isLoading ? "" : data.title}}
            </h2>
            <a href="www.naver.com">더보기</a>
        </div>
        
        <div class="article" v-for="(item, index) in data.content" :key="index">
            <span class="topic"></span>
             <nuxt-link :to="{name:'article-id', params:{id:item.id}}" class="tit">{{ isLoading ? "" : item.articleTitle}}</nuxt-link>
            <div class="wrap-info">
                <nuxt-link :to="{name:'article-id', params:{id:item.id}}" class="pv">
                    <i class="blind ">조회수</i>
                    {{ isLoading? "" : item.viewCount}}
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    created() {
    },
    methods: {
      
    },
    mounted() {
        // console.log(this.props)
    },
    props: { 
        data :{ 
            type: Object, 
            required: true, // 필수값 유무 
        },
        isLoading: {
            type: Boolean,
            required: true
        }
    }
}
</script>
<style>
    .topic-list{ 
        /* width: calc(50% - 20px); */
        margin-top: 45px;
        padding: 0;
        border-bottom: none;
    }

    .list-title{ 
        height: 45px;
        padding-right: 52px;
        padding-left: 35px;
        border-bottom-width: 2px;
        font-size: 18px;
        line-height: 43px;
        position: relative;
    }
    .ico {
        position: absolute; 
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        display: inline-block;
        width: 32px;
        height: 32px;
    }

    .ico img {
        width: 100%;
        height: 100%;
        vertical-align: top;
    }
    .article,
    .title-wrap{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .topic{ 
        display: none;
    }
 
    .home-list .topic-list .article .tit{
        display: inline-block;
        font-size: 14px;
        line-height: 30px;
    }

    .home-list .topic-list .article .wrap-info {
        display: inline-block;
        position: absolute;
        top: calc(50% + 2px);
        right: 0;
        transform: translateY(-50%);
        margin-top: 0;
    }
    .wrap-info .pv:before {
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www_kr/sp-kr.png) no-repeat;
        background-size: 600px 900px;
        background-position: -10px -600px;
    }

    .wrap-info a:before, .wrap-info span:before {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin: -1px 3px 1px 0;
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
</style>