const forge = require("node-forge");
const { ENCRYPTION_KEY, INITIAL_VOLT } = require("./globalConfig");

const encryptPromoCode = (promoCode) => {
  const cipher = forge.cipher.createCipher("AES-CBC", ENCRYPTION_KEY);
  cipher.start({ iv: INITIAL_VOLT });
  cipher.update(forge.util.createBuffer(promoCode));
  cipher.finish();
  const encrypted = cipher.output;
  console.log(`Encrypted Version of ${promoCode}:`, encrypted.toHex());
};

// Used to decryption of code
const decryptPromoCode = (encryptedHex) => {
  const encryptedBytes = forge.util.hexToBytes(encryptedHex);
  const decipher = forge.cipher.createDecipher("AES-CBC", ENCRYPTION_KEY);
  decipher.start({ iv: INITIAL_VOLT });
  decipher.update(forge.util.createBuffer(encryptedBytes));
  const decrypted = decipher.finish();

  if (decrypted === false) {
    throw new Error("Decryption failed");
  }

  console.log(
    `Decrypted Version of ${encryptedHex}:`,
    decipher.output.toString()
  );
};

decryptPromoCode("a0c16417b64764ad08eecfae490c6890");
encryptPromoCode("vrg1wh");

exports.securityUtils = {
  encryptPromoCode,
  decryptPromoCode,
};
