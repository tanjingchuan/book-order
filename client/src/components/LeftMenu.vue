<!-- <template>
    <el-row class="menu_page">
         <el-col>
             <el-menu
                mode="vertical"
                background-color="#324057"
                text-color="#fff"
                active-text-color="#409eff" 
                class="el-menu-vertical-demo">
                <router-link to="/home">
                    <el-menu-item index="0">
                        <i class="fa fa-margin fa-server"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                </router-link>
                <template  v-for="item in items" >
                    <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                        <template slot="title">
                            <i :class="'fa fa-margin '+item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </template>
                        <router-link v-for="(citem,cindex) in item.children" 
                            :to="citem.path" :key="cindex">
                            <el-menu-item 
                                :index='citem.path'>
                                <span slot="title">{{citem.name}}</span>
                            </el-menu-item> 
                        </router-link>
                    </el-submenu>
                    
                </template>
             </el-menu>
         </el-col>
    </el-row>
</template>
<script>
export default {
  name: "leftmenu",
  data() {
    return {
      items: [
        {
          icon: "fa-money",
          name: "资金管理",
          path: "fund",
          children: [{ path: "foundlist", name: "资金流水" }]
        },
        {
          icon: "fa-asterisk",
          name: "信息管理",
          path: "info",
          children: [{ path: "infoshow", name: "个人信息" }]
        }
      ]
    };
  }
};
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style> -->

<template>
  <el-row class="menu_page">
    <el-col>
      <h5 class="title">教材订购系统</h5>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#3d445e"
        text-color="#fff"
        >
        <!-- 教材总览区域 -->
        <router-link to="/overview">
          <el-menu-item index="1" class="menu_list">
            <template slot="title">
              <i class="fa fa-book fa-lg"></i>
              <span>个人总览</span>
            </template> 
          </el-menu-item>
        </router-link>

        <!-- 教材订购区域块 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="fa fa-credit-card"></i> 
            <span slot="title">教材订购</span>
          </template> 
          <el-menu-item-group>
              <!-- <template slot="title">分组一</template> -->
              <router-link to="/bookorder">
                <el-menu-item index="1-1">未订购区域</el-menu-item>
              </router-link>
              <router-link to="/bookorderach">
                <el-menu-item index="1-2">已订购区域</el-menu-item>
              </router-link>
            </el-menu-item-group>
        </el-submenu>

        <router-link to="/teacherview">
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">教师通道</span>
          </el-menu-item>
        </router-link>

        <!-- 教材费用域块 -->
        <router-link to="/expendlist">
          <el-menu-item index="4">
            <i class="el-icon-document"></i>
            <span slot="title">费用明细</span>
          </el-menu-item>
        </router-link>

        <router-link to="/bookevaluate">
          <el-menu-item index="5">
            <i class="el-icon-document"></i>
            <span slot="title">教材评价</span>
          </el-menu-item>
        </router-link>

        <router-link to="/datainc">
          <el-menu-item index="6">
            <i class="el-icon-setting"></i>
            <span slot="title">数据添加接口</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default{
  name: "leftmenu",
  data(){
    return {
      Courses_taken: ["计算机组成原理","java程序设计","软件工程导论","大学英语"]
    }
  }
}
</script>
<style scoped>
  a{
    text-decoration: none;
  }
  .el-menu {
    border: none;
  }
  .menu_page{
    position: fixed;
    /* top: 71px; */
    min-height: 100%;
    height: 300px;
    background-color: #3d445e;
    text-align: center;
    z-index: 99;
  }
  .title{
    margin-top: 28px;
    margin-bottom: 35px;
    font-size: 24px;
    color: #fff;
    font-family: "Microsoft YaHei";
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
  }
  .el-submenu .el-menu-item {
    min-width: 180px;
  }
  .hiddenDropdown,
  .hiddenDropname {
    display: none;
  }
  /* 图标样式 */
  .fa-credit-card,.fa-book{
    margin-right: 5px;
  }
  .course_list{
    text-align: left;
  }
 
  
</style>
