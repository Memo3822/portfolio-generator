import { rejects } from 'assert';

import fs from 'fs';

export const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html',fileContent,err => {
            //if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
            if (err) {
                reject(err);
                //return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
                return;
            }

            //if everything went well, resolve the Promise and send the successful data to the `.then()` method
            resolve({
                ok:true,
                message: 'File Created!'
            });
        });
    });
};

export const copyFile = fileContent => {
    return new Promise(() => {
        fs.copyFile('./dist/index.html', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok:true,
                message:'File Copied'
            });
        });
    });
}

