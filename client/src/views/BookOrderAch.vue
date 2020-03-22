<template>
  <div class="bookorder">
    <div class="showBook">
      <span class="title">未订购教材如下：</span>
      <el-table
        v-if="book_order.length > 0"
        :data="book_order"
        style="width: 100%;"
        stripe
        height="500"
        border
        class="table_data"
      >
        <el-table-column type="index" label="序号"></el-table-column>

        <el-table-column prop="name" label="未订购教材课程" width="160"></el-table-column>

        <el-table-column prop="teaName" label="任课老师" width="160"></el-table-column>

        <el-table-column prop="deadline" label="截止日期" width="160"></el-table-column>

        <el-table-column prop="book_command" label="老师推荐教材" width="160"></el-table-column>

        <el-table-column prop="price" label="教材单价" width="160"></el-table-column>

        <el-table-column prop="operation" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="edit" size="small" @click="cancel_message(scope.$index)">取消订购</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
    name: "bookorder",
    inject: ["reload"], //注入reload
    data() {
        return {
            // 表格数据
            book_order: []
        };
     },
    // computed: {
    //     // 未订购教材
    //     book_nonorder: function() {
    //     var books_nonorder = this.book_order.filter(item => {
    //         return item.ifOrder == false;
    //     });
    //     return books_nonorder.length;
    //     }
    // },
    methods: {
        // 重新获取表格数据
        getBook0rder(){
            var schoolNum = this.$store.getters.user.schoolNum;
            this.$axios.get("api/data/single_stuData", {
                schoolNum: schoolNum,
            }).then(data => {
                this.book_order = data.data[0].courses.filter((item) => {
                    return item.ifOrder == true;
                })
            })
        },
        // 点击订购时确认函数
        cancel_message(index) {
            this.$confirm("确认取消订购该教材吗", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                this.$message({
                    type: "success",
                    message: "取消订购成功!"
                });

                // vuex获取学号
                const schoolNum = this.$store.getters.user.schoolNum;

                // 获取到对应行课程
                var course = this.book_order[index];
                course.ifOrder = false;

                console.log(course);
                console.log(schoolNum);
                // 向后端数据库发出请求
                this.$axios.post("api/data/edit_stuData", {
                    schoolNum: schoolNum,
                    course: course
                }).then(data => {
                    this.reload();
                    console.log(data);
                })
                
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "您已取消订购"
                });
            });
        }
    },
    mounted() {
        // 获取权限
        const role = localStorage.role;
        if(role !== "student"){
          // 页面跳转
          this.$router.push("/teacherview");
        }
        // vuex获取学号
        const schoolNum = this.$store.getters.user.schoolNum;
        // 向后台数据库发出请求
        this.book_order = this.$axios
        .get("api/data/single_stuData", {
            params: {
                schoolNum: schoolNum
            }
        })
        .then(data => {
            console.log("已经成功获取到教材信息数据:");
            this.book_order = data.data[0].courses;
            
            //过滤掉未订购的课程
            this.book_order = this.book_order.filter((item) => {
             return item.ifOrder == true;
            })
            console.log(this.book_order);
        });
    }
};
</script>
<style scoped>
.bookorder {
  padding: 20px;
  width: 100%;
  height: 100%;
  background: #ececec;
}
.showBook {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  height: 520px;
  margin: 20px;
  border: 1px solid #ccc;
}
.title {
  display: inline-block;
  margin-bottom: 20px;
}
</style>