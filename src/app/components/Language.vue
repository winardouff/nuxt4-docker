<template>
  <Transition name="trans">
    <div v-if="isShowLang" class="lang">
      <ion-toolbar class="lang-toolbar">
        <ion-title>Select Language</ion-title>
        <ion-icon
          slot="end"
          :icon="closeIcon"
          class="lang-toolbar-close"
          @click="emit('close-clicked')"
        />
      </ion-toolbar>
      <div style="overflow-y: auto">
        <ion-grid>
          <ion-row>
            <ion-col
              v-for="lang in langList"
              :key="lang.name"
              size-md="3"
              size-sm="4"
              size-xs="6"
              @click="changeLang(lang.code)"
            >
              <div class="flag-div">
                <img :src="lang.image" />
              </div>
              <div class="flag-label">{{ lang.name }}</div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { close as closeIcon } from 'ionicons/icons'
import { loadingController } from '@ionic/core'

const props = defineProps({
  isShowLang: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close-clicked'])
const { httpPost } = useHttp()
const toast = useToast()

const langList = [
  {
    name: 'English (US)',
    image: '/lang/en-rounded.svg',
    code: 'en',
  },
  // {
  //   name: 'Indonesian',
  //   image: '/lang/id-rounded.svg',
  //   code: 'id',
  // },
  {
    name: 'Vietnamese',
    image: '/lang/vi-rounded.svg',
    code: 'vi',
  },
]

async function changeLang(langCode: string) {
  const loading = await loadingController.create({
    message: 'Please wait...',
  })
  await loading.present()

  try {
    const response = await httpPost(
      'user/preference/language',
      { language: langCode },
      'user'
    )
    if (response) {
      loading.dismiss()
      // TODO: Set locale when i18n is configured
      // setLocale(langCode)
      emit('close-clicked')
      window.location.reload()
    }
  } catch (error: any) {
    loading.dismiss()
    toast.show(error?.response?.data?.message || 'Failed to change language')
  }
}
</script>

<style scoped>
.lang {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  background: white;
  height: 100%;
  width: 100%;
}

.trans-enter-active,
.trans-leave-active {
  transition: all 0.3s ease-in-out;
}

.trans-enter-from,
.trans-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}

.lang-toolbar-close {
  font-size: 35px;
  padding-right: 10px;
  cursor: pointer;
}

.flag-div {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
}

.flag-div img {
  width: 35%;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .flag-div img {
    width: 50%;
    cursor: pointer;
  }
}

.flag-label {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 30px;
  font-weight: bold;
  cursor: pointer;
}
</style>
