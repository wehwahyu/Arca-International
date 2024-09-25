import {Router} from 'vue-router'

import moment from 'moment'

export const setCookie = (cName: any, cValue: any, expDays: any) => {
  const date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

export const getCurrentRoute = (router: Router) => {
  if (router && router.currentRoute && router.currentRoute.value) {
    const currentRoute = router.currentRoute.value;
    return currentRoute.matched.filter(
      (matched, index, array) => array.findIndex(r => r.path == matched.path) == index
    )
  } else {
    // Handle the case where router is undefined
    return [null, null];
    console.error("Router is undefined");
    return [null];
  }
}

// convert js object to form data
export const objectToFormData = (obj: Object, formData: FormData = new FormData(), parentKey: string = undefined) => {
  for (const key in obj) {
    if (isKeyExist(obj, key)) {
      const value = obj[key];
      const newKey = parentKey ? `${parentKey}[${key}]` : key;

      if (typeof value === 'object' && !(value instanceof File) && !(value instanceof Blob)) {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            const arrayKey = `${newKey}[${index}]`;
            if (typeof item === 'object') {
              objectToFormData(item, formData, arrayKey);
            } else {
              formData.append(arrayKey, item);
            }
          });
        } else {
          objectToFormData(value, formData, newKey);
        }
      } else {
        formData.append(newKey, value);
      }
    }
  }

  return formData;
};

// wrap array into multi lang object for api needs
export const wrapMultiLangData = (data: any) => {
  const cloneData = JSON.parse(JSON.stringify(data))
  const defaultLang = cloneData.find(x => x.lang.is_default)
  let otherLang = cloneData.filter(x => !x.lang.is_default)

  // remove language data
  delete defaultLang['lang']
  otherLang = otherLang.map(x => {
    delete x['lang'];
    return x;
  })

  return {
    ...defaultLang,
    multi: otherLang,
  }
};

// wrap form data from js object
export const wrapFormData = (data: any, files: any[] = [], objectName: string = 'files') : FormData => {
  const formData = new FormData();

  // append files if exist
  let index = 0
  for (const file of files) {
    formData.append(`${objectName}[${index}]`, file?.raw)
    index++
  }

  objectToFormData(
    Array.isArray(data)
        ? wrapMultiLangData(data)
        : data,
    formData
  )

  return formData
}

// func to validate string is url
export const validateURL = (rule: any, value: any, callback: any) => {
  const urlPattern = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  if (urlPattern.test(value) || value == '') {
    callback();
  } else {
    callback(new Error('Please enter a valid URL'));
  }
}

// func to convert PascalCas to normal text
export const camelPad = (str: string) => str
  // Look for long acronyms and filter out the last letter
  .replace(/([A-Z]+)([A-Z][a-z])/g, ' $1 $2')
  // Look for lower-case letters followed by upper-case letters
  .replace(/([a-z\d])([A-Z])/g, '$1 $2')
  // Look for lower-case letters followed by numbers
  .replace(/([a-zA-Z])(\d)/g, '$1 $2')
  .replace(/^./, function(str){ return str.toUpperCase(); })
  // Remove any white space left around the word
  .trim();

export const isKeyExist = (obj: Object, prop: string): Boolean => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export interface DataTableOptions {
  page: number;
  order: 'asc' | 'desc';
  per_page: number;
}

export const sliceDataTable = (data: any[], options: DataTableOptions): any[] => {
  const { page, order, per_page } = options;

  // Ensure that data is defined before proceeding
  if (!data) {
    console.error('Data is undefined');
    return [];
  }

  // Calculate the starting index based on the page and per_page
  const startIndex = (page - 1) * per_page;

  // Sort the data based on the order (ascending or descending)
  const sortedData = data.slice().sort((a, b) => {
    if (order === 'asc') {
      // Compare for ascending order
      return a - b;
    } else {
      // Compare for descending order
      return b - a;
    }
  });

  // Slice the data based on the calculated starting index and per_page
  const slicedData = sortedData.slice(startIndex, startIndex + per_page);

  return slicedData;
}


/**
 * Merges two arrays into an array of objects with `value` and `label` properties.
 *
 * @param {Array<string | number>} ids - Array of values.
 * @param {Array<string>} labels - Array of labels.
 * @returns {Array<{ value: string | number, label: string }>} - Array of merged objects.
 */
export const mergeArraysIntoObjects = (ids: (string | number)[], labels: string[]): { value: string | number; label: string }[] => {
  return ids.map((value, index) => ({
    value,
    label: labels[index] || '',
  }));
}

