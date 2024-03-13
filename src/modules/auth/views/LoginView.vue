<script setup>
import { reactive, ref } from 'vue'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'
import { storeToRefs } from 'pinia'
import { useHead } from 'unhead'
import Card from 'primevue/card'
import VForm from '@/modules/common/components/VForm.vue'
import VFormField from '@/modules/common/components/VFormField.vue'
import { useAuthStore } from '@/store/useAuthStore'

const title = 'Войти в аккаунт'

const { login } = useAuthStore()

const { inProgress } = storeToRefs(useAuthStore())

const errors = ref()

const form = reactive({
	email: '',
	password: '',
	remember: true,
})

async function formSubmit() {
	errors.value = await login(form)
}

useHead({
	title,
})
</script>

<template>
	<main class="login">
		<section class="login__body">
			<Card>
				<template #content>
					<VForm footer :is-loading="inProgress" single-column @form-submit="formSubmit">
						<template #header>
							<h1 class="login__title">
								Войдите в свой аккаунт
							</h1>
						</template>
						<template #body>
							<VFormField>
								<span class="p-float-label">
									<InputText
										id="email"
										v-model="form.email"
										type="email"
										:class="{ 'p-invalid': errors?.email }"
										aria-describedby="text-error"
									/>
									<label for="email">Email*</label>
								</span>
								<small v-if="errors?.email" id="text-error" class="p-error">{{ errors?.email[0] || '&nbsp;' }}</small>
							</VFormField>
							<VFormField>
								<span class="p-float-label">
									<InputText
										id="password"
										v-model="form.password"
										type="password"
										:class="{ 'p-invalid': errors?.password }"
										aria-describedby="text-error"
									/>
									<label for="password">Пароль*</label>
								</span>
								<small v-if="errors?.password" id="text-error" class="p-error">{{ errors?.password[0] || '&nbsp;' }}</small>
							</VFormField>
							<VFormField>
								<div class="checkbox">
									<Checkbox v-model="form.remember" :binary="true" input-id="remember" name="remember" value="remember" />
									<label for="remember" class="checkbox__label">Запомнить меня</label>
								</div>
							</VFormField>
						</template>
						<template #footer>
							<Button class="login__button" :loading="inProgress" type="submit" label="Войти" />
						</template>
					</VForm>
				</template>
			</Card>
		</section>
	</main>
</template>

<style lang="scss" scoped>
.login {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh;

	// .login__body
	&__body {
		width: 100%;
		max-width: rem(510);

		@include adaptiveValue('padding-inline', 20, 15);
	}

	// .login__title
	&__title {
		margin-bottom: rem(50);
		font-weight: 700;
		text-align: center;

		@include adaptiveValue('font-size', 24, 20);

		.dark & {
			color: $whiteColor;
		}
	}

	// .login__button
	&__button {
		width: 100%;
	}
}
</style>
