import { BN } from "bn.js";

export class CurveParams {
  Name: string;
  P: InstanceType<typeof BN>;
  N: InstanceType<typeof BN>;
  B: InstanceType<typeof BN>;
  Gx: InstanceType<typeof BN>;
  Gy: InstanceType<typeof BN>;
  BitSize: number;
  constructor(
    name: string,
    p: InstanceType<typeof BN>,
    n: InstanceType<typeof BN>,
    b: InstanceType<typeof BN>,
    gx: InstanceType<typeof BN>,
    gy: InstanceType<typeof BN>,
    bitSize: number
  ) {
    this.Name = name;
    this.P = p;
    this.N = n;
    this.B = b;
    this.Gx = gx;
    this.Gy = gy;
    this.BitSize = bitSize;
  }
}

export const p256CurveParams = new CurveParams(
  "P-256",
  new BN(
    "115792089210356248762697446949407573530086143415290314195533631308867097853951",
    10
  ),
  new BN(
    "115792089210356248762697446949407573529996955224135760342422259061068512044369",
    10
  ),
  new BN(
    "5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b",
    16
  ),
  new BN(
    "6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296",
    16
  ),
  new BN(
    "4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5",
    16
  ),
  256
);
