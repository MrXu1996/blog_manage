<template>
  <div>
    <quill-editor
      class="editor"
      ref="articleEditor"
      v-model="articleForm.content"
      :options="editorOption"
    >
    </quill-editor>
  </div>
</template>

<script>
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
Quill.register("modules/ImageExtend", ImageExtend);
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

export default {
  components: { quillEditor },
  name: "Quill",
  props: {
    articleForm: {
      type: Object,
    },
  },
  data() {
    return {
      editorOption: {
        modules: {
          imageDrop: true, //图片拖拽
          imageResize: {
            //放大缩小
            displaySize: true,
          },
          ImageExtend: {
            // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入
            name: "img", // 图片参数名
            size: 3, // 可选参数 图片大小，单位为M，1M = 1024kb
            action: "http://127.0.0.1:9090/api/articles/img", // 服务器地址, 如果action为空，则采用base64插入图片
            // response 为一个函数用来获取服务器返回的具体图片地址
            // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
            // 则 return res.data.url
            response: (res) => {
              return res.img
            },
            headers: (xhr) => {
              xhr.setRequestHeader('Authorization', window.sessionStorage.getItem('eleToken'))
            }, // 可选参数 设置请求头部
            success: () => {
            }, // 可选参数  上传成功触发的事件
            
          },
          toolbar: {
            container: container,
            handlers: {
              image: function () {
                QuillWatch.emit(this.quill.id);
              },
            },
          }, //工具菜单栏配置
        },
        readyOnly: false, //是否只读
        theme: "snow", //主题 snow/bubble
        syntax: true, //语法检测
      },
    };
  },
  methods: {
    handleSuccess(res) {
      console.log("111");
      // 获取富文本组件实例
      let quill = this.$refs.articleEditor.quill;
      // 如果上传成功
      if (res) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, "image", res);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        // 提示信息，需引入Message
        Message.error("图片插入失败");
      }
    },
  },
};
</script>

<style scoped>
.editor {
  line-height: normal !important;
  height: 300px;
}
</style>