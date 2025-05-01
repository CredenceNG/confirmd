declare module 'qrcode.react' {
  export interface QRCodeProps {
    value: string
    size?: number
    level?: string
    bgColor?: string
    fgColor?: string
    style?: object
    includeMargin?: boolean
    renderAs?: 'svg' | 'canvas'
  }

  const QRCode: React.FC<QRCodeProps>

  export default QRCode
}
