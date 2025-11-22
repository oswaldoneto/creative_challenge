Vamos utilizar a imagem anexa para criar uma página web. Utilize a imagem anexa para criar o layout com todos os componentes da página.

Onde esta o titulo "Introdução ao Curso" deverá constar "Desafio de Criação" e no subtitulo "Setup IA Ready: Playlists, Estrutura e Mini-Identidade".

O conteudo do enunciado do desafio presente no lado esquerdo da tela precisa ser linkado do arquivo @md_files/enunciado.md

No lado direito da tela a idéia é simularmos uma interface parecida com o chatgpt.

Os conteudos que serão apresentados estão presentes nos arquivos de steps @md_files/step_1.md até o @md_files/step_7.md.

Ao inciar a página, deverá ser impresso o conteúdo do @md_files/step_1.md e o conteúdo precisa ser escrito gradualmente na tela, como se ele tivesse sendo gerado naquele momento, assim como ocorre no chatgpt.

Note que esses conteudos possuem snippet de código, utilizado para permitir que o usuário copie o código, que será emprese um prompt.

Na parte inferior do lado direito, existirá um campo de input seguido de um botão.

O campo de input deverá inicialemnte estar desabilidado. E só será habiltado no final.

O botão inicilmente deverá vir com a label "Próximo".

Abaixo desses componentes de input e botão existe uma mensagem que precisa constar na página.

Ao clicar no próximo deverá ser carregado o próximo arquivo .md, por exemplo se o passo é o 1, então deverá ser carregado o arquivo @md_files/step_2.md .

O arquivo carregada deverá ser concatenado ao texto anterior no chat que não deverá ser sibstituido e sim mantido no historico.

Entre o conteudo do primeito step e do segundo deverá deverão aparecer uma mensagem simulando como se o usuário tivesse falado com o chat, essas mensagem precisam ser aleatorias e deve ser as seguintes:

Pronto, podemos continuar.
Ok, seguindo para o próximo passo.
Tudo certo, próximo.
Concluído aqui, pode enviar o próximo passo.

Quando chegar no ultimo passo e não houver outro arquivo .md então o nome da label do botão deverá ser substituido por "Enviar" e o campo de input deverá ser habilitado.