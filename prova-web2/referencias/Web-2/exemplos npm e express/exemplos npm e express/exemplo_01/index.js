// Importando o lodash
const _ = require('lodash');

// --- ARRAYS ---
console.log("=== ARRAYS ===");

// _.chunk
// Divide um array baseado no parâmetro size
console.log("Chunk:", _.chunk(['a', 'b', 'c', 'd'], 2));

// _.uniq
// Retorna um novo array sem elementos duplicados
console.log("Uniq:", _.uniq([1, 2, 2, 3]));

// _.flatten
// Transforma um array para um único nível de profundidade
console.log("Flatten:", _.flatten([1, [2, [3]]]));


// --- OBJETOS ---
console.log("\n=== OBJETOS ===");

// _.get
// Obtém o valor no caminho do objeto.
const obj = { a: { b: 2 } };
console.log("Get:", _.get(obj, 'a.b', 0));

// _.omit
// Cria um novo objeto a partir de um objeto original, 
// mas omitindo (ou seja, removendo) algumas propriedades 4
// especificadas.
console.log("Omit:", _.omit({ a: 1, b: 2 }, 'b'));

// _.merge
// combina as propriedades dos objetos, copiando as 
// propriedades dos objetos fonte para o objeto destino.
console.log("Merge:", _.merge({ a: 1 }, { b: 2 }));


// --- NÚMEROS ---
console.log("\n=== NÚMEROS ===");

// _.random
console.log("Random:", _.random(1, 5));

// _.clamp
// Limita um número dentro de um intervalo mínimo e máximo.
// _.clamp(number, lower, upper)
console.log("Clamp:", _.clamp(-9, -5, 5));


// --- STRINGS ---
console.log("\n=== STRINGS ===");

// _.camelCase
// camelCase é um estilo onde a primeira palavra começa com 
// letra minúscula e as palavras seguintes começam com letra 
// maiúscula, sem espaços ou símbolos entre elas.
console.log("CamelCase:", _.camelCase('Hello world'));

// _.kebabCase
// kebab-case é um estilo onde as palavras ficam todas em 
// minúsculas e são separadas por hífens (-).
console.log("KebabCase:", _.kebabCase('Hello World'));


// --- FUNÇÕES ---
console.log("\n=== FUNÇÕES ===");

const log = () => console.log("Função executada!");

// Uma função que só será realmente executada depois de um 
// certo tempo de espera sem novas chamadas.
const debouncedLog = _.debounce(log, 1000); // 1s

console.log("Chamando função com debounce (aguarde 1s)...");
debouncedLog();
