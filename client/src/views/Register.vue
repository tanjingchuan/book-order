<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">教材订购系统</span>
      </div>
      <el-form
        :model="registerUser"
        :rules="rules"
        class="registerForm"
        ref="registerForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerUser.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="school">
          <el-input v-model="registerUser.school" placeholder="请输入学校名称"></el-input>
        </el-form-item>
        <el-form-item label="校园网账号" prop="schoolNum">
          <el-input v-model="registerUser.schoolNum" placeholder="请输入校园网账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerUser.password" placeholder="确保密码为校园网账号密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="选择身份">
          <el-select v-model="registerUser.identity" placeholder="请选择身份">
            <el-option label="教师" value="teacher"></el-option>
            <el-option label="学生" value="student"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注 册</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  username: "register",
  data() {
    // var validatePass2 = (rule, value, callback) => {
    //   if (value !== this.registerUser.password) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      registerUser: {
        username: "",
        school: "",
        schoolNum: "",
        password: "",
        identity: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        school: [
          {
            type: "string",
            required: true,
            message: "学校名称不正确",
            trigger: "blur"
          }
        ],
        schoolNum: [
          {
            type: "string",
            required: true,
            message: "学号不正确",
            trigger: "blur"
          },
          {min: 6,max: 20,message: "该学号不符合规范",trigger: "blur"}
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ]
        // password2: [
        //   { required: true, message: "确认密码不能为空", trigger: "blur" },
        //   {
        //     min: 6,
        //     max: 30,
        //     message: "长度在 6 到 30 个字符",
        //     trigger: "blur"
        //   },
        //   { validator: validatePass2, trigger: "blur" }
        // ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/register", this.registerUser)
            .then(res => {
              // 注册成功
              this.$message({
                message: "注册成功！",
                type: "success"
              });
              this.$router.push("/login");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>


<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/login_bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 50%;
  margin-left: -185px;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #1f68c7;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>



