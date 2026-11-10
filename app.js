
const http = require('http');

const VERSION = '1.0.0';
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

    // Cabeceras de seguridad básicas
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Endpoint de salud para AWS
    if (url.pathname === '/health') {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });

        return res.end(JSON.stringify({
            status: 'ok',
            application: 'Andina Market',
            version: VERSION,
            timestamp: new Date().toISOString()
        }));
    }

    // Endpoint de versión
    if (url.pathname === '/version') {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });

        return res.end(JSON.stringify({
            application: 'Andina Market',
            version: VERSION
        }));
    }

    // Página principal
    if (url.pathname === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        return res.end(`<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Andina Market - Plataforma de comercio digital.">
    <title>Andina Market | Comercio Digital</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: #f4f7fb;
            color: #172033;
            min-height: 100vh;
        }

        header {
            background: #102b46;
            color: white;
            padding: 22px 8%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
        }

        .logo {
            font-size: 25px;
            font-weight: 800;
            letter-spacing: -1px;
        }

        .logo span {
            color: #36d399;
        }

        .status {
            background: rgba(54, 211, 153, .15);
            color: #65e6b5;
            padding: 8px 15px;
            border-radius: 30px;
            font-size: 13px;
        }

        .hero {
            background: linear-gradient(135deg, #102b46, #176b65);
            color: white;
            padding: 100px 8%;
            text-align: center;
        }

        .hero h1 {
            font-size: clamp(36px, 6vw, 58px);
            margin-bottom: 20px;
            font-weight: 800;
        }

        .hero h1 span {
            color: #55e6b5;
        }

        .hero p {
            font-size: 18px;
            color: #d5e8e8;
            max-width: 650px;
            margin: auto;
            line-height: 1.8;
        }

        .container {
            max-width: 1100px;
            margin: -35px auto 60px;
            padding: 0 20px;
        }

        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
            gap: 22px;
        }

        .card {
            background: white;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 8px 30px rgba(0,0,0,.06);
            border: 1px solid #edf0f5;
        }

        .card .icon {
            font-size: 30px;
            margin-bottom: 15px;
        }

        .card h3 {
            font-size: 18px;
            margin-bottom: 10px;
        }

        .card p {
            color: #68758a;
            line-height: 1.6;
            font-size: 14px;
        }

        .deployment {
            margin-top: 30px;
            background: white;
            padding: 35px;
            border-radius: 16px;
            text-align: center;
            box-shadow: 0 8px 30px rgba(0,0,0,.04);
        }

        .deployment h2 {
            margin-bottom: 12px;
        }

        .deployment p {
            color: #68758a;
            line-height: 1.7;
        }

        footer {
            text-align: center;
            padding: 25px;
            color: #8490a2;
            font-size: 13px;
        }

        @media(max-width: 600px) {
            header {
                padding: 20px;
            }

            .hero {
                padding: 75px 20px;
            }

            .deployment {
                padding: 25px 18px;
            }
        }
    </style>
</head>

<body>

<header>
    <div class="logo">ANDINA<span> MARKET</span></div>
    <div class="status">● Sistema operativo</div>
</header>

<section class="hero">
    <h1>Bienvenido a <span>Andina Market</span></h1>
    <p>
        Innovación, tecnología y comercio digital en una
        plataforma diseñada para ofrecer experiencias modernas,
        rápidas y confiables.
    </p>
</section>

<main class="container">

    <section class="cards">

        <article class="card">
            <div class="icon">🚀</div>
            <h3>Alto rendimiento</h3>
            <p>
                Aplicación ligera desarrollada con Node.js,
                preparada para ofrecer respuestas rápidas.
            </p>
        </article>

        <article class="card">
            <div class="icon">☁️</div>
            <h3>Infraestructura Cloud</h3>
            <p>
                Ejecutándose sobre infraestructura AWS EC2,
                preparada para crecer.
            </p>
        </article>

        <article class="card">
            <div class="icon">🔄</div>
            <h3>Despliegue automático</h3>
            <p>
                Integración con GitHub y AWS CodeDeploy
                para facilitar las actualizaciones.
            </p>
        </article>

    </section>

    <section class="deployment">
        <h2>Plataforma funcionando correctamente</h2>
        <p>
            Andina Market está disponible y respondiendo
            correctamente a las solicitudes.
        </p>
        <p style="margin-top:15px">
            Versión <strong>${VERSION}</strong>
            &nbsp; | &nbsp;
            Node.js
            &nbsp; | &nbsp;
            Puerto ${PORT}
        </p>
    </section>

</main>

<footer>
    © ${new Date().getFullYear()} Andina Market.
    Todos los derechos reservados.
    <br>
    Plataforma tecnológica de comercio digital.
</footer>

</body>
</html>`);
    }

    // Rutas no encontradas
    res.writeHead(404, {
        'Content-Type': 'application/json; charset=utf-8'
    });

    res.end(JSON.stringify({
        error: 'No encontrado',
        status: 404
    }));
});

server.listen(PORT, HOST, () => {
    console.log('====================================');
    console.log('       ANDINA MARKET');
    console.log('====================================');
    console.log(`Estado: ACTIVO`);
    console.log(`Versión: ${VERSION}`);
    console.log(`Puerto: ${PORT}`);
    console.log(`Dirección: http://${HOST}:${PORT}`);
    console.log('====================================');
});

server.on('error', (error) => {
    console.error('Error del servidor:', error);
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.log('Cerrando Andina Market...');
    server.close(() => process.exit(0));
});
