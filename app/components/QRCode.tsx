import { QRCodeSVG } from "qrcode.react";

export const QRCode = () => {
  return (
    <QRCodeSVG
      value="blablabla"
      width={100}
      height={100}
      bgColor="transparent"
    />
  );
};
