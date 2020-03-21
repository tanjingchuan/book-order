<template>
  <div class="datainc">
    <!-- 教师区域块 -->
    <div class="tea_region">
      <span class="title">教师接口如下:</span>
      <el-form ref="form" :model="form" class="tea_form" label-width="80px" label-position="left">
        <el-form-item label="教师姓名:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="年龄:">
          <el-input v-model="form.age"></el-input>
        </el-form-item>

        <el-form-item label="教师职位:">
          <el-select v-model="form.position" placeholder="请选择以下职位">
            <el-option label="教授" value="教授"></el-option>
            <el-option label="副教授" value="副教授"></el-option>
            <el-option label="普通教师" value="普通教师"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学院">
          <el-select v-model="form.academy" placeholder="请选择以下学院">
            <el-option 
            v-for="item in academys" 
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="btnRight">
          <el-button
            type="primary"
            icon="view"
            @click="add_teadata()"
          >增加教师数据</el-button>
          <el-button
            type="primary"
            icon="view"
            @click="delete_teadata()"
          >删除</el-button>

          <el-popover
            ref="popover1"
            placement="right"
            width="400"
            trigger="click">
            <el-table :data="teaData">
              <el-table-column width="100" property="name" label="姓名"></el-table-column>
              <el-table-column width="100" property="age" label="年龄"></el-table-column>
              <el-table-column width="150" property="position" label="职位"></el-table-column>
              <el-table-column width="180" property="academy" label="学院"></el-table-column>
            </el-table>
          </el-popover>
          <el-button
            type="primary"
            icon="view"
            style="margin-top: 20px;margin-left: 0px;"
            v-popover:popover1
            @click="show_teadata()"
          >查看</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 教师区域块结束 -->

    <!-- 学生区域块 -->
    <div class="stu_region">
      <span class="title">学生接口如下:</span>
      <el-form ref="stu_form" :model="stu_form" class="stu_form" label-width="80px" label-position="left">
        <el-form-item label="学号:">
          <el-input v-model="stu_form.stu_id"></el-input>
        </el-form-item>

        <el-form-item label="姓名:">
          <el-input v-model="stu_form.name"></el-input>
        </el-form-item>

        <el-form-item label="年级:">
          <el-select v-model="stu_form.grade" placeholder="请选择以下年级">
            <el-option label="2018" value="2018"></el-option>
            <el-option label="2017" value="2017"></el-option>
            <el-option label="2016" value="2016"></el-option>
            <el-option label="2015" value="2015"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学院">
          <el-select v-model="stu_form.academy" placeholder="请选择以下学院">
            <el-option 
            v-for="item in academys" 
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="专业:">
          <el-input v-model="stu_form.major"></el-input>
        </el-form-item>

        <el-form-item label="班级:" >
          <el-input v-model="stu_form.class" placeholder="例如： 1班"></el-input>
        </el-form-item>

        <el-form-item label="课程:" >
          <el-input v-model="stu_form.courses" placeholder="多个课程如下:软件工程导论,java开发,计算机原理"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            icon="view"
            @click="add_studata()"
          >增加学生数据</el-button>
          <el-button
            type="primary"
            icon="view"
            @click="delete_studata()"
          >删除</el-button>

          <el-popover
            ref="popover2"
            placement="right"
            width="400"
            trigger="click">
            <el-table :data="stuData">
              <el-table-column width="80" property="name" label="姓名"></el-table-column>
              <el-table-column width="150" property="stu_id" label="学号"></el-table-column>
              <el-table-column width="100" property="grade" label="年级"></el-table-column>
              <el-table-column width="180" property="academy" label="学院"></el-table-column>
              <el-table-column width="100" property="major" label="专业"></el-table-column>
              <el-table-column width="100" property="class" label="班级"></el-table-column>
              <el-table-column width="300" property="courses" label="课程"></el-table-column>
              
            </el-table>
          </el-popover>
          <el-button
            type="primary"
            icon="view"
            style="margin-top: 20px;margin-left: 0px;"
            v-popover:popover2
            @click="show_studata()"
          >查看</el-button>
        </el-form-item>

      </el-form>
    </div>
    <!-- 学生区域块结束 -->

    <!-- 课程区域块 -->
    <div class="course_region">
      <span class="title">课程接口如下:</span>
      <el-form ref="cou_form" :model="cou_form" class="cou_form" label-width="80px" label-position="left">

        <el-form-item label="课程名称:">
          <el-input v-model="cou_form.name"></el-input>
        </el-form-item>

        <el-form-item label="授课教师:">
          <el-input v-model="cou_form.teacher_name"></el-input>
        </el-form-item>

        <el-form-item label="年级:">
          <el-select v-model="cou_form.grade" placeholder="请选择以下年级">
            <el-option label="2018" value="2018"></el-option>
            <el-option label="2017" value="2017"></el-option>
            <el-option label="2016" value="2016"></el-option>
            <el-option label="2015" value="2015"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="推荐教材:">
          <el-input v-model="cou_form.book_command"></el-input>
        </el-form-item>


        <el-form-item>
          <el-button
            type="primary"
            icon="view"
            @click="add_coudata()"
          >增加课程数据</el-button>
          <el-button
            type="primary"
            icon="view"
            @click="delete_coudata()"
          >删除</el-button>

          <el-popover
            ref="popover3"
            placement="right"
            width="400"
            trigger="click">
            <el-table :data="couData">
              <el-table-column width="150" property="name" label="课程名称"></el-table-column>
              <el-table-column width="100" property="teacher_name" label="教师"></el-table-column>
              <el-table-column width="100" property="grade" label="年级"></el-table-column>
              <el-table-column width="300" property="book_command" label="推荐教材"></el-table-column>
              
            </el-table>
          </el-popover>
          <el-button
            type="primary"
            icon="view"
            style="margin-top: 20px;margin-left: 0px;"
            v-popover:popover3
            @click="show_coudata()"
          >查看</el-button>
        </el-form-item>

      </el-form>
    </div>
    <!-- 课程区域块结束 -->

    <!-- 教材信息区域块 -->
    <div class="books_region">
      <span class="title">教材信息接口接口如下:</span>
      <el-form ref="books_form" :model="books_form" class="books_form" label-width="80px" label-position="left">

        <el-form-item label="教材名称:">
          <el-input v-model="books_form.name"></el-input>
        </el-form-item>

        <el-form-item label="出版社:">
          <el-input v-model="books_form.publish_house"></el-input>
        </el-form-item>

        <el-form-item label="单价:">
          <el-input v-model="books_form.price"></el-input>
        </el-form-item>


        <el-form-item>
          <el-button
            type="primary"
            icon="view"
            @click="add_bookdata()"
          >增加教材数据</el-button>
          <el-button
            type="primary"
            icon="view"
            @click="delete_bookdata()"
          >删除</el-button>

          <el-popover
            ref="popover4"
            placement="right"
            width="400"
            trigger="click">
            <el-table :data="bookData">
              <el-table-column width="100" property="textbook_id" label="教材编号"></el-table-column>
              <el-table-column width="150" property="name" label="教材名称"></el-table-column>
              <el-table-column width="150" property="publish_house" label="出版社"></el-table-column>
              <el-table-column width="100" property="price" label="单价"></el-table-column>
              
            </el-table>
          </el-popover>
          <el-button
            type="primary"
            icon="view"
            style="margin-top: 20px;margin-left: 0px;"
            v-popover:popover4
            @click="show_bookdata()"
          >查看</el-button>
        </el-form-item>

      </el-form>
    </div>
    <!-- 教材信息区域块结束 -->
  </div>
