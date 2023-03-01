<template>
  <div class="hb-form">
    <el-form
      ref="hbFormRef"
      :size="form.size ?? 'medium'"
      :rules="form.rules"
      :model="formData"
      :disabled="form.disabled"
      :inline="form.inline"
      :label-position="form.labelPosition ?? 'right'"
      :label-width="form.labelWidth ?? '68px'"
      :show-message="form.showMessage"
      :inline-message="form.inlineMessage"
      :status-icon="form.statusIcon"
      :hide-required-asterisk="form.hideRequiredAsterisk">
      <template v-for="item in form.list">
        <el-form-item :key="item.prop" :label="item.label" :prop="item.prop" v-if="item.type === 'text' && (item.show ?? true)">
          <el-input
            type="text"
            v-model="formData[item.prop]"
            :size="item.size"
            :maxlength="item.maxlength"
            :show-word-limit="item.showWordLimit"
            :disabled="item.disabled"
            :clearable="item.clearable"
            :prefix-icon="item.prefixIcon"
            :suffix-icon="item.suffixIcon"
            :placeholder="item.placeholder ?? '请输入' + item.label">
          </el-input>
        </el-form-item>
        <el-form-item :key="item.prop" :label="item.label" :prop="item.prop" v-if="item.type === 'number' && (item.show ?? true)">
          <el-input-number
            v-model.number="formData[item.prop]"
            controls-position="right"
            :size="item.size"
            :disabled="item.disabled"
            :min="item.min"
            :max="item.max"
            :step="item.step"
            :step-strictly="item.stepStrictly"
            :precision="item.precision"
            :controls="item.controls"
            :placeholder="item.placeholder ?? '请输入' + item.label">
          </el-input-number>
        </el-form-item>
        <el-form-item :key="item.prop" :label="item.label" :prop="item.prop" v-if="item.type === 'password' && (item.show ?? true)">
          <el-input
            type="password"
            v-model="formData[item.prop]"
            :size="item.size"
            :disabled="item.disabled"
            :clearable="item.clearable"
            :prefix-icon="item.prefixIcon"
            :suffix-icon="item.suffixIcon"
            :show-password="item.showPassword"
            :placeholder="item.placeholder ?? '请输入' + item.label">
          </el-input>
        </el-form-item>
        <el-form-item :key="item.prop" :label="item.label" :prop="item.prop" v-if="item.type === 'textarea' && (item.show ?? true)">
          <el-input
            type="textarea"
            v-model="formData[item.prop]"
            :size="item.size"
            :rows="item.rows"
            :resize="item.resize"
            :autosize="item.autosize"
            :maxlength="item.maxlength"
            :show-word-limit="item.showWordLimit"
            :disabled="item.disabled"
            :clearable="item.clearable"
            :placeholder="item.placeholder ?? '请输入' + item.label">
          </el-input>
        </el-form-item>
        <el-form-item :key="item.prop" :label="item.label" :prop="item.prop" v-if="item.type === 'select' && (item.show ?? true)">
          <el-select
            v-model="formData[item.prop]"
            :size="item.size"
            :multiple="item.multiple"
            :disabled="item.disabled"
            :clearable="item.clearable"
            :filterable="item.filterable"
            :allow-create="item.allowCreate"
            :collapse-tags="item.collapseTags"
            :collapse-tags-tooltip="item.collapseTagsTooltip"
            :placeholder="item.placeholder ?? '请选择' + item.label">
            <template v-for="childItem in item.options">
              <el-option
                :key="childItem.value"
                :label="childItem.label"
                :value="childItem.value"
                :disabled="childItem.disabled">
              </el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item :key="item.prop" :label="item.label" :prop="item.prop" v-if="item.type === 'radio' && (item.show ?? true)">
          <el-radio-group
            v-model="formData[item.prop]"
            :size="item.size"
            :text-color="item.textColor ?? '#fff'"
            :fill="item.fill ?? '#409EFF'"
            :disabled="item.disabled">
            <template v-for="childItem in item.list">
              <el-radio
                v-if="!item.radioButton"
                :key="childItem.value"
                :label="childItem.value"
                :size="childItem.size"
                :border="childItem.border"
                :disabled="childItem.disabled">
                {{childItem.label}}
              </el-radio>
              <el-radio-button
                v-if="item.radioButton"
                :key="childItem.value"
                :label="childItem.value"
                :size="childItem.size"
                :disabled="childItem.disabled">
                {{childItem.label}}
              </el-radio-button>
            </template>
          </el-radio-group>
        </el-form-item>
        <el-form-item :key="item.prop" :label="item.label" :prop="item.prop" v-if="item.type === 'checkbox' && (item.show ?? true)">
          <el-checkbox-group
            v-model="formData[item.prop]"
            :size="item.size"
            :min="item.min"
            :max="item.max"
            :text-color="item.textColor ?? '#fff'"
            :fill="item.fill ?? '#409EFF'"
            :disabled="item.disabled"
            style="height: 40px;">
            <template v-for="childItem in item.list">
              <el-checkbox
                v-if="!item.checkboxButton"
                :border="childItem.border"
                :key="childItem.label"
                :label="childItem.label"
                :checked="childItem.checked"
                :true-label="childItem.trueLabel"
                :false-label="childItem.falseLabel"
                :disabled="childItem.disabled">
              </el-checkbox>
              <el-checkbox-button
                v-if="item.checkboxButton"
                :key="childItem.label"
                :label="childItem.label"
                :checked="childItem.checked"
                :true-label="childItem.trueLabel"
                :false-label="childItem.falseLabel"
                :disabled="childItem.disabled">
              </el-checkbox-button>
            </template>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :key="item.prop" :label="item.label" :prop="item.prop" v-if="item.type === 'switch' && (item.show ?? true)">
          <el-switch
            v-model="formData[item.prop]"
            :disabled="item.disabled"
            :loading="item.loading"
            :size="item.size"
            :width="item.width"
            :active-icon="item.activeIcon"
            :inactive-icon="item.inactiveIcon"
            :active-text="item.activeText"
            :inactive-text="item.inactiveText"
            :active-value="item.activeValue"
            :inactive-value="item.inactiveValue"
            :style="item.style">
          </el-switch>
        </el-form-item>
        <el-form-item :key="item.prop" :label="item.label" :prop="item.prop" v-if="item.type === 'cascader' && (item.show ?? true)">
          <el-cascader
            v-model="formData[item.prop]"
            :size="item.size"
            :props="item.props"
            :options="item.options"
            :disabled="item.disabled"
            :clearable="item.clearable"
            :collapse-tags="item.collapseTags"
            :collapse-tags-tooltip="item.collapseTagsTooltip"
            :separator="item.separator ?? '/'"
            :filterable="item.filterable"
            :show-all-levels="item.showAllLevels ?? true"
            :placeholder="item.placeholder ?? '请选择' + item.label">
          </el-cascader>
        </el-form-item>
        <el-form-item :key="item.prop" :label="item.label" :prop="item.prop" v-if="[ 'month', 'date', 'datetime', 'daterange', 'datetimerange'].includes(item.type) && (item.show ?? true)">
          <el-date-picker
            v-model="formData[item.prop]"
            :type="item.type"
            :size="item.size"
            :disabled="item.disabled"
            :editable="item.editable"
            :clearable="item.clearable"
            :format="item.format"
            :range-separator="item.rangeSeparator"
            :value-format="item.valueFormat ?? (['month', 'date', 'daterange'].includes(item.type) ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss')"
            :placeholder="item.placeholder ?? '请选择' + item.label"
            :start-placeholder="item.startPlaceholder ?? '请选择' + item.label + '开始时间'"
            :end-placeholder="item.endPlaceholder ?? '请选择' + item.label + '结束时间'">
          </el-date-picker>
        </el-form-item>
        <el-form-item :key="item.prop" :label="item.label" :prop="item.prop" v-if="item.type === 'editor' && (item.show ?? true)">
          <div class="wangEditor">
            <Toolbar
              style="border-bottom: 1px solid rgb(220, 223, 230);"
              :editor="editor"
              :defaultConfig="item.toolbarConfig ?? toolbarConfig"
            />
            <Editor
              :style="{'height': item.height ?? '300px'}"
              v-model="formData[item.prop]"
              :defaultConfig="item.editorConfig ?? editorConfig"
              @onCreated="onCreated"
            />
          </div>
        </el-form-item>
        <el-form-item :key="item.event" v-if="['primary', 'success', 'info', 'warning', 'danger', 'default'].includes(item.type) && (item.show ?? true)">
          <el-button
            :type="item.type"
            :size="item.size ?? 'small'"
            :plain="item.plain"
            :round="item.round"
            :circle="item.circle"
            :icon="item.icon"
            :link="item.link"
            :color="item.color"
            :loading="item.loading"
            :disabled="item.disabled"
            @click="handleEvent(item.event)">
            {{item.text}}
          </el-button>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

  export default {
    name: 'HbForm',
    components: {
      Editor,
      Toolbar
    },
    props: {
      form: Object,
      formData: Object
    },
    data() {
      return {
        formValidateResult: true,
        editor: null,
        toolbarConfig: {},
        editorConfig: {
          placeholder: '请输入...',
          readonly: false,
          autoFocus: false,
          maxLength: 0,
          MENU_CONF: {
            uploadImage: {
              base64LimitSize: 10000 * 1024
            }
          }
        }
      }
    },
    methods: {
      formValidate() {
        this.formValidateResult = true
        this.$refs.hbFormRef.validate((valid, fields) => {
          this.formValidateResult = valid
        })
      },
      handleEvent(event) {
        this.$refs.hbFormRef.validate((valid, fields) => {
          this.$emit(event, valid, fields)
        })
      },
      formReset() {
        this.$refs.hbFormRef.resetFields();
      },
      onCreated(editor) {
        this.editor = Object.seal(editor)
      },
      getContent(type) {
        return type === 'text' ? this.editor.getText() : this.editor.getHtml();
      },
      setContent(html) {
        this.editor.setHtml(html)
      }
    }
  }
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="less" scoped>
  .hb-form{padding: 16px;}
  .el-form-item{margin-bottom: 16px;}
  :deep(.el-input-number .el-input__inner){text-align: left;}
  :deep(.el-textarea__inner){padding: 10px 15px;}
  .el-range-editor{width: 400px !important;}
  .el-date-editor .el-range-input{width: 45%;}
</style>
<style lang="less">
  .wangEditor{border: 1px solid rgb(220, 223, 230);
    .w-e-text-placeholder{line-height: 1.5 !important;font-style: normal;}
    h1{display: block;font-size: 2em;margin-block-start: 0.67em;margin-block-end: 0.67em;margin-inline-start: 0px;margin-inline-end: 0px;font-weight: bold;}
    h2{display: block;font-size: 1.5em;margin-block-start: 0.83em;margin-block-end: 0.83em;margin-inline-start: 0px;margin-inline-end: 0px;font-weight: bold;}
    h3{display: block;font-size: 1.17em;margin-block-start: 1em;margin-block-end: 1em;margin-inline-start: 0px;margin-inline-end: 0px;font-weight: bold;}
    h4{display: block;margin-block-start: 1.33em;margin-block-end: 1.33em;margin-inline-start: 0px;margin-inline-end: 0px;font-weight: bold;}
    h5{display: block;font-size: 0.83em;margin-block-start: 1.67em;margin-block-end: 1.67em;margin-inline-start: 0px;margin-inline-end: 0px;font-weight: bold;}
  }
</style>