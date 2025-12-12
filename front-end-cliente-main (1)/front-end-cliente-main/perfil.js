/* =========================================
   GESTÃO DE PERFIL (MÓDULO)
   ========================================= */

/**
 * Carrega e exibe os dados do usuário logado na tela de perfil.
 */
export function carregarDadosPerfil() {
    const nomePerfil = document.getElementById('nomePerfil');
    const emailPerfil = document.getElementById('emailPerfil');
    
    // Verifica se estamos na tela de perfil
    if (nomePerfil && emailPerfil) {
        // Pega os dados atuais do localStorage
        const nome = localStorage.getItem('usuarioLogado') || '';
        const email = localStorage.getItem('emailLogado') || '';
        
        // Coloca os valores nos campos (o que permite ao usuário digitar por cima do nome)
        nomePerfil.value = nome;
        emailPerfil.value = email; // Preenche o e-mail, mesmo que esteja disabled

        // Atualiza o display do nome/email no cabeçalho, caso não tenha sido feito por 'verificarSessaoEPerfil'
        const displayNome = document.getElementById('displayNome');
        const displayEmail = document.getElementById('displayEmail');
        if(displayNome) displayNome.textContent = nome;
        if(displayEmail) displayEmail.textContent = email;
    }
}

/**
 * Inicializa os ouvintes de eventos para os formulários de perfil e senha.
 */
export function inicializarEventosPerfil() {
    // 1. Lógica para salvar o Nome
    const formPerfil = document.getElementById('formPerfil');
    if (formPerfil) {
        formPerfil.addEventListener('submit', (e) => {
            e.preventDefault();
            const novoNome = document.getElementById('nomePerfil').value.trim();
            
            if (novoNome) {
                localStorage.setItem('usuarioLogado', novoNome);
                
                // Atualiza o display do nome no cabeçalho
                const displayNome = document.getElementById('displayNome');
                if(displayNome) displayNome.textContent = novoNome;
                
                alert('Nome alterado com sucesso!');
            } else {
                alert('O nome não pode ser vazio.');
            }
        });
    }

    // 2. Lógica para alterar a Senha
    const formSenha = document.getElementById('formSenha');
    if (formSenha) {
        formSenha.addEventListener('submit', (e) => {
            e.preventDefault();
            const novaSenha = document.getElementById('novaSenha').value;
            const confirmaNovaSenha = document.getElementById('confirmaNovaSenha').value;

            if (novaSenha.length < 6) {
                alert('A senha deve ter no mínimo 6 caracteres.');
                return;
            }

            if (novaSenha !== confirmaNovaSenha) {
                alert('As senhas não coincidem!');
                return;
            }

            // Simula a sobrescrita da senha
            localStorage.setItem('senha', novaSenha); 
            
            document.getElementById('novaSenha').value = '';
            document.getElementById('confirmaNovaSenha').value = '';
            
            alert('Senha alterada com sucesso! Você precisará usá-la no próximo login.');
        });
    }
}