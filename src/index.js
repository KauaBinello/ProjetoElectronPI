document.addEventListener("DOMContentLoaded", () => {
    const nomeUsuario = localStorage.getItem('nome');
    const tipoPerfil = localStorage.getItem('perfil');

    document.getElementById('nomeUsuario').textContent = `Usuário: ${nomeUsuario}`;
    document.getElementById('tipoPerfil').textContent = `Perfil: ${tipoPerfil}`;

}
);