<template>
  <div id="flexwrapper">
    <div id="controls">
      <v-checkbox color="accent" @input="toggleXmasMode" :label="`Xmas mode`"></v-checkbox>
    </div>
    <hr />
    <div class="imageSection">
      <!-- <image-inspiro
        v-for="item in this.imgSrcs"
        :key="item.id"
        :imageSrc="item.url"
        :xmas="item.xmasSeason"
				@click="downloadImage(item.id)"
      ></image-inspiro> -->
      <image-inspiro @click="downloadOne(0)"></image-inspiro>
			<image-inspiro @click="downloadOne(1)" xmas></image-inspiro>
			<image-inspiro @click="downloadOne(2)" ></image-inspiro>
			<image-inspiro @click="downloadOne(3)" xmas></image-inspiro>
    </div>
		<hr class="separator">
		<div id="resultSection">
			<v-btn
				block
				color="success"
				elevation="4"
				text
				@click="downloadAll"
			>Download All</v-btn>
		</div>
  </div>
</template>

<script>
import ImageInspiro from "./ImageInspiro.vue";
export default {
  components: { ImageInspiro },
  name: "InspiroSection",
  created() {
    for (let i = 0; i < this.numOfImgs; i++) {
      this.getNewInspiroImg();
    }
    console.warn(this.imgSrcs);
  },
  data() {
    return {
      numOfImgs: 4,
      imgSrcs: [],
      files: [],
			xmasMode: false,
    };
  },
  props: {},
  methods: {
		toggleXmasMode() {
			this.xmasMode = !this.xmasMode;
		},

		downloadOne: function(index) {
			console.debug("I'm here! Index is: ", index);
			let adownloadEl = document.createElement('a');
			adownloadEl.id = "downloadEl";
			adownloadEl.download = this.files[index].name;
			let fileObjURL = URL.createObjectURL(this.files[index]);
			adownloadEl.href = fileObjURL;
			document.body.append(adownloadEl);
			let adownload = document.getElementById('downloadEl');
			adownload.click();
			adownload.remove();
			URL.revokeObjectURL(fileObjURL);
		},

		downloadAll: function() {
			for (let i = 0; i < this.numOfImgs; i++) {
				let adownloadEl = document.createElement('a');
				adownloadEl.id = "downloadEl";
				adownloadEl.download = this.files[i].name;
				let fileObjURL = URL.createObjectURL(this.files[i]);
				adownloadEl.href = fileObjURL;
				document.body.append(adownloadEl);
				let adownload = document.getElementById('downloadEl');
				adownload.click();
				adownload.remove();
				URL.revokeObjectURL(fileObjURL);
			}
		},
    getNewInspiroImg: function (index) {
      let url = "https://inspirobot.me/api?generate=true";
      let fileName = "";
      let file = null;
      let xmas = index % 2 == 1;
      if (xmas) {
        url += "&season=xmas";
      }
      fetch(url).then((resp) => {
        resp.text().then((result) => {
          let returnedURL = JSON.parse(JSON.stringify(result));
          console.log(returnedURL);
          fileName = returnedURL.substr(returnedURL.lastIndexOf("/") + 1);
					
          fetch(returnedURL).then((imgResp) => {
            imgResp.blob().then((resultBlob) => {
              file = new File([resultBlob], fileName);
              this.files.push(file);
              let objURL = URL.createObjectURL(file);
              let entry = {
                id: this.imgSrcs.length,
                url: objURL,
                xmasSeason: xmas,
              };
              this.imgSrcs.push(entry);
            });
          });
        });
      });
    },
  },
};
</script>

<style>
.imageSection {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* min-width: 0px; */
  /* min-height: 0px; */
  grid-template-rows: repeat(2, 1fr);
}

#controls {
  margin-left: 8px;
  margin-top: 8px;
  margin-bottom: 16px;
}

.separator {
	margin-top: 16px;
	margin-bottom: 16px;
}

#resultSection {
	margin-bottom: 32px;
}

#flexwrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* flex: 1 1 auto; */
}
</style>
