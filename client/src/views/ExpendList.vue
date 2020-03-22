<template>
  <div class="expendlist">
        <div class="table_region">
            <h2 class="title">教材费用明细：</h2>
            <el-table
                v-if="book_mes.length > 0"
                class="tableContent"
                :data="book_mes"
                style="width: 94%"
                show-summary
                stripe
                border
                >
                <el-table-column
                type="index"
                label="序号"
                width="50">
                </el-table-column>
                <el-table-column
                prop="name"
                label="课程名称"
                width="120">
                </el-table-column>
                <el-table-column
                prop="teaName"
                label="任课教师"
                width="100">
                </el-table-column>
                <el-table-column
                prop="book_command"
                label="教材名称"
                width="160">
                </el-table-column>
                <el-table-column
                prop="price"
                label="单价">
                </el-table-column>
            </el-table>
        </div>
        <div class="chart layout" id="chart">

        </div>
  </div>
</template>
<script>

// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default {
    name: "expendlist",
    inject: ["reload"], //注入reload方法
    data() {
        return {
            // 教材信息
            book_mes: [],

            // 图表信息
            chart_arr: []
        };
     },
    methods: {
     
    },
    mounted() {
        // 获取权限
        // const role = localStorage.role;
        // if(role !== "student"){
        //   // 页面跳转
        //   this.$router.push("/teacherview");
        // }
        // vuex获取学号
        const schoolNum = this.$store.getters.user.schoolNum;
        // 向后台数据库发出请求
        this.book_mes = this.$axios
        .get("api/data/single_stuData", {
            params: {
                schoolNum: schoolNum
            }
        })
        .then(data => {
            // 声明临时对象(用于图表)
            var tempObj = {};

            console.log("已经成功获取到教材信息数据:");
            this.book_mes = data.data[0].courses;

            //过滤掉未订购的课程
            this.book_mes = this.book_mes.filter((item) => {
             return item.ifOrder == true;
            })
            console.log(this.book_mes);

            // 转换为图表数据
            this.book_mes.forEach((data) => {
                tempObj.value = data.price;
                tempObj.name = data.name;
                this.chart_arr.push(tempObj);
                tempObj = {};
            })
                
            // });

            // 加载图表
            var myChart = echarts.init(document.getElementById("chart"));

            myChart.setOption({
                title: {
                    text: "教材费用占比饼状图",
                    padding: 10
                    // link: "http://www.baidu.com"   主标题超链接
                },
                series: [
                    {
                        name: '教材占比',
                        type: 'pie',
                        radius: '55%',
                        itemStyle: {
                            normal: {
                                // 阴影的大小
                                shadowBlur: 200,
                                // 阴影水平方向上的偏移
                                shadowOffsetX: 0,
                                // 阴影垂直方向上的偏移
                                shadowOffsetY: 0,
                                // 阴影颜色
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        data: this.chart_arr,
                        label: {
                            show: true,
                            // position: "inside"
                        },
                        emphasis:{
                            label:{
                                show: true,
                                position: "inside"
                            }
                        }
                        
                    }
                ]
            })
        })
    }
};
</script>
<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .expendlist{
        display: flex;
        width: 100%;
        height: 100%;
        position: relative;
        background: rgb(228, 224, 224);
        padding: 20px 20px 0px 20px;
    }
    .table_region,.chart{
        /* display: inline-block; */
        margin-right: 30px;
        width: 45%;
        height: 90%;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 0 10px #ccc;
        box-sizing: border-box;
    }

    .layout{
        display: flex;
        justify-content: space-around;
        padding: 10px;
    }

    
    

    .title{
        margin: 20px 0 0 20px;
        font-size: 18px;
        font-family: "YouYuan";
    }

    /* 表格区域 */
    .tableContent{
        margin: 10px 0 0 20px;
    }

    /* 方形图界面 */
    /* .cell{
        width: 140px;
        height: 70px;
        border: 1px solid #ccc;
    } */
</style>