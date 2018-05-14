export default class XMLParser {

  static fromObj(obj, root, schemaPath) {
    let r = '';

    for (let key in obj) {
      if (obj[key] instanceof Array) {
        let eltKey = key.substr(0, key.length-1);

        r += `<${key}>`;

        for (let i=0; i<obj[key].length; i++) {
          if (obj[key][i] instanceof Object) {
            r += "\n" + `<${eltKey}>` + "\n" + XMLParser.fromObj(obj[key][i]) + "\n" + `</${eltKey}>`;
          } else {
            r += "\n" + `<${eltKey}>${obj[key][i]}</${eltKey}>`;
          }
        }

        r += "\n</" + key + '>';
      }
      else if (obj[key] instanceof Object) {
        r += `<${key}>` + "\n" + XMLParser.fromObj(obj[key]) + "\n</" + key + '>';
      }
      else {
        r += `<${key}>${obj[key]}</${key}>`;
      }
    }

    if (root) {
      let xsdPart = '';

      if (schemaPath) {
        xsdPart += ` xsi:noNamespaceSchemaLocation="${schemaPath}"`;
      }

      return "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" + `<${root} xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"${xsdPart}>` + "\n" + r + "\n</" + root + '>';
    } else {
      return r;
    }
  }


  static fromJson(json, root) {
    return XMLParser.fromObj(JSON.parse(json), root);
  }


  static generateDownloadLink(filename, text) {
    let element = document.createElement('a');

    element.setAttribute('href', 'data:application/xml;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

}