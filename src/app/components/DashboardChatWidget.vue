<template>
  <div v-if="canShowChatWidget">
    <Transition name="chat-pop">
      <div v-if="isChatOpen" class="chat-window">
        <div class="chat-window-header">
          <div class="chat-window-brand">
            <span class="chat-window-brand-badge" aria-hidden="true">
              <img src="/icon.png" alt="" />
            </span>
            <span class="chat-window-brand-copy">
              <span class="chat-window-title">Unifam AI Assistant</span>
              <span class="chat-window-status">
                <span class="chat-window-status-dot" aria-hidden="true"></span>
                Online
              </span>
            </span>
          </div>
          <button
            class="chat-window-close"
            type="button"
            aria-label="Close chat"
            @click="closeChatMenu"
          >
            ×
          </button>
        </div>

        <div ref="messageListRef" class="chat-messages">
          <div
            v-for="item in messages"
            :key="item.id"
            :class="['message-row', item.sender === 'me' ? 'message-me' : 'message-bot']"
          >
            <div v-if="shouldRenderImage(item.text)" class="message-bubble message-image-bubble">
              <img class="message-inline-image" :src="getImageSource(item.text)" alt="Chat response image" />
            </div>
            <div v-else-if="shouldRenderHtml(item.text)" class="message-bubble" v-html="item.text"></div>
            <div v-else class="message-bubble">{{ item.text }}</div>
            <span v-if="item.sender === 'bot'" class="message-avatar" aria-hidden="true">
              <img src="/ic_milki.png" alt="" />
            </span>
          </div>
        </div>

        <form class="chat-input" @submit.prevent="sendMessage">
          <div class="chat-input-shell">
            <input
              v-model.trim="draftMessage"
              type="text"
              :disabled="isSending"
              :placeholder="inputPlaceholder"
            />
            <button
              v-if="enableVoice"
              class="chat-voice-button"
              type="button"
              :disabled="isTranscribing"
              :class="{
                listening: isListening,
                transcribing: isTranscribing,
                unsupported: !speechSupported
              }"
              :title="
                isTranscribing
                  ? 'Transcribing...'
                  : speechSupported
                  ? isListening
                    ? 'Stop recording'
                    : 'Start voice input'
                  : 'Voice input is not supported in this browser'
              "
              @click="toggleVoiceInput"
            >
              <svg viewBox="0 0 24 24" role="img" focusable="false">
                <path
                  d="M12 15.25a3.25 3.25 0 0 0 3.25-3.25V7a3.25 3.25 0 1 0-6.5 0v5A3.25 3.25 0 0 0 12 15.25Zm5.25-3.5a.75.75 0 0 1 1.5 0 6.75 6.75 0 0 1-6 6.7V21h2.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h2.5v-2.55a6.75 6.75 0 0 1-6-6.7.75.75 0 0 1 1.5 0 5.25 5.25 0 1 0 10.5 0Z"
                />
              </svg>
            </button>
          </div>
          <button
            class="chat-send-button"
            type="submit"
            :aria-label="isSending ? 'Sending message' : 'Send message'"
            :disabled="!draftMessage || isSending"
          >
            <svg viewBox="0 0 24 24" role="img" focusable="false">
              <path
                d="M4.53 3.47a.75.75 0 0 1 .82-.17l13.5 6a.75.75 0 0 1 0 1.4l-13.5 6A.75.75 0 0 1 4.3 16V12.1l7.08-1.4L4.3 9.3V4a.75.75 0 0 1 .23-.53Z"
              />
            </svg>
          </button>
        </form>
      </div>
    </Transition>

    <div
      ref="chatTriggerRef"
      class="chat-trigger-area"
      :class="{
        'is-dragging': fabDrag.active,
        'is-open': isChatOpen
      }"
      :style="chatTriggerStyle"
    >
      <button
        class="chat-fab"
        type="button"
        :aria-label="isChatOpen ? 'Hide chat' : 'Open chat'"
        @click="handleFabClick"
        @mousedown="startFabDrag"
        @touchstart="startFabDrag"
        @touchend.capture.stop.prevent="handleFabTouchEnd"
      >
        <span class="chat-fab-glow" aria-hidden="true"></span>
        <span class="chat-fab-ring" aria-hidden="true">
          <span class="chat-fab-avatar-shell">
            <img class="chat-fab-avatar" src="/ic_milki.png" alt="" />
          </span>
        </span>
        <span class="chat-fab-sr">{{ isChatOpen ? 'Hide chat' : 'Open chat' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WhisperRecorder } from '~/utils/whisper-recorder'

const props = defineProps({
  enableVoice: {
    type: Boolean,
    default: true,
  },
})

const { httpPost } = useHttp()
const toast = useToast()

const CHAT_OPEN_KEY = 'dashboard_chat_widget:is_open'
const CHAT_CONVERSATION_KEY = 'dashboard_chat_widget:conversation_id'

// State
const messageListRef = ref<HTMLElement | null>(null)
const chatTriggerRef = ref<HTMLElement | null>(null)
const isChatOpen = ref(false)
const isSending = ref(false)
const draftMessage = ref('')
const conversationId = ref('')
const isListening = ref(false)
const isTranscribing = ref(false)
const speechSupported = ref(false)
let whisperRecorder: WhisperRecorder | null = null
const messages = ref([
  { id: 1, sender: 'bot', text: 'Hello, how can we help you today?' },
  { id: 2, sender: 'bot', text: 'Choose a topic or type your question.' },
])
let idCounter = 3

// FAB drag state
const CHAT_TRIGGER_POSITION_KEY = 'dashboard_chat_widget:trigger_position'
const fabPosition = reactive({ x: null as number | null, y: null as number | null })
const fabDrag = reactive({
  active: false,
  hasMoved: false,
  pointerType: '',
  startPointerX: 0,
  startPointerY: 0,
  startX: 0,
  startY: 0,
})
let ignoreNextFabClick = false

// Computed
const canShowChatWidget = computed(() => {
  return true
  try {
    const perms = localStorage.getItem('user.permissions')
    const permissions = perms ? JSON.parse(perms) : []
    return permissions.includes('AI Chat Widget')
  } catch {
    return false
  }
})

const inputPlaceholder = computed(() => {
  if (isTranscribing.value) return 'Transcribing your voice...'
  if (isListening.value) return 'Recording... tap mic to stop'
  if (isSending.value) return 'Waiting for response...'
  return 'Ask about your data...'
})

const chatTriggerStyle = computed(() => {
  if (fabPosition.x == null || fabPosition.y == null) return {}
  return {
    left: `${fabPosition.x}px`,
    top: `${fabPosition.y}px`,
  }
})

// FAB drag methods
function clampFabPosition(position: { x: number; y: number }) {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const trigger = chatTriggerRef.value
  const tw = trigger ? trigger.offsetWidth : 104
  const th = trigger ? trigger.offsetHeight : 104
  const margin = vw <= 576 ? 14 : 20
  return {
    x: Math.min(Math.max(position.x, margin), Math.max(margin, vw - tw - margin)),
    y: Math.min(Math.max(position.y, margin), Math.max(margin, vh - th - margin)),
  }
}

function getDefaultFabPosition() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const trigger = chatTriggerRef.value
  const tw = trigger ? trigger.offsetWidth : 104
  const th = trigger ? trigger.offsetHeight : 104
  const margin = vw <= 576 ? 14 : 20
  return clampFabPosition({ x: vw - tw - margin, y: (vh - th) / 2 })
}

