document.addEventListener("DOMContentLoaded", () => {
    const nomeUsuario = localStorage.getItem('nome');
    const tipoPerfil = localStorage.getItem('perfil');
    console.log(nomeUsuario, tipoPerfil)

    document.getElementById('nomeUsuario').textContent = `Usuário: ${nomeUsuario}`;
    document.getElementById('tipoPerfil').textContent = `Perfil: ${tipoPerfil}`;

}
);