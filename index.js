<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CoS - Guía de Traits PvP</title>
    <style>
        :root {
            --bg-color: #0f172a;
            --card-bg: #1e293b;
            --accent: #38bdf8;
            --accent-hover: #0284c7;
            --text-main: #f8fafc;
            --text-sub: #94a3b8;
            --gold: #f59e0b;
            --green: #22c55e;
            --red: #ef4444;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-main);
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
        }

        .container {
            width: 100%;
            max-width: 600px;
        }

        header {
            text-align: center;
            margin-bottom: 25px;
        }

        h1 {
            color: var(--accent);
            margin-bottom: 5px;
            font-size: 1.8rem;
        }

        p.subtitle {
            color: var(--text-sub);
            font-size: 0.95rem;
            margin: 0;
        }

        .search-box {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }

        input[type="text"] {
            flex: 1;
            padding: 12px 16px;
            border-radius: 8px;
            border: 2px solid #334155;
            background-color: #0f172a;
            color: #fff;
            font-size: 1rem;
            outline: none;
            transition: border-color 0.2s;
        }

        input[type="text"]:focus {
            border-color: var(--accent);
        }

        button {
            padding: 12px 20px;
            border-radius: 8px;
            border: none;
            background-color: var(--accent);
            color: #0f172a;
            font-weight: bold;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.2s;
        }

        button:hover {
            background-color: var(--accent-hover);
        }

        .result-card {
            background-color: var(--card-bg);
            border-radius: 12px;
            padding: 20px;
            border: 1px solid #334155;
            display: none;
        }

        .creature-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #334155;
            padding-bottom: 12px;
            margin-bottom: 15px;
        }

        .creature-name {
            font-size: 1.5rem;
            font-weight: bold;
            color: #fff;
            text-transform: capitalize;
        }

        .creature-tag {
            background-color: #334155;
            color: var(--accent);
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
        }

        .section-title {
            font-size: 1rem;
            font-weight: bold;
            margin-top: 15px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .best-combo {
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.3);
            border-radius: 8px;
            padding: 12px;
            color: #4ade80;
            font-weight: bold;
            font-size: 1.1rem;
            text-align: center;
            margin-bottom: 15px;
        }

        .second-combo {
            background: rgba(245, 158, 11, 0.1);
            border: 1px solid rgba(245, 158, 11, 0.3);
            border-radius: 8px;
            padding: 10px;
            color: #fcd34d;
            font-weight: bold;
            text-align: center;
            margin-bottom: 15px;
        }

        .badge-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 15px;
        }

        .badge-avoid {
            background-color: rgba(239, 68, 68, 0.15);
            color: #fca5a5;
            border: 1px solid rgba(239, 68, 68, 0.3);
            padding: 5px 10px;
            border-radius: 6px;
            font-size: 0.85rem;
        }

        .desc-box {
            color: var(--text-sub);
            font-size: 0.95rem;
            line-height: 1.5;
            background: #0f172a;
            padding: 12px;
            border-radius: 8px;
        }

        .not-found {
            text-align: center;
            color: var(--red);
            display: none;
            padding: 20px;
            background: var(--card-bg);
            border-radius: 12px;
        }
    </style>
</head>
<body>

<div class="container">
    <header>
        <h1>CoS Traits Recommender</h1>
        <p class="subtitle">Descubre los mejores Traits PvP para tus criaturas</p>
    </header>

    <div class="search-box">
        <input type="text" id="creatureInput" placeholder="Escribe una criatura (ej: Felifaux, Kendyll)..." value="Felifaux">
        <button onclick="buscarCriatura()">Buscar</button>
    </div>

    <div id="resultCard" class="result-card">
        <div class="creature-header">
            <span id="cName" class="creature-name">Felifaux</span>
            <span id="cTag" class="creature-tag">Tier 1 • Asesino Rápido</span>
        </div>

        <div class="section-title">🏆 Mejor Combo PvP (Meta)</div>
        <div id="cBestCombo" class="best-combo">Bite Speed + Damage</div>

        <div class="section-title">🥈 Segundo Mejor Combo</div>
        <div id="cSecondCombo" class="second-combo">Bite Speed + Max Stamina</div>

        <div class="section-title">❌ Traits a Evitar</div>
        <div id="cAvoidBadges" class="badge-list">
            <span class="badge-avoid">Health</span>
            <span class="badge-avoid">Weight</span>
        </div>

        <div class="section-title">💡 Estrategia PvP & Explicación</div>
        <div id="cDesc" class="desc-box">
            Al ser Tier 1, maximiza el daño por segundo (DPS) y sangrado rápido con Bite Speed. Evita Health y Weight ya que no evitarán que criaturas grandes te destruyan de un solo golpe.
        </div>
    </div>

    <div id="notFound" class="not-found">
        Criatura no encontrada en la base de datos local. Intentando calcular recomendación según patrones generales...
    </div>
