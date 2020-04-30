import { openToast } from './alert/Toast'
import { openAlert, AlertConfig } from './alert/Alert'
import { getQrData } from './utils/qr'
import { Logger } from './utils/Logger'
import { Transport } from './transports/Transport'
import { BeaconError } from './errors/BeaconError'
import { P2PPairInfo, AccountInfo, BeaconErrorMessage, UnknownBeaconError } from '.'

const logger = new Logger('BeaconEvents')

export enum BeaconEvent {
  PERMISSION_REQUEST_SENT = 'PERMISSION_REQUEST_SENT',
  PERMISSION_REQUEST_ERROR = 'PERMISSION_REQUEST_ERROR',
  OPERATION_REQUEST_SENT = 'OPERATION_REQUEST_SENT',
  OPERATION_REQUEST_ERROR = 'OPERATION_REQUEST_ERROR',
  SIGN_REQUEST_SENT = 'SIGN_REQUEST_SENT',
  SIGN_REQUEST_ERROR = 'SIGN_REQUEST_ERROR',
  BROADCAST_REQUEST_SENT = 'BROADCAST_REQUEST_SENT',
  BROADCAST_REQUEST_ERROR = 'BROADCAST_REQUEST_ERROR',

  LOCAL_RATE_LIMIT_REACHED = 'LOCAL_RATE_LIMIT_REACHED',

  NO_PERMISSIONS = 'NO_PERMISSIONS',

  ACTIVE_ACCOUNT_SET = 'ACTIVE_ACCOUNT_SET',

  ACTIVE_TRANSPORT_SET = 'ACTIVE_TRANSPORT_SET',

  P2P_CHANNEL_CONNECT_SUCCESS = 'P2P_CHANNEL_CONNECT_SUCCESS',
  P2P_LISTEN_FOR_CHANNEL_OPEN = 'P2P_LISTEN_FOR_CHANNEL_OPEN',

  UNKNOWN = 'UNKNOWN'
}

export interface BeaconEventType {
  [BeaconEvent.PERMISSION_REQUEST_SENT]: undefined
  [BeaconEvent.PERMISSION_REQUEST_ERROR]: BeaconErrorMessage
  [BeaconEvent.OPERATION_REQUEST_SENT]: undefined
  [BeaconEvent.OPERATION_REQUEST_ERROR]: BeaconErrorMessage
  [BeaconEvent.SIGN_REQUEST_SENT]: undefined
  [BeaconEvent.SIGN_REQUEST_ERROR]: BeaconErrorMessage
  [BeaconEvent.BROADCAST_REQUEST_SENT]: undefined
  [BeaconEvent.BROADCAST_REQUEST_ERROR]: BeaconErrorMessage
  [BeaconEvent.PERMISSION_REQUEST_SENT]: undefined
  [BeaconEvent.LOCAL_RATE_LIMIT_REACHED]: undefined
  [BeaconEvent.NO_PERMISSIONS]: undefined
  [BeaconEvent.ACTIVE_ACCOUNT_SET]: AccountInfo
  [BeaconEvent.ACTIVE_TRANSPORT_SET]: Transport
  [BeaconEvent.P2P_CHANNEL_CONNECT_SUCCESS]: undefined
  [BeaconEvent.P2P_LISTEN_FOR_CHANNEL_OPEN]: P2PPairInfo
  [BeaconEvent.UNKNOWN]: undefined
}

const showSentToast = async (): Promise<void> => {
  openToast({ body: 'Request sent', timer: 3000 }).catch((toastError) => console.error(toastError))
}

const showNoPermissionAlert = async (): Promise<void> => {
  await openAlert({
    title: 'No permissions',
    body: 'Please allow the wallet to handle this type of request.'
  })
}

const showErrorAlert = async (beaconError: BeaconErrorMessage): Promise<void> => {
  const error = beaconError.errorType
    ? BeaconError.getError(beaconError.errorType)
    : new UnknownBeaconError()

  await openAlert({
    title: error.title,
    body: error.description
  })
}

const showRateLimitReached = async (): Promise<void> => {
  openToast({
    body: 'Rate limit reached. Please slow down',
    timer: 3000
  }).catch((toastError) => console.error(toastError))
}

const showOkAlert = async (): Promise<void> => {
  await openAlert({
    title: 'Success',
    confirmButtonText: 'Ok!',
    timer: 1500
  })
}

const showQrCode = async (
  data: BeaconEventType[BeaconEvent.P2P_LISTEN_FOR_CHANNEL_OPEN]
): Promise<void> => {
  const alertConfig: AlertConfig = {
    title: 'Pairing Request',
    confirmButtonText: 'Ok!',
    body: getQrData(JSON.stringify(data), 'svg'),
    successCallback: () => {
      console.log('CALLBACK')
    }
  }
  await openAlert(alertConfig)
}

const emptyHandler = (eventType: BeaconEvent): BeaconEventHandlerFunction => async (
  data?: unknown
): Promise<void> => {
  logger.log('emptyHandler', eventType, data)
}

export type BeaconEventHandlerFunction<T = unknown> = (data: T) => void | Promise<void>

