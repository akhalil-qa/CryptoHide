var Convert = {

  /* convert string to binary */
  StringToBinary: function (input) {
    var pad = '00000000';
    return input.replace(/./g, function (c) {
        var bin = c.charCodeAt(0).toString(2);
        return pad.substring(bin.length) + bin;
    });
  },

  /* convert binary to string */
  BinaryToString: function (input) {
    return input.replace(/[01]{8}/g, function (v) {
      return String.fromCharCode(parseInt(v, 2));
    });
  },

  /* convert decimal to binary */
  DecimalToBinary: function (decimal, length) {
    var out = "";
    while(length--)
      out += (decimal >> length ) & 1;
    return out;
  },

  /* convery binary to decimal */
  BinaryToDecimal: function (binary) {
    return parseInt(binary, 2);
  }
};
