<template>
	<!-- <div id="inspImg"> -->
		<img class="inspImg" @click="clickd" :src="imgSrc"/>
	<!-- </div> -->
</template>

<script>
export default {
	name: "ImageInspiro",
	created() {
		this.getNewInspiroImg();
	},
	data() {
		return {
			imgSrc: "",
			selected: false,
		};
	},
	props: {
		imageSrc: String,
		xmas: Boolean,
	},
	methods: {
    clickd: function() {
      this.downloadImage();
      this.$emit('click');
    },
		downloadImage: function() {
			fetch(this.imgSrc).then((result) => {
				result.blob().then((blob) => {
					let fileName = this.imgSrc.substr(this.imgSrc.lastIndexOf('/') + 1);
					let file = new File([blob], fileName);
					let adownloadEl = document.createElement('a');
					adownloadEl.id = "downloadEl";
					adownloadEl.download = fileName;
					let fileObjURL = URL.createObjectURL(file);
          adownloadEl.href = fileObjURL;
					document.body.append(adownloadEl);
					let adownload = document.getElementById('downloadEl');
					adownload.click();
					adownload.remove();
          URL.revokeObjectURL(fileObjURL);
				})
			});
			console.log('meow!');
			
		},
		getNewInspiroImg: function() {
			let url = "https://inspirobot.me/api?generate=true";
			if (this.xmas == true) {
				url += "&season=xmas";
			}
			fetch(url).then((resp) => {
				console.log(resp.status);
				resp.text().then((result) => {
					this.imgSrc = result;
					console.log(result);
				})
			})
		},
	},
};
</script>

<style lang="scss" scoped>
.inspImg {
	display: inline-block;
	// flex: 50%;
	max-width: 100%;
}
</style>