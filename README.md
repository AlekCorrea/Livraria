1. Sistema de Favoritos
✔ Objetivo

Permitir que cada usuário salve seus livros favoritos e que essas informações sejam carregadas automaticamente sempre que ele acessar o sistema.

✔ O que foi implementado

Nova rota no backend para listar, adicionar e remover favoritos.

Repositório favorites.repository.js responsável pelas consultas ao banco.

Controlador ajustado (favorites.controller.js) para pegar o usuário autenticado.

No frontend, botão/ícone de favorito aparece em cada card de livro.

UI atualiza automaticamente ao marcar/desmarcar um favorito.

✔ Fluxo de funcionamento

Usuário clica no botão de "favoritar" no card do livro.

O frontend envia um POST ou DELETE para /api/favorites.

O backend identifica o usuário usando:

const usuarioId = req.user?.id || req.session?.user?.id;


O banco grava ou remove o registro em favorites.

Ao abrir a página de livros, o frontend faz GET /api/favorites e exibe os favoritos marcados.

✔ Pontos importantes

Apenas o usuário logado vê seus favoritos.

Evita duplicações usando chave composta (user + book).

Backend retorna sempre a lista atualizada para manter a UI sincronizada.

🌙☀ 2. Tema Escuro (Dark Mode)
✔ Objetivo

Criar uma experiência personalizada permitindo alternar entre tema claro e escuro, com persistência após recarregar a página.

✔ O que foi implementado

Botão de alternância de tema (agora usando apenas um ícone dinâmico).

Alterações globais de cores via CSS ou Context API.

Persistência usando localStorage.

✔ Como funciona

Ao clicar no ícone, o sistema alterna entre "light" e "dark".

O valor é salvo:

localStorage.setItem("theme", theme);


Quando o app carrega, o React lê o armazenamento e aplica o tema:

const saved = localStorage.getItem("theme");


O layout inteiro se adapta automaticamente (cores de fundo, textos, cards etc.).

✔ Pontos importantes

Tema permanece mesmo recarregando ou fechando o navegador.

Botão mostra ícone do sol ou lua conforme o tema atual.

Todos os componentes seguem o estilo por meio de classes globais.

📚 3. Exibição da Capa dos Livros
✔ Objetivo

Garantir que cada livro tenha sua imagem renderizada corretamente na listagem e nas páginas de detalhe.

✔ O que foi ajustado

Correção no backend para retornar corretamente o campo capa (URL).

Ajuste no frontend para usar:

<img src={livro.capa} alt={livro.titulo} />


Tratamento para quando a capa não existir (usa imagem padrão).

Correção de erros que apareciam no terminal e impediam as capas de carregarem.

✔ Comportamento final

Cards exibem a imagem enviada no cadastro.

Detalhes do livro também exibem a capa.

Sem erros no backend relacionados a caminho de imagem.
