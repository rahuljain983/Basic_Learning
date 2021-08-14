const crypto = require('crypto');
const { text } = require('express');

const algorithm = 'aes-256-ctr';
const secretKey = process.env.secretKey;
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3' , iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
}

const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algorithm, 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3', Buffer.from(hash.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
}

module.exports = {encrypt , decrypt};