<template>
    <div class="tags" v-if="showTags">
        <ul>
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
                <router-link :to="item.path" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import bus from './bus';
    export default {
        data() {
            return {
                tagsList: []
            }
        },
        methods: {
            isActive(path) {
                return path === this.$route.fullPath;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);
                }else{
                    this.$router.push('/');
                }
            },
            // 关闭全部标签
            closeAll(){
                this.tagsList = [];
                this.$router.push('/');
            },
            // 关闭其他标签
            closeOther(){
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.fullPath;
                })
                this.tagsList = curItem;
            },
            /**
             *  梦开始的地方
             * @param route
             */
            // 最开始：设置标签
            setTags(route){
                //用于判断新增的path在list中是否存在
                //如果不存在则执行下面的
                const isExist = this.tagsList.some(item => {
                    /**
                     *  Array<any>.some：some方法用于检测数组中的元素是否满足指定条件（函数提供）
                     *      1、some（）方法会依次执行数组的每个元素
                     *      2、如果没有满足条件的元素，则返回false
                     *     注意：some（）不会对空数组进行侧键
                     *     注意：some（）不会改变对原始数组
                     */
                    return item.path === route.fullPath;//判断当前是否有当前router完整路径
                })
                //因为上面添加的path不存在在list中，我们则需要判断list是否大于8个，如果大于8个则删除第一个，然后添加刚刚点击的path
                //只有不存在的时候才会执行
                if(!isExist){
                    if(this.tagsList.length >= 8){
                        //删除数组中的第一个项目
                        this.tagsList.shift();
                    }
                    //将刚刚不存在的链接添加进去
                    this.tagsList.push({
                        /**
                         *  下面的这些内容是在路由中配置的
                         */
                        title: route.meta.title,//设置网页上的标题
                        path: route.fullPath,   //设置链接
                        name: route.matched[1].components.default.name//这个好像是会有一个数组,然后获取这个数组第二项component的name,也就是router中的name
                    })
                }
                //将刚刚新加进去的链接的list返回给tags页面
                bus.$emit('tags', this.tagsList);
            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch:{
            $route(newValue, oldValue){
                this.setTags(newValue);
            }
        },
        created(){
            //1、设置标签，把全局router设置进去
            this.setTags(this.$route);
            // 监听关闭当前页面的标签页
            bus.$on('close_current_tags', () => {
                for (let i = 0, len = this.tagsList.length; i < len; i++) {
                    const item = this.tagsList[i];
                    if(item.path === this.$route.fullPath){
                        if(i < len - 1){
                            this.$router.push(this.tagsList[i+1].path);
                        }else if(i > 0){
                            this.$router.push(this.tagsList[i-1].path);
                        }else{
                            this.$router.push('/');
                        }
                        this.tagsList.splice(i, 1);
                        break;
                    }
                }
            })
        }
    }

</script>


<style>
    .tags {
        position: relative;
        height: 30px;
        overflow: hidden;
        background: #fff;
        padding-right: 120px;
        box-shadow: 0 5px 10px #ddd;
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .tags-li {
        float: left;
        margin: 3px 5px 2px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 23px;
        line-height: 23px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: #fff;
    }

    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }

</style>
