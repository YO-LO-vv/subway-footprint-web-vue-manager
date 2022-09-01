<template>
	<div id="dz1">
		<div id="head">
			<el-row>
				<el-col :span="2" />
				<el-col :span="3">
					<el-button @click="click1">更新地铁图</el-button>
				</el-col>
				<el-col :span="3">
					<el-button @click="click2">站点宝箱概率</el-button>
				</el-col>
				<el-col :span="16" />
			</el-row>
		</div>
		<div id="foot">
			<iframe src="/static/xxx.html" id="iFrameC" name="myiframe" frameborder="0" width="100%" scrolling="no"
				style="min-height: 500px;"></iframe>
		</div>
	</div>
	<el-dialog v-model="dialogVisible" title="站点宝箱概率" width="50%">
		<!-- 第一行 -->

		<el-form v-model="formInline">
			<el-form-item>
				
<template #label>
	{{formInline.pid}}
</template>
				<el-input v-model="formInline.Pro" />
			</el-form-item>
		</el-form>



		<!-- 确认按钮 -->
		<div class="dialog-foot">
			<el-button type="primary" @click="changeDown">确认</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import {
		getAllSubways,
		getPositionTreasureProbability,
		changePositionTreasureProbability
	} from "../../api/api";
	import {
		onMounted,
		reactive,
		ref
	} from "vue";
	import {
		ElMessage,
		ElNotification
	} from "element-plus";
	import _ from "lodash"; //导入loadsh插件

	export default {
		setup() {
			//挂载

			onMounted(() => {
				console.log("mounted");
				//getSub(131);
				//监听子页面传参
				window.addEventListener('message', function(event) {
					//此处执行事件
					// console.log('监听到子页面的传参')
					// console.log(event.data.data)
					formInline.pid = event.data.data
					console.log("pid is:" + formInline.pid)
				})
			});
			//城市选择
			const xxx = reactive({
				subInfo: {},
				cityChoice: null,
			});
			const handleChange = () => {
				console.log(xxx.cityChoice);
				getSub(xxx.cityChoice);
			};
			//获取地铁数据
			function getSub(cityCode) {
				getAllSubways({
						code: cityCode,
					})
					.then((res) => {
						console.log(res);
						xxx.subInfo = _.cloneDeep(res.data);
						console.log(xxx.subInfo);
					})
					.catch((err) => console.log(err));
			}
			const imgSrc = null;
			const dialogVisible = ref(false)
			const click1 = () => {
				ElMessage({
					message: "地铁图更新成功",
					type: "success",
				});
				location.reload()
			};
			const click2 = () => {
				if (!formInline.pid) {
					ElNotification({
						title: 'Warning',
						message: '请先选择站点',
						type: 'warning',
					})
					return
				} else {
					dialogVisible.value = true
					getPositionTreasureProbability({
							pid: formInline.pid,
						})

						.then((res) => {
							console.log(res.data.data);
							formInline.Pro = res.data.data
						})
						.catch((err) => console.log(err));
				}
			};
			const changeDown = () => {
				changePositionTreasureProbability({
						pid: formInline.pid,
						probability: formInline.Pro
					})
					.then((res) => {
						console.log(res);

					})
					.catch((err) => console.log(err));
				dialogVisible.value = false
			}
			const formInline = reactive({
				pid: '',
				Pro: 0,
			});
			return {
				xxx,
				click1,
				click2,
				handleChange,
				formInline,
				dialogVisible,
				changeDown
			};
		},
	};
</script>

<style>
	#dz1 {
		background-color: white;
		position: absolute;
		top: 60px;
		left: 0;
		right: 0;
		padding: 10px 0;
		/* margin: 0 10px; */
		margin-top: 0px;
		margin-bottom: -10px;
		max-width: 100%;
		display: flex;
		flex-direction: column;
		bottom: 0px;
	}

	#iFrameC {
		height: 100%;
	}

	#head {
		;
	}

	#foot {
		height: 100%;
	}
</style>
