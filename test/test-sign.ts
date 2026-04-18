import { createHmac, randomBytes } from "crypto";

type VerifyResult<T = any> = {
  code: number;
  msg: string;
  data?: T;
};

/**
 * API Key 签名器
 * 用于生成和校验 API Key
 */
export class ApiKeySigner {
  private secret: string;

  constructor(secret: string) {
    // 强制 32位 key（不够自动补）
    this.secret = secret;
  }

  /** base64 */
  private b64Encode(str: string) {
    return Buffer.from(str).toString("base64");
  }

  private b64Decode(str: string) {
    return Buffer.from(str, "base64").toString("utf-8");
  }

  /** HMAC签名 */
  private sign(data: string) {
    return createHmac("md5", this.secret)
      .update(data)
      .digest("hex");
  }

  /** XOR可逆混淆 */
  private xor(data: string,secret: string) {
    const key = Buffer.from(secret);
    const buf = Buffer.from(data);
    const out = Buffer.alloc(buf.length);

    for (let i = 0; i < buf.length; i++) {
      out[i] = buf[i] ^ key[i % key.length];
    }

    return out.toString("base64url");
  }

  private xorDecode(data: string,secret: string) {
    const key = Buffer.from(secret);
    const buf = Buffer.from(data, "base64url");

    const out = Buffer.alloc(buf.length);

    for (let i = 0; i < buf.length; i++) {
      out[i] = buf[i] ^ key[i % key.length];
    }

    return out.toString("utf-8");
  }

  /** 
   * 生成 apiKey => signature.payload
   * @param input 输入数据
   * @returns apiKey
   * */
  generate(input: string) {
    const base64 = this.b64Encode(input);

    const signature = this.sign(base64);

    const obfuscated = this.xor(base64,signature);

    return `${signature}.${obfuscated}`;
  }

  /** 
   * 校验 apiKey
   * @param apiKey apiKey
   * @returns 校验结果
   * */
  verify(apiKey: string): VerifyResult {
    try {
      const [signature, payload] = apiKey.split(".");

      if (!signature || !payload) {
        return { code: 400, msg: "invalid format" };
      }

      // 还原 base64
      const base64 = this.xorDecode(payload,signature);

      // 验签
      const expected = this.sign(base64);

      if (expected !== signature) {
        return { code: 401, msg: "signature mismatch" };
      }

      const data = this.b64Decode(base64);

      return {
        code: 200,
        msg: "ok",
        data,
      };
    } catch (e: any) {
      return {
        code: 500,
        msg: e?.message || "verify error",
      };
    }
  }

  /** 获取当前 key */
  getSecret() {
    return this.secret;
  }
}

const signer = new ApiKeySigner("looplanxxaws21nm1231gnmn2jkhkj53");

const apiKey = signer.generate("123123");
console.log("apiKey:", apiKey);
const result = signer.verify(apiKey);
console.log(result);
