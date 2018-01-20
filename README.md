# CryptoHide - Hiding a secret message inside an image

## What is CryptoHide?
CryptoHide is a simple JavaScript code that allows a user to hide a secret message within an image. Typical usage of CryptoHide is where two users need to communicate some private and secret information with each other with the following conditions:
1. No one knows/understand what they are talking about (achieved by **Cryptography**).
2. No one knows that they are even talking to each other! (achieved by **Steganography**).

## What is the difference between ***Cryptography*** and ***Steganography***?
**Cryptography** is the art/science of transfomring information/data from its original form into another unintelligible form that and vice versa. In order to perform that, some secret is required to do such processing (e.g. encryption/decryption key).

**Steganography** is the art of *hiding* information/data, in its plaintext form, in way that makes it hard for others to know that a data is hidden. (e.g. hiding data in image's pixels, hiding data in network packets, etc.)

## How CryptoHide do both Cryptogaphy and Steganography?
CryptoHide allows user to enter two inputs:
1. The secret message.
2. The encryption key.

Using the secret message (e.g. plaintext) and the encyption key, CryptoHide will perform AES encryption to produce a ciphertext. By this way, the data will be secured and no one can translate the ciphertext into plaintext without an access to the encryption key, which should be only with the transmitter and receiver.

The ciphertext will then be translated into a binary format (zeros and ones) and it will be embedded into the Least-Significant Bit (LSB) of each Red, Green & Blue channels of the image's pixels. Using the LSB will encsure that the modifed image look very similar to the original/unmodified version of the image.

At this time, the user will have an image that looks ordinary that can be sent to the recevier which will extract the ciphertext from the image's pixels and will use the encryption key to decrpyt the ciphertext to get the original secret message.

## How can I reuse CryptoHide code?
It is simple, follow these simple steps:
1. include *CryptoHide* folder into your project's folders.
2. In the html page where you want to use CryptoHide, include the javascript files like this:
```html
<script src="CryptoHide/aes.js"></script>
<script src="CryptoHide/Helper.js"></script>
<script src="CryptoHide/Convert.js"></script>
<script src="CryptoHide/CryptoHide.js"></script>
```
3. Use the following functions:
### To encrpyt and hide a secret message into an image:
```javascript
CryptoHide.Hide(image, data, key);
```
**Parameters:**
- *image*: html element (e.g. <img> element)
- *data*: the secret message (string)
- *key*: the secret key (string)
- **Return Value:** an image URI string corresponds to the modified (e.g. stego'ed) image.

### To extract and decrypt a secret message from an image:
```javascript
CryptoHide.Extract(image, key);
```
**Parameters:**
- *image*: html element (e.g. <img> element)
- *key*: the secret key (string)
- **Return Value:** the decrypted secret message in string format.

## Contact
Feel free to contact me on Twitter: [@AKhalil_90](https://twitter.com/AKhalil_90)
