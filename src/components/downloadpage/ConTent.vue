<template>
  <el-row :gutter="20">
    <el-row :gutter="20">
      <el-link type="primary" style="font-size:30px" disabled>Java作业</el-link>
    </el-row>
    <el-col :span="14" :offset="5">
      <div class="grid-content bg-purple">
        <el-row :gutter="20">




          <el-col :span="6">
            <div class="grid-content bg-purple2 _text_1 _min_height">
              Java作业
            </div>
          </el-col>

        </el-row>
      </div>
    </el-col>




  </el-row>
</template>

<script>
export default {
  name: "ConTent",
  data(){
    return{
      hhhhhhhhh:"ssssssssssssssssss"
    }
  }
}
</script>

<style scoped>

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
