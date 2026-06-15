<template>
  <ion-menu
    :type="!isScreenSmall ? 'push' : 'overlay'"
    menu-id="side-menu"
    content-id="main-content"
    :class="{ 'custom-menu-width': !isScreenSmall }"
  >
    <ion-header>
      <ion-toolbar class="unidev-toolbar" translucent>
        <ion-title class="ion-no-padding"></ion-title>
        <ion-grid class="ion-no-padding">
          <ion-row>
            <ion-col size="2.5" style="text-align: center">
              <img class="icon-header" src="/icon.png" />
            </ion-col>
            <ion-col class="ion-align-self-center">
              <h4 class="ion-no-margin">Menu</h4>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- filter search menu -->
      <div class="ion-padding">
        <ion-item class="box" lines="none">
          <ion-input
            ref="searchInputRef"
            class="color-text"
            type="text"
            mode="ios"
            placeholder="Search Menu"
            @ion-input="searchMenu = $event.target.value"
          ></ion-input>
          <ion-icon
            v-if="searchMenu.length === 0"
            class="main-menu-icon"
            :icon="searchOutline"
          ></ion-icon>
          <ion-icon
            v-else
            class="main-menu-icon"
            :icon="closeOutline"
            @click="onClearSearchMenu"
          ></ion-icon>
        </ion-item>
      </div>

      <!-- Filtered search results -->
      <ion-list
        v-if="
          filterMenus
            .map((i) => i.perm)
            .some((r) => permissions.includes(r))
        "
      >
        <div v-for="(filterMenu, index) in filterMenus" :key="index">
          <ion-menu-toggle>
            <ion-item
              v-if="permissions.includes(filterMenu.perm) && filterMenu.href"
              class="filter-item"
              lines="none"
              button="true"
              @click="goToPage(filterMenu)"
            >
              <ion-icon
                slot="start"
                class="icon-sub-item"
                :icon="radioButtonOffOutline"
              ></ion-icon>
              <ion-label>{{ filterMenu.title }}</ion-label>
            </ion-item>
          </ion-menu-toggle>
        </div>
      </ion-list>

      <!-- Main menu -->
      <div v-if="searchMenu.length === 0">
        <template v-for="item in menus" :key="item.name">
          <!-- Single items with href -->
          <ion-menu-toggle v-if="item.href && item.is_active">
            <ion-item
              v-if="item.url && (permissions.includes(item.perm) || item.skipPerms)"
              lines="none"
              class="parent-item"
              button="true"
              @click="openUrl(item.href)"
            >
              <ion-icon slot="start" :icon="menuIcon(item)"></ion-icon>
              <ion-label>{{ item.title }}</ion-label>
            </ion-item>
            <ion-item
              v-else-if="item.title === 'Logout'"
              lines="none"
              class="parent-item"
              button="true"
              @click="handleLogout()"
            >
              <ion-icon slot="start" :icon="menuIcon(item)"></ion-icon>
              <ion-label>Logout</ion-label>
            </ion-item>
            <ion-item
              v-else-if="permissions.includes(item.perm) || item.skipPerms"
              lines="none"
              class="parent-item"
              button="true"
              @click="goToPage(item, $event)"
            >
              <ion-icon slot="start" :icon="menuIcon(item)"></ion-icon>
              <ion-label>{{ item.title }}</ion-label>
            </ion-item>
          </ion-menu-toggle>

          <!-- Parent items with children -->
          <ion-item
            v-if="
              item.items &&
              item.is_active &&
              (item.items.some((r) => permissions.includes(r.perm) || r.hasSubChild) ||
                item.skipPerms ||
                item.hasChild)
            "
            detail="false"
            button="true"
            lines="none"
            class="parent-item"
            @click="isOpenParent(item)"
          >
            <ion-icon slot="start" :icon="menuIcon(item)"></ion-icon>
            <ion-label>{{ item.title }}</ion-label>
            <ion-icon
              v-show="!item.open"
              slot="end"
              :icon="chevronForwardOutline"
            ></ion-icon>
            <ion-icon
              v-show="item.open"
              slot="end"
              :icon="chevronDownOutline"
            ></ion-icon>
          </ion-item>

          <!-- Sub items (level 2) -->
          <ion-list
            v-if="
              item.items &&
              item.open &&
              (item.items.some((r) => permissions.includes(r.perm) || r.hasSubChild) ||
                item.skipPerms ||
                item.hasChild)
            "
          >
            <div v-for="subItem in item.items" :key="subItem.name">
              <ion-menu-toggle>
                <ion-item
                  v-if="permissions.includes(subItem.perm) && subItem.href"
                  class="sub-item"
                  lines="none"
                  button="true"
                  @click="subItem.url ? openUrl(subItem.href) : goToPage(subItem)"
                >
                  <ion-icon
                    slot="start"
                    class="icon-sub-item"
                    :icon="radioButtonOffOutline"
                  ></ion-icon>
                  <div
                    :class="sideMenuSelected === subItem.name ? 'color-pick' : 'color-unpick'"
                  >
                    <ion-label>{{ subItem.title }}</ion-label>
                  </div>
                </ion-item>
              </ion-menu-toggle>

              <!-- Sub item with children (level 3 toggle) -->
              <ion-item
                v-if="
                  subItem.child &&
                  (subItem.child.some(
                    (r) =>
                      permissions.includes(r.perm) ||
                      (r.sub_child && r.sub_child.some((s) => permissions.includes(s.perm)))
                  ) || subItem.skipPerms)
                "
                detail="false"
                button="true"
                lines="none"
                class="sub-item"
                @click="isOpenSubitem(subItem)"
              >
                <ion-icon
                  slot="start"
                  class="icon-sub-item"
                  :icon="radioButtonOffOutline"
                ></ion-icon>
                <ion-label>{{ subItem.name }}</ion-label>
                <ion-icon
                  v-show="!subItem.open"
                  slot="end"
                  :icon="chevronForwardOutline"
                ></ion-icon>
                <ion-icon
                  v-show="subItem.open"
                  slot="end"
                  :icon="chevronDownOutline"
                ></ion-icon>
              </ion-item>

              <!-- Child items (level 3) -->
              <ion-list
                v-if="
                  subItem.child &&
                  subItem.open &&
                  (subItem.child.some((r) => permissions.includes(r.perm) || r.sub_child) ||
                    subItem.skipPerms)
                "
              >
                <div v-for="childItem in subItem.child" :key="childItem.name">
                  <ion-menu-toggle>
                    <ion-item
                      v-if="permissions.includes(childItem.perm) && childItem.href"
                      class="child-item"
                      lines="none"
                      button="true"
                      @click="goToPage(childItem)"
                    >
                      <div
                        :class="sideMenuSelected === childItem.name ? 'color-pick' : 'color-unpick'"
                      >
                        <ion-label>{{ childItem.title }}</ion-label>
                      </div>
                    </ion-item>
                  </ion-menu-toggle>

                  <!-- Sub child toggle (level 4) -->
                  <ion-item
                    v-if="
                      childItem.sub_child &&
                      (childItem.sub_child.some((r) => permissions.includes(r.perm)) ||
                        childItem.skipPerms)
                    "
                    detail="false"
                    button="true"
                    lines="none"
                    class="child-item color-unpick"
                    @click="isOpen(childItem)"
                  >
                    <ion-label>{{ childItem.name }}</ion-label>
                    <ion-icon
                      v-show="!childItem.open"
                      slot="end"
                      :icon="chevronForwardOutline"
                    ></ion-icon>
                    <ion-icon
                      v-show="childItem.open"
                      slot="end"
                      :icon="chevronDownOutline"
                    ></ion-icon>
                  </ion-item>

                  <!-- Sub child items (level 4) -->
                  <ion-list
                    v-if="
                      childItem.sub_child &&
                      childItem.open &&
                      (childItem.sub_child.some((r) => permissions.includes(r.perm)) ||
                        childItem.skipPerms)
                    "
                  >
                    <div v-for="subChildItem in childItem.sub_child" :key="subChildItem.name">
                      <ion-menu-toggle>
                        <ion-item
                          v-if="permissions.includes(subChildItem.perm) && subChildItem.href"
                          class="child-item"
                          lines="none"
                          button="true"
                          @click="goToPage(subChildItem)"
                        >
                          <ion-icon
                            slot="start"
                            class="icon-sub-item"
                            :icon="radioButtonOffOutline"
                          ></ion-icon>
                          <div
                            :class="
                              sideMenuSelected === subChildItem.name ? 'color-pick' : 'color-unpick'
                            "
                          >
                            <ion-label>{{ subChildItem.title }}</ion-label>
                          </div>
                        </ion-item>
                      </ion-menu-toggle>
                    </div>
                  </ion-list>
                </div>
              </ion-list>
            </div>
          </ion-list>
        </template>
      </div>
    </ion-content>

    <ion-footer>
      <ion-grid>
        <ion-row>
          <div v-show="locationPermission !== ''" style="width: 100%; background-color: red">
            <ion-label style="font-size: 10px; padding-left: 8px; color: white; font-weight: bold">
              {{ locationPermission }}
            </ion-label>
          </div>
          <div v-show="cameraPermission !== ''" style="width: 100%; background-color: red">
            <ion-label style="font-size: 10px; padding-left: 8px; color: white; font-weight: bold">
              {{ cameraPermission }}
            </ion-label>
          </div>
        </ion-row>
        <ion-row>
          <ion-col size="6.5" class="ion-align-self-center ion-padding-start">
            <ion-label>{{ appVersion }}</ion-label>
          </ion-col>
          <ion-col v-show="showBtnRefresh">
            <ion-col class="ion-align-self-center" style="text-align: end">
              <ion-label class="font13">Refresh data</ion-label>
            </ion-col>
            <ion-col class="ion-align-self-center" @click="alertForceRefreshData">
              <ion-icon class="img-vertical" :icon="syncIcon" size="large"></ion-icon>
            </ion-col>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-footer>
  </ion-menu>
