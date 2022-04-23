<!--首页-->
<template>
    <div class="wrapper">
<!--    标题,已读-->
        <v-head></v-head>
<!--     首页的左侧导航栏的table，三级渲染-->
        <v-sidebar></v-sidebar>
<!--     中间内容，-->
        <div class="content-box" :class="{'content-collapse':collapse}">
<!--            中间内容的标签-->
            <v-tags></v-tags>
            <div class="content">
<!--                动画标签-->
                <transition name="move" mode="out-in">
                <!--include中可以存放数组，存放打开页面的name ，此处就是把页面当做一个组件，
                动态的获取可以缓存的页面。(每个页面写name这个很重要,并且name要和router文件夹下配置的路由name一致)；       -->
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    }
};
</script>
