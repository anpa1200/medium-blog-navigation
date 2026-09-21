// Read dimensions/format only; do not decode, alter or transcode image pixels.
export function imageMetadata(bytes){
  if(bytes.length>=24&&bytes.subarray(0,8).toString('hex')==='89504e470d0a1a0a'&&bytes.toString('ascii',12,16)==='IHDR'){
    const width=bytes.readUInt32BE(16),height=bytes.readUInt32BE(20);
    if(!width||!height)throw Error('Invalid PNG dimensions');
    return {format:'png',width,height};
  }
  if(bytes.length>=4&&bytes.readUInt16BE(0)===0xffd8){
    let offset=2;
    while(offset<bytes.length){
      if(bytes[offset++]!==0xff)break;
      while(offset<bytes.length&&bytes[offset]===0xff)offset++;
      const marker=bytes[offset++];
      if(marker===0xd9||marker===0xda)break;
      if(marker===0x01||(marker>=0xd0&&marker<=0xd7))continue;
      if(offset+2>bytes.length)break;
      const length=bytes.readUInt16BE(offset);
      if(length<2||offset+length>bytes.length)break;
      if([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)){
        if(length<8)break;
        const height=bytes.readUInt16BE(offset+3),width=bytes.readUInt16BE(offset+5);
        if(!width||!height)throw Error('Invalid JPEG dimensions');
        return {format:'jpeg',width,height};
      }
      offset+=length;
    }
  }
  throw Error('Unsupported or malformed PNG/JPEG header');
}
