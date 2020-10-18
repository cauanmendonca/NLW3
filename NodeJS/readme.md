sobre os comandos em script:

{
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts",
    "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js",
    "createMigration": "ts-node-dev ./node_modules/typeorm/cli.js migration:create -n",
    "revertMigration": "ts-node-dev ./node_modules/typeorm/cli.js migration:revert",
    "runMigration": "ts-node-dev ./node_modules/typeorm/cli.js migration:run "
}

dev: Comando para iniciar a aplicação em modo de desenvolvimento.
typeorm: feito apenas para reduzir a escrita para acesso as funções do typeorm, para mais informações digite esse comando no console.
createMigration: após escrever "yarn createMigration" coloque o nome da migration que deseja criar.
revertMigration: Utilizado para reverter a ultima migration utilizada.
runMigration: Comando para iniciar todas as migrations.