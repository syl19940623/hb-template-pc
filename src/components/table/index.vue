<template>
  <div class="hb-table-wrapper">
    <!-- 搜索条件 -->
    <div class="toolbar" ref="toolbarRef" v-if="toolbar">
      <div v-if="data.toolbarList">
        <ul>
          <template v-for="item in data.toolbarList">
            <li v-if="item.type === 'text' && (item.show ?? true)" :key="item.prop">
              <el-input
                size="medium"
                v-model="data.toolbarData[item.prop]"
                :clearable="item.clearable"
                :placeholder="'请输入' + item.label">
              </el-input>
            </li>
            <li v-if="item.type === 'select' && (item.show ?? true)" :key="item.prop">
              <el-select
                size="medium"
                v-model="data.toolbarData[item.prop]"
                :clearable="item.clearable"
                :filterable="item.filterable"
                :placeholder="'请输入' + item.label">
                <template v-for="childItem in item.options">
                  <el-option
                    :label="childItem.label"
                    :value="childItem.value"
                    :key="childItem.value"
                  />
                </template>
              </el-select>
            </li>
            <li v-if="item.type === 'cascader' && (item.show ?? true)" :key="item.prop">
              <el-cascader
                size="medium"
                v-model="data.toolbarData[item.prop]"
                :props="item.props"
                :options="item.options"
                :clearable="item.clearable"
                :collapse-tags="true"
                :collapse-tags-tooltip="true"
                :separator="item.separator ?? '/'"
                :filterable="item.filterable"
                :show-all-levels="item.showAllLevels ?? true"
                :placeholder="'请选择' + item.label">
              </el-cascader>
            </li>
            <li v-if="['month', 'date', 'datetime', 'daterange', 'datetimerange'].includes(item.type) && (item.show ?? true)" :key="item.prop">
              <el-date-picker
                size="medium"
                v-model="data.toolbarData[item.prop]"
                :type="item.type"
                :editable="false"
                :clearable="item.clearable"
                :range-separator="item.rangeSeparator"
                :value-format="item.valueFormat ?? (['month', 'date', 'daterange'].includes(item.type) ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss')"
                :placeholder="'请选择' + item.label"
                :start-placeholder="'请选择' + item.label + '开始时间'"
                :end-placeholder="'请选择' + item.label + '结束时间'">
              </el-date-picker>
            </li>
            <li v-if="['primary', 'success', 'info', 'warning', 'danger', 'default'].includes(item.type) && (item.show ?? true)" :key="item.prop">
              <el-button
                size="small"
                :type="item.type"
                :icon="item.icon"
                @click="handleToolbarEvent(item.event)">
                {{item.text}}
              </el-button>
            </li>
          </template>
        </ul>
      </div>
      <slot name="toolbar" v-else></slot>
    </div>
    <!-- 表格 -->
    <div class="hb-table">
      <el-table
        ref="hbTableRef"
        v-loading="loading"
        :size="size"
        :border="border"
        :row-key="rowKey"
        :data="data.bodyData"
        :show-summary="showSummary"
        :sum-text="summaryText"
        :summary-method="summaryMethod"
        :highlight-current-row="true"
        :height="calcHeightResult"
        :row-class-name="rowClassName"
        @row-click="rowClick"
        @selection-change="selectionChange">
        <!-- 第一列 -->
        <el-table-column
          v-if="firstColumnType === 'index'"
          label="序号"
          width="55"
          fixed="left"
          :align="align"
          :header-align="align"
          :type="firstColumnType">
          <template slot-scope="scope">
            <span>{{(pageNum - 1) * pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="['selection', 'expand'].includes(firstColumnType)"
          width="55"
          fixed="left"
          :align="align"
          :header-align="align"
          :type="firstColumnType">
        </el-table-column>
        <!-- 中间 -->
        <template v-for="item in data.headData">
          <el-table-column
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :fixed="item.fixed ?? false"
            :sortable="item.sortable"
            :formatter="item.format"
            :align="item.align ?? align"
            :header-align="item.align ?? align"
            :show-overflow-tooltip="true">
            <template v-for="childItem in item.children">
              <el-table-column
                :key="childItem.prop"
                :prop="childItem.prop"
                :label="childItem.label"
                :width="childItem.width"
                :fixed="childItem.fixed ?? false"
                :sortable="childItem.sortable"
                :formatter="childItem.format"
                :align="childItem.align ?? align"
                :header-align="childItem.align ?? align"
                :show-overflow-tooltip="true">
              </el-table-column>
            </template>
          </el-table-column>
        </template>
        <!-- 最后一列 -->
        <el-table-column
          v-if="bar"
          label="操作"
          ref="barRef"
          fixed="right"
          :width="barWidth"
          :align="align"
          :header-align="align">
          <template slot-scope="scope">
            <template v-for="item in data.barList">
              <template v-if="convertIf(scope.row, item.if)">
                <el-popconfirm :key="item.event" :title="item.confirmText ?? '您确定要删除本条数据吗?'" @confirm="handleBarEvent(item.event, scope.row, scope.$index)" v-if="item.confirm">
                  <el-link :type="item.type" slot="reference">
                    {{item.text}}
                  </el-link>
                </el-popconfirm>
                <el-link
                  v-else
                  :key="item.event"
                  :type="item.type"
                  @click="handleBarEvent(item.event, scope.row, scope.$index)">
                  {{item.text}}
                </el-link>
              </template>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="page" ref="pageRef" v-if="page">
      <el-pagination
        :currentPage="pageNum"
        :page-size="pageSize"
        :page-sizes="pageSizeArr"
        :total="data.count"
        :layout="pageLayout"
        @size-change="pageSizeChange"
        @current-change="pageNumChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HbTable',
    props: {
      toolbar: {
        type: Boolean,
        default: false
      },
      bar: {
        type: Boolean,
        default: false
      },
      page: {
        type: Boolean,
        default: false
      },
      pageLayout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
      },
      border: {
        type: Boolean,
        default: true
      },
      align: {
        type: String,
        default: 'center'
      },
      size: {
        type: String,
        default: 'medium'
      },
      rowKey: {
        type: String,
        default: 'id_prikey'
      },
      height: {
        type: String,
        default: 'full'
      },
      firstColumnType: String,
      data: Object,
      loading: {
        type: Boolean,
        default: false
      },
      currentRow: {
        type: Number,
        default: -1
      },
      showSummary: {
        type: Boolean,
        default: false
      },
      summaryText: {
        type: String,
        default: '合计'
      },
      summaryMethod: Function
    },
    data() {
      return {
        pageNum: 1,
        pageSize: 20,
        pageSizeArr: [10, 20, 30, 50, 100, 200, 300, 500],
        calcHeightResult: null,
        barWidth: 0,
        allCheckedRows: []
      }
    },
    methods: {
      rowClassName({row, rowIndex}) {
        if (rowIndex === this.currentRow) {
          return 'current-row';
        }
        return '';
      },
      handleToolbarEvent(event) {
        if (event === 'search') {
          this.pageNum = 1
        }
        if (this.firstColumnType === 'selection') {
          this.$emit(event, this.allCheckedRows)
        } else {
          this.$emit(event)
        }
      },
      selectionChange(selection) {
        this.allCheckedRows = selection
      },
      rowClick(row, column, event) {
        this.$emit('rowClick', row, column, event)
      },
      pageNumChange(pageNum) {
        this.pageNum = pageNum
        this.$emit('loadTable', this.pageNum, this.pageSize)
      },
      pageSizeChange(pageSize) {
        this.pageNum = 1
        this.pageSize = pageSize
        this.$emit('loadTable', this.pageNum, this.pageSize)
      },
      handleBarEvent(event, data, index) {
        this.$emit(event, data, index)
      },
      convertIf(row, expression) {
        if (expression) {
          if (expression.indexOf('==') !== -1) {
            const expressionArr = expression.split('==')
            return row[expressionArr[0].trim()] == expressionArr[1].trim();
          } else if (expression.indexOf('!=') !== -1) {
            const expressionArr = expression.split('!=')
            return row[expressionArr[0].trim()] != expressionArr[1].trim();
          }
        } else {
          return true;
        }
      }
    },
    mounted() {
      if (this.height.indexOf('full') !== -1) {
        const toolbarHeight = this.toolbar ? this.$refs.toolbarRef.clientHeight + 1 : 0
        const pageHeight = this.page ? this.$refs.pageRef.clientHeight : 0
        const totalHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        let calcHeight = totalHeight - toolbarHeight - pageHeight - 32
        if (this.height.indexOf('-') !== -1) {
          calcHeight = calcHeight - this.height.split('-')[1]
        }
        this.calcHeightResult = calcHeight
      } else {
        this.calcHeightResult = this.height
      }

      if (this.bar && this.data.barList) {
        const len = this.data.barList.length
        this.barWidth = Math.max(len * 48 + (len - 1) * 16 + 32, 100)
      }
    }
  }
</script>

<style lang="less">
  .hb-table-wrapper{
    .toolbar{padding: 16px 16px 0;border-bottom: 1px solid var(--border-color);
      ul{overflow: hidden;
        li{max-width: 192px;float: left;margin-right: 16px;margin-bottom: 16px;
          .el-button{margin-top: 2px;}
        }
      }
    }
    .hb-table{padding: 16px;
      .el-table{
        thead .cell{color: rgba(0,0,0,.85);}
        th.el-table__cell{background: #FAFAFA;}
        .el-checkbox{vertical-align: text-top;}
        .current-row td.el-table__cell{background: rgba(0,33,64,.05);}
        .el-link+.el-link,.el-link+span,span+.el-link,span+span{margin-left: 16px;}
      }
      .el-loading-mask{background: rgba(0,0,0,.7);}
    }
    .page{padding: 0 16px 16px;text-align: right;}
  }
  .el-popconfirm__main{margin: 14px 0;}
  .el-table--border .el-table__cell:first-child .cell{padding: 0;}
</style>