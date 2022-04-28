<template>

  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="作业名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="课程类型">
      <el-select v-model="form.courseid" placeholder="请选中对应的科目">
<!--        <el-option label="Java" value="1"></el-option>-->
        <el-option v-for="(item,i) in typelist.data" :label=item.name :value=item.courseId :key="i"></el-option>

<!--        <el-option label="软件工程" value="2"></el-option>-->
      </el-select>
    </el-form-item>
    <el-form-item label="启动状态">
      <el-switch
        style="display: block; margin-top: 5px"
        v-model="form.taskstate"
        active-color="#13ce66"
        active-text="开启"
        inactive-text="关闭">
      </el-switch>
    </el-form-item>
<!--    上传文件
        action	必选参数，上传的地址
        multiple	是否支持多选文件
        data	上传时附带的额外参数
-->
    <el-upload
      class="upload-demo"
      drag
      action="#"
      :before-remove="movefile"
      :before-upload="beforefile"
      :http-request="request"
      :limit="1"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">不要上传同名文件，最好打包上传！</div>
    </el-upload>




<!--上传文件结束-->

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
var formData = new FormData()
export default {
  name: "taskUpload",
  data(){
    return{
      form: {
        name: '',
        courseid: '',
        taskstate:false
      },
      listfile:[],
      typelist:{}

    }
  }
  ,
  created() {
    //gettype
    this.getCoursetype();

  }
  ,
  methods: {
    getCoursetype(){
      this.rq.requests.get('/zz/admin/courseType',{},{
          // headers:{
          //   // 'Content-Type': 'multipart/form-data'
          // }
          // headers:{'Content-Type':'multipart/form-data; boundary=----WebKitFormBoundaryVCFSAonTuDbVCoAN'},
          // processData: false,
          // contentType: false,
        },
      ).then(function (response){
        //获得到数据
        console.log(response.data)
        this.typelist=response.data;
      }.bind(this)).catch(function (error){
        console.log(error)
      })
    },
    onSubmit() {
      //开始上传
      if(this.form.name==="")
      {
        this.tishi("警告哦，作业名称不能为空!");
        return;
      }else if(this.form.courseid==="")
      {
        this.tishi("警告哦，课程类型不能为空!");
        return;
      } else if(this.listfile.length<1)
      {
        this.tishi("警告哦，请上传一个文件!");
        return;
      }
      console.log('submit!');
      var formdata = new FormData();//创建FormData对象
      var form2 = new Object();
      form2.TaskName=this.form.name;
      form2.TaskState=this.form.taskstate;
      form2.CourseId=this.form.courseid;

      var json = JSON.stringify(form2);
      //添加文件进去
      formdata.append("formdata",this.listfile[0]);//添加对象文件
      formdata.append("task",json);//添加对象文件

      //上传
      this.postfile(formdata);

    },
    //删除文件
    movefile(file,infileList)
    {
      console.log("长度："+infileList.length)
      for (let i = 0; i < infileList.length; i++) {
        if(file.name===infileList[i].name)
        {
          this.listfile.splice(i,1);
        }
      }
    },
    tishi(data){
      this.$message({
        message: data,
        type: 'warning'
      });
    },

    //上传文件前
    beforefile(file)
    {
      //上面的return 会阻止上传
      console.log("添加文件："+file.name)
      // formData.append("file",file);

      this.listfile.push(file)
    },
    //上传文件后,每个文件上传后
    request(params)
    {
      console.log("文件："+params)
    },
    postfile(formdata) {
      this.rq.requests.post('/zz/admin/addTask',formdata,{
          // headers:{
          //   // 'Content-Type': 'multipart/form-data'
          // }
          headers:{'Content-Type':'multipart/form-data; boundary=----WebKitFormBoundaryVCFSAonTuDbVCoAN'},
          processData: false,
          contentType: false,
        },
      ).then(function (response){
        //获得到数据
        console.log(response.data)
        this.open1();
      }.bind(this)).catch(function (error){
        console.log(error)
        this.open4();
      })
    }
    ,
    open1() {
      this.$notify({
        title: '成功',
        message: '作业文件成功上传',
        type: 'success'
      })
    },
    open4() {
      this.$notify.error({
        title: '错误',
        message: '作业文件上传失败'
      });
    }



  }
}
</script>

<style scoped>



.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-upload-list
{
  /*min-height: 200px;*/
}


/deep/ .el-upload{
  width: 100%;
  height: 400px;
}
/deep/ .el-upload .el-upload-dragger{
  width: 100%;
  height: 400px;
}

.el-icon-upload{
  /*line-height: 200px;*/
  margin-top: 150px;
}
.el-upload__text{
  /*line-height: 200px;*/
}

</style>
