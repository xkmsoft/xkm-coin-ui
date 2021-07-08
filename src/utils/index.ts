import { ec } from "elliptic";
import { useStore } from "@/store";
const EC = new ec("p256");
import sha256 from "crypto-js/sha256";
// @ts-ignore
import * as asn1 from "asn1.js";
import { DateTime } from "luxon";
import { p256CurveParams } from "@/utils/types";
import { BN } from "bn.js";

// ECDSA (OID)
const ALGORITHM = [1, 2, 840, 10045, 2, 1];
// P256 Curve (OID)
const P256 = [1, 2, 840, 10045, 3, 1, 7];
// Version
const VERSION = 1;
// Private Label
const PRIVATE_LABEL = "EC PRIVATE KEY";
// Public Label
const PUBLIC_LABEL = "PUBLIC KEY";

const ECPrivateKeyASN = asn1.define("ECPrivateKey", function () {
  // @ts-ignore
  const self = this as any;
  self
    .seq()
    .obj(
      self.key("version").int().def(0),
      self.key("privateKey").octstr(),
      self.key("parameters").explicit(0).objid().optional(),
      self.key("publicKey").explicit(1).bitstr().optional()
    );
});

const ECPublicKeyASN = asn1.define("PublicKey", function () {
  // @ts-ignore
  const self = this as any;
  self
    .seq()
    .obj(
      self
        .key("algorithm")
        .seq()
        .obj(self.key("id").objid(), self.key("curve").objid()),
      self.key("pub").bitstr()
    );
});

export const generateKeyPair = (): ec.KeyPair => {
  return EC.genKeyPair();
};

export const getKeyPairFromPrivate = (
  privateKey: string | Uint8Array
): ec.KeyPair => {
  return EC.keyFromPrivate(privateKey);
};

export const getKeyPairFromPublic = (publicKey: string): ec.KeyPair | null => {
  const compressedBytes = hexToBytes(publicKey);

  if (compressedBytes.length != 33) {
    console.error("Invalid address length");
    return null;
  }
  const sign = compressedBytes[0];
  if (sign != 2 && sign != 3) {
    console.error("Invalid sign byte");
    return null;
  }

  const xHex = publicKey.slice(2);
  const bigX = new BN(xHex, 16);

  const constant = new BN(3, 10);

  // The equation is y^2 = x^3 - 3x + b

  // x^3 mod P
  const red = BN.red(p256CurveParams.P);
  const xCubed = bigX.toRed(red).redPow(constant).fromRed();

  // 3x mod P
  const threeX = bigX.mul(constant).umod(p256CurveParams.P);

  // x^3 - 3x
  let ySquared = xCubed.sub(threeX);

  // b mod p
  ySquared = ySquared.add(p256CurveParams.B).umod(p256CurveParams.P);

  // Now we need to find the square root mod P.
  try {
    let bigY = ySquared.toRed(red).redSqrt().fromRed();
    // @ts-ignore
    const firstBit = bigY.words[0] & 1;
    if (firstBit != (sign & 1)) {
      bigY = bigY.toRed(red).redNeg();
    }
    return EC.keyFromPublic({
      x: bigX.toString(16),
      y: bigY.toString(16),
    });
  } catch (e) {
    console.error(`Invalid point: ${e}`);
  }
  return null;
};

export const getPublicPEM = (privateKey: string): string => {
  const keyPair = getKeyPairFromPrivate(privateKey);
  return encodePublicKeyToPEM(keyPair);
};

export const getPrivatePEM = (privateKey: string): string => {
  const keyPair = getKeyPairFromPrivate(privateKey);
  return encodePrivateKeyToPEM(keyPair);
};

const encodePrivateKeyToPEM = (keyPair: ec.KeyPair): string => {
  const data = {
    version: VERSION,
    parameters: P256,
    publicKey: { data: new Buffer(keyPair.getPublic("array")) },
    privateKey: new Buffer(keyPair.getPrivate().toArray()),
  };
  return ECPrivateKeyASN.encode(data, "pem", { label: PRIVATE_LABEL });
};

export const decodePrivatePEM = (data: string): Uint8Array => {
  try {
    const decoded = ECPrivateKeyASN.decode(data, "pem", {
      label: PRIVATE_LABEL,
    });
    if (decoded.version.toNumber() !== VERSION) {
      throw Error(`Wrong version: ${decoded.version.toNumber()}`);
    }
    if (!arraysMatch(decoded.parameters, P256)) {
      throw Error(`Wrong Curve OID: ${decoded.parameters}`);
    }
    // Private key must be 32 bytes
    if (decoded.privateKey.length !== 32) {
      throw Error(`Wrong Private Key Size: ${decoded.privateKey.length}`);
    }
    return decoded.privateKey;
  } catch (e) {
    throw Error(e);
  }
};

const arraysMatch = (arr1: Array<number>, arr2: Array<number>): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

const encodePublicKeyToPEM = (keyPair: ec.KeyPair): string => {
  const data = {
    algorithm: {
      id: ALGORITHM,
      curve: P256,
    },
    pub: {
      unused: 0,
      data: new Buffer(keyPair.getPublic("array")),
    },
  };
  return ECPublicKeyASN.encode(data, "pem", { label: PUBLIC_LABEL });
};

export const decodePublicPEM = (data: string): Uint8Array => {
  try {
    const decoded = ECPublicKeyASN.decode(data, "pem", { label: PUBLIC_LABEL });
    return decoded.pub;
  } catch (e) {
    throw new Error(e);
  }
};

export const toHexString = (data: string): string => {
  return Array.from(data, (byte: any) => {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
};

export const hexToBytes = (hex: string): number[] => {
  const bytes = [];
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return bytes;
};

export const hashMessage = (data: string): string => {
  return sha256(data).toString();
};

export const signData = (data: string): string => {
  const store = useStore();
  if (store.state.privateKey === null) {
    return "";
  }
  const pair = getKeyPairFromPrivate(store.state.privateKey);
  return toHexString(pair.sign(data).toDER());
};

export const formatDateSec = (
  timestamp: number,
  format = "dd.MM.yyyy HH:mm:ss"
): string => {
  return DateTime.fromSeconds(timestamp).toFormat(format);
};

export const formatDateMils = (
  timestamp: number,
  format = "dd.MM.yyyy HH:mm:ss"
): string => {
  return DateTime.fromMillis(timestamp).toFormat(format);
};