function getFabPointerPosition(event: any) {
  if (event.touches?.length > 0) return { x: event.touches[0].clientX, y: event.touches[0].clientY }
  if (event.changedTouches?.length > 0) return { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY }
  return { x: event.clientX, y: event.clientY }
}

function handleFabClick() {
  if (!canShowChatWidget.value) return
  if (ignoreNextFabClick) { ignoreNextFabClick = false; return }
  toggleChatMenu()
}

function handleFabTouchEnd() {
  if (!fabDrag.active) return
  const wasMoved = fabDrag.hasMoved
  handleFabDragEnd()
  if (wasMoved) return
  ignoreNextFabClick = true
}

function handleFabDragEnd() {
  if (!fabDrag.active) return
  const vw = window.innerWidth
  const margin = vw <= 576 ? 14 : 20
  const trigger = chatTriggerRef.value
  const tw = trigger ? trigger.offsetWidth : 104
  const current = clampFabPosition({ x: fabPosition.x!, y: fabPosition.y! })
  const rightEdge = Math.max(margin, vw - tw - margin)

  fabPosition.x = (current.x + tw / 2 < vw / 2) ? margin : rightEdge
  fabPosition.y = current.y

  const shouldToggle = fabDrag.pointerType === 'touch' && !fabDrag.hasMoved
  persistFabPosition()
  ignoreNextFabClick = fabDrag.hasMoved

  fabDrag.active = false
  fabDrag.hasMoved = false
  fabDrag.pointerType = ''
  removeFabDragListeners()

  if (shouldToggle) {
    ignoreNextFabClick = true
    toggleChatMenu()
  }
}

