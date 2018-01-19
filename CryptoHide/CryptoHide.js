var CryptoHide = {

  /* constant configuration values */
  Config: {
    PREAMBLE: [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0],
    POSTAMBLE: [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1],
    LSB: 7
  },

  /* encrypt data with a key and hides it in the LSB of each pixel of the image */
  Hide: function (image, data, key) {
    /* draw the input image into a canvas */
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    var context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);

    /* encrypt data */
    var encryptedData = CryptoJS.AES.encrypt(data, key).toString();

    /* convert encrypted data from string into binary */
    var binaryEncryptedData = Convert.StringToBinary(encryptedData);

    /* read image pixel values (RGBA channels) */
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);

    /* read image data without alpha channel values */
    var imgDataWithoutAlpha = new Array();
    for (var i = 0; i < imgData.data.length; i++) {
      if (i % 4 != 3)
        imgDataWithoutAlpha.push(imgData.data[i]);
    }

    /* embed pointer */
    var ptr = 0;

    /* embed preamble values */
    for (var i = 0; i < CryptoHide.Config.PREAMBLE.length; i++) {
      var binary = Convert.DecimalToBinary(imgDataWithoutAlpha[ptr], 8);
      binary = Helper.SetBit(binary, CryptoHide.Config.LSB, CryptoHide.Config.PREAMBLE[i]);
      imgDataWithoutAlpha[ptr++] = Convert.BinaryToDecimal(binary);
    }

    /* embed encrypted data as binary */
    for (var i = 0; i < binaryEncryptedData.length; i++) {
      var binary = Convert.DecimalToBinary(imgDataWithoutAlpha[ptr], 8);
      binary = Helper.SetBit(binary, CryptoHide.Config.LSB, binaryEncryptedData[i]);
      imgDataWithoutAlpha[ptr++] = Convert.BinaryToDecimal(binary);
    }

    /* embed postamble values */
    for (var i = 0; i < CryptoHide.Config.POSTAMBLE.length; i++) {
      var binary = Convert.DecimalToBinary(imgDataWithoutAlpha[ptr], 8);
      binary = Helper.SetBit(binary, CryptoHide.Config.LSB, CryptoHide.Config.POSTAMBLE[i]);
      imgDataWithoutAlpha[ptr++] = Convert.BinaryToDecimal(binary);
    }

    /* copy the image data back and set alpha channels to 255 */
    for (var i = 0, j = 0; i < imgData.data.length; i++) {
      if (i % 4 == 3) {
        imgData.data[i] = 255;
      }
      else {
        if (j < imgDataWithoutAlpha.length)
          imgData.data[i] = imgDataWithoutAlpha[j++];
      }
    }

    /* draw the stego image back into the canvas */
    context.putImageData(imgData, 0, 0);

    /* return image as dataURL in PNG format */
    return canvas.toDataURL("image/png");
  },

  /* extract hidden data from an image and decrypt it using the key */
  Extract: function (image, key) {
    /* draw the image in a canvas */
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    var context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);

    /* read the image pixel RGBA (red, green, blue, alpha) values */
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);

    /* extract LSB values from image data without alpha channel values */
    var imgDataWithoutAlpha = new Array();
    for (var i = 0; i < imgData.data.length; i++) {
      if (i % 4 != 3) {
        var binary = Convert.DecimalToBinary(imgData.data[i], 8);
        imgDataWithoutAlpha.push(Helper.GetBit(binary, CryptoHide.Config.LSB));
      }
    }

    /* check preamble values */
    for (var i = 0; i < CryptoHide.Config.PREAMBLE.length; i++){
      if (imgDataWithoutAlpha[i] != CryptoHide.Config.PREAMBLE[i]) {
        console.log("[CryptoHide] Couldn't find correct preamble values");
        return;
      }
    }

    /* check postamble values */
    var startIndex = Helper.FindSubArray(imgDataWithoutAlpha, CryptoHide.Config.POSTAMBLE);
    if (startIndex == -1) {
      console.log("[CryptoHide] Couldn't find correct postamble values");
      return;
    }

    /* read embedded data between postamble and preamble as binary */
    var data = "";
    for (var i = CryptoHide.Config.PREAMBLE.length; i < startIndex; i++) {
      data += imgDataWithoutAlpha[i];
    }

    /* convert extracted data from binary into string */
    var stringData = Convert.BinaryToString(data);

    /* decrypt extracted data */
    var plaintext = CryptoJS.AES.decrypt(stringData, key).toString(CryptoJS.enc.Utf8);

    // return decrypted data
    return plaintext;
  }
};
