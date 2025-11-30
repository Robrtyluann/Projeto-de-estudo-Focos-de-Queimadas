    //Criação do mapa
    //const map = L.map('map').setView([-14.235, -51.9253], 5);

    //adicionando o fundo 'mapa'
    const ruas = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    });

    //opção 2 satelite 
    const satelite = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver | &copy; Stadia Maps &copy; OpenMapTiles &copy; OpenStreetMap contributors',
        ext: 'jpg'
    });

    // criação do map 

    const map = L.map('map',{
        center: [-14.235, -51.9253],
        zoom: 5,
        layers: [ruas]
    });

    const baseMaps = {
        "Topográfico": ruas,
        "satelite": satelite
    };

    L.control.layers(baseMaps).addTo(map);

    const markerCluster = L.markerClusterGroup();

    console.log("Frontend: Buscando dados de focos no backend");

    fetch('http://localhost:8000/focos')
        .then(response => {
            if(!response.ok){
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }
            return response.json();
        })
        .then(focosDeQueimada => {
            if (focosDeQueimada.erro) {
                throw new Error(`Erro do Backend : ${focosDeQueimada.erro}`)
            }
            console.log(`Frontend: Sucesso! Recebidos ${focosDeQueimada.length} focos.`);

            focosDeQueimada.forEach(foco => {
                
                if (typeof foco.lat === 'number' && typeof foco.lon  === 'number') {
                    const marker = L.marker([foco.lat, foco.lon])
                    .bindPopup(`
                        <b>Município:</b> ${foco.municipio || 'N/A'}<br>
                        <b>Estado:</b> ${foco.estado || 'N/A'}
                    `);

                    markerCluster.addLayer(marker);

                } else {
                    console.warn("Foco ignorado por coodenadas invalidas", foco);
                }
            });

            map.addLayer(markerCluster);
            
            console.log("Frontend: Plotagem concluida");
        })
        .catch(erro =>{
            console.error("Frontend: Erro ao buscar ou processar dados:", erro);
            alert(`Não foi possível carregar os focos: ${erro.message}.\n\nVerifique:\n1. Se o backend Python (uvicorn) está rodando.\n2. Se há conexão com a internet para buscar os dados do INPE.\n3. Abra o console (F12) para mais detalhes.`);
        });

       