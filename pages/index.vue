<template>
  <div :style="'background-color: ' + chroma(targetColor).alpha(0.2).hex() + ' !important'">
    <b-navbar toggleable="lg" type="dark" variant="info" :style="'background-color: ' + chroma(targetColor).hex() + ' !important'">
      <b-navbar-brand href="/">Marshmallow Cooker</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="false">
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              お問い合わせ
            </template>
            <b-dropdown-item href="//twitter.com/coldflyingcats">作者Twitter</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    
    <b-container class="my-4">
      <b-row>
        <b-col lg='8'>
          <b-row class="mb-4">
            <b-col>
              <div ref="container">
                <v-stage :config="configKonva">
                  <v-layer ref="subLayer">
                    <!-- <v-circle :config="configCircle"></v-circle> -->
                    <v-image ref="mashImgSub" :config="{
                      image: currentFile ? currentFile.image : null,
                    }"/>
                  </v-layer>
                  <v-layer ref="resultLayer">
                    <v-rect :config="{
                      width: currentFile ? currentFile.width : 0,
                      height: currentFile ? currentFile.height : 0,
                      fill: chroma(targetColor).hex()
                    }"/>
                    <v-image :config="{
                      image: resultImage,
                      width: currentFile ? currentFile.width : 0,
                      height: currentFile? currentFile.height : 0,
                    }"/>
                  </v-layer>
                </v-stage>
                <v-stage style="display: none;" :config="{
                  width: sceneWidth,
                  height: sceneHeight,
                }" ref="konvaStage">
                  <v-layer ref="subLayer">
                    <!-- <v-circle :config="configCircle"></v-circle> -->
                    <v-image ref="mashImgSub" :config="{
                      image: currentFile ? currentFile.image : null,
                    }"/>
                  </v-layer>
                  <v-layer ref="resultLayer">
                    <v-rect :config="{
                      width: currentFile ? currentFile.width : 0,
                      height: currentFile ? currentFile.height : 0,
                      fill: chroma(targetColor).hex()
                    }"/>
                    <v-image :config="{
                      image: resultImage,
                      width: currentFile ? currentFile.width : 0,
                      height: currentFile ? currentFile.height : 0,
                    }"/>
                  </v-layer>
                </v-stage>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg='4'>
          <b-overlay :show="uiLocked" rounded="sm">
            <b-row>
              <b-col>
                <p class="text-muted">色</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-row>
                  <b-col cols='auto'>
                    <verte v-model="targetColor" picker="square" model="hex" menuPosition="left"></verte>
                  </b-col>
                  <b-col class="pl-0">
                    <p>変えたい色</p>
                  </b-col>
                </b-row>
              </b-col>
              <b-col v-if="false">
                <b-row>
                  <b-col cols='auto'>
                    <verte v-model="baseColor" picker="square" model="hex" menuPosition="left"></verte>
                  </b-col>
                  <b-col class="pl-0">
                    <p>変更前の色</p>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <hr>
                <p class="text-muted">選ぶ</p>
                <b-form-file
                  v-model="files_"
                  placeholder="マシュマロを選ぶ"
                  drop-placeholder="ここに画像をドラッグ&ドロップ"
                  accept="image/*"
                  multiple
                  :disabled='files.length !== filesCount'
                ></b-form-file>
                <hr>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <p class="text-muted">保存する</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-button block variant="light" @click="saveImage">1枚保存する</b-button>
              </b-col>
              <b-col>
                <b-button block variant="light" @click="saveImageAll" :disabled='files.length !== filesCount || files.length < 2'>全部保存する</b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <hr>
                <p class="text-muted">一覧（{{mashIndex+1}}/{{files.length}}）<span v-if="files.length !== filesCount">読み込み中: {{filesCount - files.length}}こ</span></p>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-list-group
                  :style="{
                    maxHeight: '400px',
                    overflowY: 'scroll',
                  }"
                >
                  <b-list-group-item
                    button
                    class="p-0"
                    v-for="(file, n) in files"
                    :key="n + '-' + file.name"
                    @click="mashIndex = n"
                    :style="{
                      backgroundColor: chroma(targetColor).hex(),
                      borderColor: chroma(targetColor).hex(),
                    }">
                    <div style="background: white; border-radius: 3px;">
                      <p 
                        class="m-0 p-2" 
                        :style="{
                          backgroundColor: chroma(targetColor).alpha(mashIndex === n ? 1 : 0.1).hex(),
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          color: mashIndex === n ? 'white' : chroma(targetColor).darken().hex(),
                        }">
                        {{file.title}}
                      </p>
                    </div>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
            </b-row>
          </b-overlay>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
    </b-container>
  </div>
</template>

<style>
.verte__controller .slider {
  display: none;
}
</style>

<style>
div#__nuxt,
#__layout,
#__layout > div,
#app {
  min-height: 100vh;
}
</style>

<script>

import Konva from 'konva';
import chroma from "chroma-js";
import GLChroma from 'gl-chromakey';

import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { createWorker, PSM, OEM } from 'tesseract.js';

const worker = createWorker({
  // logger: m => console.log(m),
});

