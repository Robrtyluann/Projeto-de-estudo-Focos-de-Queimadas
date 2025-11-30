# API de Monitoramento de Focos de Queimadas no Brasil

Este é um projeto de estudo desenvolvido para coletar, processar e disponibilizar dados sobre focos de queimadas no Brasil através de uma API.

## 🎯 Objetivo

O objetivo deste projeto é criar um sistema que centralize informações de queimadas (obtidas via web scraping) e as exponha através de uma API RESTful, permitindo que outros sistemas ou ferramentas de análise (como o Power BI) possam consumir esses dados facilmente.

## 🚀 Tecnologias Utilizadas

* **Python:** Linguagem principal do projeto.
* **FastAPI:** Framework utilizado para a construção da API.
* **BeautifulSoup:** Usada para fazer o web scraping dos dados.
* **Pandas:** Para manipulação e limpeza dos dados.
* **Uvicorn:** Servidor para rodar a API.

## ⚙️ Como Rodar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Robrtyluann/Projeto-de-estudo-Focos-de-Queimadas.git
    cd Projeto-de-estudo-Focos-de-Queimadas
    ```

2.  **Instale as dependências:**
    ```bash
    pip install fastapi uvicorn beautifulsoup4 pandas
    ```

3.  **Execute o servidor:**
    *(Ajuste este comando para como o seu projeto roda, por exemplo, `python main.py`)*
    ```bash
    uvicorn main:app --reload
    ```

4.  **Acesse a documentação:**
    Abra seu navegador em `http://127.0.0.1:8000/docs` para ver a documentação automática do FastAPI.