function handleFabDragMove(event: any) {
  if (!fabDrag.active) return
  const pointer = getFabPointerPosition(event)
  const next = clampFabPosition({
    x: fabDrag.startX + (pointer.x - fabDrag.startPointerX),
    y: fabDrag.startY + (pointer.y - fabDrag.startPointerY),
  })
  if (!fabDrag.hasMoved && (Math.abs(pointer.x - fabDrag.startPointerX) > 5 || Math.abs(pointer.y - fabDrag.startPointerY) > 5)) {
    fabDrag.hasMoved = true
  }
  if (event.cancelable) event.preventDefault()
  fabPosition.x = next.x
  fabPosition.y = next.y
}

function startFabDrag(event: any) {
  if (event.type === 'mousedown' && event.button !== 0) return
  const pointer = getFabPointerPosition(event)
  const defaultPos = getDefaultFabPosition()
  fabDrag.active = true
  fabDrag.hasMoved = false
  fabDrag.pointerType = event.type === 'touchstart' ? 'touch' : 'mouse'
  fabDrag.startPointerX = pointer.x
  fabDrag.startPointerY = pointer.y
  fabDrag.startX = fabPosition.x ?? defaultPos.x
  fabDrag.startY = fabPosition.y ?? defaultPos.y

  if (event.type === 'mousedown' && event.cancelable) event.preventDefault()
  removeFabDragListeners()
  window.addEventListener('mousemove', handleFabDragMove)
  window.addEventListener('mouseup', handleFabDragEnd)
  window.addEventListener('touchmove', handleFabDragMove, { passive: false })
  window.addEventListener('touchend', handleFabDragEnd, { passive: true })
  window.addEventListener('touchcancel', handleFabDragEnd, { passive: true })
}

function removeFabDragListeners() {
  window.removeEventListener('mousemove', handleFabDragMove)
  window.removeEventListener('mouseup', handleFabDragEnd)
  window.removeEventListener('touchmove', handleFabDragMove)
  window.removeEventListener('touchend', handleFabDragEnd)
  window.removeEventListener('touchcancel', handleFabDragEnd)
}

function persistFabPosition() {
  if (fabPosition.x == null || fabPosition.y == null) return
  sessionStorage.setItem(CHAT_TRIGGER_POSITION_KEY, JSON.stringify({ x: fabPosition.x, y: fabPosition.y }))
}

function restoreFabPosition() {
  const stored = sessionStorage.getItem(CHAT_TRIGGER_POSITION_KEY)
  if (!stored) return null
  try {
    const parsed = JSON.parse(stored)
    if (typeof parsed?.x === 'number' && typeof parsed?.y === 'number') return parsed
  } catch {}
  return null
}

function initializeFabPosition() {
  nextTick(() => {
    const restored = restoreFabPosition() || getDefaultFabPosition()
    const clamped = clampFabPosition(restored)
    fabPosition.x = clamped.x
    fabPosition.y = clamped.y
    persistFabPosition()
  })
}

function handleViewportResize() {
  nextTick(() => {
    const restored = restoreFabPosition() || getDefaultFabPosition()
    const clamped = clampFabPosition(restored)
    fabPosition.x = clamped.x
    fabPosition.y = clamped.y
    persistFabPosition()
  })
}

// Methods
function toggleChatMenu() {
  isChatOpen.value = !isChatOpen.value
  persistChatOpenState()
  if (isChatOpen.value) {
    nextTick(() => scrollToBottom())
  }
}

function closeChatMenu() {
  isChatOpen.value = false
  persistChatOpenState()
}

function scrollToBottom() {
  nextTick(() => {
    if (messageListRef.value) {
      messageListRef.value.scrollTop = messageListRef.value.scrollHeight
    }
  })
}

