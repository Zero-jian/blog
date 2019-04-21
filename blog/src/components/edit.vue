<template>
    <div class="edit_container">
        <quill-editor 
            v-model="logo" 
            ref="myQuillEditor" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
        <!-- <button @click="btn">点击我进行数据传输</button> -->
        <div @click="btn()">
          <slot name="btn"></slot>
        </div>
    </div>
</template>
<style scoped>
.edit_container {
  max-width: 1012px;
  margin: 0 auto;
}

button {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin-top: 12px;
  border: none;
  background: #66c656;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #3eb83e;
}
</style>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  components: {
    quillEditor
  },
  props: ["speak", "answer", "message"],
  data() {
    return {
      content: "",
      logo: "",
      editorOption: {
        toolbarOptions: [
          [
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "code-block",
            { header: 1 },
            { header: 2 },
            { list: "ordered" },
            { list: "bullet" },
            { script: "sub" },
            { script: "super" },
            { indent: "-1" },
            { indent: "+1" },
            { direction: "rtl" },
            { size: ["small", false, "large", "huge"] },
            { header: [1, 2, 3, 4, 5, 6, false] },
            { color: [] },
            { background: [] },
            { font: [] },
            { align: [] },
            "clean"
          ]
        ]
      }
    };
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {
      //   this.$emit("close", this.logo);
    }, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    btn() {
      if (this.message == 1) {
        this.$emit("msg", this.logo);
      } else {
        this.$emit("close", this.logo);
      }
      // alert(this.logo);
      // alert(this.answer);
    },
    clearText() {
      this.logo = "";
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {},
  watch: {
    answer() {
      this.logo = this.answer;
    }
  }
};
</script>
