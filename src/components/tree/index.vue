<template>
  <div class="hb-tree">
    <el-input v-if="search" :id="id + 'Kw'" v-model="treeKw" placeholder="请输入关键词" size="medium"></el-input>
    <div :id="id" class="ztree"></div>
  </div>
</template>

<script>
  import './ztree/jquery-1.4.4.min.js';
  import './ztree/jquery.ztree.all.min.js';
  import './ztree/jquery.ztree.exhide.min.js';
  import fuzzySearch from './ztree/fuzzysearch.js';
  
  export default {
    name: 'HbTree',
    props: {
      search: {
        type: Boolean,
        default: false
      },
      id: {
        type: String,
        default: 'hbTree'
      },
      idKey: {
        type: String,
        default: 'value'
      },
      pIdKey: {
        type: String,
        default: 'pId'
      },
      nameKey: {
        type: String,
        default: 'label'
      },
      childrenKey: {
        type: String,
        default: 'children'
      },
      urlKey: {
        type: String,
        default: 'url'
      },
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      async: Object,
      check: Object,
      edit: Object,
      defaultExpandAll: {
        type: Boolean,
        default: false
      },
      highlight: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        treeKw: '',
        zTree: null
      }
    },
    methods: {
      boolInit(boolDefault, bool) {
        bool = bool ?? boolDefault;
        return bool;
      },
      hbTreeInit() {
        const setting = {
          data: {
            simpleData: {
              enable: true,
              idKey: this.idKey,
              pIdKey: this.pIdKey,
              rootPId: ''
            },
            key: {
              name: this.nameKey,
              children: this.childrenKey,
              url: this.urlKey
            }
          },
          async: {
            enable: false,
            type: 'post',
            headers: {},
            contentType: 'application/json',
            url: '',
            autoParam: [],
            otherParam: {},
            dataFilter: function (treeId, parentNode, responseData) {
              return responseData;
            }
          },
          check: {
            enable: false,
            autoCheckTrigger: false,
            chkStyle: 'checkbox',
            chkboxType: {'Y': 'ps', 'N': 'ps'},
            nocheckInherit: false,
            chkDisabledInherit: false,
            radioType: 'level'
          },
          edit: {
            enable: false,
            editNameSelectAll: true,
            removeTitle: '删除',
            renameTitle: '修改',
            showRemoveBtn: false,
            showRenameBtn: false,
            drag: {
              autoExpandTrigger: false,
              isCopy: true,
              isMove: true,
              prev: true,
              next: true,
              inner: true,
              borderMin: -10,
              borderMax: 10,
              minMoveSize: 5,
              maxShowNodeNum: 5,
              autoOpenTime: 500
            }
          },
          callback: {
            beforeCheck: (treeId, treeNode) => {
              let bool = true
              this.$emit('beforeCheck', treeId, treeNode, res => {
                bool = res
              })
              return bool;
            },
            beforeClick: (treeId, treeNode, clickFlag) => {
              let bool = this.getNodeByParam(this.idKey, 'new') === null
              this.$emit('beforeClick', treeId, treeNode, clickFlag, res => {
                bool = res
              })
              return bool;
            },
            beforeDblClick: (treeId, treeNode) => {
              let bool = true
              this.$emit('beforeDblClick', treeId, treeNode, res => {
                bool = res
              })
              return bool;
            },
            beforeDrag: (treeId, treeNodes) => {
              let bool = true
              this.$emit('beforeDrag', treeId, treeNodes, res => {
                bool = res
              })
              return bool;
            },
            beforeDrop: (treeId, treeNodes, targetNode, moveType) => {
              let bool = true
              this.$emit('beforeDrop', treeId, treeNodes, targetNode, moveType, res => {
                bool = res
              })
              return bool;
            },
            beforeRemove: (treeId, treeNode) => {
              let bool = true
              this.$emit('beforeRemove', treeId, treeNode, res => {
                bool = res
              })
              return bool;
            },
            beforeRightClick: (treeId, treeNode) => {
              let bool = true
              this.$emit('beforeRightClick', treeId, treeNode, res => {
                bool = res
              })
              return bool;
            },
            onAsyncError: (event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) => {
              this.$emit('onAsyncError', event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown)
            },
            onAsyncSuccess: (event, treeId, treeNode, msg) => {
              this.$emit('onAsyncSuccess', event, treeId, treeNode, msg)
            },
            onCheck: (event, treeId, treeNode) => {
              this.$emit('onCheck', event, treeId, treeNode)
            },
            onClick: (event, treeId, treeNode, clickFlag) => {
              this.$emit('onClick', event, treeId, treeNode, clickFlag)
            },
            onDblClick: (event, treeId, treeNode) => {
              this.$emit('onDblClick', event, treeId, treeNode)
            },
            onDrag: (event, treeId, treeNodes) => {
              this.$emit('onDrag', event, treeId, treeNodes)
            },
            onDragMove: (event, treeId, treeNodes) => {
              this.$emit('onDragMove', event, treeId, treeNodes)
            },
            onDrop: (event, treeId, treeNodes, targetNode, moveType, isCopy) => {
              this.$emit('onDrop', event, treeId, treeNodes, targetNode, moveType, isCopy)
            },
            onExpand: (event, treeId, treeNode) => {
              this.$emit('onExpand', event, treeId, treeNode)
            },
            onNodeCreated: (event, treeId, treeNode) => {
              this.$emit('onNodeCreated', event, treeId, treeNode)
            },
            onRemove: (event, treeId, treeNode) => {
              this.$emit('onRemove', event, treeId, treeNode)
            },
            onRightClick: (event, treeId, treeNode) => {
              this.$emit('onRightClick', event, treeId, treeNode)
            }
          }
        }
        setting.async = this.async
        setting.check = this.check
        setting.edit = this.edit
        if (this.async && this.async.enable) {
          $.fn.zTree.init($('#' + this.id), setting);
        } else {
          $.fn.zTree.init($('#' + this.id), setting, this.data);
        }
        this.zTree = $.fn.zTree.getZTreeObj(this.id);
        this.zTree.expandAll(this.defaultExpandAll);
        if (this.search) {
          fuzzySearch(this.id, '#' + this.id + 'Kw', this.highlight, this.defaultExpandAll);
        }
      },
      addNodes(parentNode, newNodes, isSilent) {
        return this.zTree.addNodes(parentNode, newNodes, isSilent);
      },
      cancelEditName(newName) {
        this.zTree.cancelEditName(newName);
      },
      cancelSelectedNode(node) {
        this.zTree.cancelSelectedNode(node);
      },
      checkAllNodes(checked) {
        this.zTree.checkAllNodes(checked);
      },
      checkNode(node, checked, checkedTypeFlag, callbackFlag) {
        callbackFlag = this.boolInit(false, callbackFlag);
        this.zTree.checkNode(node, checked, checkedTypeFlag, callbackFlag);
      },
      copyNode(targetNode, node, moveType, isSilent) {
        return this.zTree.copyNode(targetNode, node, moveType, isSilent);
      },
      destroy() {
        this.zTree.destroy();
      },
      editName(node) {
        this.zTree.editName(node);
      },
      expandAll(expandFlag) {
        return this.zTree.expandAll(expandFlag);
      },
      expandNode(node, expandFlag, sonSign, focus, callbackFlag) {
        sonSign = this.boolInit(false, sonSign);
        focus = this.boolInit(true, focus);
        callbackFlag = this.boolInit(false, callbackFlag);
        return this.zTree.expandNode(node, expandFlag, sonSign, focus, callbackFlag);
      },
      getChangeCheckedNodes() {
        return this.zTree.getChangeCheckedNodes();
      },
      getCheckedNodes(checked) {
        checked = this.boolInit(true, checked);
        return this.zTree.getCheckedNodes(checked);
      },
      getNodeByParam(key, value, parentNode) {
        return this.zTree.getNodeByParam(key, value, parentNode);
      },
      getNodeByTId(tId) {
        return this.zTree.getNodeByTId(tId);
      },
      getNodeIndex(node) {
        return this.zTree.getNodeIndex(node);
      },
      getNodes() {
        return this.zTree.getNodes();
      },
      getNodesByFilter(filter, isSingle, parentNode, invokeParam) {
        isSingle = this.boolInit(false, isSingle);
        return this.zTree.getNodesByFilter(filter, isSingle, parentNode, invokeParam);
      },
      getNodesByParam(key, value, parentNode) {
        return this.zTree.getNodesByParam(key, value, parentNode);
      },
      getNodesByParamFuzzy(key, value, parentNode) {
        return this.zTree.getNodesByParamFuzzy(key, value, parentNode);
      },
      getSelectedNodes() {
        return this.zTree.getSelectedNodes();
      },
      hideNode(node) {
        this.zTree.hideNode(node);
      },
      hideNodes(nodes) {
        this.zTree.hideNodes(nodes);
      },
      moveNode(targetNode, node, moveType, isSilent) {
        return this.zTree.moveNode(targetNode, node, moveType, isSilent);
      },
      reAsyncChildNodes(parentNode, reloadType, isSilent, callback) {
        this.zTree.reAsyncChildNodes(parentNode, reloadType, isSilent, callback);
      },
      reAsyncChildNodesPromise(parentNode, reloadType, isSilent) {
        return this.zTree.reAsyncChildNodes(parentNode, reloadType, isSilent);
      },
      refresh() {
        this.zTree.refresh();
      },
      removeChildNodes(parentNode) {
        return this.zTree.removeChildNodes(parentNode);
      },
      removeNode(node, callbackFlag) {
        callbackFlag = this.boolInit(false, callbackFlag);
        this.zTree.removeNode(node, callbackFlag);
      },
      selectNode(node, addFlag, isSilent) {
        addFlag = this.boolInit(false, addFlag);
        isSilent = this.boolInit(false, isSilent);
        this.zTree.selectNode(node, addFlag, isSilent);
      },
      setChkDisabled(node, disabled, inheritParent, inheritChildren) {
        disabled = this.boolInit(false, disabled);
        inheritParent = this.boolInit(false, inheritParent);
        inheritChildren = this.boolInit(false, inheritChildren);
        this.zTree.setChkDisabled(node, disabled, inheritParent, inheritChildren);
      },
      setEditable(editable) {
        this.zTree.setEditable(editable);
      },
      showNode(node) {
        this.zTree.showNode(node);
      },
      showNodes(nodes) {
        this.zTree.showNodes(nodes);
      },
      transformToArray(nodes) {
        return this.zTree.transformToArray(nodes);
      },
      transformTozTreeNodes(nodes) {
        return this.zTree.transformTozTreeNodes(nodes);
      },
      updateNode(node, checked) {
        checked = this.boolInit(true, checked);
        this.zTree.updateNode(node, checked);
      },
      getCheckStatus(node) {
        return node.getCheckStatus();
      },
      getPreNode(node) {
        return node.getPreNode();
      },
      getNextNode(node) {
        return node.getNextNode();
      },
      getParentNode(node) {
        return node.getParentNode();
      }
    },
    watch: {
      data: {
        handler(newVal, oldVal) {
          this.$nextTick(() => {
            this.hbTreeInit()
          })
        },
        immediate: true,
        deep: true
      }
    }
  }
</script>

<style lang="less" scoped>
  @import './ztree/zTreeStyle.css';
  .hb-tree{padding: 16px;
    .el-input{margin-bottom: 12px;position: sticky;top: 0;z-index: 9;}
    .ztree{padding: 0;
      a{box-sizing: initial;}
    }
  }
</style>