/**
 * Converts a date string to a formatted date string using Moment.js.
 *
 * @param {string} originalDateTime - The original date string to be converted.
 * @param {string} outputFormat - The desired output format for the date string.
 * @returns {string} The formatted date string.
 *
 * @example
 * // Example usage:
 * const originalDateTime = 'Sun Dec 03 2023 00:00:00 GMT+0700 (Western Indonesia Time)';
 * const outputFormat = 'DD-MM-YYYY';
 * const convertedDate = convertDateToString(originalDateTime, outputFormat);
 * console.log(convertedDate); // Output: '03-12-2023'
 */
// helper/Helper.ts

export const convertDateToString = (dateString: string, format: string): string => {
  if (!dateString || dateString === '-') { // Tambahkan pengecekan untuk nilai '-'
    return "-";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  if (format === "YYYY-MM") {
    options.month = 'long';
    options.day = undefined;
  }

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', options).format(date);
};


export const convertDayToString = (dateString: string, format: string): string => {
  if (!dateString) {
    return "-";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long', // Menggunakan 'long' untuk mendapatkan nama bulan
    day: 'numeric',
    weekday: 'long', // Menambahkan nama hari
  };

  if (format === "YYYY-MM") {
    options.month = 'long';
    options.day = undefined;
  }

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', options).format(date);
};

export const parseDateWithoutTZ = (dateString: string, useString: boolean = false, format: string = "YYYY-MM-DD HH:mm:ss"): Date | string => {
  if (useString) {
    return moment(dateString).utcOffset(dateString).format(format)
  } else {
    return new Date(moment(dateString).utcOffset(dateString).format(format))
  }
};

/**
 * Converts a formatted date string to a date string in the original format.
 *
 * @param {string} formattedDate - The formatted date string to be converted.
 * @param {string} inputFormat - The format of the input date string.
 * @returns {string} The date string in the original format.
 *
 * @example
 * // Example usage:
 * const formattedDate = '03-12-2023';
 * const inputFormat = 'DD-MM-YYYY';
 * const originalDate = reverseConvertDateTime(formattedDate, inputFormat);
 * console.log(originalDate); // Output: 'Sun Dec 03 2023 00:00:00 GMT+0700 (Western Indonesia Time)'
 */
export const reverseConvertDateTime = (formattedDate: string, inputFormat: string): string => {
  // Parse the formatted date string using Moment.js with the input format
  const parsedDate = moment(formattedDate, inputFormat);

  // Format the date string according to the original format
  const originalDateTime = parsedDate.format('ddd MMM DD YYYY HH:mm:ss [GMT]Z (z)');

  return originalDateTime;
}

interface MultipleBarangSatuanProps {
  kode: string;
  rowIndex: number;
  satuan_id: number | string;
}

export function filterSatuanIds(rowIndex: number, kode: string, multipleBarangSatuan: MultipleBarangSatuanProps[], satuanList: any[]) {
  const listBarangSatuan: MultipleBarangSatuanProps[] = JSON.parse(JSON.stringify(multipleBarangSatuan))
  // Mencari indeks data dengan kode dan rowIndex yang sesuai
  const indexToRemove = listBarangSatuan.findIndex(
    (data) => data.kode === kode && data.rowIndex === rowIndex
  );

  // Jika data ditemukan, menghapusnya dari array
  if (indexToRemove !== -1) {
    listBarangSatuan.splice(indexToRemove, 1);
  }

  // Mengembalikan array objek yang masih bisa dipilih dari dataList
  const usedSatuanIds = listBarangSatuan
    .filter((data) => data.kode === kode)
    .map((data) => data.satuan_id);

  const remainingSatuan = satuanList.filter(({ value }) => {
    return !usedSatuanIds.includes(value);
  });

  return usedSatuanIds;
}

export function filterBarangList(searchTerm: string, list: any[]) {
  const split = searchTerm.split(".")
  // Convert searchTerm to lowercase for case-insensitive search
  const searchTermLowerCase = split[0].toLowerCase();
  // Filter the list based on the search criteria
  console.log('searchTermLowerCase', searchTermLowerCase)
  return list.filter((product) => {
    // Check if the kode or nama contains the search term
    const kodeMatch = product.kode?.toLowerCase().includes(searchTermLowerCase);
    const namaMatch = product.nama?.toLowerCase().includes(searchTermLowerCase);
    
    // Return true if either kode or nama matches the search term
    return kodeMatch || namaMatch;
  });
}