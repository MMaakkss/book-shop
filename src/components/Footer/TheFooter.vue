<script setup lang="ts"></script>

<template>
	<footer class="footer container">
		<div class="footer__container">
			<div>BookStore Project</div>
			<ul class="footer__links">
				<li>
					<a class="link" href="https://www.linkedin.com/in/maksym-minakov-1117a122b" target="_blank">
						<img src="@/assets/images/icons/LINKEDINLOGO.svg" alt="LinkedIn">
					</a>
				</li>
				<li>
					<a class="link" href="https://github.com/MMaakkss" target="_blank">
						<img src="@/assets/images/icons/GITHUBLOGO.svg" alt="GitHub">
					</a>
				</li>
			</ul>
			<div>by Minakov Maksym</div>
		</div>
	</footer>
</template>

<style scoped lang="scss">
.footer {
	font-size: 20px;

	&__container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 24px;
		padding: 44px 0 114px;
		border-top: $border;
	}

	&__links {
		display: flex;
		gap: 22px;

		.link {
			width: 50px;
			height: 50px;
			display: grid;
			place-content: center;
			border-radius: 100%;
			border: 2px solid $grey;
			background-color: #ffffff;
			position: relative;
			transition: 0.2s ease-in-out;

			&:hover {
				background-color: $yellow;
			}

			&:before {
				content: '';
				position: absolute;
				top: 6px;
				left: 3px;
				width: 50px;
				height: 50px;
				border-radius: 100%;
				background-color: $blue;
				z-index: -1;
			}
		}
	}
}
</style>
