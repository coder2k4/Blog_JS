/**
 *  Преобразует объект полученный с FireBase в массив, добавляя в него ID - ключ объекта
 */
export class TransformService {
    /**
     *
     * @param fbData объект ответа от БД FireBase
     * @returns {*[]} возвращаем сгенерированный массив, в котором хранится ID - ключ массива
     */
    static fbObjectToArray(fbData){
       return Object.keys(fbData).map(key => {
           const data = fbData[key];
           data.id = key;
           return data;
       })
    }
}