</template>

<script setup lang="ts">
import {
  chevronDownOutline,
  chevronForwardOutline,
  closeOutline,
  searchOutline,
  radioButtonOffOutline,
  sync as syncIcon,
  homeOutline,
  documentOutline,
  desktopOutline,
  businessOutline,
  cashOutline,
  airplaneOutline,
  linkOutline,
  phonePortraitOutline,
  globe,
  clipboardOutline,
  cloudDownloadOutline,
  logOutOutline,
  reorderFourOutline,
  podiumOutline,
  cloudUploadOutline,
  barChartOutline,
  videocamOutline,
  extensionPuzzleOutline,
  fastFoodOutline,
  cubeOutline,
  timeOutline,
  pieChartOutline,
  fitnessOutline,
  listOutline,
  newspaperOutline,
  qrCodeOutline,
  peopleOutline,
  radioButtonOnOutline,
  readerOutline,
  walletOutline,
  repeatOutline,
  imageOutline,
  albumsOutline,
} from 'ionicons/icons'
import { alertController, loadingController } from '@ionic/core'
// TODO: Import your menu definition
// import Menu from '~/api/menu'

const emit = defineEmits(['lang-clicked'])
const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
const { httpPost } = useHttp()
const token = useCookie('auth.token')
const refreshToken = useCookie('refresh.token')

