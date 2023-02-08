import { Component, createSignal } from 'solid-js'
import { NetworkType, P2PPairingRequest, PostMessagePairingRequest } from '@airgap/beacon-types'
import styles from './styles.css'
import { render } from 'solid-js/web'

const [isOpen, setIsOpen] = createSignal<boolean>(false)
// EVENT HANDLERS
type VoidFunction = () => void
let dispose: null | VoidFunction = null

export interface AlertProps {}

export interface AlertButton {
  text: string
  style?: 'solid' | 'outline'
  actionCallback?(): Promise<void>
}

export interface AlertConfig {
  title: string
  body?: string
  data?: string
  timer?: number
  buttons?: AlertButton[]
  pairingPayload?: {
    p2pSyncCode: () => Promise<P2PPairingRequest>
    postmessageSyncCode: () => Promise<PostMessagePairingRequest>
    preferredNetwork: NetworkType
  }
  closeButtonCallback?(): void
  disclaimerText?: string
}

const chevronLeftIcon = (
  <svg
    fill="currentColor"
    stroke-width="0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    height="1em"
    width="1em"
    style="overflow: visible;"
  >
    <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"></path>
  </svg>
)
const logoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Guides"
    x="0"
    y="0"
    version="1.1"
    viewBox="0 0 179.2 43"
    width="140"
    height="40"
  >
    <path
      d="M45 19v.9c0 .3-.2 7.5-3.4 13.2-3.3 5.6-9.4 9.3-9.7 9.5l-.8.4-1.3-.8-7.6-4.4c-.5-.3-.9-.6-1.4-.9-.4-.3-.7-.5-1.1-.8-.8-.7-1.5-1.4-2.1-2.2-.9-1.1-1.6-2.4-2.1-3.7-.9-2.3-1.3-4.8-1.2-7.5.8-.4 1.6-.6 2.4-.6h.6c-.2 2.4.1 4.6.8 6.6 1 2.8 2.9 5.1 5.5 6.6l7.4 4.3c.2-.1.4-.2.6-.4 1.9-1.3 5.3-4.1 7.3-7.6 2.2-3.9 2.8-8.9 3-10.8L38.8 19c.3-1 .4-2.1.5-3.2L45 19z"
      class="st0"
    ></path>
    <path
      d="M36.3 4.1v10.3c0 .5 0 1.1-.1 1.6s-.1.9-.2 1.3c-.2 1-.5 2-.9 3-.5 1.3-1.3 2.6-2.2 3.7-1.5 1.9-3.5 3.6-5.9 4.8-.9-.6-1.6-1.3-2-2.4 2.1-1 3.9-2.3 5.2-4 1.9-2.3 3-5.1 3-8.1V5.9l-.6-.3c-2-1-6.1-2.6-10.1-2.6-4.5 0-9.1 2-10.9 2.9v3.6c-1 .3-2 .7-3 1.1V4.1l.8-.4C9.7 3.5 16 0 22.5 0s12.8 3.5 13.1 3.6l.7.5z"
      class="st0"
    ></path>
    <path
      d="M10.5 16.5l-7.4 4.3v.7c.2 2.1.9 6.5 2.9 10 2.2 3.9 6.2 6.9 7.9 8l3.1-1.8c.8.7 1.6 1.4 2.5 2L13.8 43l-.8-.5c-.3-.2-6.4-3.9-9.7-9.5C.1 27.4 0 20.2 0 19.9V19l1.3-.8L9 13.9c.5-.3.9-.5 1.4-.7.4-.2.8-.4 1.3-.5 1-.4 2-.6 3-.7 1.4-.2 2.9-.2 4.3 0 2.4.3 4.8 1.2 7.1 2.7 0 1-.4 2-1 2.9-1.9-1.3-4-2.2-6-2.5-3.1-.6-6-.1-8.6 1.4z"
      class="st0"
    ></path>
    <g>
      <path
        d="M73.9 23c.9 1 1.3 2.3 1.3 3.7 0 1.9-.6 3.4-1.9 4.5-1.3 1.1-3.1 1.7-5.5 1.7h-8.6v-23h8.4c2.3 0 4.1.5 5.3 1.5 1.2 1 1.8 2.4 1.8 4.2 0 1.5-.4 2.7-1.2 3.6-.8.9-1.8 1.5-3.1 1.8 1.5.3 2.6 1 3.5 2zm-11.7-3h5c1.5 0 2.6-.3 3.4-1 .8-.7 1.2-1.6 1.2-2.8 0-1.2-.4-2.1-1.1-2.8-.8-.7-1.9-1-3.5-1h-4.8V20zm8.7 9.4c.9-.7 1.3-1.7 1.3-3s-.4-2.3-1.3-3c-.9-.7-2.1-1.1-3.7-1.1h-5v8.2h5c1.6-.1 2.8-.4 3.7-1.1zM95.3 24.6H81c.1 2.1.6 3.6 1.7 4.6s2.4 1.5 4 1.5c1.4 0 2.6-.4 3.6-1.1 1-.7 1.6-1.7 1.8-2.9h3.2c-.2 1.2-.7 2.4-1.5 3.3-.8 1-1.7 1.7-2.9 2.3-1.2.5-2.6.8-4.1.8-1.7 0-3.2-.4-4.6-1.1-1.3-.7-2.4-1.8-3.1-3.2-.8-1.4-1.1-3-1.1-4.9 0-1.9.4-3.5 1.1-4.9.8-1.4 1.8-2.5 3.1-3.2 1.3-.7 2.9-1.1 4.6-1.1 1.7 0 3.3.4 4.6 1.1 1.3.7 2.3 1.7 3 3 .7 1.2 1 2.6 1 4.1.1.7 0 1.2-.1 1.7zm-3.5-4.8c-.5-.9-1.2-1.6-2.1-2-.9-.4-1.8-.7-2.8-.7-1.6 0-3 .5-4.1 1.5-1.1 1-1.7 2.5-1.8 4.5h11.5c0-1.3-.2-2.4-.7-3.3zM111.2 16c1.2.9 2.1 2 2.5 3.5V15h3v18h-3v-4.6c-.5 1.5-1.3 2.6-2.5 3.5-1.2.9-2.7 1.3-4.4 1.3-1.6 0-3-.4-4.3-1.1-1.2-.7-2.2-1.8-2.9-3.2-.7-1.4-1.1-3-1.1-4.9 0-1.9.4-3.5 1.1-4.9.7-1.4 1.7-2.5 2.9-3.2 1.2-.7 2.7-1.1 4.3-1.1 1.7-.1 3.1.4 4.4 1.2zm-8 3.1c-1.1 1.2-1.7 2.8-1.7 4.8 0 2.1.5 3.7 1.7 4.8 1.1 1.2 2.6 1.8 4.4 1.8 1.2 0 2.2-.3 3.2-.8.9-.5 1.7-1.3 2.2-2.3.5-1 .8-2.1.8-3.5 0-1.3-.3-2.5-.8-3.5s-1.2-1.8-2.2-2.3c-.9-.5-2-.8-3.2-.8-1.9.1-3.3.7-4.4 1.8zM135 16.6c1.5 1.2 2.4 2.9 2.8 4.9h-3.1c-.2-1.3-.8-2.3-1.8-3-1-.7-2.2-1.1-3.6-1.1-1 0-2 .2-2.9.7-.9.5-1.6 1.2-2.1 2.2-.5 1-.8 2.2-.8 3.7s.3 2.7.8 3.7 1.2 1.7 2.1 2.2c.9.5 1.8.7 2.9.7 1.4 0 2.6-.4 3.6-1.1 1-.7 1.6-1.8 1.8-3h3.1c-.3 2.1-1.3 3.7-2.8 4.9-1.5 1.2-3.4 1.8-5.7 1.8-1.7 0-3.2-.4-4.6-1.1-1.3-.7-2.4-1.8-3.1-3.2-.8-1.4-1.1-3-1.1-4.9 0-1.9.4-3.5 1.1-4.9.8-1.4 1.8-2.5 3.1-3.2 1.3-.7 2.9-1.1 4.6-1.1 2.3-.1 4.2.6 5.7 1.8zM154.5 15.9c1.4.7 2.4 1.8 3.2 3.2.8 1.4 1.2 3 1.2 4.9 0 1.9-.4 3.5-1.2 4.9-.8 1.4-1.8 2.4-3.2 3.2-1.4.7-2.9 1.1-4.6 1.1-1.7 0-3.3-.4-4.6-1.1-1.4-.7-2.4-1.8-3.2-3.2-.8-1.4-1.2-3-1.2-4.9 0-1.9.4-3.5 1.2-4.9.8-1.4 1.9-2.5 3.2-3.2 1.4-.7 2.9-1.1 4.6-1.1 1.7-.1 3.2.3 4.6 1.1zm-7.6 2.2c-.9.5-1.6 1.2-2.2 2.2-.6 1-.8 2.2-.8 3.7 0 1.4.3 2.7.8 3.6.6 1 1.3 1.7 2.2 2.2.9.5 1.9.7 3 .7s2.1-.2 3-.7c.9-.5 1.6-1.2 2.2-2.2.6-1 .8-2.2.8-3.6 0-1.5-.3-2.7-.8-3.7-.6-1-1.3-1.7-2.2-2.2-.9-.5-1.9-.7-3-.7s-2.1.2-3 .7zM177.3 16.7c1.3 1.3 1.9 3.3 1.9 5.8v10.4h-3V22.8c0-1.8-.5-3.2-1.4-4.1-.9-1-2.2-1.4-3.7-1.4-1.6 0-2.9.5-3.9 1.6s-1.5 2.6-1.5 4.6V33h-3V15h3v4.3c.5-1.5 1.3-2.6 2.4-3.4 1.2-.8 2.5-1.2 4-1.2 2.2 0 3.9.6 5.2 2z"
        class="st1"
      ></path>
    </g>
  </svg>
)
const closeIcon = (
  <svg
    fill="currentColor"
    stroke-width="0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    style="overflow: visible;"
  >
    <path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34Z"></path>
  </svg>
)

