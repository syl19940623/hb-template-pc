<template>
  <transition name="dialog-fade">
    <div class="hb-dialog-mask" v-if="show">
      <div class="hb-dialog-main" ref="main" :style="mainStyle">
        <div class="hb-dialog-head">
          <h1 class="hb-dialog-title">{{title}}</h1>
          <i v-if="showClose" class="hb-dialog-close el-icon-close" @click="close"></i>
        </div>
        <div class="hb-dialog-body" :style="bodyHeight">
          <div class="hb-dialog-content" v-if="content">
            {{content}}
          </div>
          <template v-else>
            <slot name="vNode"></slot>
          </template>
        </div>
        <div class="hb-dialog-foot" v-if="btn.length > 0">
          <template v-for="(item, index) in btn">
            <el-button :type="(btn.length > 1 && index === 0) ? '' : 'primary'" size="small" :key="item" @click="handleClick(index)">{{item}}</el-button>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'HbDialog',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: 'auto'
      },
      height: {
        type: String,
        default: 'auto'
      },
      title: {
        type: String,
        default: '提示'
      },
      showClose: {
        type: Boolean,
        default: true
      },
      content: String,
      btn: {
        type: Array,
        default() {
          return ['确定']
        }
      },
      clickFirstBtnAutoClose: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      mainStyle() {
        return {
          width: this.width,
          height: this.height
        }
      },
      bodyHeight() {
        if (this.height !== 'auto') {
          const dialogHeight = this.height.indexOf('%') !== -1 ? '100%' : this.height
          const topAndBotHeight = this.btn.length === 0 ? '48px' : '96px'
          return {
            height: 'calc(' + dialogHeight + ' - ' + topAndBotHeight + ')'
          }
        }
      }
    },
    methods: {
      close() {
        this.$emit('close')
        this.$emit('update:show', false)
      },
      handleClick(index) {
        if (index === 0 && this.clickFirstBtnAutoClose) {
          this.close()
        } else {
          this.$emit('operate' + index)
        }
      }
    },
    watch: {
      show(newVal, oldVal) {
        if (!newVal) {
          this.$emit('end')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .hb-dialog-mask{width: 100%;height: 100%;position: fixed;top: 0;left: 0;background: rgba(0,0,0,.6);z-index: 1994;
    .hb-dialog-main{min-width: 360px;background: #fff;border-radius: 2px;box-shadow: 0 0 4px 1px rgba(0,0,0,.1);position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);
      .hb-dialog-head{height: 48px;border-bottom: 1px solid var(--border-color);padding: 0 16px;font-weight: bold;
        .hb-dialog-title{float: left;line-height: 48px;}
        .hb-dialog-close{float: right;line-height: 48px;font-size: 16px;cursor: pointer;
          &:hover{color: var(--primary);}
        }
      }
      .hb-dialog-body{min-height: 100px;overflow-y: auto;
        .hb-dialog-content{padding: 20px 16px;}
      }
      .hb-dialog-foot{padding: 0 16px 16px;text-align: right;
        .el-button{margin-left: 12px;}
      }
    }
  }
</style>