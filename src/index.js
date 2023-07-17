// ===============Задача===========================
// Вам потрібно розробити алгоритм програми, яка повинна виконувати наступне:
// - програма приймає на вхід довільний текст і знаходить в кожному слові цього тексту найперший символ, який більше НЕ повторюється в аналізуємому слові
// - далі із отриманого набору символів програма повинна вибрати перший унікальний (тобто той, який більше не зустручається в наборі) і повернути його.

// Наприклад, якщо програма отримує на вхід текст нижче:

// The Tao gave birth to machine language.  Machine language gave birth
// to the assembler.
// The assembler gave birth to the compiler.  Now there are ten thousand
// languages.
// Each language has its purpose, however humble.  Each language
// expresses the Yin and Yang of software.  Each language has its place within
// the Tao.
// But do not program in COBOL if you can avoid it.
//         -- Geoffrey James, "The Tao of Programming"

// то повинна повернути вона символ "m".
//=====================================================

// 1. Приймаємо вхідний текст як рядок.
// 2. Розділимо текст на окремі слова та отримаємо масив цих слів.
// 3.  Ініцюємо словник для зберігання унікальних символів тексту.
// 4. Перебираємо масив слів і для кожного слова виконаємо наступні кроки:
//    4.1 Ініціалізуємо порожній обʼєкт для зберігання символів і кількості їх зустрічей.
//    4.2 Для кожного символу у слові:
//        4.2.1 Якщо символ вже присутній у словнику, збільшуємо значення його лічильника на 1.
//        4.2.2 Якщо символ ще не присутній у словнику, додаємо його як ключ із початковим значенням 1.
//    3.3 Додаємо унікальні символи слів до словнику.
// 4. Рахуємо унікальні символи у словнику за допомогою методу reduce();
// 5. Далі із отриманого набору символів, за допомогою методу find, вибраємо перший унікальний (тобто той, який більше не
// зустручається в наборі) і повертаємо його.
// 6. Записуємо унікальний символ у текстове поле результату.

//отримуємо посилання на текстовий елемент результату
const resultRef = document.getElementById('result');

// Функція обробки події надсилання форми
function handleSubmit(event) {
  event.preventDefault(); // Зупиняємо стандартну поведінку форми

  // Отримуємо значення введеного тексту
  const text = document.getElementById('textInput').value;

  // Виклик функції обробки з отриманим текстом
  console.log(findUnicueSymbol(text));
  resultRef.textContent = findUnicueSymbol(text);
}

// функція пошуку унікального символу тексту
const findUnicueSymbol = text => {
  // Розділимо текст на окремі слова та отримаємо масив цих слів.
  const wordsArr = text.split(/\s+/);

  // Ініцюємо словник для зберігання унікальних символів тексту
  const dictionary = [];
  // Перебираємо масив слів
  wordsArr.forEach(word => {
    const letterObj = {};
    for (const letter of word) {
      letterObj[letter] = (letterObj[letter] || 0) + 1;
    }
    // Додаємо унікальні символи слів до словнику.
    const keys = Object.keys(letterObj);
    for (const key of keys) {
      if (letterObj[key] === 1) {
        dictionary.push(key);
        break;
      }
    }
  });
  // Рахуємо унікальні символи у словнику за допомогою методу reduce
  const uniqueSymbol = dictionary.reduce((acum, item) => {
    acum[item] = (acum[item] || 0) + 1;
    return acum;
  }, {});
  // Шукаємо перший унікальний символ
  return dictionary.find(item => uniqueSymbol[item] === 1);
};

// Прикріплюємо обробник події надсилання форми
document.getElementById('myForm').addEventListener('submit', handleSubmit);