</div>

<script>
    // Base de datos de criaturas y reglas
    const database = {
        "felifaux": {
            name: "Felifaux",
            tag: "Tier 1 • Asesino / Latch",
            best: "Bite Speed + Damage",
            second: "Bite Speed + Max Stamina",
            avoid: ["Health", "Weight"],
            desc: "Gracias a Latch y Bleed, Bite Speed es obligatorio para maximizar mordiscos por segundo. Health y Weight son inútiles por su baja vida base."
        },
        "kendyll": {
            name: "Kendyll",
            tag: "Tier 5 • Tanque Pesado",
            best: "Damage + Weight",
            second: "Damage + Health",
            avoid: ["Speed", "Stamina Regen"],
            desc: "Para criaturas gigantes, el Weight aumenta el daño por impacto y reduce knockback. Damage potencia su ya destructivo mordisco."
        },
        "minawaii": {
            name: "Minawaii",
            tag: "Tier 1 • Apoyo / Molesto",
            best: "Max Stamina + Stamina Regen",
            second: "Speed + Max Stamina",
            avoid: ["Damage", "Weight"],
            desc: "Su función es curar/molestar y huir. Doble estamina te permite movilidad infinita."
        },
        "oxydaizen": {
            name: "Oxydaizen",
            tag: "Tier 4 • Sigilo / Emboscada",
            best: "Damage + Bite Speed",
            second: "Damage + Max Stamina",
            avoid: ["Weight"],
            desc: "Ataca desde la invisibilidad. Requiere máximo daño en la ráfaga inicial antes de volver a ocultarse."
        }
    };

    function buscarCriatura() {
        const input = document.getElementById("creatureInput").value.trim().toLowerCase();
        const resultCard = document.getElementById("resultCard");
        const notFound = document.getElementById("notFound");

        if (!input) return;

        if (database[input]) {
            const data = database[input];
            document.getElementById("cName").innerText = data.name;
            document.getElementById("cTag").innerText = data.tag;
            document.getElementById("cBestCombo").innerText = data.best;
            document.getElementById("cSecondCombo").innerText = data.second;
            document.getElementById("cDesc").innerText = data.desc;

            // Renderizar badgets a evitar
            const avoidContainer = document.getElementById("cAvoidBadges");
            avoidContainer.innerHTML = "";
            data.avoid.forEach(trait => {
                const badge = document.createElement("span");
                badge.className = "badge-avoid";
                badge.innerText = trait;
                avoidContainer.appendChild(badge);
            });

            notFound.style.display = "none";
            resultCard.style.display = "block";
        } else {
            // Generador dinámico para criaturas no registradas
            document.getElementById("cName").innerText = input.charAt(0).toUpperCase() + input.slice(1);
            document.getElementById("cTag").innerText = "Criatura Estándar";
            document.getElementById("cBestCombo").innerText = "Bite Speed + Damage";
            document.getElementById("cSecondCombo").innerText = "Bite Speed + Max Stamina / Speed";
            document.getElementById("cDesc").innerText = "Para la mayoría de criaturas de combate, Bite Speed y Damage forman la combinación estándar más fuerte para PvP.";
            
            const avoidContainer = document.getElementById("cAvoidBadges");
            avoidContainer.innerHTML = '<span class="badge-avoid">Depende del Tier</span>';

            notFound.style.display = "none";
            resultCard.style.display = "block";
        }
    }

    // Cargar Felifaux por defecto al abrir
    window.onload = function() {
        buscarCriatura();
    };
</script>

</body>
</html>
