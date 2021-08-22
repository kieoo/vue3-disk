<template>
  <div>
    <DxFileManager
        :file-system-provider="remoteProvider"
        :on-selected-file-opened="displayImagePopup"
        current-path="Widescreen"
        :customize-detail-columns="fileManager_customizeDetailColumns"
        :customize-thumbnail="customizeIcon"
    >
      <DxPermissions
          :create="true"
          :copy="true"
          :move="true"
          :delete="true"
          :rename="true"
          :upload="true"
          :download="true"
      />
    </DxFileManager>

    <DxPopup
        :close-on-outside-click="true"
        v-model:visible="popupImageVisible"
        v-model:title="imageItemToDisplay.name"
        max-height="1000"
        min-height="10"
        class="photo-popup-content">
          <img :src="imageItemToDisplay.url" class="photo-popup-image" />
    </DxPopup>

    <DxPopup
          :close-on-outside-click="true"
          v-model:visible="popupVideoVisible"
          v-model:title="imageItemToDisplay.name"
          max-height="1000px"
          min-height="10"
          class="photo-popup-content">
      <DxScrollView height="100%">
            <vue-player-video
              :src="imageItemToDisplay.url"
              theme="gradient"
              class="popup-video">
            </vue-player-video>
       </DxScrollView>
    </DxPopup>

    <DxPopup
        :close-on-outside-click="true"
        v-model:visible="popupTxTVisible"
        v-model:title="imageItemToDisplay.name">
      <DxScrollView
          :scroll-by-content="false"
          :scroll-by-thumb="true"
          show-scrollbar="onScroll"
          :bounce-enabled="false"
      >
        <div class="txt" style="white-space:pre-wrap;">{{ txtContent }} </div>
      </DxScrollView>
    </DxPopup>

    <DxPopup
        :close-on-outside-click="true"
        v-model:visible="popupPDFVisible"
        v-model:title="imageItemToDisplay.name">
      <DxScrollView
          :scroll-by-content="false"
          :scroll-by-thumb="true"
          show-scrollbar="onScroll"
          :bounce-enabled="false"
      >
        <vue-pdf-embed :source="imageItemToDisplay.url" />
      </DxScrollView>
    </DxPopup>

  </div>
</template>

<script>
import { DxFileManager, DxPermissions } from 'devextreme-vue/file-manager';
import { DxPopup } from 'devextreme-vue/popup';
import { DxScrollView } from "devextreme-vue/scroll-view";
import RemoteFileSystemProvider from 'devextreme/file_management/remote_provider';

import 'video.js/dist/video-js.css'
import VuePlayerVideo from 'vue3-player-video'

import VuePdfEmbed from 'vue-pdf-embed'

import axios from "axios"

const remoteProvider = new RemoteFileSystemProvider({
  // endpointUrl: 'https://js.devexpess.com/Demos/Mvc/api/file-manager-file-system-images'
  endpointUrl: "/api/file-manager"
});

export default {
  name: "VueDisk",
  components: {
    DxFileManager,
    DxPermissions,
    DxPopup,
    DxScrollView,
    VuePlayerVideo,
    VuePdfEmbed
  },

  data() {
    return {
      remoteProvider,
      popupImageVisible: false,
      popupVideoVisible: false,
      popupTxTVisible: false,
      popupPDFVisible: false,
      txtContent: '',
      imageItemToDisplay: {
        name: "",
        url: ""
      }
    }
  },

  methods: {
    displayImagePopup(e) {

      this.imageItemToDisplay = {
        name: e.file.name,
        url: e.file.dataItem.url
      };
      if (this.check_is_img(e.file.name)) {
         this.popupImageVisible = true;
       }
      if (this.check_is_video(e.file.name)) {
        this.popupVideoVisible = true;
      }

      if (this.check_is_txt(e.file.name)) {
        this.popupTxTVisible = true;
        const url = this.imageItemToDisplay.url
        axios.get(url, {
          responseType: 'text'
        }).then(res => {
          this.txtContent = res.data
        })
      }

      if (this.check_is_pdf(e.file.name)) {
        this.popupPDFVisible = true;
      }
    },

    fileManager_customizeDetailColumns(e) {
      console.log("time time...")
      const columns = e.slice();
      columns.find((c) => c.dataField === "dateModified").format = "yyyy-MM-dd HH:mm:ss";
      return columns;
    },

    customizeIcon: function(fileSystemItem) {
        if(fileSystemItem.isDirectory) {
          return 'folder';
        }

        const fileExtension = fileSystemItem.getFileExtension().toLowerCase();
        if (this.check_is_txt(fileExtension)) {
          return 'txtfile';
        }

        if (this.check_is_img(fileExtension)) {
          return 'image';
        }

      if (this.check_is_video(fileExtension)) {
        return 'video';
      }
    },
    check_is_img(name) {
      return (name.match(/\.(bmp|jpg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|wmf|jpeg)/i)!= null)
    },

    check_is_video(name) {
      return (name.match(/\.(FLV|AVI|MOV|MP4|WMV)/i)!= null)
    },

    check_is_txt(name) {
      return (name.match(/\.(txt|json)/i)!= null)
    },

    check_is_pdf(name) {
      return (name.match(/\.(pdf)/i)!= null)
    }
  }
}
</script>

<style>
.photo-popup-content {
  text-align: center;
}
.photo-popup-content .photo-popup-image  {
  max-height: 100%;
  max-width: 100%;
}
.photo-popup-image {
  display: inline-block;
}

.photo-popup-content .popup-video  {
  max-height: 80%;
  max-width: 70%;
}
.popup-video {
  display: inline-block;
  text-align: center;
  line-height: 1px;
  /*border: 5px solid transparent;*/
  /*border-radius: 4px;*/
  /*overflow: visible;*/
  background: #30b479;
  position: relative;
  /*box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);*/
}
/*.video_text:hover{*/
/*  display: block;*/
/*}*/
</style>