async function sendMessage() {
  if (!draftMessage.value || isSending.value) return

  const userMessage = draftMessage.value
  messages.value.push({ id: idCounter++, sender: 'me', text: userMessage })
  draftMessage.value = ''
  isSending.value = true
  scrollToBottom()

  try {
    const payload: any = { question: userMessage }
    if (conversationId.value) {
      payload.conversation_id = conversationId.value
    }

    const response = await httpPost('chat/ask-text', payload, 'ai', {}, 60000)
    const responseData = response?.data

    if (responseData) {
      if (responseData.conversation_id) {
        conversationId.value = responseData.conversation_id
        persistConversationId()
      }

      const answer = responseData.answer || responseData.text || 'No response.'
      messages.value.push({ id: idCounter++, sender: 'bot', text: answer })
    } else {
      messages.value.push({ id: idCounter++, sender: 'bot', text: 'Sorry, could not process your request.' })
    }
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message || 'Something went wrong. Please try again.'
    messages.value.push({ id: idCounter++, sender: 'bot', text: errorMsg })
  } finally {
    isSending.value = false
    scrollToBottom()
  }
}

function shouldRenderHtml(text: string) {
  if (!text || typeof text !== 'string') return false
  return /<\/?[a-z][\s\S]*>/i.test(text)
}

function shouldRenderImage(text: string) {
  if (!text || typeof text !== 'string') return false
  const trimmed = text.trim()
  return /^data:image\/png;base64,/i.test(trimmed) || /^https?:\/\/\S+\.png(\?\S*)?$/i.test(trimmed)
}

function getImageSource(text: string) {
  return typeof text === 'string' ? text.trim() : ''
}

function persistChatOpenState() {
  if (isChatOpen.value) {
    sessionStorage.setItem(CHAT_OPEN_KEY, '1')
  } else {
    sessionStorage.removeItem(CHAT_OPEN_KEY)
  }
}

function restoreChatOpenState() {
  isChatOpen.value = sessionStorage.getItem(CHAT_OPEN_KEY) === '1'
}

function persistConversationId() {
  if (conversationId.value) {
    sessionStorage.setItem(CHAT_CONVERSATION_KEY, conversationId.value)
  } else {
    sessionStorage.removeItem(CHAT_CONVERSATION_KEY)
  }
}

function restoreConversationId() {
  conversationId.value = sessionStorage.getItem(CHAT_CONVERSATION_KEY) || ''
}

// Voice input methods
function initWhisperRecorder() {
  if (!props.enableVoice) {
    speechSupported.value = false
    return
  }
  if (!WhisperRecorder.isSupported()) {
    speechSupported.value = false
    return
  }
  whisperRecorder = new WhisperRecorder()
  speechSupported.value = true
}

function stopVoiceInput() {
  if (whisperRecorder && whisperRecorder.isRecording()) {
    whisperRecorder.stop()
  }
  isListening.value = false
}

async function toggleVoiceInput() {
  if (!props.enableVoice) return

  if (!whisperRecorder) {
    initWhisperRecorder()
  }

  if (!speechSupported.value || !whisperRecorder) {
    toast.show('Voice input is not supported in this browser.')
    return
  }

  if (isTranscribing.value) return

  // Currently recording — stop and transcribe
  if (isListening.value) {
    isListening.value = false
    const audioBlob = await whisperRecorder.stop()
    await transcribeAudioBlob(audioBlob)
    return
  }

  // Check network
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    toast.show('Internet connection is required for voice input.')
    return
  }

  // Start recording
  try {
    await whisperRecorder.start({
      onAutoStop: (audioBlob: Blob) => {
        isListening.value = false
        transcribeAudioBlob(audioBlob)
      },
    })
    isListening.value = true
  } catch {
    toast.show('Microphone access denied.')
  }
}

async function transcribeAudioBlob(audioBlob: Blob | null) {
  if (!audioBlob) return

  isTranscribing.value = true

  try {
    const formData = new FormData()
    formData.append('file', audioBlob, 'voice.webm')
    formData.append('language', 'id')

    const response = await httpPost('speech/transcribe-audio', formData, 'ai', {}, 30000)
    const responseBody = response?.data

    if (responseBody && responseBody.code && responseBody.code !== 200) {
      throw new Error(responseBody.message || 'Failed to transcribe audio.')
    }

    const transcript = responseBody?.data?.text || ''
    if (transcript) {
      handleVoiceCommand(transcript.trim())
    }
  } catch {
    toast.show('Voice transcription failed.')
  } finally {
    isTranscribing.value = false
  }
}