// Icon map for menu items
const iconMap: Record<string, any> = {
  homeOutline,
  documentOutline,
  desktopOutline,
  businessOutline,
  cashOutline,
  airplaneOutline,
  linkOutline,
  phonePortraitOutline,
  globe,
  clipboardOutline,
  cloudDownloadOutline,
  logOutOutline,
  reorderFourOutline,
  podiumOutline,
  cloudUploadOutline,
  barChartOutline,
  videocamOutline,
  extensionPuzzleOutline,
  fastFoodOutline,
  cubeOutline,
  timeOutline,
  pieChartOutline,
  fitnessOutline,
  listOutline,
  newspaperOutline,
  qrCodeOutline,
  peopleOutline,
  radioButtonOnOutline,
  radioButtonOffOutline,
  readerOutline,
  searchOutline,
  walletOutline,
  repeatOutline,
  imageOutline,
  albumsOutline,
  syncIcon,
}

// State
const appVersion = config.public.appVersion as string
const searchInputRef = ref<any>(null)
const searchMenu = ref('')
const filterMenus = ref<any[]>([])
const isScreenSmall = ref(window.innerWidth < 768)
const permissions = ref<string[]>([])
const locationPermission = ref('')
const cameraPermission = ref('')
const showBtnRefresh = ref(false)
const parentSelected = ref<any>(null)
const subItemSelected = ref<any>(null)
const sideMenuSelected = ref<string | null>(null)

