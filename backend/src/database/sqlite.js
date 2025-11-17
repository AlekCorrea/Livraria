const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const DB_FILE = process.env.SQLITE_DB_FILE || path.join(__dirname, '../data/livraria.db');

// Garante que o diretório do banco exista
fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });

let db;

// Singleton — garante que apenas uma instância do banco seja usada
function getDb() {
    if (!db) {
        db = new Database(DB_FILE);
        db.pragma('foreign_keys = ON');
    }
    return db;
}

// Executa comandos INSERT, UPDATE, DELETE
function run(sql, params = []) {
    return getDb().prepare(sql).run(...params);
}

// Retorna apenas uma linha
function get(sql, params = []) {
    return getDb().prepare(sql).get(...params);
}

// Retorna todas as linhas
function all(sql, params = []) {
    return getDb().prepare(sql).all(...params);
}

// Inicializa o banco e cria tabela se não existir
function init() {
    run(`
        CREATE TABLE IF NOT EXISTS livros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            autor TEXT NOT NULL,
            categoria TEXT NOT NULL,
            ano INTEGER NOT NULL,
            editora TEXT NOT NULL,
            numeroPaginas INTERGER NOT NULL
        )
    `);
    console.log('Banco de dados SQLite inicializado');
}

module.exports = {
    getDb,
    run,
    get,
    all,
    init
};

function init() {
 // ... Tabela de livros existente
 // Tabela de Usuários
 run(`CREATE TABLE IF NOT EXISTS users (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 username TEXT NOT NULL UNIQUE,
 password_hash TEXT NOT NULL,
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP
 )`);
 // ...
}