function handleVoiceCommand(transcript: string) {
  const normalized = transcript.toLowerCase()

  if (
    normalized.includes('send message') ||
    normalized.includes('send chat') ||
    normalized.includes('kirim pesan') ||
    normalized.includes('kirim chat')
  ) {
    draftMessage.value = transcript
      .replace(/send message/gi, '')
      .replace(/send chat/gi, '')
      .replace(/kirim pesan/gi, '')
      .replace(/kirim chat/gi, '')
      .trim()
    if (draftMessage.value) {
      sendMessage()
    }
    return
  }

  if (
    normalized === 'clear' ||
    normalized === 'clear message' ||
    normalized === 'hapus' ||
    normalized === 'hapus pesan'
  ) {
    draftMessage.value = ''
    return
  }

  if (
    normalized === 'close chat' ||
    normalized === 'tutup chat' ||
    normalized === 'close'
  ) {
    closeChatMenu()
    return
  }

  draftMessage.value = transcript
}

// Lifecycle
onMounted(() => {
  if (!canShowChatWidget.value) return
  if (props.enableVoice) {
    initWhisperRecorder()
  }
  restoreChatOpenState()
  restoreConversationId()
  initializeFabPosition()
  window.addEventListener('resize', handleViewportResize)
  if (isChatOpen.value) {
    scrollToBottom()
  }
})

onBeforeUnmount(() => {
  stopVoiceInput()
  if (whisperRecorder) {
    whisperRecorder.cleanup()
  }
  removeFabDragListeners()
  window.removeEventListener('resize', handleViewportResize)
})
</script>

<style scoped>
.chat-window {
  position: fixed;
  right: 20px;
  bottom: 82px;
  z-index: 1000;
  width: 840px;
  max-width: calc(100vw - 64px);
  display: flex;
  flex-direction: column;
  border-radius: 22px;
  background: linear-gradient(180deg, #f9fbfd 0%, #f2f7fb 100%);
  overflow: hidden;
  border: 1px solid rgba(119, 159, 181, 0.18);
  box-shadow: 0 28px 60px rgba(34, 57, 78, 0.18);
}

.chat-window-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  background: linear-gradient(135deg, #2f93a7 0%, #389fb0 100%);
}

.chat-window-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chat-window-brand-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  overflow: hidden;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
}

.chat-window-brand-badge img {
  display: block;
  width: 78%;
  height: 78%;
  object-fit: contain;
}

.chat-window-brand-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.chat-window-title {
  font-size: 15px;
  font-weight: 700;
  color: #fff;
}

.chat-window-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.92);
}

.chat-window-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #80f26c;
  box-shadow: 0 0 0 3px rgba(128, 242, 108, 0.2);
}

.chat-window-close {
  border: 0;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  padding: 0;
  line-height: 34px;
  text-align: center;
  color: rgba(255, 255, 255, 0.96);
  background: rgba(255, 255, 255, 0.08);
  font-size: 24px;
  font-weight: 300;
}

