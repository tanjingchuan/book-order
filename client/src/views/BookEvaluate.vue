<style scoped>
  .main-container {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    position: relative;
    background: rgb(228, 224, 224);
    padding: 20px 20px 0px 20px;
  }
  .evaluate-wrap, .evaluate-content, .default {
    width: 45%;
    height: 90%;
    padding: 20px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px #ccc;
    box-sizing: border-box;
  }
  /* 评价弹窗 */
  .eva-dialog {
    min-height: 400px;
  }
  .rate {
    margin-top: -30px;
    margin: -30px 0 10px 0;
  }
  .submit-wrap {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .submit {
    width: 250px;
  }

  /* 无评价区域 */
  .default {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* 教材评价区域 */
  .eva-header {
    margin-bottom: 20px;
  }
  .eva-header > i {
    margin-right: 10px;
  }
  .eva-content-wrap {
    padding: 5px 0;
    margin-bottom: 10px;
    background: #f5f6fa;
    display: flex;
    width: 100%;
  }
  /* .eva-content-wrap:nth-child(2n+1) {
    background: #f1f2f6;
  } */
  .eva-content-wrap > i {
    flex: none;
    font-size: 40px;
    margin-right: 20px;
  }
  .eva-content-wrap > .eva-content {
    padding-top: 5px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .eva-content-wrap > .eva-content > .user {
    margin-bottom: 8px;
  }
  .eva-content-wrap > .eva-content > .content {
    margin-top: 8px;
  }
</style>
<template>
  <div class="main-container">
    <div class="evaluate-wrap">
      <el-table
        :data="evaluateData"
        style="width: 100%;"
        fit
        highlight-current-row
        border
      >
        <el-table-column
          prop="name"
          label="教材名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="publish_house"
          label="出版社"
          width="140">
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价"
          width="80">
        </el-table-column>
        <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button ref="evaluate" type="warning" icon="edit" size="small" @click="evaluateBook(scope.row)">评价</el-button>
              <el-button ref="surface" type="warning" icon="edit" size="small" @click="surfaceEv(scope.row)">查看</el-button>
            </template>
          </el-table-column>
      </el-table>
    </div>
    <!-- 评价弹窗 -->
    <el-dialog class="eva-dialog" title="发表评价" :visible.sync="popShow" width="40%">
      <el-rate
        class="rate"
        v-model="evaValue"
        show-text>
      </el-rate>
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入对教材使用过程中的感受"
        v-model="evaContent">
      </el-input>
      <div class="submit-wrap">
        <el-button class="submit" type="success" round @click="submitEva">
          提交
        </el-button>
      </div>
    </el-dialog>
    <div v-show="Object.keys(selectEvaItem.evaluate).length > 0" class="evaluate-content" >
      <div class="eva-header">
        <i class="el-icon-notebook-2"></i>
        <span>关于{{selectEvaItem.name}}的评价</span>
      </div>
      <div class="eva-content-wrap" v-for="(item, index) in selectEvaItem.evaluate" :key="index">
        <i class="el-icon-s-custom"></i>
        <div class="eva-content">
          <span class="user">{{item.userName}}</span>
          <el-rate
            :value="item.evaValue"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
          <span class="content">{{item.evaContent}}</span>
        </div>
      </div>
    </div>
    <div class="default" v-if="Object.keys(selectEvaItem.evaluate).length === 0">
      <div class="tip">暂无评价</div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: "bookorder",
    inject: ["reload"], //注入reload方法
    async created () {
      const data = await this.$axios.get('api/data/getBooks')
      this.evaluateData = data.data
      this.selectEvaItem = this.evaluateData[0] || {}
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      // 评价教材
      evaluateBook (row) {
        this.currentBook = row.name
        this.popShow = true
      },
      // 查看教材
      surfaceEv (row) {
        this.currentBook = row.name
        this.selectEvaItem = this.evaluateData.find(item => item.name === this.currentBook)
      },
      // 提交评价
      submitEva () {
        if (this.evaValue && this.evaContent) {
          this.popShow = false
          this.resetEvaluate()
          this.$axios.post('api/data/incEvaluate', {
            userName: this.user.username,
            bookName: this.currentBook,
            evaValue: this.evaValue,
            evaContent: this.evaContent
          }).then(() => {
            this.evaValue = 0,
            this.evaContent = ''
          })
        } else {
          this.$alert('评价分数以及内容不能为空')
        }
      },
      // 设置评论
      resetEvaluate () {
        const index = this.evaluateData.findIndex(item => item.name === this.currentBook)
        this.evaluateData[index].evaluate.push({
          username: this.user.username,
          evaValue: this.evaValue,
          evaContent: this.evaContent
        })
      },
    },
    data () {
      return {
        evaluateData: [], // 教材数据
        selectEvaItem: {}, // 右侧评价内容
        currentBook: '', // 选中的当前教材
        popShow: false, // 评价弹窗
        evaValue: null,
        evaContent: ''
      }
    }
};
</script>