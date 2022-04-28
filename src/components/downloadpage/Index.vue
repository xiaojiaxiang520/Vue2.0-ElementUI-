<template>
<!--  <div class="ccc">-->
<!--    <h1>作业下载1.0版本</h1>-->
<!--    -->
<!--  </div>-->
  <div class="ccc">
    <h1>作业下载1.0版本</h1>
    <el-row :gutter="20">
      <el-col :span="14" :offset="5">

        <div class="grid-content bg-purple">
          <el-row :gutter="20">
            <el-col :span="6" v-for="i in courselist" :key="i.courseId" class="overflow">
              <div class="grid-content bg-purple2 _text_1 _min_height overflow" v-on:click="cli(i.name,i.courseId)"   style="cursor:pointer">
                {{i.name}}
              </div>
            </el-col>
          </el-row>
          <el-divider>

          </el-divider>
          <el-row :gutter="20">
            <el-col :span="6" v-for="(i,index) in tasklist"  :key="i.taskId" class="cont">
              <div class="grid-content bg-purple3 _min_height item" v-on:click="cli2(i.taskUrl)" style="cursor:pointer">
                <div style="margin-left:  -60px;width: 200px">
                  <i class="el-icon-tickets" style="font-size: 22px"></i>
                  {{i.taskName}}
                </div>
                <div v-if="index==0" class="lable11">最新</div>
              </div>
            </el-col>


          </el-row>
        </div>
      </el-col>

    </el-row>

  </div>

</template>

<script>
export default {
  name: "Index",
  data(){
    return{
      courselist:{},
      tasklist:{}
    };
  },
  created() {
    this.indexcouseGet();
  },
  methods: {
    indexcouseGet() {
      this.rq.requests.get('/allCourse',{}).then(function (response){
        console.log(response.data);
        this.courselist = response.data.data;
      }.bind(this)).catch(function (error){
        console.log(error)
      })
    },
    cli(name,id){
      //点击事件
      this.getTask(id);
      this.open1(name);
    },
    cli2(url){
      //点击事件
      window.open(url)
    }
    ,
    open1(name) {
      this.$notify({
        title: '成功',
        message: name+'-查询成功',
        type: 'success'
      });
    },
    getTask(id){
      this.rq.requests.get('/allTask',{
        params:{
          id:id,
        }
      }).then(function (response){
        this.tasklist=response.data.data;
        console.log(response.data);

      }.bind(this)).catch(function (error){
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.overflow{
  overflow:hidden;
}

.lable11{
  font-size:13px;
  color:#fff;
  line-height:32px;
  background:orange;
  position:absolute;
  right:0;
  bottom:0;
  z-Index:2;
  padding:0 2em;
  -webkit-transform-origin:left top;
  -moz-transform-origin:left top;
  transform-origin:left top;
  -webkit-transform:translate(29.29%,100%) rotate(-45deg);
  -moz-transform:translate(29.29%,100%) rotate(-45deg);
  transform:translate(29.29%,100%) rotate(-45deg);
  text-indent:0;
}
/*.cont {margin:20px 30px;}*/
.item {
  position:relative;
  line-height:80px;
  /*font-size:18px;*/
  font-weight:bold;
  /*background:#f1f1f1;*/
  margin-bottom:12px;
  overflow:hidden;
  text-indent:2em;
  /*width:300px;*/
}



.el-icon-tickets
{
  /*min-height: ;*/
  /*font-size: 23px;*/
}
.ccc{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  /*margin-top: -8px;*/
}
h1{
  padding-top: 15px;
  padding-bottom: 15px;
}


.el-row {
  margin-bottom: 20px;
&:last-child {
   margin-bottom: 0;
 }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  /*background: #d3dce6;*/
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.bg-purple2
{
  background: #42b983;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.bg-purple3
{
  background: #409EFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
._text_1
{
  text-align:center;
  line-height:100px;
  font-weight: 600;
}
._min_height{
  min-height: 100px;
  margin-bottom: 10px;
}


</style>
