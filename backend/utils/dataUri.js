import DatauriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    // Parser ko yahan function ke andar rakho
    const parser = new DatauriParser();
    const extName = path.extname(file.originalname).toString();
    
    // Ye line prepare karti hai data
    return parser.format(extName, file.buffer);
};

export default getDataUri;