</template>
<script>
export default {
  name: "datainc",
  data() {
    return {
      //   教师表单数据
      form: {
        name: "",
        age: 0,
        position: "",
        academy: ""
      },
      // 学生表单数据
      stu_form: {
      },
      // 课程表单数据
      cou_form: {
      },
      // 教材信息数据
      books_form: {

      },

      // 服务器获取数据
      teaData: [],
      stuData: [],
      couData: [],
      bookData: [],
      //学院信息
      academys: [
          {
              label: "计算机与信息科学学院",
              value: "计算机与信息科学学院"
          },
          {
              label: "食品学院",
              value: "食品学院"
          },
          {
              label: "材料学院",
              value: "材料学院"
          },
          {
              label: "法学院",
              value: "法学院"
          },
          {
              label: "音乐学院",
              value: "音乐学院"
          },
          {
              label: "美术学院",
              value: "美术学院"
          },
          {
              label: "文学院",
              value: "文学院"
          },
          {
              label: "资源环境学院",
              value: "资源环境学院"
          },
          {
              label: "外语学院",
              value: "外语学院"
          }
      ] 
    };
  },
  methods: {
    // 增加该条教师数据
    add_teadata(){

        // 向后台数据库发出请求
        this.$axios.post("/api/data/addTeacher",this.form)
        .then(res => {
            // 存储数据成功
            this.$message({
                type: "success",
                message: "存储教师成功"
            })
        })
    },

    // 删除指定教师数据
    delete_teadata(){
        this.$prompt('请输入教师姓名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
            this.$axios.delete(`/api/data/deltea`,{data:{name: value}})
            .then(res => {
                console.log(res+"已经删除");
                this.$message({
                type: 'success',
                message: '你删除的学号为: ' + value
                });
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },

    // 查看教师数据
    show_teadata(){
      this.$axios.get("/api/data/teaData")
      .then(res => {
        this.teaData = res.data;
      })
    },

    // 增加学生数据
    add_studata(){

        // 向后台数据库发出请求
        this.$axios.post("/api/data/addStudent",this.stu_form)
        .then(res => {
            // 存储数据成功
            this.$message({
                type: "success",
                message: "存储学生成功"
            })
        })
    },

    // 删除学生数据
    delete_studata(){
        this.$prompt('请输入学号', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
            this.$axios.delete(`/api/data/delstu`,{data:{id: value}})
            .then(res => {
                console.log(res+"已经删除");
                this.$message({
                type: 'success',
                message: '你删除的学生学号为: ' + value
                });
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },

    // 查看学生数据
    show_studata(){
      this.$axios.get("/api/data/stuData")
      .then(res => {
        this.stuData = res.data.map(item => {
          var tempCourses = [];
          item.courses.forEach((item, index) => {
            tempCourses.push(item.name);
          })
          item.courses = tempCourses.join(",");
          return item;
        });
      })
    },

    // 增加课程数据
    add_coudata(){
        // 向后台数据库发出请求
        this.$axios.post("/api/data/addCourse",this.cou_form)
        .then(res => {
            // 存储数据成功
            this.$message({
                type: "success",
                message: "存储课程成功"
            })
        })
    },

    // 删除指定课程数据
    delete_coudata(){
        this.$prompt('请输入课程名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
            this.$axios.delete(`/api/data/delcou`,{data:{name: value}})
            .then(res => {
                console.log(res+"已经删除");
                this.$message({
                type: 'success',
                message: '你删除的课程名称为: ' + value
                });
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },

    // 查看课程数据
    show_coudata(){
      this.$axios.get("/api/data/couData")
      .then(res => {
        this.couData = res.data;
      })
    },

    // 增加指定教材数据
    add_bookdata(){
      // 向后台数据库发出请求
      if (Object.keys(this.books_form).length === 0) {
        alert('当前所填数据不能为空')
        return
      }
      this.$axios.post("/api/data/addBooks",this.books_form)
      .then(res => {
        // 存储数据成功
        this.$message({
            type: "success",
            message: "存储课程成功"
        })
      })
    },

    // 删除指定教材数据
    delete_bookdata(){
        this.$prompt('请输入教材名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
            this.$axios.delete(`/api/data/delbook`,{data:{name: value}})
            .then(res => {
                console.log(res+"已经删除");
                this.$message({
                type: 'success',
                message: '你删除的教材名称为: ' + value
                });
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },

    // 查看教材数据
    show_bookdata(){
      this.$axios.get("/api/data/bookData")
      .then(res => {
        this.bookData = res.data;
      })
    }

  }
};
</script>

<style scoped>
.title {
  width: 200px;
  height: 30px;
  font-size: 18px;
  font-family: "Microsoft YaHei";
  margin-left: 40px;
  margin-top: 40px;
  display: block;
}
.datainc {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
}


.tea_form,.cou_form,.books_form{
  margin-left: 40px;
  width: 320px;
  padding: 20px;
  border-radius: 5px;
  /* height: 600px;    */
  border: 1px solid #ccc;
}

/* 学生区域样式 */
.stu_form{
  margin-left: 40px;
  width: 350px;
  padding: 20px;
  border-radius: 5px;
  /* height: 600px;    */
  border: 1px solid #ccc;
}

/* 扩展样式
.el-form-item__content:nth-of-type(5){
  margin-left: 0px !important;
} */
</style>
