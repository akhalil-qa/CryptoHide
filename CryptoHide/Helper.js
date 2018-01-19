var Helper = {

  /* find start position of subarray within an array  */
  FindSubArray: function (array, subarray) {
    var i = 0 >>> 0,
        sl = subarray.length,
        l = array.length + 1 - sl;

    loop: for (; i<l; i++) {
        for (var j=0; j<sl; j++)
          if (array[i+j] != subarray[j])
            continue loop;
        return i; // start position of subarray
    }
    return -1; // if subarray is not found
  },

  /* set bit value in a binary representation */
  SetBit: function (binary, bitIndex, value) {
    if (bitIndex > binary.length-1)
      return binary;

    return binary.substr(0,bitIndex) + value + binary.substr(bitIndex+1);
  },

  /* read bit value in a binary representation */
  GetBit: function (binary, bitIndex) {
    return binary[bitIndex];
  }
};