// TODO: Replace with your actual menu data import
const menus = reactive<any[]>([])
// const menus = reactive(Menu)

// Watch search menu
watch(searchMenu, (val) => {
  if (val) {
    const menuChild: any[] = []
    const menuSubChild: any[] = []

    menus.forEach((menu) => {
      if (menu.items) {
        menu.items.forEach((subMenu: any) => {
          if (!subMenu.open || subMenu.href) {
            if (
              subMenu.title.toLowerCase().includes(val.toLowerCase()) &&
              permissions.value.includes(subMenu.perm)
            ) {
              menuChild.push({
                name: subMenu.name,
                title: subMenu.title,
                href: subMenu.href,
                perm: subMenu.perm,
                icon: 'radioButtonOnOutline',
              })
            }
          }

          if (subMenu.child) {
            const menu1 = subMenu.child.filter((item: any) =>
              item.title.toLowerCase().includes(val.toLowerCase()) &&
              permissions.value.includes(item.perm)
            )
            menu1.forEach((item: any) => {
              menuChild.push({
                name: item.name,
                title: item.title,
                href: item.href,
                perm: item.perm,
                icon: 'radioButtonOnOutline',
              })
            })

            subMenu.child.forEach((child: any) => {
              if (child.sub_child) {
                const menu2 = child.sub_child.filter((item: any) =>
                  item.title.toLowerCase().includes(val.toLowerCase()) &&
                  permissions.value.includes(item.perm)
                )
                menu2.forEach((item: any) => {
                  menuSubChild.push({
                    name: item.name,
                    title: item.title,
                    href: item.href,
                    perm: item.perm,
                    icon: 'radioButtonOnOutline',
                  })
                })
              }
            })
          }
        })
      }
    })

    filterMenus.value = [...menuSubChild, ...menuChild].sort((a, b) =>
      a.title.localeCompare(b.title)
    )
  } else {
    filterMenus.value = []
  }
})

// Watch route changes
watch(() => route.path, (newPath) => {
  setActiveMenu(newPath)
})

// Methods
function menuIcon(item: any) {
  return iconMap[item.icon] || null
}

function getPermissions(): string[] {
  try {
    const perms = localStorage.getItem('user.permissions')
    return perms ? JSON.parse(perms) : []
  } catch {
    return []
  }
}