/**
 * Close an alert by ID
 *
 * @param id ID of alert
 */
const closeAlert = (id: string): Promise<void> => {
  return new Promise(async (resolve) => {
    if (dispose && isOpen()) {
      setIsOpen(false)
      setTimeout(() => {
        if (dispose) dispose()
        document.getElementById('beacon-toast-wrapper')?.remove()
      }, 500)
    }
    resolve()
  })
}

const Alert: Component<AlertProps> = (props: AlertProps) => {
  return (
    <div class={isOpen() ? 'wrapper-show' : 'wrapper-hide'}>
      <div class={isOpen() ? 'modal-show' : 'modal-hide'}>
        <div class="header">
          <div class="button-icon">{chevronLeftIcon}</div>
          <div class="logo">{logoIcon}</div>
          <div class="button-icon" onClick={() => closeAlert('')}>
            {closeIcon}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Alert

/**
 * Close all alerts
 */
const closeAlerts = async (): Promise<void> =>
  new Promise(async (resolve) => {
    console.log('closeAlerts')
    resolve()
  })

/**
 * Show an alert
 *
 * @param alertConfig The configuration of the alert
 */
// eslint-disable-next-line complexity
const openAlert = async (alertConfig: AlertConfig): Promise<string> => {
  if (!isOpen()) {
    const shadowRootEl = document.createElement('div')
    shadowRootEl.setAttribute('id', 'beacon-toast-wrapper')
    shadowRootEl.style.height = '0px'
    const shadowRoot = shadowRootEl.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = styles
    shadowRoot.appendChild(style)
    dispose = render(() => <Alert />, shadowRoot)
    document.body.prepend(shadowRootEl)
    setTimeout(() => {
      setIsOpen(true)
    }, 50)
  }
  return ''
}

export { closeAlert, closeAlerts, openAlert }