export default {
  components: {},
  data() {
    return {
      scale: 1,
      files_: [],
      files: [],

      filesCount: 1,

      hue: 0,
      saturation: 0,
      lightness: 0,

      filters: [Konva.Filters.HSV],
      mashIndex: -1,

      baseColor: '#e69a9c',
      targetColor: '#c09e88',

      chroma,

      dataURL: null,

      initialState: true,

      uiLocked: false,
    };
  },
  name: 'IndexPage',

  mounted() {
    window.addEventListener("resize", this.changeRect);
  },
  async fetch() {
    const url = '/default.png';

    const getImage = async () => new Promise(resolve => {
      const image = new window.Image();
      image.onload = () => {
        resolve(image);
      };
      image.src = url;
    });

    const image = await getImage();

    this.files = [{
      image,
      width: image.width,
      height: image.height,
      url,
      name: 'せつめい',
      title: 'せつめい',
    }];

    this.mashIndex = 0;

    await this.updateBaseColor();

    this.changeRect();

    await worker.load();
    await worker.loadLanguage('jpn');
    await worker.initialize('jpn', OEM.LSTM_ONLY);
    await worker.setParameters({
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
    });
  },
  computed: {
    currentFile() {
      return this.mashIndex > -1 ? this.files[Math.min(this.mashIndex, this.files.length-1)] : null;
    },
    configKonva() {
      return {
        width: this.sceneWidth * this.scale,
        height: this.sceneHeight * this.scale,
        scale: {
          x: this.scale,
          y: this.scale,
        },
      };
    },
    sceneWidth() {
      return this.currentFile ? this.currentFile.width : 1;
    },
    sceneHeight() {
      return this.currentFile ? this.currentFile.height : 1;
    },
    resultImage() {
      return this.currentFile ? this.currentFile.keyedImage : null;
    },
  },
  methods: {
    scaled(val) {
      return val * this.scale;
    },
    calcX(x, w = 0) {
      return this.scaled(x + 20);
    },
    calcY(y, h = 0) {
      return this.scaled(this.sceneHeight - y - h - 20);
    },
    changeRect() {
      const container = this.$refs.container;

      if (!container || !this.currentFile) {
        return;
      }

      const containerWidth = container.offsetWidth;

      this.scale = containerWidth / this.sceneWidth;
    },
    async updateKeyedImages() {
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        const image = file.image;
        
        const getKeyedImage = async () => new Promise(resolve => {
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;

          const glChroma = new GLChroma(image, canvas);
          glChroma.key({ color: chroma(this.baseColor).rgb(), tolerance: 0.1, amount: 1.0 });
          
          const image2 = new Image();
          image2.src = canvas.toDataURL();

          image2.onload = () => {
            this.dataURL = image2.src;
            resolve(image2);
          }
        });

        file.keyedImage = await getKeyedImage();
      }
      this.files = [...this.files];
    },
    async updateBaseColor() {
      setTimeout(async () => {
        const context = this.$refs.subLayer.getNode().canvas.getContext();
        const rgb = context.getImageData(6, 6, 1, 1).data.slice(0,3);
        const color = chroma(rgb[0],rgb[1],rgb[2]);
        this.baseColor = color.hex();

        await this.updateKeyedImages();
      }, 200);
    },
    saveImage() {
      const dataURL = this.$refs.konvaStage.getNode().toDataURL();

      const element = document.createElement('a');
      element.setAttribute('href', dataURL);
      element.setAttribute('download', 'cooked-' + this.currentFile.name);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    saveImageAll() {
      this.uiLocked = true;

      const savedIndex = this.mashIndex;

      const zip = new JSZip();

      let i = 0;
      const addFile = () => {
        const file = this.files[i++];
        zip.file(file.name, this.$refs.konvaStage.getNode().toDataURL().replace(/^data:image\/(png|jpg);base64,/, ""), {base64: true});
        if (i !== this.files.length) {
          this.mashIndex = i;
          setTimeout(addFile, 200);
        } else {
          this.uiLocked = false;
          this.mashIndex = savedIndex;
          zip.generateAsync({type:"blob"})
          .then(function(content) {
            saveAs(content, "cooked.zip");
          });
        }
      };

      this.mashIndex = 0;
      setTimeout(addFile, 200);
    },
  },
  watch: {
    async files_(val) {
      if (!val.length) {
        return;
      }
      const URL = window.webkitURL || window.URL;
      const files = this.initialState ? [] : this.files;

      this.filesCount = files.length + val.length;

      this.mashIndex = this.initialState ? -1 : 0;

      for (let i = 0; i < val.length; i++) {
        const file = val[i];
        const url = URL.createObjectURL(file);

        const getImage = async () => new Promise(resolve => {
          const image = new window.Image();
          image.onload = () => {
            resolve(image);
          };
          image.src = url;
        });

        const image = await getImage();

        const { data: { text } } = await worker.recognize(image);

        files.push({
          image,
          width: image.width,
          height: image.height,
          url,
          title: text.replace(/ /g, '').replace(/\n/g, '').replace('マシュマロく②', ''),
          name: file.name,
        });
        this.files = [...files];

        if (this.initialState) {
          this.mashIndex = 0;
          this.initialState = false;
        }
      }

      this.files_ = [];

      await this.updateKeyedImages();

      if (files.length && this.mashIndex < 0) {
        this.mashIndex = 0;
      }
    },
    async baseColor() {
      await this.updateKeyedImages();
    },
    async mashIndex() {
      this.changeRect();
      await this.updateBaseColor();
    }
  },
}
</script>