function setActiveMenu(currentPath: string) {
  menus.forEach((parent) => {
    if (parent.href === currentPath) {
      sideMenuSelected.value = parent.name
      return
    }

    if (parent.items) {
      parent.items.forEach((subItem: any) => {
        if (subItem.href === currentPath) {
          sideMenuSelected.value = subItem.name
          parent.open = true
          parentSelected.value = parent
          return
        }

        if (subItem.child) {
          subItem.child.forEach((childItem: any) => {
            if (childItem.href === currentPath) {
              sideMenuSelected.value = childItem.name
              subItem.open = true
              parent.open = true
              subItemSelected.value = subItem
              parentSelected.value = parent
              return
            }

            if (childItem.sub_child) {
              childItem.sub_child.forEach((subChildItem: any) => {
                if (subChildItem.href === currentPath) {
                  sideMenuSelected.value = subChildItem.name
                  childItem.open = true
                  subItem.open = true
                  parent.open = true
                  subItemSelected.value = subItem
                  parentSelected.value = parent
                }
              })
            }
          })
        }
      })
    }
  })

  if (sideMenuSelected.value) {
    sessionStorage.setItem('side-menu-selected', sideMenuSelected.value)
  }
}

function checkMenu() {
  menus.forEach((menu) => {
    if (menu.items) {
      menu.items.forEach((subMenu: any) => {
        if (subMenu.child) {
          subMenu.child.forEach((child: any) => {
            if (permissions.value.includes(child.perm)) {
              menu.hasChild = true
            } else if (child.sub_child) {
              const filter = child.sub_child
                .map((item: any) => item.perm)
                .filter((item: string) => permissions.value.includes(item))
              if (filter.length > 0) {
                subMenu.hasSubChild = true
              }
            }
          })
        }
      })
    }
  })
}

function checkOpenMenu() {
  const storedData = sessionStorage.getItem('parent-selected')
  if (storedData) {
    const menu = JSON.parse(storedData)
    const parent = menus.filter((item) => item.name === menu.name)
    if (parent.length > 0) {
      parent[0].open = true
      parentSelected.value = parent[0]

      const subItemData = sessionStorage.getItem('sub-item-selected')
      if (subItemData) {
        const subItem = JSON.parse(subItemData)
        const sub = parent[0].items.filter((item: any) => item.name === subItem.name)
        if (sub.length > 0) {
          sub[0].open = true
          subItemSelected.value = sub[0]
        }
      }
    }
  }
}

function goToPage(item: any, event?: Event) {
  if (item.isLang) {
    event?.stopPropagation()
    emit('lang-clicked')
  } else if (item.href != null) {
    if (item.title === 'Force Update') {
      alertForceUpdate()
    } else {
      router.push(item.href)
    }
  }

  sideMenuSelected.value = item.name
  sessionStorage.setItem('side-menu-selected', item.name)
}

function isOpenParent(item: any) {
  if (!parentSelected.value) {
    item.open = !item.open
    parentSelected.value = item
    sessionStorage.setItem('parent-selected', JSON.stringify(item))
  } else if (parentSelected.value !== item) {
    parentSelected.value.open = false
    item.open = !item.open
    parentSelected.value = item
    sessionStorage.setItem('parent-selected', JSON.stringify(item))
  } else {
    item.open = !item.open
    parentSelected.value = null
    sessionStorage.removeItem('parent-selected')
  }
}

function isOpenSubitem(subItem: any) {
  if (!subItemSelected.value) {
    subItem.open = !subItem.open
    subItemSelected.value = subItem
    sessionStorage.setItem('sub-item-selected', JSON.stringify(subItem))
  } else if (subItemSelected.value !== subItem) {
    subItemSelected.value.open = false
    subItem.open = !subItem.open
    subItemSelected.value = subItem
    sessionStorage.setItem('sub-item-selected', JSON.stringify(subItem))
  } else {
    subItem.open = !subItem.open
    subItemSelected.value = null
    sessionStorage.removeItem('sub-item-selected')
  }
}

function isOpen(item: any) {
  item.open = !item.open
}

function openUrl(url: string) {
  window.open(url, '_blank')
}

