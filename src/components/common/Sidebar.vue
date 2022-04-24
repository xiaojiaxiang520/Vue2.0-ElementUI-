<template>
    <div class="sidebar">
<!--
        default-active	当前激活菜单的 index
        collapse	是否水平折叠收起菜单
        unique-opened	是否只保持一个子菜单的展开，默认为false
        router	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
    -->
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router>
            <template v-for="item in items">
<!--                判断是否存在subs子菜单-->
                <template v-if="item.subs">
<!--                    含有subs的子菜单  index是唯一标致，key用于for循环的表示唯一值-->
                    <el-submenu :index="item.index" :key="item.index">
<!--                        菜单的标题-->
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
<!--                        菜单标题下面的子选项，循环subs的数据进行渲染 二级-->
                        <template v-for="subItem in item.subs">
<!--                            v-if：就是开启了第三级的菜单，用于判断是否有第三级的存在，这个是判断最后一级了，第三级-->
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index">
<!--                                三级的标题-->
                                <template slot="title">{{ subItem.title }}</template>
<!--                                threeItem表示当前item，后面的i表示第i个存在-->
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
<!--                            没有三级的-->
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>


                <template v-else>
<!--                    在没有subs的时候表示没有子下拉菜单，没有菜单的时候就是使用el-menu-item标签，这个就是一个标签-->
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                  //0
                    icon: 'el-icon-monitor',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                  icon: 'el-icon-notebook-2',
                  index: '1',
                  title: '作业管理',
                  subs: [
                    {
                      index: 'course',
                      title: '课程管理'
                    },
                    {
                      index: 'taskUpload',
                      title: '作业上传'
                    },
                  ]
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'table',
                    title: '基础表格'
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: 'tabs',
                    title: 'tab选项卡'
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '4',
                    title: '表单相关',
                    subs: [
                        {
                            index: 'form',
                            title: '基本表单'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-warn',
                    index: '5',
                    title: '错误处理',
                    subs: [
                        {
                            index: '404',
                            title: '404页面'
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            /*获取当前的路由的地址*/
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
