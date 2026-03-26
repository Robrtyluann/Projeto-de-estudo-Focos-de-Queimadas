# Monitoramento de Focos de Queimadas - América do Sul
Este projeto é uma aplicação Full Stack de engenharia de dados e geoprocessamento. Ele automatiza a coleta de dados brutos de satélite, processa essas informações e as exibe em um mapa interativo em tempo real.

# Objetivo
O sistema foi criado para centralizar dados de focos de calor espalhados em diretórios públicos e transformá-los em informações visuais úteis para análise geográfica, utilizando tecnologias que são padrão no mercado de tecnologia.

# Arquitetura do Sistema (Fluxo de Dados)
O projeto segue o modelo ETL (Extract, Transform, Load):

Extração (Python + BeautifulSoup): O backend acessa o servidor de dados do INPE, navega pelos diretórios e identifica o arquivo CSV diário mais recente de forma dinâmica.

Transformação (Pandas): O arquivo é lido e processado em memória. O sistema filtra as colunas necessárias (lat, lon, municipio, estado) e realiza o data cleaning (remoção de valores nulos).

Carga/Distribuição (FastAPI): Os dados tratados são expostos através de uma API RESTful em formato JSON.

Visualização (JS + Leaflet): O frontend consome a API e plota os pontos em um mapa interativo com suporte a camadas de satélite e agrupamento de marcadores.

# Tecnologias Utilizadas
Backend & Data Engineering
Python 3.x

FastAPI: Criação da API de alta performance.

Pandas: Manipulação e tratamento de grandes volumes de dados.

Httpx & BeautifulSoup4: Web Scraping e requisições HTTP.

Uvicorn: Servidor ASGI.

Frontend
JavaScript (Vanilla): Lógica de consumo e renderização.

Leaflet.js: Biblioteca de mapas interativos.

MarkerCluster: Otimização de performance para renderizar milhares de pontos simultaneamente.

HTML5 & CSS3: Interface e design responsivo.

# Como Executar o Projeto
1. Requisitos
Python instalado.

Navegador moderno.

2. Configurando o Backend
Bash

# Clone o repositório
git clone https://github.com/Robrtyluann/Projeto-de-estudo-Focos-de-Queimadas.git

# Entre na pasta
cd Projeto-de-estudo-Focos-de-Queimadas

# Instale as bibliotecas necessárias
pip install fastapi uvicorn beautifulsoup4 pandas httpx lxml

# Inicie o servidor
uvicorn main:app --reload

3. Acessando o Frontend
Basta abrir o arquivo index.html no seu navegador ou rodar através de um "Live Server". A aplicação irá buscar automaticamente os dados do backend rodando em localhost:8000.

💡 Diferenciais Implementados
Consumo de Dados Vivos: O projeto não usa dados estáticos; ele busca o arquivo mais recente no servidor do INPE a cada execução.

Performance: Uso de clusters no mapa para evitar travamentos do navegador.

Tratamento de Exceções: Sistema de logs no backend e alertas no frontend para falhas de conexão.
