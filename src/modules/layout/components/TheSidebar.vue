<script setup>
import VMenu from '@/modules/common/components/VMenu.vue'
import { useSidebarStore } from '@/store/useSidebarStore'

const { closeSidebar } = useSidebarStore()
</script>

<template>
	<aside class="sidebar">
		<div class="sidebar__header">
			<router-link :to="{ name: 'dashboard' }" class="sidebar__logo" @click="closeSidebar">
				<svg width="512" height="299" viewBox="0 0 512 299" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clip-path="url(#clip0_136_1360)">
						<path d="M177.931 298.372C160.06 298.372 144.111 294.526 130.088 286.835C116.34 278.868 105.479 268.155 97.5052 254.696C89.8063 241.237 85.9568 226.127 85.9568 209.372V73.8112H9.24219V9.94531H240.21V73.8112H164.733V214.728C164.733 220.223 166.659 224.891 170.507 228.738C174.357 232.584 178.894 234.506 184.118 234.506H209.69V298.372H177.931ZM285.302 298.372V234.506H408.21C413.434 234.506 417.835 233.408 421.409 231.21C425.259 229.012 428.282 225.991 430.482 222.145C432.683 218.299 433.782 214.178 433.782 209.784C433.782 205.114 432.683 200.857 430.482 197.011C428.282 193.164 425.259 190.144 421.409 187.946C417.835 185.748 413.434 184.649 408.21 184.649H367.379C350.056 184.649 334.383 181.215 320.36 174.349C306.337 167.482 295.063 157.729 286.539 145.094C278.29 132.183 274.166 116.663 274.166 98.5335C274.166 80.6785 278.153 65.1584 286.127 51.9732C294.101 38.5133 304.825 28.2124 318.298 21.0704C331.77 13.6537 346.756 9.94531 363.254 9.94531H492.762V73.8112H373.153C368.754 73.8112 364.766 74.91 361.192 77.1075C357.892 79.0303 355.28 81.64 353.355 84.9363C351.431 88.2326 350.468 91.9409 350.468 96.0613C350.468 100.182 351.431 104.027 353.355 107.598C355.28 110.895 357.892 113.642 361.192 115.839C364.766 117.762 368.754 118.723 373.153 118.723H416.459C435.432 118.723 451.93 122.294 465.953 129.436C480.25 136.578 491.25 146.604 498.948 159.515C506.647 172.151 510.497 187.122 510.497 204.427C510.497 224.205 506.372 241.236 498.123 255.52C490.149 269.529 479.289 280.242 465.54 287.659C452.068 294.801 437.082 298.372 420.584 298.372H285.302Z" fill="#FF565C" />
					</g>
					<defs>
						<clipPath id="clip0_136_1360">
							<rect width="512" height="298.372" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</router-link>
		</div>

		<div class="sidebar__body">
			<VMenu />
		</div>
	</aside>
</template>

<style lang="scss">
.sidebar {
	display: flex;
    flex-direction: column;
    align-items: center;
	max-width: rem(320);
	background-color: $whiteColor;

	@media (max-width: $tablet) {
		position: fixed;
		z-index: 200;
		transition: transform 0.3s ease-in-out;
		transform: translateX(-100%);

		.sidebar-open & {
			transform: translateX(0%);
		}
	}

	@media (max-width: $mobileSmall) {
		width: 100%;
		max-width: 100%;
	}

	.dark & {
			background-color: $darkColor;
		}

	&__header {
		position: relative;
    	z-index: 10;
		display: flex;
		align-items: center;
		width: 100%;
		height: rem(70);
		background-color: $whiteColor;
		box-shadow: 0 1px 0 0 rgb(0 0 0 / 10%);

		.dark & {
			background-color: $darkColor;
		}
	}

	// .sidebar__logo
	&__logo {
		position: sticky;
		top: 0;
		z-index: 1;
		display: flex;
		align-items: center;
		width: 100px;
		padding: rem(15) rem(17) rem(15) rem(25);

		svg {
			max-width: 100%;
			height: auto;

			@media (max-width: $mobileSmall) {
				max-width: rem(220);
			}
		}

		@media (max-width: $tablet) {
			box-shadow: none;
		}

		.dark & {
			background-color: $darkColor;
			box-shadow: none;
		}
	}

	&__body {
		position: sticky;
		top: rem(70);
		width: 100%;
		min-width: rem(250);
		height: calc(100vh - 70px);
		padding: rem(20) rem(17) rem(20) rem(17);
		overflow-y: auto;
		box-shadow: 1px 0 40px 0 rgb(0 0 0 / 10%);

		.dark & {
			background-color: $darkColor;
		}

		@media (max-width: $tablet) {
			box-shadow: none;
		}
	}
}
</style>
