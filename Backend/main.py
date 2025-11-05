import httpx       
import pandas as pd  
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from bs4 import BeautifulSoup 

# link da pagina com os arquivo que contem os dados de onde estar tendo Queimadas
INPE_Diretorio_URL = "https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/diario/Brasil/"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
     allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/focos")
def get_focos_de_queimadas():
    print("Backend: Requisição recebida! Buscando o CSV mais recente")

    try:

        # baixa o html da pagina
        response_html = httpx.get(INPE_Diretorio_URL)

        # usa o BeautifulSoup para ler o HTML 
        soup = BeautifulSoup(response_html, 'lxml')

        # Procura por todos os links (tags '<a>') que terminam com ".csv"
        links_csv = [a['href'] for a in soup.find_all('a', href=True) if a['href'].endswith('.csv')]

        if not links_csv:
            raise Exception("Nenhum arquivo CSV foi encontrado no diretório.")

        # pega o mais recente da lista
        nome_arquivo_recente = links_csv[-2]

        URL_DOWNLOAD_CSV = INPE_Diretorio_URL + nome_arquivo_recente
        print(f"Backend: Link mais recente encontrado: {URL_DOWNLOAD_CSV}")

        # --- Ler o CSV ---
        df_brasil = pd.read_csv(URL_DOWNLOAD_CSV)

        # Define as colunas que queremos enviar
        colunas_uteis = ['lat', 'lon', 'municipio', 'estado']
        df_final = df_brasil[colunas_uteis]

        # Remove linhas que tenham qualquer dado faltando
        df_final = df_final.dropna()

        print(f"Backend: Sucesso! Encontrados {len(df_final)} focos no Brasil.")

        # Converte a tabela para JSON (lista de objetos) e retorna
        return df_final.to_dict(orient='records')
    
    except Exception as e:
         print(f"Backend: Erro ao buscar ou processar dados: {e}")
    return {"erro": str(e)}



