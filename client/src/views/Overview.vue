<template>
  <div class="overview">
    <!-- 顶部信息 -->
    <el-row class="top">
      <div class="top_title">
        <img src="../assets/book_logo.png" alt class="book_logo">
        <span class="title">教材订购总览</span>
      </div>
      <el-row class="top_content" type="flex" justify="space-around" align="middle">
        <el-col :span="6" class="module_data data_bg0">
          <div class="show_data">
            <h5 class="data_num">{{allCourse.length}}</h5>
            <span class="data_name">总课程</span>
          </div>
        </el-col>
        <el-col :span="6" class="module_data data_bg1">
          <div class="show_data">
            <h5 class="data_num">{{allCourse.length}}</h5>
            <span class="data_name">需教材课程</span>
          </div>
        </el-col>
        <el-col :span="6" class="module_data data_bg2">
          <div class="show_data">
            <h5 class="data_num">{{allCourse.length-book_nonorder.length}}</h5>
            <span class="data_name">已订购教材课程</span>
          </div>
        </el-col>
        <el-col :span="6" class="module_data data_bg3">
          <div class="show_data">
            <h5 class="data_num">{{book_nonorder.length}}</h5>
            <span class="data_name">未订购教材课程</span>
          </div>
        </el-col>
      </el-row>
    </el-row>

    <!-- 下方表格信息 -->
    <div class="table_des">
      <img src="../assets/book_logo.png" class="book_logo">
      <span class="title">未订购教材课程概况</span>
    </div>
    <div class="bottom_left">
      <el-table
        :data="book_nonorder"
        style="width: 100%;"
        stripe
        height="300"
        border
        class="table_data"
      >
        <el-table-column align="center" type="index" label="序号" width="180"></el-table-column>

        <el-table-column align="center" prop="name" label="未订购教材课程" width="220"></el-table-column>

        <el-table-column align="center" prop="teaName" label="任课老师" width="220"></el-table-column>

        <el-table-column align="center" prop="deadline" label="截止日期" width="220"></el-table-column>

        <el-table-column prop="operation" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="warning" icon="edit" size="small" @click="onBuying(scope.row)">前往订购</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "overview",
  data() {
    return {
      // 未订购教材信息
      book_nonorder: [],
      // 教材课程数据
      allCourse: [],
      data_bg: ["background: linear-gradient(left top ,#6676ff,#35bafd);"]
    };
  },
  methods:{
    // 前往订购触发函数
    onBuying(row){
      this.$router.push({path: "/bookorder?name=" + row.name});
    }
  },
  // created
  mounted() {
    // 获取权限
    const role = localStorage.role;
    if(role !== "student"){
      // 页面跳转
      this.$router.push("/teacherview");
      return
    }
    // vuex获取学号
    const schoolNum = this.$store.getters.user.schoolNum;
    // 向后台数据库发出请求
    this.$axios
      .get("api/data/single_stuData", {
        params: {
          schoolNum: schoolNum
        }
      })
      .then(data => {
        console.log("已经成功获取到教材信息数据:");
        this.allCourse =  data.data[0].courses
        this.book_nonorder = data.data[0].courses.filter(item => {
          return item.ifOrder == false;
        });
        console.log(this.book_nonorder);
      });
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.overview {
  position: relative;
  width: 100%;
  height: 100%;
  background: #ececec;
  background-attachment: fixed;
}
.top {
  position: relative;
  width: 100%;
  height: 230px;
  /* border:1px solid #ccc; */
}
/* 书籍小logo 和 说明文字*/
.top_title {
  position: relative;
  margin: 10px 0 0 10px;
}

.book_logo {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}

.title {
  width: 200px;
  height: 30px;
  font-size: 18px;
  font-family: "Microsoft YaHei";
  /* font-weight: 540; */
}

/* 订购总览 */
.top_content {
  position: relative;
  width: 100%;
  height: 170px;
  /* border: 1px solid #ccc; */
}

/* 四个数据模块 */
.module_data {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 120px;
  border-radius: 15px;
}
.data_bg0 {
  background: linear-gradient(to left top, #6676ff, #35bafd);
}
.data_bg1 {
  background: linear-gradient(to left top, #ff928b, #fe6989);
}
.data_bg2 {
  background: linear-gradient(to left bottom, #09afe9, #2ef59a);
}
.data_bg3 {
  background: linear-gradient(to left bottom, #727cff, #fa82ec);
}

.show_data {
  width: 140px;
  height: 50px;
  text-align: center;
}
.data_num {
  font-size: 26px;
  font-family: "Microsoft YaHei";
  color: #fff;
  margin-bottom: 10px;
}
.data_name {
  font-size: 16px;
  font-family: "Microsoft YaHei";
  color: #fff;
}

/* 左下角未订购教材表格 */
.bottom_left {
  position: relative;
  padding: 30px;
  border-radius: 10px;
  width: 80%;
  height: 280px;
  margin: 20px 40px 0 58px;
  background: #fff;
}
.table_data {
  border-radius: 10px;
}
.table_des {
  margin: 10px 0 10px 10px;
}
/* logo大小 */
.el-icon-document {
  width: 40px;
  height: 40px;
}
</style>
      
      