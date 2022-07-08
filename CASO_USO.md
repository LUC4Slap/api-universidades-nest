CASOS DE USO: Busca de universidade

ATOR PRINCIPAL: Integrado

PRE CONDIÇÕES: Ter acesso a api de universidades

POS CONDIÇOES: Deve estar salvo somente univesidades de alguns paises:
[
"argentina",
"brasil",
"chile",
"colombia",
"paraguai",
"peru",
"suriname",
"uruguay"
]

CENARIO PRINCIPAL:
0 - Criar lista de paises
0.1 - Percorrer lista de paises
1- Conectar na api
2- Fazer busca de universidade de cada pais
3- Salvar pais que deu erro em um array
3.1- Pecorrer array com paises que deu erro
4- Salvar universidade que deu erro em um array
4.1- Pecorrer array da universidades - sair
5- Conectar com banco de dados
6- Salvar universidade e exibir message "Univeridade X salva no banco"

FLUXOS ALTERNATIVO: Falha ao consusultar pais na api, linha 2
1: Salvar pais que deu erro em um array
2: Percorrer array com paises que deu erro
3: Fazer mais uma tentativa de busca do pais que deu error caso de erro novamente ignorar pais e exibir mensagem "Falha para pesquisar pais novamente"
4: Finalizar Fluxo

FLUXOS ALTERNATIVO: Erro para salvar universidade no banco, linha 6
1: Salvar universidade que deu erro num array e dar um continue no for para não parar o restante
2: Percorrer array das universidades que deu erro caso de erro novamente ignorar universidade e exibir messagem "Falha para pesquisar universidade novamente"
3: Finalizar Fluxo

FLUXOS ALTERNATIVO: Falha ao conectar no banco de dados, linha 5
1: Tentar reconecta no banco 3x caso não consiga imprima e exibir mensagem "Falha para conectar no banco por mais de 3 vezes"
2: Finalizar Fluxo