async function handleLogout() {
  // TODO: Call logout API if needed
  localStorage.clear()
  const allCookies = document.cookie.split(';')
  for (const cookie of allCookies) {
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim()
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
  }
  token.value = null
  refreshToken.value = null
  await navigateTo('/login')
}

async function alertForceUpdate() {
  const alert = await alertController.create({
    header: 'Unsent data will be lost',
    message: 'Are you sure?',
    buttons: [
      { text: 'Cancel' },
      {
        text: 'OK',
        handler: () => {
          localStorage.clear()
          window.location.reload()
        },
      },
    ],
  })
  return alert.present()
}

async function alertForceRefreshData() {
  const alert = await alertController.create({
    header: 'Refresh data from server',
    message: 'Are you sure?',
    buttons: [
      { text: 'Cancel' },
      {
        text: 'OK',
        handler: () => {
          showLoading()
        },
      },
    ],
  })
  return alert.present()
}

async function showLoading() {
  const loading = await loadingController.create({
    message: 'Please wait...',
  })
  await loading.present()

  // TODO: Re-init PouchDB sync if needed
  // await initPouch(dbName)

  setTimeout(() => {
    loading.dismiss()
  }, 100)

  router.go(0)
}

async function openMeeting() {
  try {
    const resp = await httpPost(
      'auth/meet/generate',
      { room: Math.floor(Math.random() * 90000) + 10000 },
      'user'
    )
    if (resp?.data) {
      const meetUrl = config.public.meetUrl as string || ''
      window.open(
        meetUrl + resp.data.room + '?jwt=' + resp.data.token,
        '_blank'
      )
    }
  } catch {
    const alert = await alertController.create({
      header: 'Failed to start instant meeting',
      buttons: [{ text: 'OK' }],
    })
    return alert.present()
  }
}

function checkCamera() {
  navigator.permissions
    .query({ name: 'camera' as PermissionName })
    .then((permissionStatus) => {
      if (permissionStatus.state === 'prompt' || permissionStatus.state === 'denied') {
        cameraPermission.value = 'Camera permission ' + permissionStatus.state
      }
    })
    .catch(() => {})
}

async function checkLocation() {
  try {
    await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
    })
  } catch (err: any) {
    if (err.code === 1 || err.code === 2 || err.code === 3) {
      locationPermission.value = err.message
    }
  }
}

function onClearSearchMenu() {
  if (searchInputRef.value) {
    searchInputRef.value.value = ''
  }
  searchMenu.value = ''
}

// Lifecycle
onMounted(() => {
  permissions.value = getPermissions()
  checkMenu()
  checkOpenMenu()
  checkCamera()
  checkLocation()

  sideMenuSelected.value = sessionStorage.getItem('side-menu-selected')
  setActiveMenu(route.path)

  // TODO: Determine if refresh button should show based on role/page
  showBtnRefresh.value = true
})
</script>

<style scoped>
.unidev-toolbar {
  background: #29337a;
}

.parent-item {
  font-size: small;
}

.sub-item {
  padding-left: 50px;
  font-size: small;
}

.child-item {
  padding-left: 75px;
  font-size: small;
}

ion-icon {
  max-height: 22px;
  max-width: 22px;
}

.icon-sub-item {
  width: 10px;
  height: 10px;
  margin-top: 11px;
  margin-right: 16px;
}

.font13 {
  font-size: 13px;
}

img.icon-header {
  height: 40px;
  border-radius: 50%;
  padding: 5px 0px;
}

.img-vertical {
  vertical-align: middle;
}

.custom-menu-width {
  --width: 350px;
}

.color-pick {
  color: var(--ion-color-apps);
  font-weight: bold;
}

.color-unpick {
  color: #3f4245;
}

.box {
  border-color: var(--ion-color-apps);
  border-width: thin;
  border-style: solid;
  border-radius: 20px;
  margin-bottom: 5px;
}

.filter-item {
  padding-left: 10px;
  font-size: small;
}
</style>
