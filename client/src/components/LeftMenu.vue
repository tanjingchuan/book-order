<template>
  <el-row class="menu_page">
    <el-col>
      <h5 class="title">教材订购系统</h5>
      <el-menu
        collapse-transition="true"
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        background-color="#3d445e"
        text-color="#fff"
        >
        <!-- 教材总览区域 -->
        <el-menu-item index="1" class="menu_list" @click="jumpUrl('1')">
          <template slot="title">
            <i class="fa fa-book fa-lg"></i>
            <span>个人总览</span>
          </template> 
        </el-menu-item>

        <!-- 教材订购区域块 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="fa fa-credit-card"></i> 
            <span slot="title">教材订购</span>
          </template> 
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="jumpUrl('2-1')">未订购区域</el-menu-item>
            <el-menu-item index="1-2" @click="jumpUrl('2-2')">已订购区域</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="3" @click="jumpUrl('3')" disable="true">
          <i class="el-icon-document"></i>
          <span slot="title">教师通道</span>
        </el-menu-item>
        

        <!-- 教材费用域块 -->
        <el-menu-item index="4" @click="jumpUrl('4')">
          <i class="el-icon-document"></i>
          <span slot="title">费用明细</span>
        </el-menu-item>

        <el-menu-item index="5" @click="jumpUrl('5')">
          <i class="el-icon-document"></i>
          <span slot="title">教材评价</span>
        </el-menu-item>

        <el-menu-item index="6" @click="jumpUrl('6')">
          <i class="el-icon-setting"></i>
          <span slot="title">数据添加接口</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default{
  name: "leftmenu",
  data () {
    return {
      role: '', // 当前用户角色
      activeIndex: 2,
      Courses_taken: ["计算机组成原理","java程序设计","软件工程导论","大学英语"]
    }
  },
  methods: {
    // 路由跳转
    jumpUrl (index) {
      let routeName = ''
      switch (index) {
        case '1':
          routeName = 'overview'
          break;
        case '2-1':
          routeName = 'bookorder'
          break;
        case '2-2':
          routeName = 'bookorderach'
          break;
        case '3':
          routeName = 'teacherview'
          break;
        case '4':
          routeName = 'expendlist'
          break;
        case '5':
          routeName = 'bookevaluate'
          break;
        case '6':
          routeName = 'datainc'
          break;
      }
      if (this.role === 'student' && (routeName === 'teacherview')) {
        this.$alert('抱歉，您无权限查看此页面', '权限提示');
        return
      }
      if (this.role === 'teacher' && !(routeName == 'teacherview' || routeName === 'bookevaluate')) {
        this.$alert('抱歉，您无权限查看此页面', '权限提示');
        return
      }
      this.$router.push(routeName)
    }
  },
  mounted () {
    this.role = localStorage.role || '';
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
