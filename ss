[33mcommit f9fad183c4ce7fe3c36f03943e8d2a43ca019fce[m[33m ([m[1;36mHEAD -> [m[1;32mmaster[m[33m)[m
Author: Brandon Cuéllar <branncg2@gmail.com>
Date:   Tue Jan 9 17:31:37 2024 -0400

    Página de Subasta, producto individual, Nosotros y Contacto

 Alianza/.editorconfig                              |    16 [32m+[m
 Alianza/.gitignore                                 |    42 [32m+[m
 Alianza/.vscode/extensions.json                    |     4 [32m+[m
 Alianza/.vscode/launch.json                        |    20 [32m+[m
 Alianza/.vscode/tasks.json                         |    42 [32m+[m
 Alianza/README.md                                  |    27 [32m+[m
 Alianza/angular.json                               |   101 [32m+[m
 Alianza/package-lock.json                          | 12852 [32m+++++++++++++++++++[m
 Alianza/package.json                               |    44 [32m+[m
 Alianza/server.ts                                  |    56 [32m+[m
 Alianza/src/app/app.component.css                  |     5 [32m+[m
 Alianza/src/app/app.component.html                 |     3 [32m+[m
 Alianza/src/app/app.component.spec.ts              |    29 [32m+[m
 Alianza/src/app/app.component.ts                   |    16 [32m+[m
 Alianza/src/app/app.config.server.ts               |    11 [32m+[m
 Alianza/src/app/app.config.ts                      |     9 [32m+[m
 Alianza/src/app/app.routes.ts                      |    16 [32m+[m
 Alianza/src/app/contacto/contacto.component.css    |    74 [32m+[m
 Alianza/src/app/contacto/contacto.component.html   |    26 [32m+[m
 .../src/app/contacto/contacto.component.spec.ts    |    23 [32m+[m
 Alianza/src/app/contacto/contacto.component.ts     |    21 [32m+[m
 Alianza/src/app/error404/error404.component.css    |     0
 Alianza/src/app/error404/error404.component.html   |     2 [32m+[m
 .../src/app/error404/error404.component.spec.ts    |    23 [32m+[m
 Alianza/src/app/error404/error404.component.ts     |    13 [32m+[m
 Alianza/src/app/footer/footer.component.css        |    85 [32m+[m
 Alianza/src/app/footer/footer.component.html       |    25 [32m+[m
 Alianza/src/app/footer/footer.component.spec.ts    |    23 [32m+[m
 Alianza/src/app/footer/footer.component.ts         |    14 [32m+[m
 Alianza/src/app/header/header.component.css        |    44 [32m+[m
 Alianza/src/app/header/header.component.html       |    33 [32m+[m
 Alianza/src/app/header/header.component.spec.ts    |    23 [32m+[m
 Alianza/src/app/header/header.component.ts         |    15 [32m+[m
 Alianza/src/app/hero/hero.component.css            |     7 [32m+[m
 Alianza/src/app/hero/hero.component.html           |     3 [32m+[m
 Alianza/src/app/hero/hero.component.spec.ts        |    23 [32m+[m
 Alianza/src/app/hero/hero.component.ts             |    12 [32m+[m
 Alianza/src/app/inicio/inicio.component.css        |    12 [32m+[m
 Alianza/src/app/inicio/inicio.component.html       |     6 [32m+[m
 Alianza/src/app/inicio/inicio.component.spec.ts    |    23 [32m+[m
 Alianza/src/app/inicio/inicio.component.ts         |    15 [32m+[m
 Alianza/src/app/interfaces/productos.ts            |     9 [32m+[m
 .../productos-detalle.component.css                |    60 [32m+[m
 .../productos-detalle.component.html               |    36 [32m+[m
 .../productos-detalle.component.spec.ts            |    23 [32m+[m
 .../productos-detalle.component.ts                 |    75 [32m+[m
 Alianza/src/app/productos/productos.component.css  |    48 [32m+[m
 Alianza/src/app/productos/productos.component.html |    31 [32m+[m
 .../src/app/productos/productos.component.spec.ts  |    23 [32m+[m
 Alianza/src/app/productos/productos.component.ts   |    23 [32m+[m
 .../app/quienes-somos/quienes-somos.component.css  |    84 [32m+[m
 .../app/quienes-somos/quienes-somos.component.html |    27 [32m+[m
 .../quienes-somos/quienes-somos.component.spec.ts  |    23 [32m+[m
 .../app/quienes-somos/quienes-somos.component.ts   |    19 [32m+[m
 .../src/app/servicios/productos.service.spec.ts    |    16 [32m+[m
 Alianza/src/app/servicios/productos.service.ts     |    62 [32m+[m
 Alianza/src/app/subastas/subastas.component.css    |     0
 Alianza/src/app/subastas/subastas.component.html   |     1 [32m+[m
 .../src/app/subastas/subastas.component.spec.ts    |    23 [32m+[m
 Alianza/src/app/subastas/subastas.component.ts     |    13 [32m+[m
 Alianza/src/assets/.gitkeep                        |     0
 Alianza/src/assets/img/hero.jpg                    |   Bin [31m0[m -> [32m278992[m bytes
 Alianza/src/assets/img/logoalianza.png             |   Bin [31m0[m -> [32m69204[m bytes
 Alianza/src/favicon.ico                            |   Bin [31m0[m -> [32m72531[m bytes
 Alianza/src/index.html                             |    13 [32m+[m
 Alianza/src/main.server.ts                         |     7 [32m+[m
 Alianza/src/main.ts                                |     6 [32m+[m
 Alianza/src/styles.css                             |    40 [32m+[m
 Alianza/tsconfig.app.json                          |    18 [32m+[m
 Alianza/tsconfig.json                              |    32 [32m+[m
 Alianza/tsconfig.spec.json                         |    14 [32m+[m
 package-lock.json                                  |     6 [32m+[m
 72 files changed, 14570 insertions(+)
