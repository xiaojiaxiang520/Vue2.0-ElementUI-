<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 课程管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
<!--      操作title部分-->
        <div class="container">
            <div class="handle-box">
<!--              批量删除-->
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                    disabled>批量删除</el-button>
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="已开启" value="广东省"></el-option>
                    <el-option key="2" label="已关闭" value="湖南省"></el-option>
                </el-select>
<!--              v-model是用于绑定，placeholder是输入框占位符-->
                <el-input v-model="query.name" placeholder="作业名称" class="handle-input mr10"></el-input>
<!--              两个按钮-->
                <el-button type="primary" icon="el-icon-search" @click="handleSearch" disabled>搜索</el-button>
                <el-button class="moveleft" type="primary" icon="el-icon-plus" @click="addEdit" disabled>新增</el-button>
            </div>
<!--          表体
            data：数据 border：是否带有纵向边框 ref是焦点 header-cell-class-name：表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。
            @selection-change:多选操作
            //选择的数组
            @selection-change="handleSelectionChange"
-->
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
<!--              多选框-->
                <el-table-column type="selection" width="55" align="center"></el-table-column>
<!--              id-->
                <el-table-column prop="taskId" label="ID" width="55" align="center"></el-table-column>
<!--              -->
                <el-table-column prop="taskName" label="作业名称"></el-table-column>
                <el-table-column label="所属课程">
                    <template slot-scope="scope">{{scope.row.courseName}}</template>
                </el-table-column>
              <el-table-column prop="" label="作业链接">
                <template slot-scope="scope">
                  <el-link :href=scope.row.taskUrl type="primary">下载链接</el-link>
                </template>
              </el-table-column>

              <el-table-column prop="download" label="下载次数"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
<!--                      关闭开启标签-->
                        <el-tag v-if=scope.row.taskState type="success">开启</el-tag>
                        <el-tag v-else type="danger">关闭</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="newTime" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
<!--                      编辑按钮-->
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"

                        >编辑</el-button>
<!--                      scope.$index，第一个是index，第二个是多少行-->
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"

                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
<!--          页码-->
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="课程名">
                    <el-input v-model="form.taskName"></el-input>
                </el-form-item>
                <el-form-item label="启动状态">
                    <el-switch
                      style="display: block; margin-top: 5px"
                      v-model="form.taskState"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="开启"
                      inactive-text="关闭">
                    </el-switch>
                </el-form-item>
            </el-form>
<!--          取消和确定-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!--新增窗口-->
        <el-dialog title="新增" :visible.sync="editVisible2" width="30%">
          <el-form ref="form" :model="addform" label-width="70px">
            <el-form-item label="课程名">
              <el-input v-model="addform.name"></el-input>
            </el-form-item>
            <el-form-item label="启动状态">
              <el-switch
                style="display: block; margin-top: 5px"
                v-model="addform.courseState"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="开启"
                inactive-text="关闭">
              </el-switch>
            </el-form-item>
          </el-form>
          <!--          取消和确定-->
          <span slot="footer" class="dialog-footer">
                  <el-button @click="editVisible2 = false">取 消</el-button>
                  <el-button type="primary" @click="saveEdit2">确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
import axios from 'axios';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
          //表的数据，整个表的数据
            tableData: [],
          //开始为空，然后选中添加进入
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
          //存放编辑的
            form: {},
            idx: -1,
            id: -1,

            //默认按钮的属性
            switch_is: true,
            //弹窗属性2
            editVisible2: false,
            //新增的属性
            addform:{},
            //关闭窗口


        };
    },
    //创建时候的调用方法
    created() {
        // this.getData();
        this.getselect()
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            //获取数据
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });

        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })//回调函数then
                .then(() => {
                    this.$message.success('删除成功');
                    //在tableData数组中，从index开始删除，删除1个
                    this.tableData.splice(index, 1);
                    this.pageTotal--;
                    console.log(row)
                    this.deleteGet(row.taskId);
                })//捕捉异常
                .catch(() => {});
        },
        // 多选操作，将选中的数据放在multipleSelection
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //批量数据
        delAllSelection() {
            //获取数据长度
            const length = this.multipleSelection.length;
            let str = '';
            //合并一个数组，然会一个新的数组,这个就是删除后数组
            this.delList = this.delList.concat(this.multipleSelection);
            //拼接多个str
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            //
            this.$message.error(`删除了${str}`);
            //清空当前选中的数据
            this.multipleSelection = [];
            //开始删除刚刚选中的数据,this.tableData
            for (let i = 0; i < this.delList.length; i++) {
              for (let j = 0; j < this.tableData.length; j++) {
                if(this.delList[i].id===this.tableData[j].id)
                {
                  this.tableData.splice(j,1);
                  this.pageTotal--;
                }
              }
            }
        },
        // zuoye编辑操作
        handleEdit(index, row) {
            //标题
            this.idx = index;
            this.form = row;
            //是否可见
            this.editVisible = true;

        },
      //新增课程
        addEdit(){

          this.editVisible2=true;
        },
        // 保存编辑
        updateEdit() {
            //关闭弹窗
            this.editVisible = false;
            //设置弹出窗修改成功
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            //发送接口
            // this.$set(this.tableData, this.idx, this.form);
            this.updateGet(this.form);
        },
      //保存
        saveEdit2(){
            if(this.addform.name!=null&&this.addform.name!=''){
              this.editVisible2=false;
              //发送修改信息

              this.$message.success("添加课程："+this.addform.name+"成功");
              // this.addform.courseState=false;
              this.addCourseGet(this.addform);

            }else{
              this.$message.error("课程名不能为空");
            }
            this.addform={};
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getselect();
        },
      //查询数据，页面开始的时候
        getselect(){

          this.rq.requests.get('/zz/admin/findTaskLimit',{
            params:{
              Limit:(this.query.pageIndex-1)*10
            }
          }).then(function (response){
            //获得到数据

            console.log("获取数据成功：")
            console.log(response.data.data.tasks)

            this.tableData = response.data.data.tasks;
            this.pageTotal=(response.data.data.count);

          }.bind(this)).catch(function (error){
            console.log("获取数据成功：")
            console.log(error)
          })
        },
        //修改数据
        updateGet(form){
          this.rq.requests.get('/zz/admin/updateTask',{
            params:{
              TaskId:form.taskId,
              TaskName:form.taskName,
              TaskState:form.taskState
            }
          }).then(function (response){
            //获得到数据
            console.log(response.data)
          }.bind(this)).catch(function (error){
            console.log(error)
          })
        },
        //新增数据
        addCourseGet1(addform)
        {
          this.rq.requests.get('/zz/admin/deleteTask',{
            params:{
              Name:addform.name,
              CourseState:addform.courseState
            }
          }).then(function (response){
            //获得到数据
            console.log(response.data)
          }.bind(this)).catch(function (error){
            console.log(error)
          })
        },
        deleteGet(id)
        {
          this.rq.requests.get('/zz/admin/deleteTask',{
            params:{
              TaskId:id,
            }
          }).then(function (response){
            //获得到数据
            console.log(response.data)
          }.bind(this)).catch(function (error){
            console.log(error)
          })
        }

    }
};
</script>

<style scoped>

.moveleft{
  float: right;
  /*margin-right: 20px;*/
}
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
