<h2>Sobre os comandos em script:<h2>
<pre>
{
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts",
    "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js",
    "createMigration": "ts-node-dev ./node_modules/typeorm/cli.js migration:create -n",
    "revertMigration": "ts-node-dev ./node_modules/typeorm/cli.js migration:revert",
    "runMigration": "ts-node-dev ./node_modules/typeorm/cli.js migration:run "
}
</pre>
<p>dev: Comando para iniciar a aplicação em modo de desenvolvimento.</p>
<p>typeorm: feito apenas para reduzir a escrita para acesso as funções do typeorm, para mais informações digite esse comando no console.</p>
<p>createMigration: após escrever "yarn createMigration" coloque o nome da migration que deseja criar.</p>
<p>revertMigration: Utilizado para reverter a ultima migration utilizada.</p>
<p>runMigration: Comando para iniciar todas as migrations.</p>