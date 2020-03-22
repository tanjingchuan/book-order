<template>
        <div class="headnav">
            <!-- 顶部信息 -->
            <el-row class="top">
                <el-col :span="6" class="font_div">
                    <img src="../assets/font.png" alt="">
                </el-col>
                <el-col :span="6" class="info_person">  
                    <!-- <i class="el-icon-arrow-down arrow_right"></i> -->
                    <el-dropdown class="drop_down" @command="handleCommand">
                        <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="infoshow">个人信息</el-dropdown-item>
                            <el-dropdown-item command="logout">登出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span class="username">{{user.username}}</span>
                    <img :src="user.avatar" alt="" class="avatar">
                </el-col>
            </el-row>
        </div>
    </template>
    
    <script>
        export default {
            name: "overview",
            computed:{
                user(){
                    return this.$store.getters.user;
                }
            },
            methods: {
                handleCommand(command){
                    switch(command){
                        case "logout":
                            // 清空缓存
                            console.log("你好", command)
                            localStorage.removeItem("eletoken");
                            // 清除store中状态
                            this.$store.dispatch("clearCurrentState");
                            // 跳转到登录页面
                            this.$router.push("/login");
                            break;
                        case "infoshow":
                            this.$message("个人信息")
                            break;
                        
                    }
                }
            }
        };
    
    </script>
    <style scoped>
        *{
            margin: 0;
            padding: 0;
        }
        /* .headnav{
            width: 100%;
            height: 100%;
        } */
        .font_div{
            margin-left: 195px;
            margin-top: 5px;
        }
        .top{
            position: relative;
            width: 100%;
            height: 60px;
            border:1px solid #ccc;
            background-color: #fff;
        }
        .info_person{
            padding: 10px 0 20px 0;
            position: absolute;
            right: 0;
            font-size: 20px;
            font-family: "Microsoft YaHei";
        }
        /* 头像信息 */
        .avatar{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: inline-block;
            float: right;
        }
        /* 用户名称 */
        .username{
            display: inline-block;
            float: right;
            line-height: 34px;
            margin-left: 10px;
        }
        .arrow_right{
            float: right;
            font-size: 14px;
            margin-right: 30px;
            line-height: 36px;
            margin-left: 12px;
        }
    
        /* 下拉菜單 */
        .drop_down{
            float:right;
        }
    
        .el-icon-arrow-down{
            font-size: 14px;
            margin-right: 30px;
            line-height: 36px;
            margin-left: 12px;
        }
    
        .el-dropdown-link {
            cursor: pointer;
            color: #409EFF;
        }
    </style>
          
          