export const defaultEventCallbacks: {
  [key in BeaconEvent]: BeaconEventHandlerFunction<BeaconEventType[key]>
} = {
  [BeaconEvent.PERMISSION_REQUEST_SENT]: showSentToast,
  [BeaconEvent.PERMISSION_REQUEST_ERROR]: showErrorAlert,
  [BeaconEvent.OPERATION_REQUEST_SENT]: showSentToast,
  [BeaconEvent.OPERATION_REQUEST_ERROR]: showErrorAlert,
  [BeaconEvent.SIGN_REQUEST_SENT]: showSentToast,
  [BeaconEvent.SIGN_REQUEST_ERROR]: showErrorAlert,
  [BeaconEvent.BROADCAST_REQUEST_SENT]: showSentToast,
  [BeaconEvent.BROADCAST_REQUEST_ERROR]: showErrorAlert,
  [BeaconEvent.LOCAL_RATE_LIMIT_REACHED]: showRateLimitReached,
  [BeaconEvent.NO_PERMISSIONS]: showNoPermissionAlert,
  [BeaconEvent.ACTIVE_ACCOUNT_SET]: emptyHandler(BeaconEvent.ACTIVE_ACCOUNT_SET),
  [BeaconEvent.ACTIVE_TRANSPORT_SET]: emptyHandler(BeaconEvent.ACTIVE_TRANSPORT_SET),
  [BeaconEvent.P2P_CHANNEL_CONNECT_SUCCESS]: showOkAlert,
  [BeaconEvent.P2P_LISTEN_FOR_CHANNEL_OPEN]: showQrCode,
  [BeaconEvent.UNKNOWN]: emptyHandler(BeaconEvent.UNKNOWN)
}

export class BeaconEventHandler {
  private readonly callbackMap: {
    [key in BeaconEvent]: BeaconEventHandlerFunction<any>[]
  } = {
    [BeaconEvent.PERMISSION_REQUEST_SENT]: [defaultEventCallbacks.PERMISSION_REQUEST_SENT],
    [BeaconEvent.PERMISSION_REQUEST_ERROR]: [defaultEventCallbacks.PERMISSION_REQUEST_ERROR],
    [BeaconEvent.OPERATION_REQUEST_SENT]: [defaultEventCallbacks.OPERATION_REQUEST_SENT],
    [BeaconEvent.OPERATION_REQUEST_ERROR]: [defaultEventCallbacks.OPERATION_REQUEST_ERROR],
    [BeaconEvent.SIGN_REQUEST_SENT]: [defaultEventCallbacks.SIGN_REQUEST_SENT],
    [BeaconEvent.SIGN_REQUEST_ERROR]: [defaultEventCallbacks.SIGN_REQUEST_ERROR],
    [BeaconEvent.BROADCAST_REQUEST_SENT]: [defaultEventCallbacks.BROADCAST_REQUEST_SENT],
    [BeaconEvent.BROADCAST_REQUEST_ERROR]: [defaultEventCallbacks.BROADCAST_REQUEST_ERROR],
    [BeaconEvent.LOCAL_RATE_LIMIT_REACHED]: [defaultEventCallbacks.LOCAL_RATE_LIMIT_REACHED],
    [BeaconEvent.NO_PERMISSIONS]: [defaultEventCallbacks.NO_PERMISSIONS],
    [BeaconEvent.ACTIVE_ACCOUNT_SET]: [defaultEventCallbacks.ACTIVE_ACCOUNT_SET],
    [BeaconEvent.ACTIVE_TRANSPORT_SET]: [defaultEventCallbacks.ACTIVE_TRANSPORT_SET],
    [BeaconEvent.P2P_CHANNEL_CONNECT_SUCCESS]: [defaultEventCallbacks.P2P_CHANNEL_CONNECT_SUCCESS],
    [BeaconEvent.P2P_LISTEN_FOR_CHANNEL_OPEN]: [defaultEventCallbacks.P2P_LISTEN_FOR_CHANNEL_OPEN],
    [BeaconEvent.UNKNOWN]: [defaultEventCallbacks.UNKNOWN]
  }

  public async on<K extends BeaconEvent>(
    event: K,
    eventCallback: BeaconEventHandlerFunction<BeaconEventType[K]>
  ): Promise<void> {
    const listeners = this.callbackMap[event] || []
    listeners.push(eventCallback)
    this.callbackMap[event] = listeners
  }

  public async emit<K extends BeaconEvent>(event: K, data?: BeaconEventType[K]): Promise<void> {
    const listeners = this.callbackMap[event]
    if (listeners && listeners.length > 0) {
      listeners.forEach(async (listener: BeaconEventHandlerFunction) => {
        try {
          await listener(data)
        } catch (listenerError) {
          logger.error(`error handling event ${event}`, listenerError)
        }
      })
    }
  }

  public async overrideDefaults(
    eventsToOverride: {
      [key in BeaconEvent]?: {
        handler: BeaconEventHandlerFunction
      }
    }
  ): Promise<void> {
    Object.keys(eventsToOverride).forEach((untypedEvent: string) => {
      const eventType: BeaconEvent = untypedEvent as BeaconEvent
      const event = eventsToOverride[eventType]
      if (event) {
        this.callbackMap[eventType] = [event.handler]
      }
    })
  }
}
