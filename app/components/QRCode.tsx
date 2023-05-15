import { QRCodeSVG } from "qrcode.react";

interface Props {
  value: string;
}
export const QRCode = ({ value }: Props) => (
  <QRCodeSVG value={value} width={100} height={100} bgColor="transparent" />
);
