<template>
    <div class="teacherView">
        <el-row class="teacherContent">
            <!-- 教师教授课程信息 -->
            <el-col class="left" :span="14">
                <span class="title">尊敬的陈武老师,您所教授的课程如下:</span>
                <el-table
                :data="tableData.course"
                style="width: 100%;"
                stripe
                height="550"
                border
                class="table_data"
                >
                    <el-table-column
                    type="index"
                    label="序号"
                    width="60">
                    </el-table-column>
                    <el-table-column
                    prop="course"
                    label="课程名称"
                    width="160">
                    </el-table-column>
                    <el-table-column
                    prop="teacher"
                    label="任课老师"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="deadline"
                    label="截止日期"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    prop="book_command"
                    label="老师推荐教材"
                    width="160">
                    </el-table-column>
                    <el-table-column
                    prop="book_price"
                    label="教材单价"
                    width="100">
                    </el-table-column>
                    <el-table-column
                        prop="operation"
                        align='center'
                        label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button 
                                type="warning" 
                                icon='edit' 
                                size="small"
                                @click='course_message'
                            >查看</el-button>
                            <el-button 
                                type="warning" 
                                icon='edit1' 
                                size="small"
                                @click='edit_message'
                            >编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col class="right" :span="9">
                <span class="title">{{single_course}}的学生名单:</span>
                <el-table
                :data="stuMessage.students"
                style="width: 100%;"
                stripe
                height="550"
                border
                class="table_data"
                >
                    <el-table-column
                    type="index"
                    label="序号"
                    width="60">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="学生姓名"
                    width="160">
                    </el-table-column>
                    <!-- <el-table-column
                    prop="orderStatus"
                    label="订购状态"
                    width="100">
                    </el-table-column> -->
                    <el-table-column
                        prop="operation"
                        align='center'
                        label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button 
                                type="warning" 
                                icon='edit' 
                                size="small"
                                @click='course_message'
                            >查看</el-button>
                            <el-button 
                                type="warning" 
                                icon='edit1' 
                                size="small"
                                @click='edit_message'
                            >编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default{
        name: "teacherView",
        data(){
            return {
                tableData: {},
                stuMessage: {},
                single_course: "软件工程导论"
            }
        },
        methods:{
            course_message(){
                console.log("确认");
            },
            edit_message(){
                console.log("编辑");
            }
        },
        created(){
            const data = require("../teacher.json");
            const stu_mes = require("../students.json");

            this.tableData = data;
            this.stuMessage = stu_mes;
        },
        mounted(){
            // 获取权限
            const role = localStorage.role;
            if(role !== "teacher"){
            // 页面跳转
                this.$router.push("/404");
            }
            // 声明教师对象
            var teacher = {};
            // vuex获取学号
            const teaName = this.$store.getters.user.username;
            // 向后台数据库发出请求
            teacher = this.$axios
            .get("api/data/single_stuData", {
                teaName: teaName
            })
            .then(data => {
                console.log(data);
            });
        }
    }
</script>
<style scoped>
    *{
        padding: 0;
        margin: 0;
    }
    .teacherView{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: #ececec;
        padding: 20px;
    }
    .teacherContent{
        position: relative;
        width: 100%;
        height: 100%;
        /* background: skyblue; */
    }

    /* 左侧区域 */
    .left{
        height: 80%;
        /* background: rgb(182, 109, 109); */
        padding: 20px 15px 15px 15px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 5px;
        background: #fff;   
    }
    .table_data{
        margin-top: 20px;
    }
    .right{
        height: 80%;
        margin-left: 30px;
        /* background: rgb(182, 109, 109); */
        padding: 20px 15px 15px 15px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 5px;
        background: #fff;   
    }
</style>