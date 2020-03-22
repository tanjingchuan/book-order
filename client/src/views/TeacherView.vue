<template>
  <div class="teacherView">
    <el-row class="teacherContent">
      <!-- 教师教授课程信息 -->
      <el-col class="left" :span="14">
        <span class="title">尊敬的陈武老师,您所教授的课程如下:</span>
        <el-table
          :data="tableData"
          style="width: 100%;"
          @cell-click="chooseCourse"
          stripe
          fit="true"
          height="550"
          border
          class="table_data"
        >
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="course" label="课程名称" width="160"></el-table-column>
          <el-table-column prop="teacher" label="任课老师" width="100"></el-table-column>
          <el-table-column prop="deadline" label="截止日期" width="140"></el-table-column>
          <el-table-column prop="book_command" label="老师推荐教材" width="160"></el-table-column>
          <el-table-column prop="book_price" label="教材单价" width="100"></el-table-column>
          <el-table-column prop="operation" align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                class="course-btn"
                type="warning"
                icon="edit"
                size="small"
                @click="course_message"
              >查看</el-button>
              <el-button
                class="course-btn"
                type="warning"
                icon="edit1"
                size="small"
                @click="edit_message"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col class="right" :span="9">
        <span class="title">{{currentCourse}}的学生名单:</span>
        <el-table
          :data="stuMessage.students"
          style="width: 100%;"
          stripe
          height="550"
          border
          class="table_data"
          @cell-click="chooseStudent"
        >
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="name" label="学生姓名" width="160"></el-table-column>
          <!-- <el-table-column
                    prop="orderStatus"
                    label="订购状态"
                    width="100">
          </el-table-column>-->
          <el-table-column prop="operation" align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="warning" icon="edit" size="small" @click="course_message">查看</el-button>
              <el-button type="warning" icon="edit1" size="small" @click="edit_message">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: "teacherView",
  data() {
    return {
      tableData: [],
      currentCourse: "",
      single_course: "软件工程导论"
    };
  },
  computed: {
    stuMessage() {
      const students = this.tableData.filter(
        item => item.course === this.currentCourse
      )[0];
      return students;
    }
  },
  methods: {
    ...mapActions(['initTeaCourses']),
    // 点击学生的查看
    stu_detail() {
      console.log("确认");
    },
    chooseStudent(row) {
      console.log(row);
    },
    edit_message() {
      console.log("编辑");
    },
    // 选择某项课程
    chooseCourse(row) {
      this.currentCourse = row.course;
    }
  },
  created() {
    // const data = require("../teacher.json");
    // const stu_mes = require("../students.json");
    // this.tableData = data;
    // this.stuMessage = stu_mes;
  },
  mounted() {
    // 获取权限
    const role = localStorage.role;
    if (role !== "teacher") {
      // 页面跳转
      this.$router.push("login");
    }
    // vuex获取课程信息
    const teaName = this.$store.getters.user.username;
    console.log('教师名称', teaName)
    this.initTeaCourses(teaName).then(courseData => {
        this.tableData = courseData;
        console.log('课程数据', this.tableData)
        this.currentCourse = courseData[0].course;
    })
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.course-btn {
  display: inline-block;
}
.teacherView {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #ececec;
  padding: 20px;
}
.teacherContent {
  position: relative;
  width: 100%;
  height: 100%;
  /* background: skyblue; */
}

/* 左侧区域 */
.left {
  height: 100%;
  overflow-y: scroll;
  /* background: rgb(182, 109, 109); */
  padding: 20px 15px 15px 15px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
}
.table_data {
  margin-top: 20px;
}
.right {
  height: 100%;
  overflow-y: scroll;
  margin-left: 30px;
  /* background: rgb(182, 109, 109); */
  padding: 20px 15px 15px 15px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
}
</style>