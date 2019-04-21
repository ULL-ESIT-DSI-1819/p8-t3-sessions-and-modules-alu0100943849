# p8-t3-sessions-and-modules
## Crear submodulos en git

Para crear submodulos en GitHub debemos crear primero los repositorios que van a convertirse en submodulos.
Una vez los tenemos, en el repositorio que actuará como principal ejecutamos el comando

    git submodule add <path>

donde <path> es la ruta tanto ssh como html del repositorio.

## Actualizar el submodulo

Para actualizar el repositorio que actua como submodulo dentro del repositorio principal debemos ejeutar el siguiente comando

    git submodule update --remote --merge

el cual hará un merge de los submodulos actualizando el HEAD de los submodulos.