.chat-messages {
  flex: 1 1 auto;
  height: 660px;
  min-height: 660px;
  max-height: 660px;
  overflow-y: auto;
  padding: 20px 14px 18px;
  background: radial-gradient(
      circle at top right,
      rgba(102, 168, 190, 0.14),
      rgba(102, 168, 190, 0) 30%
    ),
    linear-gradient(180deg, #fcfeff 0%, #f3f8fb 100%);
}

.message-row {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  min-width: 0;
  margin-bottom: 18px;
}

.message-bubble {
  max-width: min(78%, 440px);
  padding: 14px 16px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: 0 8px 20px rgba(31, 41, 55, 0.08);
}

.message-image-bubble {
  max-width: min(100%, 360px);
  overflow-x: auto;
}

.message-table-bubble {
  display: block;
  flex: 0 1 100%;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
  touch-action: pan-x;
  padding: 0;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid rgba(122, 150, 170, 0.16);
  border-radius: 18px;
  box-shadow: 0 14px 28px rgba(51, 65, 85, 0.12);
}

.message-inline-image {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.message-bubble :deep(a) {
  color: inherit;
  text-decoration: underline;
}

.message-bubble :deep(p) {
  margin: 0;
}

.message-bubble :deep(ul),
.message-bubble :deep(ol) {
  margin: 8px 0 0;
  padding-left: 18px;
}

.message-bubble :deep(.chat-response-table-wrap) {
  display: block;
  min-width: 0;
  max-width: 100%;
  padding: 14px 14px 10px;
}

.message-bubble :deep(.chat-response-table-title) {
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
  color: #26323f;
}

.message-bubble :deep(.chat-response-table-scroll) {
  display: block;
  width: 100%;
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
  touch-action: pan-x;
}

.message-bubble :deep(.chat-response-table) {
  width: max-content;
  min-width: max-content;
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
  font-size: 12px;
  background: #fff;
  border: 1px solid rgba(111, 151, 172, 0.16);
  border-radius: 12px;
}

.message-bubble :deep(.chat-response-table th) {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 10px 12px;
  text-align: left;
  vertical-align: top;
  min-width: 120px;
  white-space: normal;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #38505f;
  background: linear-gradient(180deg, #dff0f5, #d3e9f0);
  border-bottom: 1px solid rgba(111, 151, 172, 0.16);
  border-right: 1px solid rgba(111, 151, 172, 0.1);
}

.message-bubble :deep(.chat-response-table-heading) {
  display: block;
  line-height: 1.35;
}

.message-bubble :deep(.chat-response-table td) {
  padding: 12px;
  min-width: 120px;
  text-align: left;
  vertical-align: top;
  color: #334155;
  border-right: 1px solid rgba(111, 151, 172, 0.08);
  border-bottom: 1px solid rgba(111, 151, 172, 0.1);
  word-break: break-word;
}

.message-bubble :deep(.chat-response-table td.is-numeric) {
  min-width: 140px;
  text-align: right;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  color: #0f172a;
}

.message-bubble :deep(.chat-response-table tbody tr:nth-child(even)) {
  background: rgba(221, 240, 245, 0.18);
}

.message-bubble :deep(.chat-response-table tbody tr:hover) {
  background: rgba(211, 233, 240, 0.32);
}

.message-bubble :deep(.chat-response-table tbody tr:last-child td) {
  border-bottom: 0;
}

.message-bubble :deep(.chat-response-table th:last-child),
.message-bubble :deep(.chat-response-table td:last-child) {
  border-right: 0;
}

.message-me {
  justify-content: flex-end;
}

.message-me .message-bubble {
  color: #fff;
  background: linear-gradient(135deg, #2d91a5 0%, #2b8799 100%);
  border-bottom-right-radius: 8px;
}

.message-bot {
  justify-content: flex-start;
  min-width: 0;
}

.message-bot .message-bubble {
  color: #1f2937;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(134, 157, 174, 0.14);
  border-bottom-left-radius: 8px;
}

.message-bot .message-table-bubble {
  padding: 0;
  border-radius: 18px;
  max-width: min(100%, 680px);
}

.message-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 50%;
  background: linear-gradient(180deg, #fefefe, #eef6f8);
  border: 1px solid rgba(86, 153, 174, 0.2);
  box-shadow: 0 10px 20px rgba(47, 147, 167, 0.16);
}

.message-avatar img {
  width: 82%;
  height: 82%;
  object-fit: contain;
}

.chat-input {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 12px 14px;
  border-top: 1px solid rgba(205, 220, 230, 0.85);
  background: rgba(255, 255, 255, 0.9);
}

.chat-input-shell {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 8px;
  min-height: 52px;
  padding: 0 10px 0 18px;
  border: 1px solid #d2dce4;
  border-radius: 999px;
  background: #fff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.chat-input input {
  flex: 1;
  border: 0;
  padding: 14px 0;
  outline: none;
  font-size: 14px;
  color: #31414e;
  background: transparent;
}

.chat-input input::placeholder {
  color: #96a5b1;
}

.chat-input input:focus {
  border-color: transparent;
}

.chat-voice-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  min-width: 36px;
  height: 36px;
  border: 0;
  border-radius: 50%;
  padding: 0;
  color: #3a95a7;
  background: transparent;
}

.chat-voice-button svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.chat-voice-button.listening {
  color: #fff;
  background: #3a95a7;
  box-shadow: 0 0 0 4px rgba(58, 149, 167, 0.18);
  animation: voice-pulse 1s infinite ease-in-out;
}

.chat-voice-button.transcribing {
  color: #fff;
  background: #3a95a7;
  opacity: 0.6;
  cursor: wait;
}

.chat-voice-button:disabled {
  opacity: 0.45;
}

.chat-voice-button.unsupported {
  opacity: 0.65;
}

.chat-send-button {
  border: 0;
  width: 52px;
  min-width: 52px;
  height: 52px;
  border-radius: 50%;
  padding: 0;
  color: #fff;
  background: linear-gradient(135deg, #2f93a7 0%, #389fb0 100%);
  box-shadow: 0 12px 24px rgba(47, 147, 167, 0.28);
}

.chat-send-button svg {
  width: 22px;
  height: 22px;
  fill: currentColor;
}

.chat-send-button:disabled {
  opacity: 0.5;
  box-shadow: none;
}

.chat-trigger-area {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 104px;
  height: 104px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  touch-action: none;
  transition: left 0.22s ease, top 0.22s ease, opacity 0.22s ease;
  will-change: left, top;
}

.chat-trigger-area.is-dragging {
  transition: none;
}

.chat-fab {
  position: relative;
  width: 86px;
  height: 86px;
  border: 0;
  border-radius: 50%;
  padding: 0;
  cursor: pointer;
  background: transparent;
  box-shadow: none;
  transition: transform 0.22s ease, filter 0.22s ease;
}

.chat-fab-glow {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(
    circle at 35% 30%,
    #c9e8f0 0%,
    #6db8cc 46%,
    #4996aa 74%,
    #3d8a9e 100%
  );
  box-shadow: 0 0 0 8px rgba(73, 150, 170, 0.14),
    0 14px 28px rgba(73, 150, 170, 0.18), 0 0 24px rgba(73, 150, 170, 0.16);
}

.chat-fab-ring {
  position: absolute;
  inset: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(180deg, #52a3b8 0%, #4996aa 100%);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.45),
    0 0 14px rgba(73, 150, 170, 0.12);
}

.chat-fab-avatar-shell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  overflow: hidden;
  border-radius: 50%;
  background: #fff;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.9);
}

.chat-fab-avatar {
  width: 92%;
  height: 92%;
  object-fit: contain;
  object-position: center;
  transform: translateY(1px);
}

.chat-fab-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.chat-trigger-area.is-open .chat-fab {
  transform: translateY(-2px) scale(1.02);
  filter: brightness(1.05);
}

.chat-fab:active {
  transform: translateY(1px) scale(0.98);
}

.chat-pop-enter-active,
.chat-pop-leave-active {
  transition: all 0.2s ease;
}

.chat-pop-enter,
.chat-pop-enter-from,
.chat-pop-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@keyframes voice-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--ion-color-apps-rgb), 0.4);
  }

  70% {
    box-shadow: 0 0 0 8px rgba(var(--ion-color-apps-rgb), 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(var(--ion-color-apps-rgb), 0);
  }
}

@media (max-width: 576px) {
  .chat-window {
    top: calc(env(safe-area-inset-top, 0px) + 60px);
    right: 8px;
    left: 8px;
    bottom: 8px;
    width: auto;
    max-width: none;
    height: auto;
    max-height: calc(100vh - env(safe-area-inset-top, 0px) - 68px);
    border-radius: 18px;
  }

  .chat-messages {
    height: auto;
    min-height: 0;
    max-height: none;
    padding: 16px 10px 14px;
  }

  .chat-window-header {
    padding: 12px 14px;
  }

  .chat-window-brand-badge {
    width: 40px;
    height: 40px;
  }

  .message-bubble {
    max-width: calc(100vw - 112px);
    padding: 12px 14px;
  }

  .message-table-bubble {
    width: calc(100vw - 40px);
    max-width: calc(100vw - 40px);
  }

  .message-bubble :deep(.chat-response-table-wrap) {
    padding: 10px;
  }

  .message-bubble :deep(.chat-response-table-scroll) {
    margin: 0 -2px;
  }

  .message-bubble :deep(.chat-response-table th),
  .message-bubble :deep(.chat-response-table td) {
    min-width: 96px;
    padding: 10px;
  }

  .message-bubble :deep(.chat-response-table td.is-numeric) {
    min-width: 112px;
  }

  .message-avatar {
    width: 32px;
    height: 32px;
  }

  .chat-input {
    gap: 10px;
    padding: 10px;
  }

  .chat-input-shell {
    min-height: 48px;
    padding-left: 14px;
  }

  .chat-send-button {
    width: 48px;
    min-width: 48px;
    height: 48px;
  }

  .chat-trigger-area {
    width: 94px;
    height: 94px;
  }

  .chat-fab {
    width: 78px;
    height: 78px;
  }
}
</style>
