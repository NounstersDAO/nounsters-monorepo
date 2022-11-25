import { PNGCollectionEncoder, PngImage } from '@nouns/sdk';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { promises as fs } from 'fs';
import { PNG } from 'pngjs';
import path from 'path';

const DESTINATION = path.join(__dirname, '../src/image-data.json');

/**
 * Read a PNG image file and return a `PngImage` object.
 * @param path The path to the PNG file
 */
const readPngImage = async (path: string): Promise<PngImage> => {
  const buffer = await fs.readFile(path);
  const png = PNG.sync.read(buffer);

  return {
    width: png.width,
    height: png.height,
    rgbaAt: (x: number, y: number) => {
      const idx = (png.width * y + x) << 2;
      const [r, g, b, a] = [png.data[idx], png.data[idx + 1], png.data[idx + 2], png.data[idx + 3]];
      return {
        r,
        g,
        b,
        a,
      };
    },
  };
};


const checkNameForIndex = (encoder: PNGCollectionEncoder, index: number) => {
  const images = encoder.images;
  for (var i = 0; i < images.length; i++) {
    const traitID = parseInt(images[i].filename.split("-")[0]);
    if (traitID == index)
      return i;
  }
}

function compareNumbers(a: number, b: number) {
  return a - b;
}

const encodeMonsterKeys = (parts: number[][][], encoder: PNGCollectionEncoder) => {
  var encodedKeys = [];
  var traitLengths = [];
  var sortedParts: number[];

  // for (var k = 0; k < parts.length; k++) {
  //   for (var i = 0; i < 4; i++) {
  //     for (var j = 0; j < parts[k][i].length; j++) {

  //     }
  //   }
  // }

  for (var k = 0; k < parts.length; k++) {
    var monsterParts = [];
    var partLengths = [];
    for (var i = 0; i < 4; i++) {
      var bodyParts = [];
      partLengths.push(parts[k][i].length)
      var partsCount = 0;
      var page = 0;
      var newParts: number[] = [];
      for (var z = 0; z < parts[k][i].length; z++) {
        const index = checkNameForIndex(encoder, parts[k][i][z]);
        if (index != undefined) {
          newParts.push(index)
          newParts.join()
          newParts.sort(compareNumbers);
        }

      }
      while (partsCount < newParts.length) {
        //console.log(k, parts[k][i].length)
        var shiftIDString = BigNumber.from(1);
        var shiftCount = 1;
        for (var j = (page * 254); j < ((page * 254) + 254); j++) {
          var imageIndex = newParts[partsCount];
          if (imageIndex == undefined) {
            shiftCount = ((page * 254) + 254) - j
            break;
          }

          if (imageIndex == j) {
            shiftIDString = BigNumber.from(shiftIDString).shl(shiftCount).add(1);
            shiftCount = 1;
            partsCount += 1;
          }
          else
            shiftCount++;
        }
        shiftIDString = BigNumber.from(shiftIDString).shl(shiftCount).add(1);
        bodyParts.push(shiftIDString.toHexString());
        page++;
      }
      monsterParts.push(bodyParts);
    }
    traitLengths.push(partLengths);
    encodedKeys.push(monsterParts);
  }
  return [encodedKeys, traitLengths];
  //endcodedKeys[][][]
  // encodedKeys[0] == All Aberration Traits (aberration[][])
  // NounsterType[0] == All Aberration Body keys (bodies[])
  // Body[0] = The first body key
  // Acc
  // Head
  // Glasses
}

const manualPalette = ["fefefe", "010101", "c5b9a1", "cfc2ab", "63a0f9", "807f7e", "caeff9", "5a423f", "cbc1bc", "b87b11", "fffdf2", "1f1d29", "4b4949", "343235", "867c1d", "ae3208", "9f21a0", "fd8b5b", "d26451", "5a65fa", "d22209", "e9265c", "c54e38", "80a72d", "34ac80", "eed811", "ffffff", "5648ed", "b9185c", "068940", "f98f30", "fe500c", "4bea69", "ff638d", "000000", "ff0e0e", "0adc4d", "1929f4", "2b83f6", "8dd122", "257ced", "9cb4b8", "e8705b", "d19a54", "cc0595", "f3322c", "d7d3cd", "fdf8ff", "ec5b43", "ffc110", "ffef16"];


const encodeFresh = async () => {
  const encoder = new PNGCollectionEncoder(manualPalette);
  var monsterKeys = [];

  const monsterfolders = ['aberration', 'beast', 'celestial', 'construct', 'dragon', 'elemental', 'fey', 'fiend', 'giant', 'monstrosity', 'ooze', 'plant', 'undead'];

  const partfolders = ['1-bodies', '2-accessories', '3-heads', '4-glasses'];
  var uniqueTraits: number[][] = [[], [], [], []];
  for (const monfold of monsterfolders) {
    var monsterKey = [];
    var traitType = 0;
    for (const folder of partfolders) {
      var monsterPart = [];
      const folderpath = path.join(__dirname, '../images', monfold, folder);
      const files = await fs.readdir(folderpath);
      for (const file of files) {
        //Read the filename, grab the trait ID
        const traitID = parseInt(file.split("-")[0]);
        monsterPart.push(traitID);
        var unique = true;
        for (var trait of uniqueTraits[traitType]) {
          if (trait == traitID) {
            unique = false;
          }
        }
        if (unique) {
          uniqueTraits[traitType].push(traitID);
          const image = await readPngImage(path.join(folderpath, file));
          encoder.encodeImage(file.replace(/\.png$/, ''), image, folder.replace(/^\d-/, ''));
        }
      }
      monsterKey.push(monsterPart);
      traitType++;
    }
    monsterKeys.push(monsterKey);
  }
  const encodedMonsterKeys = encodeMonsterKeys(monsterKeys, encoder);

  await fs.writeFile(
    DESTINATION,
    JSON.stringify(
      {
        nounstertypes: encodedMonsterKeys[0],
        nounsterlengths: encodedMonsterKeys[1],
        bgcolors: ['d5d7e1', 'e1d7d5'],
        ...encoder.data,
      },
      null,
      2,
    ),
  );

}

encodeFresh();
